import { motion } from "framer-motion";
import { Activity, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import FundCard from "@/components/FundCard";
import InsightCard from "@/components/InsightCard";
import { highRiskFunds, lowRiskFunds, marketMood } from "@/data/mockData";

const moodColor = {
  Bullish: "text-success",
  Neutral: "text-warning",
  Bearish: "text-destructive",
};

export default function MarketInsightsPage() {
  return (
    <div className="pt-24 pb-16 container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-6 h-6 text-primary" />
          <h1 className="font-display font-bold text-3xl text-foreground">Market Insights</h1>
        </div>
        <p className="text-muted-foreground mb-8">AI-powered market analysis and fund performance overview</p>

        {/* Market Mood */}
        <div className="glass-card p-6 mb-8 border-l-4 border-primary/40">
          <div className="flex items-center gap-3 mb-2">
            <Activity className={`w-5 h-5 ${moodColor[marketMood]}`} />
            <h2 className="font-display font-semibold text-foreground">
              Current Market Mood: <span className={moodColor[marketMood]}>{marketMood}</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Markets are showing strong upward momentum. Our AI models detect positive sentiment across large-cap and mid-cap sectors with healthy FII inflows.
          </p>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <InsightCard icon={TrendingUp} title="Equity Outlook" description="Large-cap funds show strong momentum with Nifty50 up 12% YTD. Mid-caps are outperforming with 18% average returns." accentColor="success" index={0} />
          <InsightCard icon={TrendingDown} title="Risk Signals" description="Global bond yields rising may impact debt funds. Small-cap valuations are stretched — selective approach recommended." accentColor="warning" index={1} />
          <InsightCard icon={BarChart3} title="Sector Rotation" description="IT and banking sectors showing relative strength. FMCG and pharma underperforming — avoid overweight positions." accentColor="secondary" index={2} />
          <InsightCard icon={Activity} title="SIP Trends" description="Industry SIP inflows hit ₹21,000 Cr monthly. Systematic investing continues to drive retail participation." accentColor="primary" index={3} />
        </div>

        {/* Fund Sections */}
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          <span className="text-destructive">●</span> High Growth Funds
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">Higher risk, higher potential returns</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
          {highRiskFunds.map((fund, i) => (
            <FundCard key={fund.id} fund={fund} index={i} />
          ))}
        </div>

        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          <span className="text-success">●</span> Stable Return Funds
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">Lower risk, consistent growth</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {lowRiskFunds.map((fund, i) => (
            <FundCard key={fund.id} fund={fund} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
