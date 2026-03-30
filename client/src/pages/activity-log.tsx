import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  Phone,
  Mail,
  DoorOpen,
  Presentation,
  CheckCircle2,
  FileText,
  Plus,
  Save,
  X,
  TrendingUp,
  Building2,
  User,
  DollarSign,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Activity {
  id: number;
  repId: number;
  date: string;
  callsMade: number;
  emailsSent: number;
  doorsKnocked: number;
  demosBooked: number;
  demosCompleted: number;
  proposals: number;
  notes: string;
}

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
}

type DealStatus =
  | "prospect"
  | "demo_booked"
  | "demo_done"
  | "proposal"
  | "closed_won"
  | "closed_lost";

const STATUS_OPTIONS: { value: DealStatus; label: string }[] = [
  { value: "prospect", label: "Prospect" },
  { value: "demo_booked", label: "Demo Booked" },
  { value: "demo_done", label: "Demo Done" },
  { value: "proposal", label: "Proposal" },
  { value: "closed_won", label: "Closed Won" },
  { value: "closed_lost", label: "Closed Lost" },
];

const STATUS_COLORS: Record<DealStatus, string> = {
  prospect: "bg-gray-500/10 text-gray-500 border-gray-500/30",
  demo_booked: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  demo_done: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  proposal: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  closed_won: "bg-green-500/10 text-green-500 border-green-500/30",
  closed_lost: "bg-red-500/10 text-red-500 border-red-500/30",
};

