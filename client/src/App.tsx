import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Intro from "./pages/Intro";
import { useAuth } from "@/_core/hooks/useAuth";
import { Heart, MessageCircle, Users, BarChart3, User } from "lucide-react";

function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Heart, label: "Mood" },
    { path: "/chat", icon: MessageCircle, label: "Chat" },
    { path: "/community", icon: Users, label: "Community" },
    { path: "/dashboard", icon: BarChart3, label: "Insights" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {navItems.map(({ path, icon: Icon, label }) => (
          <a
            key={path}
            href={path}
            className={`bottom-nav-item ${location === path ? "active" : ""}`}
            title={label}
          >
            <Icon size={24} />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function Router() {
  const { isAuthenticated, loading } = useAuth();
  const [location] = useLocation();

  // Show intro page only if not authenticated AND not loading
  if (!isAuthenticated && !loading) {
    return (
      <Switch>
        <Route path={"/*"} component={Intro} />
      </Switch>
    );
  }

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-sky-200 border-t-sky-500 mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Once authenticated, always show the app
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/chat"} component={Chat} />
      <Route path={"/community"} component={Community} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="app-shell">
            <div className="app-content">
              <Router />
            </div>
            {isAuthenticated && <BottomNav />}
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
