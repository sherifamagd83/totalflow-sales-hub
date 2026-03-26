import { Switch, Route, Router, useLocation, Link } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";

import Dashboard from "@/pages/dashboard";
import Scripts from "@/pages/scripts";
import Objections from "@/pages/objections";
import Demo from "@/pages/demo";
import Process from "@/pages/process";
import ROI from "@/pages/roi";
import Verticals from "@/pages/verticals";
import NotFound from "@/pages/not-found";

import {
  LayoutDashboard,
  Phone,
  Shield,
  BookOpen,
  Target,
  TrendingUp,
  Users,
  Menu,
  X,
  Zap,
  Sun,
  Moon,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/scripts", label: "Scripts", icon: Phone },
  { path: "/objections", label: "Objections", icon: Shield },
  { path: "/demo", label: "Demo Guide", icon: BookOpen },
  { path: "/process", label: "Sales Process", icon: Target },
  { path: "/roi", label: "ROI Calculator", icon: TrendingUp },
  { path: "/verticals", label: "Verticals", icon: Users },
];

function AppLayout() {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-sidebar-foreground">TotalFlow AI</div>
              <div className="text-[10px] text-sidebar-foreground/50">Sales Hub</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded hover:bg-sidebar-accent"
            data-testid="button-close-sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                    isActive
                      ? "bg-orange-500/15 text-orange-500 font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <button
            onClick={() => setDark(!dark)}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
            data-testid="button-theme-toggle"
          >
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
          <div className="px-3 text-[10px] text-sidebar-foreground/30">
            <PerplexityAttribution />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="md:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-muted"
            data-testid="button-open-sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold">TotalFlow AI</span>
          </div>
        </div>

        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/scripts" component={Scripts} />
          <Route path="/objections" component={Objections} />
          <Route path="/demo" component={Demo} />
          <Route path="/process" component={Process} />
          <Route path="/roi" component={ROI} />
          <Route path="/verticals" component={Verticals} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <AppLayout />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
