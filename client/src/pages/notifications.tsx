import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Bell,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Target,
  ArrowRight,
  Loader2,
  PartyPopper,
  AlertCircle,
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

interface ActivityRecord {
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

interface QuizResult {
  id: number;
  repId: number;
  score: number;
  totalQuestions: number;
  passed: number;
  completedAt: string;
}

interface LeaderboardEntry {
  id: number;
  name: string;
  avatarColor: string;
  role: string;
  dealsWon: number;
  totalDeals: number;
  monthlyRevenue: number;
  totalCalls: number;
  totalDemos: number;
  certified: boolean;
  quizScore: number | null;
}

type Severity = "critical" | "warning" | "info";

interface Notification {
  id: string;
  severity: Severity;
  message: string;
  context: string;
  actionLabel: string;
  actionHref: string;
  icon: React.ElementType;
}

function daysBetween(dateStr: string, now: Date): number {
  const d = new Date(dateStr);
  const diffMs = now.getTime() - d.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getSeverityStyles(severity: Severity) {
  switch (severity) {
    case "critical":
      return {
        border: "border-red-500/30",
        bg: "bg-red-500/5",
        iconColor: "text-red-500",
        badge: "bg-red-500/10 text-red-500 border-red-500/30",
      };
    case "warning":
      return {
        border: "border-orange-500/30",
        bg: "bg-orange-500/5",
        iconColor: "text-orange-500",
        badge: "bg-orange-500/10 text-orange-500 border-orange-500/30",
      };
    case "info":
      return {
        border: "border-blue-500/30",
        bg: "bg-blue-500/5",
        iconColor: "text-blue-500",
        badge: "bg-blue-500/10 text-blue-500 border-blue-500/30",
      };
  }
}

export default function Notifications() {
  const { user, isAdmin } = useAuth();

  // Fetch deals
  const dealsEndpoint = isAdmin ? "/api/deals" : `/api/deals/rep/${user?.id}`;
  const { data: deals = [], isLoading: dealsLoading } = useQuery<Deal[]>({
    queryKey: [dealsEndpoint],
    enabled: !!user,
  });

  // Fetch activities
  const activitiesEndpoint = isAdmin ? "/api/activities" : `/api/activities/${user?.id}`;
  const { data: activities = [], isLoading: activitiesLoading } = useQuery<ActivityRecord[]>({
    queryKey: [activitiesEndpoint],
    enabled: !!user,
  });

  // Fetch quiz results for current user
  const { data: quizResult, isLoading: quizLoading } = useQuery<QuizResult | null>({
    queryKey: [`/api/quiz-results/${user?.id}/latest`],
    enabled: !!user,
  });

  // For admin: leaderboard to check all reps
  const { data: leaderboard = [], isLoading: leaderboardLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
    enabled: isAdmin,
  });

  // For admin: all reps' quiz/activity data
  const { data: allActivities = [] } = useQuery<ActivityRecord[]>({
    queryKey: ["/api/activities"],
    enabled: isAdmin,
  });

  const isLoading = dealsLoading || activitiesLoading || quizLoading || (isAdmin && leaderboardLoading);

  if (!user) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto" data-testid="notifications-page">
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Login Required</h2>
            <p className="text-sm text-muted-foreground">
              Please log in to see your notifications and action items.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto flex items-center justify-center min-h-[400px]" data-testid="notifications-loading">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  // Generate notifications
  const notifications: Notification[] = [];
  const now = new Date();
  const today = todayStr();

  // ─── Rep Notifications ───

  // My activities (only for the current user, even if admin)
  const myActivities = isAdmin
    ? allActivities.filter((a) => a.repId === user.id)
    : activities;

  // Sort activities by date desc
  const sortedActivities = [...myActivities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latestActivity = sortedActivities[0];
  const hasActivityToday = sortedActivities.some((a) => a.date === today);

  if (!hasActivityToday && latestActivity) {
    const daysSince = daysBetween(latestActivity.date, now);
    if (daysSince >= 2) {
      notifications.push({
        id: "no-activity-2days",
        severity: "critical",
        message: `No activity logged in ${daysSince} days`,
        context: `Last activity was on ${new Date(latestActivity.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
        actionLabel: "Log Activity",
        actionHref: "/activity-log",
        icon: AlertTriangle,
      });
    } else {
      notifications.push({
        id: "no-activity-today",
        severity: "warning",
        message: "No activity logged today",
        context: "Log your calls, emails, and demos before end of day",
        actionLabel: "Log Activity",
        actionHref: "/activity-log",
        icon: Clock,
      });
    }
  } else if (!latestActivity) {
    notifications.push({
      id: "no-activity-ever",
      severity: "critical",
      message: "No activity logged yet",
      context: "Start tracking your daily sales activity",
      actionLabel: "Log Activity",
      actionHref: "/activity-log",
      icon: AlertTriangle,
    });
  }

  // Stale deals — deals in prospect/demo_booked/proposal for 3+ days
  const myDeals = isAdmin ? deals.filter((d) => d.repId === user.id) : deals;
  const staleStatuses = ["prospect", "demo_booked", "proposal"];
  const staleDeals = myDeals.filter((d) => {
    if (!staleStatuses.includes(d.status)) return false;
    const daysOld = daysBetween(d.createdAt, now);
    return daysOld >= 3;
  });

  staleDeals.forEach((deal) => {
    const daysOld = daysBetween(deal.createdAt, now);
    const statusLabel = deal.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    notifications.push({
      id: `stale-deal-${deal.id}`,
      severity: daysOld >= 7 ? "critical" : "warning",
      message: `Deal stale: ${deal.businessName} has been in "${statusLabel}" for ${daysOld} days`,
      context: `${daysOld} days stale — follow up to move this forward`,
      actionLabel: "Follow Up",
      actionHref: "/activity-log",
      icon: Target,
    });
  });

  // Not certified
  const isCertified = quizResult?.passed === 1;
  if (!isCertified) {
    notifications.push({
      id: "not-certified",
      severity: "info",
      message: "Not certified yet",
      context: quizResult
        ? `Last attempt: ${quizResult.score}/${quizResult.totalQuestions} — try again to pass`
        : "Complete the certification quiz to get certified",
      actionLabel: "Take Quiz",
      actionHref: "/training",
      icon: ShieldAlert,
    });
  }

  // ─── Admin Notifications ───
  if (isAdmin) {
    // Check each rep for inactivity
    leaderboard.forEach((rep) => {
      if (rep.id === user.id) return; // Skip self
      const repActs = allActivities
        .filter((a) => a.repId === rep.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      const repLatest = repActs[0];
      if (!repLatest) {
        notifications.push({
          id: `admin-no-activity-${rep.id}`,
          severity: "critical",
          message: `${rep.name} has never logged activity`,
          context: "No activity records found for this rep",
          actionLabel: "View Team",
          actionHref: "/admin",
          icon: AlertTriangle,
        });
      } else {
        const daysSince = daysBetween(repLatest.date, now);
        if (daysSince >= 3) {
          notifications.push({
            id: `admin-inactive-${rep.id}`,
            severity: "critical",
            message: `${rep.name} hasn't logged activity in ${daysSince} days`,
            context: `Last activity: ${new Date(repLatest.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
            actionLabel: "View Team",
            actionHref: "/admin",
            icon: AlertTriangle,
          });
        }
      }

      // Not certified
      if (!rep.certified) {
        notifications.push({
          id: `admin-uncertified-${rep.id}`,
          severity: "info",
          message: `${rep.name} hasn't passed certification`,
          context: rep.quizScore !== null ? `Best score: ${rep.quizScore}%` : "No quiz attempts yet",
          actionLabel: "View Training",
          actionHref: "/training",
          icon: ShieldAlert,
        });
      }
    });

    // Team-wide stale deals count
    const allStaleDeals = deals.filter((d) => {
      if (!staleStatuses.includes(d.status)) return false;
      return daysBetween(d.createdAt, now) >= 3;
    });

    if (allStaleDeals.length > 0) {
      notifications.push({
        id: "admin-stale-team",
        severity: "warning",
        message: `${allStaleDeals.length} deal${allStaleDeals.length !== 1 ? "s are" : " is"} stale across the team`,
        context: "Deals sitting in prospect/demo booked/proposal for 3+ days",
        actionLabel: "View Deals",
        actionHref: "/activity-log",
        icon: Target,
      });
    }
  }

