import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Clock, Wallet, TrendingUp, ArrowRight, ArrowLeft, Sparkles, User } from "lucide-react";

const goals = ["Wealth Creation", "Retirement", "Education", "Emergency Fund"] as const;
const riskLevels = ["Conservative", "Moderate", "Aggressive"] as const;

function getRiskLabel(riskValue: number) {
  if (riskValue >= 70) return { label: "Aggressive Investor", color: "text-destructive", strategy: "High-Growth Equity Strategy" };
  if (riskValue >= 40) return { label: "Moderate Investor", color: "text-warning", strategy: "Balanced Growth Strategy" };
  return { label: "Conservative Investor", color: "text-success", strategy: "Capital Preservation Strategy" };
}

export default function AdvisorPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [duration, setDuration] = useState(5);
  const [sip, setSip] = useState(10000);
  const [riskValue, setRiskValue] = useState(50);
  const [goal, setGoal] = useState<string>("Wealth Creation");

  const profile = useMemo(() => getRiskLabel(riskValue), [riskValue]);

  const handleSubmit = () => {
    let score = riskValue;
    if (duration >= 7) score = Math.min(100, score + 10);
    if (duration <= 3) score = Math.max(0, score - 10);
    navigate(`/recommendations?risk=${score}&sip=${sip}&duration=${duration}&goal=${goal}`);
  };

  const steps = [
    {
      icon: Target,
      title: "What's your investment goal?",
      subtitle: "This helps us tailor the right strategy for you",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {goals.map(g => (
            <button
              key={g}
              onClick={() => { setGoal(g); setStep(1); }}
              className={`py-4 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                goal === g
                  ? "bg-primary/20 text-primary border border-primary/40 glow-primary"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      ),
    },
    {
      icon: Clock,
      title: "How long do you plan to invest?",
      subtitle: "Longer horizons allow for more aggressive strategies",
      content: (
        <div>
          <input
            type="range"
            min={1}
            max={20}
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            className="w-full accent-primary h-2 rounded-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>1 year</span>
            <span className="text-primary font-bold text-2xl font-display">{duration} years</span>
            <span>20 years</span>
          </div>
          <div className="mt-4 glass-card p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              {duration <= 3 ? "📌 Short-term: We'll focus on low-volatility, stable funds." :
               duration <= 7 ? "📊 Medium-term: A balanced mix of growth and stability." :
               "🚀 Long-term: You can afford higher risk for maximum growth."}
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: Wallet,
      title: "How much can you invest monthly?",
      subtitle: "Even small amounts compound significantly over time",
      content: (
        <div>
          <div className="glass-card p-4 rounded-xl flex items-center gap-3">
            <span className="text-2xl text-muted-foreground">₹</span>
            <input
              type="number"
              value={sip}
              onChange={e => setSip(Number(e.target.value))}
              className="flex-1 bg-transparent text-3xl font-bold font-display text-foreground focus:outline-none"
              min={500}
              step={500}
            />
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {[5000, 10000, 25000, 50000].map(amt => (
              <button
                key={amt}
                onClick={() => setSip(amt)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  sip === amt ? "bg-primary/20 text-primary border border-primary/40" : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                ₹{amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: TrendingUp,
      title: "What's your risk comfort level?",
      subtitle: "We'll match funds to your risk tolerance",
      content: (
        <div>
          <input
            type="range"
            min={0}
            max={100}
            value={riskValue}
            onChange={e => setRiskValue(Number(e.target.value))}
            className="w-full accent-primary h-2 rounded-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Safe</span>
            <span>Balanced</span>
            <span>Aggressive</span>
          </div>
          
          {/* Dynamic feedback */}
          <motion.div
            key={profile.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 glass-card p-4 rounded-xl border-l-4 border-primary/40"
          >
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-primary" />
              <span className={`font-display font-bold text-sm ${profile.color}`}>{profile.label}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended strategy: <span className="text-foreground font-semibold">{profile.strategy}</span>
            </p>
          </motion.div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];

  return (
    <div className="pt-24 pb-16 container mx-auto px-4 max-w-xl">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i <= step ? "bg-primary glow-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <currentStep.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">{currentStep.title}</h1>
              <p className="text-sm text-muted-foreground">{currentStep.subtitle}</p>
            </div>
          </div>

          <div className="mt-8">{currentStep.content}</div>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {step < steps.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} className="btn-glow px-6 py-2.5 text-sm flex items-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn-glow px-6 py-2.5 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Get AI Recommendations
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
