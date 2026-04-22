"use client";

import React, { useEffect, useState, useCallback } from "react";
import { fetchGoldNews, NewsItem } from "@/lib/news-intelligence";
import { toast, Toaster } from "sonner";
import { Bell, TrendingUp, TrendingDown, Info, ExternalLink, Zap, Clock } from "lucide-react";
import { format, isToday, isYesterday, isThisWeek, subWeeks, isAfter } from "date-fns";

type NewsGroup = "Today" | "Yesterday" | "This Week" | "Last Week";

export const LiveNewsHub = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchedId, setLastFetchedId] = useState<string | null>(null);

  const refreshNews = useCallback(async (isInitial = false) => {
    const freshNews = await fetchGoldNews();
    if (freshNews.length > 0) {
      if (!isInitial && freshNews[0].id !== lastFetchedId) {
        const latest = freshNews[0];
        toast(latest.title, {
          description: `Sentiment: ${latest.sentiment} | Impact: ${latest.impact}`,
          icon: latest.sentiment === "Bullish" ? <TrendingUp className="text-lime w-4 h-4" /> : <TrendingDown className="text-red-500 w-4 h-4" />,
          action: {
            label: "Read",
            onClick: () => window.open(latest.link, "_blank")
          }
        });
        setLastFetchedId(latest.id);
      } else if (isInitial) {
        setLastFetchedId(freshNews[0].id);
      }
      setNews(freshNews);
    }
    setLoading(false);
  }, [lastFetchedId]);

  useEffect(() => {
    refreshNews(true);
    const interval = setInterval(() => refreshNews(), 60000);
    return () => clearInterval(interval);
  }, [refreshNews]);

  const groupNews = (items: NewsItem[]) => {
    const groups: Record<NewsGroup, NewsItem[]> = {
      "Today": [],
      "Yesterday": [],
      "This Week": [],
      "Last Week": []
    };

    const oneWeekAgo = subWeeks(new Date(), 1);
    const twoWeeksAgo = subWeeks(new Date(), 2);

    items.forEach(item => {
      const date = new Date(item.pubDate);
      if (isToday(date)) groups["Today"].push(item);
      else if (isYesterday(date)) groups["Yesterday"].push(item);
      else if (isThisWeek(date)) groups["This Week"].push(item);
      else if (isAfter(date, twoWeeksAgo)) groups["Last Week"].push(item);
    });

    return groups;
  };

  const groupedNews = groupNews(news);

  if (loading && news.length === 0) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-glass border border-glass-border rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-4">
      <Toaster position="bottom-right" theme="dark" />
      
      {(Object.keys(groupedNews) as NewsGroup[]).map((group) => (
        groupedNews[group].length > 0 && (
          <div key={group} className="flex flex-col gap-3">
            <div className="flex items-center gap-3 px-1">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 italic">{group}</h3>
              <div className="flex-1 h-px bg-glass-border/30" />
            </div>
            
            <div className="flex flex-col gap-2">
              {groupedNews[group].map((item) => (
                <div key={item.id} className="glass-panel p-3 flex flex-col gap-2 group transition-all hover:bg-white/[0.04] border-l-2 border-l-transparent hover:border-l-gold/40">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                          <Clock className="w-2.5 h-2.5 text-gold/50" />
                          {format(new Date(item.pubDate), "HH:mm")}
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm border ${
                          item.sentiment === "Bullish" ? "border-lime/20 bg-lime/10 text-lime" : 
                          item.sentiment === "Bearish" ? "border-red-500/20 bg-red-500/10 text-red-500" : 
                          "border-zinc-500/20 bg-zinc-500/10 text-zinc-400"
                        }`}>
                          {item.sentiment}
                        </span>
                      </div>
                      <h4 className="text-[13px] font-bold leading-tight group-hover:text-gold transition-colors tracking-tight">
                        {item.title}
                      </h4>
                    </div>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-1.5 glass-panel hover:bg-white/10 transition-colors shrink-0">
                      <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-gold" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};
