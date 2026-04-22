import { TickerTape, AdvancedChart } from "@/components/TradingViewWidgets";
import { LiveNewsHub } from "@/components/LiveNewsHub";
import { TimeframeMatrix } from "@/components/TimeframeMatrix";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white">
      {/* Top Ticker Tape */}
      <div className="w-full h-12 bg-black border-b border-glass-border">
        <TickerTape />
      </div>

      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 gap-8 max-w-[1600px] mx-auto w-full bg-[#050505]">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-4 mb-4">
          <div>
            <h1 className="text-5xl font-black tracking-tighter gold-gradient uppercase leading-none">Aurum Intelligence</h1>
            <p className="text-zinc-500 font-bold tracking-widest text-[10px] mt-2 uppercase">XAU/USD Real-Time Strategy Hub</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.2em]">Live Connection</span>
              <span className="text-lime text-xs font-black flex items-center gap-2">
                SATELLITE LINK ACTIVE
                <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              </span>
            </div>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 flex-1">
          
          {/* Left Column: Advanced Chart (Main Focus) */}
          <section className="xl:col-span-8 flex flex-col gap-4">
            <div className="glass-panel p-1 flex-1 min-h-[650px] shadow-2xl">
              <AdvancedChart />
            </div>
          </section>

          {/* Right Column: Timeframe Matrix & Stats */}
          <section className="xl:col-span-4 flex flex-col gap-8">
            {/* Timeframe Analysis Table */}
            <div className="glass-panel flex flex-col shadow-xl">
              <div className="px-4 py-3 border-b border-glass-border flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-300">Timeframe Sentiment</h3>
                <span className="text-[9px] text-zinc-500 font-bold uppercase">XAU/USD Matrix</span>
              </div>
              <TimeframeMatrix />
            </div>

            {/* Quick Stats Grid */}
            <div className="glass-panel p-6 flex flex-col gap-6 shadow-xl bg-white/[0.01]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-glass-border/50 pb-2">XAU Market Pulse</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">24h High</span>
                  <span className="text-xl font-mono font-black text-zinc-200 tracking-tighter">$2,398.45</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">24h Low</span>
                  <span className="text-xl font-mono font-black text-zinc-200 tracking-tighter">$2,345.12</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Volatility</span>
                  <span className="text-xl font-mono font-black text-lime tracking-tighter">1.24%</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Bias</span>
                  <span className="text-xl font-mono font-black text-gold italic tracking-tighter">BULLISH</span>
                </div>
              </div>
            </div>

            {/* News Hub Integrated into Sidebar for Uniformity */}
            <div className="glass-panel p-4 flex flex-col flex-1 max-h-[500px] shadow-xl overflow-hidden">
               <div className="flex justify-between items-center mb-4 border-b border-glass-border/50 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Intelligence Feed</h3>
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
              </div>
              <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                <LiveNewsHub />
              </div>
            </div>
          </section>
        </div>

        {/* Unified Footer */}
        <footer className="mt-8 py-8 border-t border-glass-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-6">
             <span className="gold-gradient">Aurum Intel Terminal v2.0</span>
             <span className="text-zinc-800">|</span>
             <span>&copy; 2026 BASSVerse Defense Intelligence</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gold transition-colors">Risk Protocol</a>
            <a href="#" className="hover:text-gold transition-colors">Data Integrity</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