  // Sort: critical first, then warning, then info
  const severityOrder: Record<Severity, number> = { critical: 0, warning: 1, info: 2 };
  notifications.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  const criticalCount = notifications.filter((n) => n.severity === "critical").length;
  const warningCount = notifications.filter((n) => n.severity === "warning").length;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6" data-testid="notifications-page">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Bell className="w-6 h-6 text-orange-500" />
        <h1 className="text-xl font-bold tracking-tight" data-testid="notifications-title">
          Notifications
        </h1>
        {notifications.length > 0 && (
          <Badge
            className="bg-orange-500 text-white text-[10px] px-1.5 py-0 h-5 ml-1"
            data-testid="notification-count"
          >
            {notifications.length}
          </Badge>
        )}
        {isAdmin && (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 ml-1 border-orange-500/30 text-orange-500">
            Admin View
          </Badge>
        )}
      </div>

      {/* Summary badges */}
      {notifications.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap" data-testid="notification-summary">
          {criticalCount > 0 && (
            <Badge variant="outline" className="text-xs bg-red-500/10 text-red-500 border-red-500/30">
              <AlertCircle className="w-3 h-3 mr-1" />
              {criticalCount} critical
            </Badge>
          )}
          {warningCount > 0 && (
            <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-500 border-orange-500/30">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {warningCount} warning{warningCount !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      )}

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <Card data-testid="notifications-empty">
          <CardContent className="p-12 text-center">
            <PartyPopper className="w-14 h-14 text-green-500/60 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">You're All Caught Up!</h2>
            <p className="text-sm text-muted-foreground">
              No pending actions. Keep up the great work!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3" data-testid="notifications-list">
          {notifications.map((notif) => {
            const styles = getSeverityStyles(notif.severity);
            const IconComponent = notif.icon;

            return (
              <Card
                key={notif.id}
                className={`border ${styles.border} ${styles.bg}`}
                data-testid={`notification-${notif.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="shrink-0 mt-0.5">
                      <IconComponent className={`w-5 h-5 ${styles.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-sm font-medium" data-testid={`notification-message-${notif.id}`}>
                            {notif.message}
                          </p>
                          <p className="text-xs text-muted-foreground" data-testid={`notification-context-${notif.id}`}>
                            {notif.context}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 h-4 capitalize shrink-0 ${styles.badge}`}
                        >
                          {notif.severity}
                        </Badge>
                      </div>

                      {/* Action Link */}
                      <Link
                        href={notif.actionHref}
                        className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors"
                        data-testid={`notification-action-${notif.id}`}
                      >
                        {notif.actionLabel}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
