import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const riskOptions = ["Low", "Medium", "High"] as const;
const durationOptions = ["Short-term", "Mid-term", "Long-term"] as const;
const goalOptions = ["Wealth Creation", "Retirement", "Tax Saving", "Education"] as const;

function getRecommendation(risk: string): string {
  if (risk === "Low") return "Debt Funds — Stable returns with minimal volatility. Ideal for capital preservation.";
  if (risk === "Medium") return "Hybrid Funds — Balanced mix of equity and debt for moderate growth with controlled risk.";
  return "Equity Funds — High-growth potential with higher volatility. Best for long-term wealth creation.";
}

export default function GetAdvicePage() {
  const { user, fullName } = useAuth();
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [age, setAge] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [riskTolerance, setRiskTolerance] = useState<string>("");
  const [investmentDuration, setInvestmentDuration] = useState<string>("");
  const [financialGoal, setFinancialGoal] = useState<string>("");

  const recommendation = riskTolerance ? getRecommendation(riskTolerance) : "";

  const steps = [
    {
      title: "What is your age?",
      content: (
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="e.g. 28"
          min={18}
          max={100}
          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg font-display"
        />
      ),
      valid: age && Number(age) >= 18,
    },
    {
      title: "What is your monthly income?",
      content: (
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">₹</span>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            placeholder="e.g. 50000"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg font-display"
          />
        </div>
      ),
      valid: monthlyIncome && Number(monthlyIncome) > 0,
    },
    {
      title: "How much do you want to invest?",
      content: (
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">₹</span>
          <input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            placeholder="e.g. 10000"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg font-display"
          />
        </div>
      ),
      valid: investmentAmount && Number(investmentAmount) > 0,
    },
    {
      title: "What is your risk tolerance?",
      content: (
        <div className="grid grid-cols-3 gap-3">
          {riskOptions.map((r) => (
            <button
              key={r}
              onClick={() => setRiskTolerance(r)}
              className={`py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                riskTolerance === r
                  ? "bg-primary/20 text-primary border border-primary/40 glow-primary"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      ),
      valid: !!riskTolerance,
    },
    {
      title: "What is your investment duration?",
      content: (
        <div className="grid grid-cols-3 gap-3">
          {durationOptions.map((d) => (
            <button
              key={d}
              onClick={() => setInvestmentDuration(d)}
              className={`py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                investmentDuration === d
                  ? "bg-primary/20 text-primary border border-primary/40 glow-primary"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      ),
      valid: !!investmentDuration,
    },
    {
      title: "What is your financial goal?",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {goalOptions.map((g) => (
            <button
              key={g}
              onClick={() => setFinancialGoal(g)}
              className={`py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                financialGoal === g
                  ? "bg-primary/20 text-primary border border-primary/40 glow-primary"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      ),
      valid: !!financialGoal,
    },
  ];

  const handleSubmit = async () => {
    if (!user) return;
    setSaving(true);
    const rec = getRecommendation(riskTolerance);
    const { error } = await supabase.from("advisory_responses").insert({
      user_id: user.id,
      age: Number(age),
      monthly_income: Number(monthlyIncome),
      investment_amount: Number(investmentAmount),
      risk_tolerance: riskTolerance,
      investment_duration: investmentDuration,
      financial_goal: financialGoal,
      recommendation: rec,
    });
    setSaving(false);
    if (!error) {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <h1 className="font-display font-bold text-2xl text-foreground mb-4">Your AI Recommendation</h1>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Risk Profile</span>
              <span className="text-foreground font-semibold">{riskTolerance}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Duration</span>
              <span className="text-foreground font-semibold">{investmentDuration}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Goal</span>
              <span className="text-foreground font-semibold">{financialGoal}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
            <h3 className="text-primary font-display font-bold text-sm mb-1">Recommended Fund Type</h3>
            <p className="text-foreground text-sm">{recommendation}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => navigate("/advisor")} className="btn-glow px-6 py-2.5 text-sm flex items-center gap-2">
              Explore Detailed Recommendations <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => { setShowResult(false); setStarted(false); setStep(0); }} className="btn-outline-glow px-6 py-2.5 text-sm">
              Start Over
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Welcome, <span className="gradient-text">{fullName || "Investor"}</span>
          </h1>
          <p className="text-muted-foreground mb-8">Let our AI advisor find the best mutual fund strategy for you.</p>
          <button onClick={() => setStarted(true)} className="btn-glow px-8 py-3 text-base flex items-center gap-2 mx-auto">
            <Sparkles className="w-5 h-5" /> Start Advisory
          </button>
        </motion.div>
      </div>
    );
  }

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="pt-24 pb-16 container mx-auto px-4 max-w-xl">
      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-muted mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-muted-foreground text-sm mb-2">Question {step + 1} of {steps.length}</p>
          <h2 className="font-display font-bold text-xl text-foreground mb-6">{currentStep.title}</h2>
          <div className="mb-8">{currentStep.content}</div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!currentStep.valid}
                className="btn-glow px-6 py-2.5 text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!currentStep.valid || saving}
                className="btn-glow px-6 py-2.5 text-sm flex items-center gap-2 disabled:opacity-40"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Get Recommendation
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
