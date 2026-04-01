import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "@/pages/LandingPage";
import AdvisorPage from "@/pages/AdvisorPage";
import RecommendationPage from "@/pages/RecommendationPage";
import MarketInsightsPage from "@/pages/MarketInsightsPage";
import PortfolioPage from "@/pages/PortfolioPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import GetAdvicePage from "@/pages/GetAdvicePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <PortfolioProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/get-advice" element={<ProtectedRoute><GetAdvicePage /></ProtectedRoute>} />
              <Route path="/advisor" element={<AdvisorPage />} />
              <Route path="/recommendations" element={<RecommendationPage />} />
              <Route path="/market-insights" element={<MarketInsightsPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/risk-assessment" element={<AdvisorPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PortfolioProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
