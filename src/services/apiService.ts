import { Fund, getRecommendations, calculatePortfolioMetrics } from "@/data/mockData";

// REPLACE THESE WITH ACTUAL API CALLS WHEN BACKEND IS READY

const API_BASE = "/api"; // Change to actual backend URL

export async function fetchRecommendations(riskScore: number): Promise<Fund[]> {
  // TODO: Replace with actual API call
  // const res = await fetch(`${API_BASE}/recommend`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ risk_score: riskScore }),
  // });
  // return res.json();

  // REPLACE THIS WITH ACTUAL PIPELINE LOGIC
  await new Promise(r => setTimeout(r, 800));
  return getRecommendations(riskScore);
}

export async function fetchPortfolioMetrics(
  funds: Fund[],
  weights: number[]
): Promise<{ portfolioReturn: number; volatility: number; sharpeRatio: number; maxDrawdown: number }> {
  // TODO: Replace with actual API call
  // const res = await fetch(`${API_BASE}/portfolio/calculate`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ funds, weights }),
  // });
  // return res.json();

  // REPLACE THIS WITH ACTUAL PIPELINE LOGIC
  await new Promise(r => setTimeout(r, 500));
  return calculatePortfolioMetrics(funds, weights);
}
