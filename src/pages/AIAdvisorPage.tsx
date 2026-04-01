import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Loader2, RefreshCw, PieChart, ShieldCheck, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const questions = [
  {
    key: "age_group",
    title: "What is your age group?",
    options: ["<25", "25–35", "35–50", "50+"],
  },
  {
    key: "income_range",
    title: "What is your monthly income range?",
    options: ["<25k", "25k–75k", "75k–2L", "2L+"],
  },
  {
    key: "investment_range",
    title: "How much do you plan to invest monthly?",
    options: ["<5k", "5k–20k", "20k–50k", "50k+"],
  },
  {
    key: "goal",
    title: "What is your primary investment goal?",
    options: ["Wealth creation", "Retirement planning", "Tax saving", "Child education"],
  },
  {
    key: "horizon",
    title: "What is your investment horizon?",
    options: ["Short-term (0–3 years)", "Medium-term (3–7 years)", "Long-term (7+ years)"],
  },
  {
    key: "risk_tolerance",
    title: "What is your risk tolerance?",
    options: ["Low (prefer safety)", "Medium (balanced)", "High (growth-focused)"],
  },
  {
    key: "market_drop_reaction",
    title: "How would you react to a 15% market drop?",
    options: ["Sell everything", "Wait and watch", "Invest more"],
  },
] as const;

type Answers = Record<string, string>;

function computeRiskProfile(answers: Answers) {
  let score = 0;

  // Age
  if (answers.age_group === "<25") score += 3;
  else if (answers.age_group === "25–35") score += 3;
  else if (answers.age_group === "35–50") score += 2;
  else score += 1;

  // Income
  if (answers.income_range === "2L+") score += 3;
  else if (answers.income_range === "75k–2L") score += 2;
  else score += 1;

  // Investment amount
  if (answers.investment_range === "50k+") score += 3;
  else if (answers.investment_range === "20k–50k") score += 2;
  else score += 1;

  // Horizon
  if (answers.horizon?.includes("Long")) score += 3;
  else if (answers.horizon?.includes("Medium")) score += 2;
  else score += 1;

  // Risk tolerance
  if (answers.risk_tolerance?.includes("High")) score += 3;
  else if (answers.risk_tolerance?.includes("Medium")) score += 2;
  else score += 1;

  // Market drop reaction
  if (answers.market_drop_reaction === "Invest more") score += 3;
  else if (answers.market_drop_reaction === "Wait and watch") score += 2;
  else score += 0;

  if (score >= 14) return "High";
  if (score >= 9) return "Medium";
  return "Low";
}

function getAdvisory(risk: string) {
  if (risk === "High") {
    return {
      allocation: { equity: 70, hybrid: 20, debt: 10 },
      explanation:
        "Your profile indicates a high risk appetite with a long-term horizon. We recommend an equity-heavy portfolio for maximum growth potential. Equity funds offer the highest returns over time, while a small allocation to hybrid and debt funds provides a safety net during market volatility.",
    };
  }
  if (risk === "Medium") {
    return {
      allocation: { equity: 40, hybrid: 35, debt: 25 },
      explanation:
        "You have a balanced risk profile. A mix of equity, hybrid, and debt funds gives you growth potential while keeping volatility in check. This strategy is ideal for steady wealth accumulation with moderate risk exposure.",
    };
  }
  return {
    allocation: { equity: 15, hybrid: 25, debt: 60 },
    explanation:
      "Your profile suggests a preference for capital preservation and stability. We recommend a debt-heavy portfolio that prioritizes consistent returns with minimal volatility. Hybrid funds add a touch of growth without significant risk.",
  };
}

const riskColors: Record<string, string> = {
  High: "text-destructive",
  Medium: "text-warning",
  Low: "text-success",
};

