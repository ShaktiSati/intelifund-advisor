import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FundCard from "@/components/FundCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Fund } from "@/data/mockData";
import { fetchRecommendations } from "@/services/apiService";
import { usePortfolio } from "@/context/PortfolioContext";
import { toast } from "sonner";

export default function RecommendationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const riskScore = Number(searchParams.get("risk") || 50);
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const { addFund } = usePortfolio();

  useEffect(() => {
    setLoading(true);
    fetchRecommendations(riskScore)
      .then(setFunds)
      .catch(() => toast.error("Failed to load recommendations"))
      .finally(() => setLoading(false));
  }, [riskScore]);

  const handleAdd = (fund: Fund) => {
    addFund(fund);
    toast.success(`${fund.name} added to portfolio`);
  };

  return (
    <div className="pt-24 pb-16 container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">Recommended Funds</h1>
            <p className="text-muted-foreground mt-1">
              Based on your risk score: <span className="text-primary font-bold">{riskScore}/100</span>
            </p>
          </div>
          <button onClick={() => navigate("/portfolio")} className="btn-outline-glow px-6 py-2 text-sm">
            View Portfolio →
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {funds.map((fund, i) => (
              <FundCard key={fund.id} fund={fund} onAdd={handleAdd} showAddButton index={i} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
