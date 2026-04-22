"use client";

import React, { useEffect, useRef } from "react";

export const TickerTape = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const containerRef = container.current;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:XAUUSD", title: "Gold" },
        { proName: "FOREXCOM:XAGUSD", title: "Silver" },
        { proName: "INDEX:DXY", title: "US Dollar Index" },
        { proName: "FX_IDC:XAUGBP", title: "Gold/GBP" },
        { proName: "OANDA:XAUEUR", title: "Gold/EUR" }
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en"
    });
    containerRef.appendChild(script);
    return () => {
      if (containerRef) containerRef.innerHTML = "";
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export const AdvancedChart = ({ symbol = "XAUUSD" }: { symbol?: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const containerRef = container.current;
    
    // Check if script already exists
    let script = document.getElementById("tradingview-tv-script") as HTMLScriptElement;
    
    const initWidget = () => {
      if (typeof window !== "undefined" && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: "tradingview_chart",
        });
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = "tradingview-tv-script";
      script.src = "https://s3.tradingview.com/tv.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = initWidget;
      document.head.appendChild(script);
    } else {
      initWidget();
    }

    return () => {
      // Don't remove the script from head, just clear the container
      if (containerRef) containerRef.innerHTML = '<div id="tradingview_chart" class="h-full w-full" />';
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container w-full h-full min-h-[600px]" ref={container}>
      <div id="tradingview_chart" className="h-[600px] w-full" />
    </div>
  );
};

export const TechnicalAnalysis = ({ symbol = "XAUUSD" }: { symbol?: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const containerRef = container.current;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: "1h",
      width: "100%",
      isTransparent: true,
      height: "450",
      symbol: symbol,
      showIntervalTabs: true,
      displayMode: "single",
      locale: "en",
      colorTheme: "dark"
    });
    containerRef.appendChild(script);
    return () => {
      if (containerRef) containerRef.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export const Timeline = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const containerRef = container.current;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "symbol",
      symbol: "XAUUSD",
      displayMode: "regular",
      width: "100%",
      height: "600",
      colorTheme: "dark",
      isTransparent: true,
      locale: "en"
    });
    containerRef.appendChild(script);
    return () => {
      if (containerRef) containerRef.innerHTML = "";
    };
  }, []);

  return (
    <div className="tradingview-widget-container h-full" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export const EconomicCalendar = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const containerRef = container.current;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      isTransparent: true,
      width: "100%",
      height: "600",
      locale: "en",
      importanceFilter: "-1,0,1",
      currencyFilter: "USD,EUR,GBP,CNY,JPY"
    });
    containerRef.appendChild(script);
    return () => {
      if (containerRef) containerRef.innerHTML = "";
    };
  }, []);

  return (
    <div className="tradingview-widget-container h-full" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};
export const SymbolInfo = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const containerRef = container.current;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: "FOREXCOM:XAUUSD",
      width: "100%",
      locale: "en",
      colorTheme: "dark",
      isTransparent: true
    });
    containerRef.appendChild(script);
    return () => {
      if (containerRef) containerRef.innerHTML = "";
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export const MultiTimeframeAnalysis = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const containerRef = container.current;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: "1h",
      width: "100%",
      isTransparent: true,
      height: "450",
      symbol: "FOREXCOM:XAUUSD",
      showIntervalTabs: true,
      displayMode: "single",
      locale: "en",
      colorTheme: "dark"
    });
    containerRef.appendChild(script);
    return () => {
      if (containerRef) containerRef.innerHTML = "";
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};
