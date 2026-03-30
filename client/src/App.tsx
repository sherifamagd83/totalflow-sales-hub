import { Switch, Route, Router, useLocation, Link } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import { AuthProvider, useAuth } from "@/lib/auth";

import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Scripts from "@/pages/scripts";
import Objections from "@/pages/objections";
import Demo from "@/pages/demo";
import Process from "@/pages/process";
import ROI from "@/pages/roi";
import Verticals from "@/pages/verticals";
import LiveDemo from "@/pages/live-demo";
import BattleCards from "@/pages/battle-cards";
import QuickPitch from "@/pages/quick-pitch";
import ClientResults from "@/pages/client-results";
import Onboarding from "@/pages/onboarding";
import Pricing from "@/pages/pricing";
import Training from "@/pages/training";
import Leaderboard from "@/pages/leaderboard";
import ActivityLog from "@/pages/activity-log";
import Admin from "@/pages/admin";
import ProspectResearch from "@/pages/prospect-research";
import TearSheets from "@/pages/tear-sheets";
import FollowUp from "@/pages/follow-up";
import Proposal from "@/pages/proposal";
import DailyBriefing from "@/pages/daily-briefing";
import Commissions from "@/pages/commissions";
import WinLoss from "@/pages/win-loss";
import Resources from "@/pages/resources";
import Notifications from "@/pages/notifications";
import TalkTracks from "@/pages/talk-tracks";
import AIAssistant from "@/pages/ai-assistant";
import ProspectingPlaybook from "@/pages/prospecting-playbook";
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
  Play,
  Swords,
  MessageSquare,
  BarChart3,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  CreditCard,
  GraduationCap,
  Trophy,
  CalendarDays,
  Settings,
  LogOut,
  User,
  Search,
  Printer,
  Send,
  FileText,
  Coffee,
  DollarSign,
  PieChart,
  FolderOpen,
  Bell,
  Mic,
  Bot,
} from "lucide-react";

interface NavSection {
  label: string;
  items: NavItem[];
}

interface NavItem {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
  adminOnly?: boolean;
}

