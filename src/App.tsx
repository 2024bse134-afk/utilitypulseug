import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ElectricityDashboard from "./pages/ElectricityDashboard";
import WaterDashboard from "./pages/WaterDashboard";
import PaymentPage from "./pages/PaymentPage";
import ReportProblemPage from "./pages/ReportProblemPage";
import OutagesPage from "./pages/OutagesPage";
import ReliabilityPage from "./pages/ReliabilityPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/electricity" element={<ElectricityDashboard />} />
            <Route path="/water" element={<WaterDashboard />} />
            <Route path="/pay/:utility" element={<PaymentPage />} />
            <Route path="/report/:utility" element={<ReportProblemPage />} />
            <Route path="/outages/:utility" element={<OutagesPage />} />
            <Route path="/reliability/:utility" element={<ReliabilityPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
