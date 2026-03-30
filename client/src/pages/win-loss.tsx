import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Trophy,
  DollarSign,
  Target,
  XCircle,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  Loader2,
  Users,
  ChevronDown,
  ChevronUp,
  Save,
  AlertTriangle,
} from "lucide-react";

interface Deal {
  id: number;
  repId: number;
  businessName: string;
  contactName: string;
  vertical: string;
  tier: string;
  monthlyValue: number;
  setupFee: number;
  billing: string;
  status: string;
  notes: string;
  createdAt: string;
  closedAt: string | null;
}

interface Rep {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarColor: string;
}

type DealStatus = "prospect" | "demo_booked" | "demo_done" | "proposal" | "closed_won" | "closed_lost";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getTierColor(tier: string): string {
  switch (tier.toLowerCase()) {
    case "starter":
      return "bg-blue-500/10 text-blue-500 border-blue-500/30";
    case "growth":
      return "bg-orange-500/10 text-orange-500 border-orange-500/30";
    case "scale":
      return "bg-purple-500/10 text-purple-500 border-purple-500/30";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/30";
  }
}

function getVerticalColor(vertical: string): string {
  const colors: Record<string, string> = {
    restaurant: "bg-red-500/10 text-red-500 border-red-500/30",
    retail: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
    salon: "bg-pink-500/10 text-pink-500 border-pink-500/30",
    dental: "bg-teal-500/10 text-teal-500 border-teal-500/30",
    fitness: "bg-green-500/10 text-green-500 border-green-500/30",
    hvac: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    "real-estate": "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
    automotive: "bg-slate-500/10 text-slate-500 border-slate-500/30",
  };
  return colors[vertical.toLowerCase()] || "bg-gray-500/10 text-gray-500 border-gray-500/30";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function WinLoss() {
  const { user, isAdmin } = useAuth();
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // Fetch deals — admin sees all, rep sees own
  const dealsEndpoint = isAdmin ? "/api/deals" : `/api/deals/rep/${user?.id}`;
  const { data: deals = [], isLoading: dealsLoading } = useQuery<Deal[]>({
    queryKey: [dealsEndpoint],
    enabled: !!user,
  });

  // For admin grouping by rep name
  const { data: reps = [] } = useQuery<Rep[]>({
    queryKey: ["/api/reps/active"],
    enabled: isAdmin,
  });

  const updateNotesMutation = useMutation({
    mutationFn: async ({ dealId, notes }: { dealId: number; notes: string }) => {
      const res = await apiRequest("PATCH", `/api/deals/${dealId}`, { notes });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [dealsEndpoint] });
      setEditingNotes(null);
      setNoteText("");
    },
  });

  if (!user) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto" data-testid="win-loss-page">
        <Card>
          <CardContent className="p-12 text-center">
            <BarChart3 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Login Required</h2>
            <p className="text-sm text-muted-foreground">
              Please log in to view your win/loss analysis.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (dealsLoading) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto flex items-center justify-center min-h-[400px]" data-testid="win-loss-loading">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  // Filter to closed deals only
  const closedWon = deals.filter((d) => d.status === "closed_won");
  const closedLost = deals.filter((d) => d.status === "closed_lost");
  const totalClosed = closedWon.length + closedLost.length;
  const winRate = totalClosed > 0 ? Math.round((closedWon.length / totalClosed) * 100) : 0;
  const avgDealValue =
    closedWon.length > 0
      ? closedWon.reduce((sum, d) => sum + d.monthlyValue, 0) / closedWon.length
      : 0;

  // Admin: group deals by rep
  const repMap = new Map(reps.map((r) => [r.id, r]));

  function toggleGroup(key: string) {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function startEditNotes(deal: Deal) {
    setEditingNotes(deal.id);
    setNoteText(deal.notes || "");
  }

  function saveNotes(dealId: number) {
    updateNotesMutation.mutate({ dealId, notes: noteText });
  }

  // No closed deals state
  if (totalClosed === 0) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6" data-testid="win-loss-page">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-orange-500" />
          <h1 className="text-xl font-bold tracking-tight" data-testid="win-loss-title">
            Win/Loss Analysis
          </h1>
        </div>
        <Card data-testid="win-loss-empty">
          <CardContent className="p-12 text-center">
            <Target className="w-14 h-14 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">No Closed Deals Yet</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Once deals are marked as won or lost, your win/loss analysis will appear here. Start moving deals through your pipeline!
            </p>
          </CardContent>
        </Card>
        <PatternsCard />
      </div>
    );
  }

  function renderDealCard(deal: Deal, showRepName?: boolean) {
    const rep = repMap.get(deal.repId);
    const isWon = deal.status === "closed_won";
    const isEditing = editingNotes === deal.id;

    return (
      <div
        key={deal.id}
        className="px-4 md:px-6 py-4 hover:bg-muted/30 transition-colors"
        data-testid={`deal-card-${deal.id}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              {showRepName && rep && (
                <span className="text-xs text-muted-foreground font-medium">
                  {rep.name} ·
                </span>
              )}
              <span className="font-medium text-sm truncate">{deal.businessName}</span>
              {deal.vertical && (
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0 h-4 capitalize ${getVerticalColor(deal.vertical)}`}
                >
                  {deal.vertical}
                </Badge>
              )}
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 py-0 h-4 capitalize ${getTierColor(deal.tier)}`}
              >
                {deal.tier}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium">{formatCurrency(deal.monthlyValue)}/mo</span>
              {deal.setupFee > 0 && <span>Setup: {formatCurrency(deal.setupFee)}</span>}
              {deal.billing === "annual" && (
                <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">Annual</Badge>
              )}
            </div>

            {/* Notes section */}
            {isEditing ? (
              <div className="mt-2 space-y-2" data-testid={`notes-edit-${deal.id}`}>
                <textarea
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm min-h-[60px] focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder={isWon ? "What worked? What made this deal close?" : "Why was this deal lost? What was the real objection?"}
                />
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => saveNotes(deal.id)}
                    disabled={updateNotesMutation.isPending}
                  >
                    {updateNotesMutation.isPending ? (
                      <Loader2 className="w-3 h-3 animate-spin mr-1" />
                    ) : (
                      <Save className="w-3 h-3 mr-1" />
                    )}
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                    onClick={() => setEditingNotes(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : deal.notes ? (
              <div
                className="mt-1.5 text-xs bg-muted/50 rounded-md px-3 py-2 cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => startEditNotes(deal)}
                data-testid={`notes-display-${deal.id}`}
              >
                <MessageSquare className="w-3 h-3 inline mr-1.5 text-muted-foreground" />
                {deal.notes}
              </div>
            ) : (
              <button
                className="mt-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                onClick={() => startEditNotes(deal)}
                data-testid={`notes-prompt-${deal.id}`}
              >
                <MessageSquare className="w-3 h-3" />
                {isWon ? "Add notes about what worked" : "Add notes about why this deal was lost"}
              </button>
            )}
          </div>

          {/* Status indicator */}
          <div className="shrink-0">
            {isWon ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Admin grouped view
  function renderAdminView() {
    const repIds = Array.from(new Set(deals.filter((d) => d.status === "closed_won" || d.status === "closed_lost").map((d) => d.repId)));

    return (
      <div className="space-y-4" data-testid="admin-grouped-deals">
        {repIds.map((repId) => {
          const rep = repMap.get(repId);
          const repName = rep?.name || `Rep #${repId}`;
          const repDeals = deals.filter(
            (d) => d.repId === repId && (d.status === "closed_won" || d.status === "closed_lost")
          );
          const repWon = repDeals.filter((d) => d.status === "closed_won");
          const repLost = repDeals.filter((d) => d.status === "closed_lost");
          const repWinRate = repDeals.length > 0 ? Math.round((repWon.length / repDeals.length) * 100) : 0;
          const isExpanded = expandedGroups[`rep-${repId}`] !== false; // default open

          return (
            <Card key={repId} data-testid={`rep-group-${repId}`}>
              <button
                className="w-full px-4 md:px-6 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors"
                onClick={() => toggleGroup(`rep-${repId}`)}
              >
                <div className="flex items-center gap-3">
                  {rep && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                      style={{ backgroundColor: rep.avatarColor }}
                    >
                      {getInitials(repName)}
                    </div>
                  )}
                  <div className="text-left">
                    <span className="font-medium text-sm">{repName}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-green-500">{repWon.length}W</span>
                      <span className="text-red-500">{repLost.length}L</span>
                      <span>{repWinRate}% win rate</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              {isExpanded && (
                <div className="border-t divide-y">
                  {repDeals.map((deal) => renderDealCard(deal, false))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6" data-testid="win-loss-page">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-orange-500" />
        <h1 className="text-xl font-bold tracking-tight" data-testid="win-loss-title">
          Win/Loss Analysis
        </h1>
        {isAdmin && (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 ml-1 border-orange-500/30 text-orange-500">
            Admin View
          </Badge>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="win-loss-overview">
        {[
          {
            label: "Win Rate",
            value: `${winRate}%`,
            sub: `${totalClosed} total closed`,
            icon: Target,
            color: winRate >= 50 ? "text-green-500" : "text-orange-500",
          },
          {
            label: "Deals Won",
            value: closedWon.length.toString(),
            sub: formatCurrency(closedWon.reduce((s, d) => s + d.monthlyValue, 0)) + " MRR",
            icon: Trophy,
            color: "text-green-500",
          },
          {
            label: "Deals Lost",
            value: closedLost.length.toString(),
            sub: formatCurrency(closedLost.reduce((s, d) => s + d.monthlyValue, 0)) + " lost MRR",
            icon: TrendingDown,
            color: "text-red-500",
          },
          {
            label: "Avg Deal Value",
            value: formatCurrency(avgDealValue) + "/mo",
            sub: "won deals average",
            icon: DollarSign,
            color: "text-blue-500",
          },
        ].map((stat) => (
          <Card key={stat.label} data-testid={`overview-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{stat.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin view: grouped by rep */}
      {isAdmin ? (
        renderAdminView()
      ) : (
        <>
          {/* Won Deals */}
          <Card data-testid="won-deals-section">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <CardTitle className="text-base font-semibold">
                  Won Deals
                  <span className="text-muted-foreground font-normal ml-2 text-sm">({closedWon.length})</span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {closedWon.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                  No won deals yet. Keep pushing — your first win is close!
                </div>
              ) : (
                <div className="divide-y">{closedWon.map((deal) => renderDealCard(deal))}</div>
              )}
            </CardContent>
          </Card>

          {/* Lost Deals */}
          <Card data-testid="lost-deals-section">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <CardTitle className="text-base font-semibold">
                  Lost Deals
                  <span className="text-muted-foreground font-normal ml-2 text-sm">({closedLost.length})</span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {closedLost.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                  No lost deals recorded. Great if it stays that way!
                </div>
              ) : (
                <div className="divide-y">{closedLost.map((deal) => renderDealCard(deal))}</div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Common Patterns */}
      <PatternsCard />
    </div>
  );
}

function PatternsCard() {
  const patterns = [
    {
      icon: AlertTriangle,
      color: "text-orange-500",
      tip: "Track the objection that killed each lost deal",
      detail: "Over time, you'll see which objections come up most. Build responses for the top 3.",
    },
    {
      icon: BarChart3,
      color: "text-blue-500",
      tip: "Note which vertical and tier converts best for you",
      detail: "Focus your outreach on the segments where you close at the highest rate.",
    },
    {
      icon: Target,
      color: "text-green-500",
      tip: "Deals with in-person demos close 2x vs phone demos",
      detail: "If you can get face-to-face, your close rate jumps dramatically.",
    },
    {
      icon: TrendingUp,
      color: "text-purple-500",
      tip: "Average close cycle: 3-7 days from first contact",
      detail: "If a deal drags past 7 days, urgency drops. Re-engage with a new value hook.",
    },
    {
      icon: Lightbulb,
      color: "text-red-500",
      tip: "Most common lost reason: 'let me think about it' without surfacing the real objection",
      detail: "When you hear this, ask: \"What specifically do you need to think through?\" Surface the real concern.",
    },
  ];

  return (
    <Card data-testid="patterns-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-orange-500" />
          <CardTitle className="text-base font-semibold">Common Patterns</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {patterns.map((p, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/30 transition-colors"
            data-testid={`pattern-${i}`}
          >
            <p.icon className={`w-4 h-4 mt-0.5 shrink-0 ${p.color}`} />
            <div>
              <div className="text-sm font-medium">{p.tip}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{p.detail}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
