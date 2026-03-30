import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Settings,
  Users,
  DollarSign,
  Briefcase,
  Award,
  Plus,
  ChevronDown,
  ChevronUp,
  UserMinus,
  UserCheck,
  ShieldAlert,
  Loader2,
  Check,
} from "lucide-react";

// ---------- Types ----------

interface Rep {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  verticals: string;
  avatarColor: string;
  createdAt: string;
}

interface Deal {
  id: number;
  repId: number;
  businessName: string;
  tier: string;
  value: number;
  status: string;
  createdAt?: string;
}

interface LeaderboardEntry {
  repId: number;
  repName: string;
  totalDeals: number;
  closedDeals: number;
  totalRevenue: number;
  certifiedAt?: string | null;
}

interface QuizResult {
  score: number;
  passed: boolean;
  completedAt: string;
}

// ---------- Constants ----------

const AVATAR_COLORS = [
  "#f97316",
  "#3b82f6",
  "#10b981",
  "#8b5cf6",
  "#ef4444",
  "#eab308",
];

// ---------- Helpers ----------

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ---------- Component ----------

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const [addRepOpen, setAddRepOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPin, setFormPin] = useState("");
  const [formRole, setFormRole] = useState<string>("rep");
  const [formColor, setFormColor] = useState<string>(AVATAR_COLORS[0]);

  // ---------- Queries ----------

  const { data: reps = [], isLoading: repsLoading } = useQuery<Rep[]>({
    queryKey: ["/api/reps"],
  });

  const { data: deals = [], isLoading: dealsLoading } = useQuery<Deal[]>({
    queryKey: ["/api/deals"],
  });

  const { data: leaderboard = [] } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
  });

  // ---------- Mutations ----------

  const createRepMutation = useMutation({
    mutationFn: async (body: {
      name: string;
      email: string;
      pin: string;
      role: string;
      verticals: string;
      avatarColor: string;
    }) => {
      const res = await apiRequest("POST", "/api/reps", body);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reps"] });
      queryClient.invalidateQueries({ queryKey: ["/api/leaderboard"] });
      resetForm();
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({
      id,
      newStatus,
    }: {
      id: number;
      newStatus: string;
    }) => {
      const res = await apiRequest("PATCH", `/api/reps/${id}`, {
        status: newStatus,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reps"] });
      queryClient.invalidateQueries({ queryKey: ["/api/leaderboard"] });
    },
  });

  // ---------- Handlers ----------

  function resetForm() {
    setFormName("");
    setFormEmail("");
    setFormPin("");
    setFormRole("rep");
    setFormColor(AVATAR_COLORS[0]);
  }

  function handleCreateRep(e: React.FormEvent) {
    e.preventDefault();
    if (!formName || !formEmail || !formPin) return;
    createRepMutation.mutate({
      name: formName,
      email: formEmail,
      pin: formPin,
      role: formRole,
      verticals: "",
      avatarColor: formColor,
    });
  }

  // ---------- Access guard ----------

  if (!isAdmin) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto" data-testid="admin-access-denied">
        <Card className="border-red-500/30">
          <CardContent className="p-8 text-center space-y-3">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="text-lg font-semibold">Admin access required</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You must be logged in as an admin to access this page. Contact your team lead if you
              believe this is an error.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---------- Computed stats ----------

  const activeReps = reps.filter((r) => r.status === "active");
  const closedDeals = deals.filter(
    (d) => d.status === "closed" || d.status === "closed_won"
  );
  const totalMRR = closedDeals.reduce((sum, d) => sum + (d.value || 0), 0);
  const certifiedReps = leaderboard.filter((l) => l.certifiedAt).length;

  // Build lookup maps
  const leaderboardMap = new Map(leaderboard.map((l) => [l.repId, l]));
  const repMap = new Map(reps.map((r) => [r.id, r]));

  // Per-rep deal stats
  const repDealStats = new Map<number, { count: number; revenue: number }>();
  for (const deal of deals) {
    const existing = repDealStats.get(deal.repId) || { count: 0, revenue: 0 };
    existing.count += 1;
    if (deal.status === "closed" || deal.status === "closed_won") {
      existing.revenue += deal.value || 0;
    }
    repDealStats.set(deal.repId, existing);
  }

  // ---------- Render ----------

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-8" data-testid="admin-panel">
      {/* ── Header ── */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
          <Settings className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight" data-testid="admin-title">
            Admin Panel
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage reps, track performance, and control access.
          </p>
        </div>
      </div>

      {/* ── Overview Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="overview-stats">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Active Reps</span>
            </div>
            <div className="text-2xl font-bold" data-testid="stat-active-reps">
              {repsLoading ? "—" : activeReps.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Briefcase className="w-4 h-4" />
              <span className="text-xs font-medium">Total Deals</span>
            </div>
            <div className="text-2xl font-bold" data-testid="stat-total-deals">
              {dealsLoading ? "—" : deals.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-medium">Total MRR</span>
            </div>
            <div className="text-2xl font-bold text-orange-500" data-testid="stat-total-mrr">
              {dealsLoading ? "—" : formatCurrency(totalMRR)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Award className="w-4 h-4" />
              <span className="text-xs font-medium">Certified Reps</span>
            </div>
            <div className="text-2xl font-bold" data-testid="stat-certified-reps">
              {certifiedReps}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Add New Rep ── */}
      <Collapsible open={addRepOpen} onOpenChange={setAddRepOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors rounded-t-lg">
              <CardTitle className="text-sm font-semibold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-orange-500" />
                  Add New Rep
                </span>
                {addRepOpen ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 pb-5 px-5" data-testid="add-rep-form">
              <form onSubmit={handleCreateRep} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Name</label>
                    <Input
                      data-testid="input-rep-name"
                      placeholder="Full name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Email</label>
                    <Input
                      data-testid="input-rep-email"
                      type="email"
                      placeholder="rep@totalflow.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      PIN (4-6 digits)
                    </label>
                    <Input
                      data-testid="input-rep-pin"
                      type="password"
                      placeholder="••••"
                      minLength={4}
                      maxLength={6}
                      pattern="[0-9]{4,6}"
                      value={formPin}
                      onChange={(e) => setFormPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Role</label>
                    <Select value={formRole} onValueChange={setFormRole}>
                      <SelectTrigger data-testid="select-rep-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rep">Rep</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Avatar Color Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Avatar Color</label>
                  <div className="flex items-center gap-2" data-testid="color-picker">
                    {AVATAR_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormColor(color)}
                        className="w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center"
                        style={{
                          backgroundColor: color,
                          borderColor: formColor === color ? "white" : "transparent",
                          boxShadow:
                            formColor === color
                              ? `0 0 0 2px ${color}`
                              : "none",
                        }}
                        data-testid={`color-${color.replace("#", "")}`}
                        aria-label={`Select color ${color}`}
                      >
                        {formColor === color && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={createRepMutation.isPending}
                  data-testid="btn-create-rep"
                >
                  {createRepMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Rep
                    </>
                  )}
                </Button>

                {createRepMutation.isError && (
                  <p className="text-sm text-red-500" data-testid="create-rep-error">
                    {(createRepMutation.error as Error).message}
                  </p>
                )}
              </form>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* ── Rep Management ── */}
      <div>
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-orange-500" />
          Rep Management
        </h2>

        {repsLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-2">Loading reps...</p>
            </CardContent>
          </Card>
        ) : reps.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No reps yet. Add one above.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3" data-testid="rep-list">
            {reps.map((rep) => {
              const lb = leaderboardMap.get(rep.id);
              const ds = repDealStats.get(rep.id) || { count: 0, revenue: 0 };
              const isActive = rep.status === "active";

              return (
                <RepCard
                  key={rep.id}
                  rep={rep}
                  isActive={isActive}
                  dealCount={ds.count}
                  revenue={ds.revenue}
                  certifiedAt={lb?.certifiedAt ?? null}
                  onToggleStatus={() =>
                    toggleStatusMutation.mutate({
                      id: rep.id,
                      newStatus: isActive ? "inactive" : "active",
                    })
                  }
                  isToggling={
                    toggleStatusMutation.isPending &&
                    toggleStatusMutation.variables?.id === rep.id
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      {/* ── All Deals ── */}
      <div>
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-orange-500" />
          All Deals
        </h2>

        {dealsLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
            </CardContent>
          </Card>
        ) : deals.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Briefcase className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No deals recorded yet.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <Table data-testid="deals-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Rep</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deals.map((deal) => {
                    const dealRep = repMap.get(deal.repId);
                    return (
                      <TableRow key={deal.id} data-testid={`deal-row-${deal.id}`}>
                        <TableCell className="font-medium">
                          {dealRep?.name ?? `Rep #${deal.repId}`}
                        </TableCell>
                        <TableCell>{deal.businessName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs capitalize">
                            {deal.tier}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums">
                          {formatCurrency(deal.value)}
                        </TableCell>
                        <TableCell>
                          <DealStatusBadge status={deal.status} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// ---------- Sub-components ----------

function RepCard({
  rep,
  isActive,
  dealCount,
  revenue,
  certifiedAt,
  onToggleStatus,
  isToggling,
}: {
  rep: Rep;
  isActive: boolean;
  dealCount: number;
  revenue: number;
  certifiedAt: string | null;
  onToggleStatus: () => void;
  isToggling: boolean;
}) {
  const { data: quizResult } = useQuery<QuizResult>({
    queryKey: [`/api/quiz-results/${rep.id}/latest`],
    retry: false,
  });

  return (
    <Card
      className={`transition-all ${!isActive ? "opacity-60" : ""}`}
      data-testid={`rep-card-${rep.id}`}
    >
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Avatar + Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: rep.avatarColor }}
              data-testid={`rep-avatar-${rep.id}`}
            >
              {getInitials(rep.name)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm truncate">{rep.name}</span>
                <Badge
                  variant={rep.role === "admin" ? "default" : "secondary"}
                  className="text-xs capitalize"
                >
                  {rep.role}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    isActive
                      ? "text-green-500 border-green-500/30"
                      : "text-red-500 border-red-500/30"
                  }`}
                >
                  {rep.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{rep.email}</p>
              <p className="text-xs text-muted-foreground">
                Joined {formatDate(rep.createdAt)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 md:gap-6 flex-wrap text-center">
            {/* Quiz Score */}
            <div className="min-w-[60px]">
              <p className="text-xs text-muted-foreground">Quiz</p>
              {quizResult ? (
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-sm font-bold tabular-nums">
                    {quizResult.score}%
                  </span>
                  {quizResult.passed && (
                    <Badge className="text-[10px] px-1 py-0 bg-green-500/10 text-green-500 border-green-500/30">
                      Certified
                    </Badge>
                  )}
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </div>

            {/* Deals */}
            <div className="min-w-[50px]">
              <p className="text-xs text-muted-foreground">Deals</p>
              <p className="text-sm font-bold tabular-nums">{dealCount}</p>
            </div>

            {/* Revenue */}
            <div className="min-w-[70px]">
              <p className="text-xs text-muted-foreground">Revenue</p>
              <p className="text-sm font-bold tabular-nums text-orange-500">
                {formatCurrency(revenue)}
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <Button
            variant={isActive ? "outline" : "default"}
            size="sm"
            onClick={onToggleStatus}
            disabled={isToggling}
            className={
              isActive
                ? "text-red-500 border-red-500/30 hover:bg-red-500/10 hover:text-red-500"
                : "bg-green-600 hover:bg-green-700 text-white"
            }
            data-testid={`btn-toggle-${rep.id}`}
          >
            {isToggling ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isActive ? (
              <>
                <UserMinus className="w-4 h-4 mr-1" />
                Deactivate
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4 mr-1" />
                Reactivate
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DealStatusBadge({ status }: { status: string }) {
  const config: Record<string, { className: string; label: string }> = {
    closed: {
      className: "bg-green-500/10 text-green-500 border-green-500/30",
      label: "Closed",
    },
    closed_won: {
      className: "bg-green-500/10 text-green-500 border-green-500/30",
      label: "Closed Won",
    },
    prospect: {
      className: "bg-blue-500/10 text-blue-500 border-blue-500/30",
      label: "Prospect",
    },
    demo_scheduled: {
      className: "bg-purple-500/10 text-purple-500 border-purple-500/30",
      label: "Demo Scheduled",
    },
    proposal_sent: {
      className: "bg-orange-500/10 text-orange-500 border-orange-500/30",
      label: "Proposal Sent",
    },
    lost: {
      className: "bg-red-500/10 text-red-500 border-red-500/30",
      label: "Lost",
    },
  };

  const c = config[status] || {
    className: "bg-muted text-muted-foreground",
    label: status,
  };

  return (
    <Badge variant="outline" className={`text-xs capitalize ${c.className}`}>
      {c.label}
    </Badge>
  );
}