const navSections: NavSection[] = [
  {
    label: "Core",
    items: [
      { path: "/", label: "Dashboard", icon: LayoutDashboard },
      { path: "/ai", label: "AI Sales Coach", icon: Bot },
      { path: "/briefing", label: "Daily Briefing", icon: Coffee },
      { path: "/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Prospecting",
    items: [
      { path: "/prospecting-playbook", label: "Clay + Gatekeepers", icon: Target },
      { path: "/prospect-research", label: "Research Tool", icon: Search },
      { path: "/follow-up", label: "Follow-Up Center", icon: Send },
      { path: "/proposal", label: "Proposal Builder", icon: FileText },
      { path: "/tear-sheets", label: "Tear Sheets", icon: Printer },
    ],
  },
  {
    label: "Selling",
    items: [
      { path: "/live-demo", label: "Live Demo", icon: Play },
      { path: "/quick-pitch", label: "Quick Pitch", icon: MessageSquare },
      { path: "/scripts", label: "Scripts", icon: Phone },
      { path: "/objections", label: "Objections", icon: Shield },
      { path: "/talk-tracks", label: "Talk Tracks", icon: Mic },
      { path: "/battle-cards", label: "Battle Cards", icon: Swords },
      { path: "/pricing", label: "Pricing & Plans", icon: CreditCard },
      { path: "/roi", label: "ROI Calculator", icon: TrendingUp },
    ],
  },
  {
    label: "Resources",
    items: [
      { path: "/demo", label: "Demo Guide", icon: BookOpen },
      { path: "/process", label: "Sales Process", icon: Target },
      { path: "/verticals", label: "Verticals", icon: Users },
      { path: "/client-results", label: "Client Results", icon: BarChart3 },
      { path: "/resources", label: "Resource Library", icon: FolderOpen },
    ],
  },
  {
    label: "Pipeline",
    items: [
      { path: "/activity", label: "Activity Log", icon: CalendarDays },
      { path: "/commissions", label: "My Earnings", icon: DollarSign },
      { path: "/win-loss", label: "Win/Loss Analysis", icon: PieChart },
    ],
  },
  {
    label: "Team",
    items: [
      { path: "/training", label: "Training", icon: GraduationCap },
      { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
      { path: "/onboarding", label: "Client Onboarding", icon: ClipboardList },
      { path: "/admin", label: "Admin Panel", icon: Settings, adminOnly: true },
    ],
  },
];

function AppLayout() {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const toggleSection = (label: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-60 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transform transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-3 flex items-center justify-between border-b border-sidebar-border shrink-0">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-sidebar-foreground">TotalFlow AI</div>
                <div className="text-[9px] text-sidebar-foreground/50">Sales Hub</div>
              </div>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 rounded hover:bg-sidebar-accent" data-testid="button-close-sidebar">
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-1 overflow-y-auto space-y-0.5">
          {navSections.map((section) => {
            const isCollapsed = collapsedSections.has(section.label);
            const visibleItems = section.items.filter((item) => !item.adminOnly || isAdmin);
            if (visibleItems.length === 0) return null;

            return (
              <div key={section.label}>
                <button
                  onClick={() => toggleSection(section.label)}
                  className="flex items-center justify-between w-full px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-sidebar-foreground/40 hover:text-sidebar-foreground/60 transition-colors"
                >
                  {section.label}
                  {isCollapsed ? <ChevronDown className="w-2.5 h-2.5" /> : <ChevronUp className="w-2.5 h-2.5" />}
                </button>
                {!isCollapsed && (
                  <div className="space-y-px mb-1">
                    {visibleItems.map((item) => {
                      const isActive = location === item.path;
                      return (
                        <Link key={item.path} href={item.path}>
                          <div
                            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                              isActive
                                ? "bg-orange-500/15 text-orange-500 font-medium"
                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                            }`}
                            data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                          >
                            <item.icon className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-sidebar-border">
          {user && (
            <div className="px-2 py-1.5 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ backgroundColor: user.avatarColor }}>
                {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium text-sidebar-foreground truncate">{user.name}</div>
                <div className="text-[9px] text-sidebar-foreground/50">{user.role === "admin" ? "Admin" : "Rep"}</div>
              </div>
              <button onClick={logout} className="p-1 rounded hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground" title="Log out" data-testid="button-logout">
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          )}
          <div className="px-2 py-1.5 mx-1.5 mb-1 rounded-md bg-orange-500/10 border border-orange-500/20 shrink-0">
            <div className="text-[8px] font-semibold text-orange-500 uppercase tracking-wider">Demo Line</div>
            <a href="tel:4176076412" className="text-xs font-bold text-foreground hover:text-orange-500 transition-colors">(417) 607-6412</a>
          </div>
          <div className="px-2 py-1.5 flex items-center gap-4">
            <button onClick={() => setDark(!dark)} className="flex items-center gap-1.5 text-[10px] text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors" data-testid="button-theme-toggle">
              {dark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
              {dark ? "Light" : "Dark"}
            </button>
            <div className="text-[9px] text-sidebar-foreground/30">
              <PerplexityAttribution />
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="md:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg hover:bg-muted" data-testid="button-open-sidebar">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold">TotalFlow AI</span>
          </div>
          {user && (
            <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              {user.name.split(" ")[0]}
            </div>
          )}
        </div>

        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/briefing" component={DailyBriefing} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/prospect-research" component={ProspectResearch} />
          <Route path="/follow-up" component={FollowUp} />
          <Route path="/proposal" component={Proposal} />
          <Route path="/tear-sheets" component={TearSheets} />
          <Route path="/live-demo" component={LiveDemo} />
          <Route path="/quick-pitch" component={QuickPitch} />
          <Route path="/scripts" component={Scripts} />
          <Route path="/objections" component={Objections} />
          <Route path="/talk-tracks" component={TalkTracks} />
          <Route path="/battle-cards" component={BattleCards} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/roi" component={ROI} />
          <Route path="/demo" component={Demo} />
          <Route path="/process" component={Process} />
          <Route path="/verticals" component={Verticals} />
          <Route path="/client-results" component={ClientResults} />
          <Route path="/resources" component={Resources} />
          <Route path="/ai" component={AIAssistant} />
          <Route path="/prospecting-playbook" component={ProspectingPlaybook} />
          <Route path="/activity" component={ActivityLog} />
          <Route path="/commissions" component={Commissions} />
          <Route path="/win-loss" component={WinLoss} />
          <Route path="/training" component={Training} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/onboarding" component={Onboarding} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function AuthGate() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center animate-pulse">
          <Zap className="w-4 h-4 text-white" />
        </div>
      </div>
    );
  }
  if (!user) return <Login />;
  return <AppLayout />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router hook={useHashLocation}>
          <AuthGate />
        </Router>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
