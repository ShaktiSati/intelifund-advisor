import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, Activity } from "lucide-react";
import FundCard from "@/components/FundCard";
import HeroOrb from "@/components/HeroOrb";
import { highRiskFunds, lowRiskFunds, marketMood } from "@/data/mockData";

const moodColor = {
  Bullish: "text-success",
  Neutral: "text-warning",
  Bearish: "text-destructive",
};

const moodGlow = {
  Bullish: "0 0 15px hsl(160 84% 39% / 0.4)",
  Neutral: "0 0 15px hsl(38 92% 50% / 0.4)",
  Bearish: "0 0 15px hsl(347 77% 61% / 0.4)",
};

export default function LandingPage() {
  return (
    <div className="pt-20 pb-16">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            style={{ boxShadow: moodGlow[marketMood] }}
          >
            <Activity className={`w-4 h-4 ${moodColor[marketMood]}`} />
            <span className="text-sm text-muted-foreground">Market Mood:</span>
            <span className={`text-sm font-bold ${moodColor[marketMood]}`}>{marketMood}</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            Build Smart<br />
            <span className="gradient-text">Mutual Fund</span><br />
            Portfolios
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mb-8">
            Data-driven portfolio construction powered by advanced analytics. Optimize risk-adjusted returns with intelligent fund selection.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/risk-assessment" className="btn-glow px-8 py-3 text-base flex items-center gap-2">
              Build My Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#funds" className="btn-outline-glow px-8 py-3 text-base">
              Explore Funds
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <HeroOrb />
        </motion.div>
      </section>

      {/* Fund Sections */}
      <section id="funds" className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            <span className="text-destructive">●</span> High Growth Funds
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">Higher risk, higher potential returns</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">
            {highRiskFunds.map((fund, i) => (
              <FundCard key={fund.id} fund={fund} index={i} />
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
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
      </section>
    </div>
  );
}