const TIER_COLORS: Record<string, string> = {
  starter: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  growth: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  premium: "bg-purple-500/10 text-purple-500 border-purple-500/30",
};

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${month}/${day}/${year}`;
}

function getStatusLabel(status: string): string {
  return (
    STATUS_OPTIONS.find((s) => s.value === status)?.label ??
    status.replace(/_/g, " ")
  );
}

export default function ActivityLog() {
  const { user } = useAuth();
  const today = getToday();

  // Activity form state
  const [callsMade, setCallsMade] = useState(0);
  const [emailsSent, setEmailsSent] = useState(0);
  const [doorsKnocked, setDoorsKnocked] = useState(0);
  const [demosBooked, setDemosBooked] = useState(0);
  const [demosCompleted, setDemosCompleted] = useState(0);
  const [proposals, setProposals] = useState(0);
  const [notes, setNotes] = useState("");
  const [formLoaded, setFormLoaded] = useState(false);

  // Deal form state
  const [showDealForm, setShowDealForm] = useState(false);
  const [dealForm, setDealForm] = useState({
    businessName: "",
    contactName: "",
    vertical: "",
    tier: "starter",
    monthlyValue: 497,
    setupFee: 0,
    billing: "monthly",
    status: "prospect" as DealStatus,
    notes: "",
  });

  // History expansion
  const [historyExpanded, setHistoryExpanded] = useState(false);

  // ---- Queries ----

  const {
    data: activities = [],
    isLoading: activitiesLoading,
  } = useQuery<Activity[]>({
    queryKey: [`/api/activities/${user?.id}`],
    enabled: !!user,
  });

  const {
    data: deals = [],
    isLoading: dealsLoading,
  } = useQuery<Deal[]>({
    queryKey: [`/api/deals/rep/${user?.id}`],
    enabled: !!user,
  });

  // Pre-populate today's activity into the form
  const todayActivity = activities.find((a) => a.date === today);
  if (todayActivity && !formLoaded) {
    setCallsMade(todayActivity.callsMade);
    setEmailsSent(todayActivity.emailsSent);
    setDoorsKnocked(todayActivity.doorsKnocked);
    setDemosBooked(todayActivity.demosBooked);
    setDemosCompleted(todayActivity.demosCompleted);
    setProposals(todayActivity.proposals);
    setNotes(todayActivity.notes || "");
    setFormLoaded(true);
  }

  // Past activity entries (excluding today), sorted newest first
  const pastActivities = activities
    .filter((a) => a.date !== today)
    .sort((a, b) => b.date.localeCompare(a.date));

  const visibleHistory = historyExpanded
    ? pastActivities
    : pastActivities.slice(0, 7);

  // ---- Mutations ----

  const saveActivityMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/activities", {
        repId: user!.id,
        date: today,
        callsMade,
        emailsSent,
        doorsKnocked,
        demosBooked,
        demosCompleted,
        proposals,
        notes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/api/activities/${user?.id}`],
      });
      setFormLoaded(true);
    },
  });

  const createDealMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/deals", {
        repId: user!.id,
        ...dealForm,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/api/deals/rep/${user?.id}`],
      });
      setShowDealForm(false);
      setDealForm({
        businessName: "",
        contactName: "",
        vertical: "",
        tier: "starter",
        monthlyValue: 497,
        setupFee: 0,
        billing: "monthly",
        status: "prospect",
        notes: "",
      });
    },
  });

  const updateDealStatusMutation = useMutation({
    mutationFn: async ({
      dealId,
      status,
    }: {
      dealId: number;
      status: string;
    }) => {
      await apiRequest("PATCH", `/api/deals/${dealId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/api/deals/rep/${user?.id}`],
      });
    },
  });

  // ---- Auth guard ----

  if (!user) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto" data-testid="auth-guard">
        <Card>
          <CardContent className="p-8 text-center">
            <CalendarDays className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Log in to track your activities</h2>
            <p className="text-sm text-muted-foreground">
              Sign in with your rep account to log daily outreach and manage your deal pipeline.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- Stats helpers ----

  const activityStatFields = [
    { key: "callsMade" as const, label: "Calls", icon: Phone },
    { key: "emailsSent" as const, label: "Emails", icon: Mail },
    { key: "doorsKnocked" as const, label: "Doors", icon: DoorOpen },
    { key: "demosBooked" as const, label: "Booked", icon: Presentation },
    { key: "demosCompleted" as const, label: "Demos", icon: CheckCircle2 },
    { key: "proposals" as const, label: "Proposals", icon: FileText },
  ];

  // ---- Render ----

  return (
    <div
      className="p-4 md:p-6 max-w-6xl mx-auto space-y-6"
      data-testid="activity-log-page"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
          <CalendarDays className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1
            className="text-xl font-bold tracking-tight"
            data-testid="page-title"
          >
            Activity Log
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your daily outreach &amp; deal pipeline
          </p>
        </div>
      </div>

      {/* Today's Activity Card */}
      <Card
        className="border-orange-500/20"
        data-testid="today-activity-card"
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            Today&apos;s Activity
            <Badge
              variant="outline"
              className="text-orange-500 border-orange-500/30 text-xs ml-auto font-normal"
            >
              {formatDate(today)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activitiesLoading ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  {
                    label: "Calls Made",
                    icon: Phone,
                    value: callsMade,
                    setter: setCallsMade,
                    testId: "input-calls",
                  },
                  {
                    label: "Emails Sent",
                    icon: Mail,
                    value: emailsSent,
                    setter: setEmailsSent,
                    testId: "input-emails",
                  },
                  {
                    label: "Doors Knocked",
                    icon: DoorOpen,
                    value: doorsKnocked,
                    setter: setDoorsKnocked,
                    testId: "input-doors",
                  },
                  {
                    label: "Demos Booked",
                    icon: Presentation,
                    value: demosBooked,
                    setter: setDemosBooked,
                    testId: "input-demos-booked",
                  },
                  {
                    label: "Demos Completed",
                    icon: CheckCircle2,
                    value: demosCompleted,
                    setter: setDemosCompleted,
                    testId: "input-demos-completed",
                  },
                  {
                    label: "Proposals Sent",
                    icon: FileText,
                    value: proposals,
                    setter: setProposals,
                    testId: "input-proposals",
                  },
                ].map((field) => (
                  <div key={field.testId} className="space-y-1.5">
                    <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <field.icon className="w-3.5 h-3.5" />
                      {field.label}
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={field.value}
                      onChange={(e) =>
                        field.setter(parseInt(e.target.value) || 0)
                      }
                      className="h-9 text-center font-medium"
                      data-testid={field.testId}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Notes</label>
                <Textarea
                  placeholder="Today's wins, objections heard, follow-ups needed..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="resize-none"
                  data-testid="input-notes"
                />
              </div>

              <Button
                onClick={() => saveActivityMutation.mutate()}
                disabled={saveActivityMutation.isPending}
                className="bg-orange-500 hover:bg-orange-600 text-white"
                data-testid="btn-save-activity"
              >
                {saveActivityMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {todayActivity ? "Update Today" : "Save Today"}
              </Button>

              {saveActivityMutation.isSuccess && (
                <p className="text-xs text-green-500" data-testid="save-success">
                  Activity saved successfully!
                </p>
              )}
              {saveActivityMutation.isError && (
                <p className="text-xs text-red-500" data-testid="save-error">
                  Failed to save. Please try again.
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Activity History */}
      <Card data-testid="activity-history-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-orange-500" />
            Activity History
            {pastActivities.length > 0 && (
              <span className="text-xs font-normal text-muted-foreground">
                ({pastActivities.length} days)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activitiesLoading ? (
            <div className="flex items-center justify-center py-6 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading...
            </div>
          ) : pastActivities.length === 0 ? (
            <p
              className="text-sm text-muted-foreground text-center py-6"
              data-testid="no-history"
            >
              No past activity logged yet. Start tracking today!
            </p>
          ) : (
            <div className="space-y-2">
              {visibleHistory.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  data-testid={`history-row-${activity.date}`}
                >
                  <div className="text-xs font-medium text-orange-500 w-20 shrink-0">
                    {formatDate(activity.date)}
                  </div>
                  <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                    {activityStatFields.map((field) => {
                      const val = activity[field.key];
                      if (val === 0) return null;
                      return (
                        <span
                          key={field.key}
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                        >
                          <field.icon className="w-3 h-3" />
                          {val} {field.label}
                        </span>
                      );
                    })}
                  </div>
                  {activity.notes && (
                    <span
                      className="text-xs text-muted-foreground truncate max-w-[200px] hidden md:inline"
                      title={activity.notes}
                    >
                      {activity.notes}
                    </span>
                  )}
                </div>
              ))}

              {pastActivities.length > 7 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-muted-foreground"
                  onClick={() => setHistoryExpanded(!historyExpanded)}
                  data-testid="btn-toggle-history"
                >
                  {historyExpanded ? (
                    <>
                      <ChevronUp className="w-3 h-3 mr-1" /> Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" /> Show All (
                      {pastActivities.length})
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Deals */}
      <Card data-testid="deals-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-500" />
              My Deals
              {deals.length > 0 && (
                <span className="text-xs font-normal text-muted-foreground">
                  ({deals.length})
                </span>
              )}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => setShowDealForm(!showDealForm)}
              data-testid="btn-add-deal"
            >
              {showDealForm ? (
                <>
                  <X className="w-3 h-3 mr-1" /> Cancel
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 mr-1" /> Add Deal
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Deal Form */}
          {showDealForm && (
            <div
              className="p-4 border rounded-lg bg-muted/30 space-y-3"
              data-testid="deal-form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">
                    Business Name
                  </label>
                  <Input
                    value={dealForm.businessName}
                    onChange={(e) =>
                      setDealForm({ ...dealForm, businessName: e.target.value })
                    }
                    placeholder="Acme HVAC"
                    className="h-9"
                    data-testid="deal-business-name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">
                    Contact Name
                  </label>
                  <Input
                    value={dealForm.contactName}
                    onChange={(e) =>
                      setDealForm({ ...dealForm, contactName: e.target.value })
                    }
                    placeholder="John Smith"
                    className="h-9"
                    data-testid="deal-contact-name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">
                    Vertical
                  </label>
                  <Input
                    value={dealForm.vertical}
                    onChange={(e) =>
                      setDealForm({ ...dealForm, vertical: e.target.value })
                    }
                    placeholder="HVAC, Plumbing, Roofing..."
                    className="h-9"
                    data-testid="deal-vertical"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Tier</label>
                  <Select
                    value={dealForm.tier}
                    onValueChange={(val) =>
                      setDealForm({
                        ...dealForm,
                        tier: val,
                        monthlyValue:
                          val === "starter"
                            ? 497
                            : val === "growth"
                              ? 997
                              : 1997,
                      })
                    }
                  >
                    <SelectTrigger
                      className="h-9"
                      data-testid="deal-tier-select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">
                        Starter ($497/mo)
                      </SelectItem>
                      <SelectItem value="growth">Growth ($997/mo)</SelectItem>
                      <SelectItem value="premium">
                        Premium ($1,997/mo)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">
                    Monthly Value ($)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={dealForm.monthlyValue}
                    onChange={(e) =>
                      setDealForm({
                        ...dealForm,
                        monthlyValue: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-9"
                    data-testid="deal-monthly-value"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">
                    Setup Fee ($)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={dealForm.setupFee}
                    onChange={(e) =>
                      setDealForm({
                        ...dealForm,
                        setupFee: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-9"
                    data-testid="deal-setup-fee"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">
                    Billing
                  </label>
                  <Select
                    value={dealForm.billing}
                    onValueChange={(val) =>
                      setDealForm({ ...dealForm, billing: val })
                    }
                  >
                    <SelectTrigger
                      className="h-9"
                      data-testid="deal-billing-select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">
                    Status
                  </label>
                  <Select
                    value={dealForm.status}
                    onValueChange={(val) =>
                      setDealForm({
                        ...dealForm,
                        status: val as DealStatus,
                      })
                    }
                  >
                    <SelectTrigger
                      className="h-9"
                      data-testid="deal-status-select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Notes</label>
                <Textarea
                  value={dealForm.notes}
                  onChange={(e) =>
                    setDealForm({ ...dealForm, notes: e.target.value })
                  }
                  placeholder="Next steps, decision maker info, timeline..."
                  rows={2}
                  className="resize-none"
                  data-testid="deal-notes"
                />
              </div>
              <Button
                onClick={() => createDealMutation.mutate()}
                disabled={
                  createDealMutation.isPending || !dealForm.businessName.trim()
                }
                className="bg-orange-500 hover:bg-orange-600 text-white"
                data-testid="btn-save-deal"
              >
                {createDealMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Create Deal
              </Button>
              {createDealMutation.isError && (
                <p className="text-xs text-red-500">
                  Failed to create deal. Please try again.
                </p>
              )}
            </div>
          )}

          {/* Deals List */}
          {dealsLoading ? (
            <div className="flex items-center justify-center py-6 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading deals...
            </div>
          ) : deals.length === 0 && !showDealForm ? (
            <p
              className="text-sm text-muted-foreground text-center py-6"
              data-testid="no-deals"
            >
              No deals yet. Click &ldquo;Add Deal&rdquo; to start building your
              pipeline.
            </p>
          ) : (
            <div className="space-y-2">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  data-testid={`deal-row-${deal.id}`}
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">
                        {deal.businessName}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 ${
                          TIER_COLORS[deal.tier?.toLowerCase()] ??
                          "bg-gray-500/10 text-gray-500 border-gray-500/30"
                        }`}
                      >
                        {deal.tier}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 ${
                          STATUS_COLORS[deal.status as DealStatus] ??
                          "bg-gray-500/10 text-gray-500 border-gray-500/30"
                        }`}
                        data-testid={`deal-status-badge-${deal.id}`}
                      >
                        {getStatusLabel(deal.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {deal.contactName}
                      </span>
                      {deal.vertical && (
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {deal.vertical}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />$
                        {deal.monthlyValue?.toLocaleString()}/mo
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Select
                      value={deal.status}
                      onValueChange={(val) =>
                        updateDealStatusMutation.mutate({
                          dealId: deal.id,
                          status: val,
                        })
                      }
                    >
                      <SelectTrigger
                        className="h-7 text-xs w-[140px]"
                        data-testid={`deal-status-change-${deal.id}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pipeline Summary */}
          {deals.length > 0 && (
            <div
              className="pt-3 border-t grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2"
              data-testid="pipeline-summary"
            >
              {STATUS_OPTIONS.map((opt) => {
                const count = deals.filter(
                  (d) => d.status === opt.value
                ).length;
                return (
                  <div
                    key={opt.value}
                    className="text-center p-2 rounded-lg bg-muted/50"
                  >
                    <div className="text-lg font-bold tabular-nums">
                      {count}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {opt.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
