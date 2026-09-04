import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Landing } from "./pages/Landing";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import { Spinner } from "./components/ui/Spinner";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";

// Lazy-loaded heavy dashboard, analytics, settings, and secondary routes
const Dashboard = lazy(() => import("./pages/Dashboard").then(m => ({ default: m.Dashboard })));

// Lazy-loaded heavy dashboard, analytics, settings, and secondary routes
const Invoices = lazy(() => import("./pages/Invoices").then(m => ({ default: m.Invoices })));
const InvoiceDetail = lazy(() => import("./pages/InvoiceDetail").then(m => ({ default: m.InvoiceDetail })));
const Agent = lazy(() => import("./pages/Agent").then(m => ({ default: m.Agent })));
const Analytics = lazy(() => import("./pages/Analytics").then(m => ({ default: m.Analytics })));
const Settings = lazy(() => import("./pages/Settings").then(m => ({ default: m.Settings })));
const ActivityLog = lazy(() => import("./pages/ActivityLog").then(m => ({ default: m.ActivityLog })));
const Disputes = lazy(() => import("./pages/Disputes").then(m => ({ default: m.Disputes })));
const PaymentPlans = lazy(() => import("./pages/PaymentPlans").then(m => ({ default: m.PaymentPlans })));
const AcceptInvitation = lazy(() => import("./pages/AcceptInvitation").then(m => ({ default: m.AcceptInvitation })));
const DebtorPortal = lazy(() => import("./pages/DebtorPortal").then(m => ({ default: m.DebtorPortal })));
const Privacy = lazy(() => import("./pages/Privacy").then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import("./pages/Terms").then(m => ({ default: m.Terms })));
const DocsMock = lazy(() => import("./pages/DocsMock").then(m => ({ default: m.DocsMock })));

function RouteFallback() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#010102]">
      <Spinner className="h-7 w-7 text-[#f7f8f8]" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <RouteFallback />;
  }

  if (isAuthenticated) {
    return (
      <AppLayout>
        <Dashboard />
      </AppLayout>
    );
  }

  return <Landing />;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Auth routes sharing persistent right-side art */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/invite" element={<AcceptInvitation />} />
          <Route path="/i/:token" element={<DebtorPortal />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/docs" element={<DocsMock />} />


          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/:id/trashed" element={<InvoiceDetail />} />
              <Route path="/invoices/:id" element={<InvoiceDetail />} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/analytics" element={<Analytics />} />
              
              <Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}>
                <Route path="/dlq" element={<Navigate to="/agent?tab=dlq" replace />} />
                <Route path="/disputes" element={<Disputes />} />
                <Route path="/payment-plans" element={<PaymentPlans />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/activity-log" element={<ActivityLog />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
