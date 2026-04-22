"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TimeframeData {
  tf: string;
  bias: "Bullish" | "Bearish" | "Neutral";
  strength: number; // 0 to 100
}

const mockData: TimeframeData[] = [
  { tf: "1M", bias: "Bearish", strength: 85 },
  { tf: "5M", bias: "Bearish", strength: 70 },
  { tf: "15M", bias: "Neutral", strength: 40 },
  { tf: "1H", bias: "Bullish", strength: 65 },
  { tf: "4H", bias: "Bullish", strength: 80 },
  { tf: "1D", bias: "Bullish", strength: 95 },
  { tf: "1W", bias: "Bullish", strength: 90 },
];

export const TimeframeMatrix = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="grid grid-cols-3 px-4 py-3 border-b border-glass-border text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        <span>Timeframe</span>
        <span className="text-center">Sentiment</span>
        <span className="text-right">Strength</span>
      </div>
      <div className="flex flex-col">
        {mockData.map((item) => (
          <div key={item.tf} className="grid grid-cols-3 px-4 py-3.5 items-center border-b border-glass-border/50 hover:bg-white/[0.02] transition-colors group">
            <span className="text-xs font-bold font-mono text-zinc-300 group-hover:text-gold transition-colors">{item.tf}</span>
            <div className="flex justify-center">
              <div className={`flex items-center gap-2 px-2 py-1 rounded-sm text-[10px] font-black uppercase tracking-tighter border ${
                item.bias === "Bullish" ? "bg-lime/10 text-lime border-lime/20" : 
                item.bias === "Bearish" ? "bg-red-500/10 text-red-500 border-red-500/20" : 
                "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
              }`}>
                {item.bias === "Bullish" ? <TrendingUp className="w-3 h-3" /> : 
                 item.bias === "Bearish" ? <TrendingDown className="w-3 h-3" /> : 
                 <Minus className="w-3 h-3" />}
                {item.bias}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    item.bias === "Bullish" ? "bg-lime" : 
                    item.bias === "Bearish" ? "bg-red-500" : 
                    "bg-zinc-500"
                  }`} 
                  style={{ width: `${item.strength}%` }} 
                />
              </div>
              <span className="text-[10px] font-mono text-zinc-500">{item.strength}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