export default function AIAdvisorPage() {
  const { user, fullName } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [existingResponse, setExistingResponse] = useState<any>(null);

  // Check for existing responses
  useEffect(() => {
    if (!user) return;
    const fetchExisting = async () => {
      const { data } = await supabase
        .from("advisory_responses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);
      if (data && data.length > 0) {
        setExistingResponse(data[0]);
      }
      setLoading(false);
    };
    fetchExisting();
  }, [user]);

  const handleSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSaving(true);
    const risk = computeRiskProfile(answers);
    const advisory = getAdvisory(risk);

    const { data, error } = await supabase
      .from("advisory_responses")
      .insert({
        user_id: user.id,
        age: answers.age_group === "<25" ? 22 : answers.age_group === "25–35" ? 30 : answers.age_group === "35–50" ? 42 : 55,
        monthly_income: answers.income_range === "<25k" ? 20000 : answers.income_range === "25k–75k" ? 50000 : answers.income_range === "75k–2L" ? 130000 : 300000,
        investment_amount: answers.investment_range === "<5k" ? 3000 : answers.investment_range === "5k–20k" ? 12000 : answers.investment_range === "20k–50k" ? 35000 : 75000,
        risk_tolerance: risk,
        investment_duration: answers.horizon || "Medium-term (3–7 years)",
        financial_goal: answers.goal || "Wealth creation",
        recommendation: JSON.stringify({ risk, ...advisory, answers }),
      })
      .select()
      .single();

    setSaving(false);
    if (!error && data) {
      setExistingResponse(data);
    }
  };

  const handleRetake = () => {
    setExistingResponse(null);
    setAnswers({});
    setStep(0);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show advisory result
  if (existingResponse) {
    let parsed: any = {};
    try {
      parsed = JSON.parse(existingResponse.recommendation || "{}");
    } catch {
      parsed = { risk: existingResponse.risk_tolerance, allocation: { equity: 33, hybrid: 33, debt: 34 }, explanation: existingResponse.recommendation };
    }

    const risk = parsed.risk || existingResponse.risk_tolerance;
    const advisory = parsed.allocation ? parsed : getAdvisory(risk);

    return (
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Your AI Advisory, <span className="gradient-text">{fullName || "Investor"}</span>
          </h1>
          <p className="text-muted-foreground mb-8">Here's your personalized investment strategy based on your profile.</p>

          {/* Risk Profile */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-foreground">Risk Profile</h2>
                <p className="text-sm text-muted-foreground">Based on your questionnaire responses</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-3xl font-display font-extrabold ${riskColors[risk] || "text-foreground"}`}>
                {risk} Risk
              </span>
            </div>
          </div>

          {/* Allocation */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display font-bold text-lg text-foreground">Suggested Allocation</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Equity Funds", value: advisory.allocation.equity, color: "bg-primary" },
                { label: "Hybrid Funds", value: advisory.allocation.hybrid, color: "bg-warning" },
                { label: "Debt Funds", value: advisory.allocation.debt, color: "bg-success" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${item.value}, 100`}
                        className={item.label === "Equity Funds" ? "text-primary" : item.label === "Hybrid Funds" ? "text-warning" : "text-success"}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-foreground font-bold font-display text-lg">
                      {item.value}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display font-bold text-lg text-foreground">AI Explanation</h2>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed">{advisory.explanation}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => navigate("/recommendations")} className="btn-glow px-6 py-2.5 text-sm flex items-center gap-2">
              Explore Fund Picks <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={handleRetake} className="btn-outline-glow px-6 py-2.5 text-sm flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Retake Assessment
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Questionnaire flow
  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQ.key];

  return (
    <div className="pt-24 pb-16 container mx-auto px-4 max-w-xl">
      {/* Welcome header on first step */}
      {step === 0 && !answers[questions[0].key] && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-display font-bold text-2xl text-foreground mb-1">
            Welcome, <span className="gradient-text">{fullName || "Investor"}</span>
          </h1>
          <p className="text-muted-foreground text-sm">Let's build your personalized investment strategy.</p>
        </motion.div>
      )}

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-muted mb-2 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <p className="text-muted-foreground text-xs mb-8 text-right">
        {step + 1} of {questions.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <h2 className="font-display font-bold text-xl text-foreground mb-6">{currentQ.title}</h2>

          <div className={`grid gap-3 ${currentQ.options.length <= 3 ? "grid-cols-1" : "grid-cols-2"}`}>
            {currentQ.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(currentQ.key, opt)}
                className={`py-4 px-4 rounded-xl text-sm font-semibold transition-all duration-300 text-left ${
                  currentAnswer === opt
                    ? "bg-primary/20 text-primary border border-primary/40 glow-primary"
                    : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/20"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-10">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {step < questions.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!currentAnswer}
                className="btn-glow px-6 py-2.5 text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!currentAnswer || saving}
                className="btn-glow px-6 py-2.5 text-sm flex items-center gap-2 disabled:opacity-40"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Get AI Advisory
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
