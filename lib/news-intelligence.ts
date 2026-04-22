export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  sentiment: "Bullish" | "Bearish" | "Neutral";
  impact: "High" | "Medium" | "Low";
  summary: string;
}

const BULLISH_KEYWORDS = [
  "inflation", "rate cut", "easing", "geopolitical", "tension", "war", "conflict", 
  "weak dollar", "dxy down", "buying", "demand", "central bank", "safe haven",
  "uncertainty", "stimulus", "deficit", "debt"
];

const BEARISH_KEYWORDS = [
  "rate hike", "hawkish", "tightening", "strong dollar", "dxy up", "selling", 
  "inflation cooling", "peace", "stability", "growth", "yields up", "bonds",
  "unemployment down", "jobs report"
];

const HIGH_IMPACT_KEYWORDS = [
  "fed", "fomc", "powell", "war", "invasion", "cpi", "nfp", "emergency"
];

export function analyzeSentiment(title: string): { sentiment: "Bullish" | "Bearish" | "Neutral", impact: "High" | "Medium" | "Low" } {
  const lowercaseTitle = title.toLowerCase();
  
  let sentiment: "Bullish" | "Bearish" | "Neutral" = "Neutral";
  let impact: "High" | "Medium" | "Low" = "Low";

  // Check Sentiment
  const bullishCount = BULLISH_KEYWORDS.filter(kw => lowercaseTitle.includes(kw)).length;
  const bearishCount = BEARISH_KEYWORDS.filter(kw => lowercaseTitle.includes(kw)).length;

  if (bullishCount > bearishCount) sentiment = "Bullish";
  else if (bearishCount > bullishCount) sentiment = "Bearish";

  // Check Impact
  const impactCount = HIGH_IMPACT_KEYWORDS.filter(kw => lowercaseTitle.includes(kw)).length;
  if (impactCount > 0) impact = "High";
  else if (bullishCount > 0 || bearishCount > 0) impact = "Medium";

  return { sentiment, impact };
}

export async function fetchGoldNews(): Promise<NewsItem[]> {
  try {
    // Using a proxy to avoid CORS issues and fetch from CNBC Gold RSS
    // Note: In a real app, this would be a server-side fetch.
    const rssUrl = "https://www.cnbc.com/id/10000115/device/rss/rss.html";
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error("Failed to fetch RSS feed");
    }

    return data.items.map((item: any) => {
      const { sentiment, impact } = analyzeSentiment(item.title);
      return {
        id: item.guid || item.link,
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: "CNBC",
        sentiment,
        impact,
        summary: item.content || item.description || ""
      };
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
