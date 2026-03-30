import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Sun,
  Moon,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  Phone,
  Mail,
  DoorOpen,
  Presentation,
  CheckCircle2,
  FileText,
  Lightbulb,
  ArrowRight,
  Play,
  MessageSquare,
  Shield,
  ClipboardList,
  BarChart3,
  Loader2,
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
}

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

type DealStatus =
  | "prospect"
  | "demo_booked"
  | "demo_done"
  | "proposal"
  | "closed_won"
  | "closed_lost";

const STATUS_CONFIG: Record<DealStatus, { label: string; color: string; bg: string }> = {
  prospect: { label: "Prospect", color: "text-blue-500", bg: "bg-blue-500/10" },
  demo_booked: { label: "Demo Booked", color: "text-purple-500", bg: "bg-purple-500/10" },
  demo_done: { label: "Demo Done", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  proposal: { label: "Proposal", color: "text-yellow-600 dark:text-yellow-500", bg: "bg-yellow-500/10" },
  closed_won: { label: "Closed Won", color: "text-green-500", bg: "bg-green-500/10" },
  closed_lost: { label: "Closed Lost", color: "text-red-500", bg: "bg-red-500/10" },
};

const SELLING_TIPS = [
  "Always call the demo line on speaker during in-person demos — the AI sells itself. Let them hear it live.",
  "Lead with Growth tier ($997). Step down to Starter if needed, but never start low.",
  "Ask 'How many calls did you miss last week?' before pitching. Let the pain sink in.",
  "When they say 'let me think about it,' ask: 'What specifically do you want to think about?' — then handle that objection.",
  "Use the ROI calculator on every demo. Showing their specific numbers makes it real.",
  "After the demo, say nothing. Silence is powerful. Let them speak first.",
  "Door-knock between 10 AM and 2 PM — owners are usually in. Bring tear sheets.",
  "Text a 30-second screen recording of their missed-call data. Visual proof beats words.",
  "Always get a follow-up date locked before ending the call. 'Same time Thursday work for a quick check-in?'",
  "Mention the 30-day money-back guarantee early — it removes risk and keeps the conversation moving.",
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

function getFirstName(fullName: string): string {
  return fullName.split(" ")[0];
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function daysSince(dateStr: string): number {
  const created = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - created.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function DailyBriefing() {
  const { user } = useAuth();
  const [copiedTip, setCopiedTip] = useState(false);

  const {
    data: deals = [],
    isLoading: dealsLoading,
  } = useQuery<Deal[]>({
    queryKey: [`/api/deals/rep/${user?.id}`],
    enabled: !!user,
  });

  const {
    data: activities = [],
    isLoading: activitiesLoading,
  } = useQuery<Activity[]>({
    queryKey: [`/api/activities/${user?.id}`],
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto" data-testid="daily-briefing-page">
        <Card>
          <CardContent className="p-12 text-center">
            <Sun className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Login Required</h2>
            <p className="text-sm text-muted-foreground">
              Please log in to see your daily briefing.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLoading = dealsLoading || activitiesLoading;

  // Pipeline counts
  const pipelineCounts: Record<DealStatus, number> = {
    prospect: 0,
    demo_booked: 0,
    demo_done: 0,
    proposal: 0,
    closed_won: 0,
    closed_lost: 0,
  };
  deals.forEach((d) => {
    const s = d.status as DealStatus;
    if (pipelineCounts[s] !== undefined) {
      pipelineCounts[s]++;
    }
  });

  // Follow-ups due: deals in demo_booked or proposal for 2+ days
  const followUps = deals.filter((d) => {
    return (
      (d.status === "demo_booked" || d.status === "proposal") &&
      daysSince(d.createdAt) >= 2
    );
  });

  // Deals at risk: prospect or demo_booked for 5+ days
  const dealsAtRisk = deals.filter((d) => {
    return (
      (d.status === "prospect" || d.status === "demo_booked") &&
      daysSince(d.createdAt) >= 5
    );
  });

  // This week's activity summary
  const monday = getMondayOfWeek(new Date());
  const weekActivities = activities.filter((a) => {
    const actDate = new Date(a.date);
    return actDate >= monday;
  });

  const weekSummary = {
    callsMade: weekActivities.reduce((s, a) => s + a.callsMade, 0),
    emailsSent: weekActivities.reduce((s, a) => s + a.emailsSent, 0),
    doorsKnocked: weekActivities.reduce((s, a) => s + a.doorsKnocked, 0),
    demosBooked: weekActivities.reduce((s, a) => s + a.demosBooked, 0),
    demosCompleted: weekActivities.reduce((s, a) => s + a.demosCompleted, 0),
    proposals: weekActivities.reduce((s, a) => s + a.proposals, 0),
  };

  // Tip of the day
  const tipIndex = getDayOfYear() % 10;
  const todayTip = SELLING_TIPS[tipIndex];

  const greeting = getGreeting();
  const GreetingIcon = greeting === "morning" ? Sun : Moon;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6" data-testid="daily-briefing-page">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 p-5 md:p-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GreetingIcon className="w-5 h-5 text-orange-500" />
              <h1 className="text-xl font-bold tracking-tight" data-testid="briefing-greeting">
                Good {greeting}, {getFirstName(user.name)}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(new Date())}
            </p>
          </div>
          <Badge variant="outline" className="text-orange-500 border-orange-500/30 text-xs">
            Daily Briefing
          </Badge>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12" data-testid="briefing-loading">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          <span className="ml-2 text-sm text-muted-foreground">Loading your briefing...</span>
        </div>
      ) : (
        <>
          {/* Pipeline Snapshot */}
          <section data-testid="pipeline-snapshot">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-orange-500" />
              Pipeline Snapshot
            </h2>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(STATUS_CONFIG) as DealStatus[]).map((status) => {
                    const config = STATUS_CONFIG[status];
                    const count = pipelineCounts[status];
                    return (
                      <Badge
                        key={status}
                        variant="outline"
                        className={`${config.bg} ${config.color} border-transparent text-xs px-3 py-1.5`}
                        data-testid={`pipeline-${status}`}
                      >
                        {config.label}: {count}
                      </Badge>
                    );
                  })}
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  {deals.length} total deals &middot;{" "}
                  {pipelineCounts.closed_won} won &middot;{" "}
                  ${deals
                    .filter((d) => d.status === "closed_won")
                    .reduce((s, d) => s + d.monthlyValue, 0)
                    .toLocaleString()}/mo MRR
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Follow-Ups Due */}
          <section data-testid="follow-ups">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              Follow-Ups Due
            </h2>
            {followUps.length === 0 ? (
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No follow-ups due — you're on top of it!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {followUps.map((deal) => {
                  const days = daysSince(deal.createdAt);
                  return (
                    <Card
                      key={deal.id}
                      className="border-orange-500/20"
                      data-testid={`followup-${deal.id}`}
                    >
                      <CardContent className="p-4 flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {deal.businessName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {deal.contactName} &middot;{" "}
                            {STATUS_CONFIG[deal.status as DealStatus]?.label} &middot;{" "}
                            {days} days since created
                          </div>
                        </div>
                        <Badge className="bg-orange-500 text-white text-xs shrink-0">
                          Follow up!
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* Deals at Risk */}
          <section data-testid="deals-at-risk">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Deals at Risk
            </h2>
            {dealsAtRisk.length === 0 ? (
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No deals at risk — keep the momentum going!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {dealsAtRisk.map((deal) => {
                  const days = daysSince(deal.createdAt);
                  return (
                    <Card
                      key={deal.id}
                      className="border-orange-500/20"
                      data-testid={`risk-${deal.id}`}
                    >
                      <CardContent className="p-4 flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {deal.businessName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {deal.contactName} &middot;{" "}
                            {STATUS_CONFIG[deal.status as DealStatus]?.label} &middot;{" "}
                            {days} days — no recent activity
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-orange-500 border-orange-500/30 text-xs shrink-0"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          At Risk
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* This Week's Activity Summary */}
          <section data-testid="weekly-summary">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              This Week's Activity
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: "Calls Made", value: weekSummary.callsMade, icon: Phone, color: "text-blue-500" },
                { label: "Emails Sent", value: weekSummary.emailsSent, icon: Mail, color: "text-green-500" },
                { label: "Doors Knocked", value: weekSummary.doorsKnocked, icon: DoorOpen, color: "text-purple-500" },
                { label: "Demos Booked", value: weekSummary.demosBooked, icon: Presentation, color: "text-indigo-500" },
                { label: "Demos Done", value: weekSummary.demosCompleted, icon: CheckCircle2, color: "text-teal-500" },
                { label: "Proposals", value: weekSummary.proposals, icon: FileText, color: "text-orange-500" },
              ].map((stat) => (
                <Card key={stat.label} data-testid={`week-stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1.5`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Tip of the Day */}
          <section data-testid="tip-of-day">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-orange-500" />
              Tip of the Day
            </h2>
            <Card className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-orange-500/20">
              <CardContent className="p-5">
                <p className="text-sm font-medium leading-relaxed" data-testid="tip-text">
                  "{todayTip}"
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="text-orange-500 border-orange-500/30 text-[10px]">
                    Tip #{tipIndex + 1}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-6 px-2"
                    onClick={() => {
                      navigator.clipboard.writeText(todayTip);
                      setCopiedTip(true);
                      setTimeout(() => setCopiedTip(false), 2000);
                    }}
                    data-testid="copy-tip"
                  >
                    {copiedTip ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick Links */}
          <section data-testid="quick-links">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-orange-500" />
              Quick Links
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Live Demo", href: "/live-demo", icon: Play, color: "text-orange-500" },
                { label: "Quick Pitch", href: "/quick-pitch", icon: MessageSquare, color: "text-blue-500" },
                { label: "Objections", href: "/objections", icon: Shield, color: "text-red-500" },
                { label: "Activity Log", href: "/activity-log", icon: ClipboardList, color: "text-green-500" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <Card
                    className="cursor-pointer transition-all hover:border-orange-500/40 hover:bg-accent/50 group h-full"
                    data-testid={`quick-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                      <link.icon className={`w-5 h-5 ${link.color}`} />
                      <span className="text-sm font-medium group-hover:text-orange-500 transition-colors">
                        {link.label}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
