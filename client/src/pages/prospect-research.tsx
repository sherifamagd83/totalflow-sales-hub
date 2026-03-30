import { useState } from "react";
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
  Search,
  Target,
  AlertTriangle,
  TrendingUp,
  Phone,
  DollarSign,
  MessageSquare,
  ListChecks,
  ClipboardList,
  Copy,
  CheckCircle,
  RotateCcw,
  Star,
  Globe,
  Calendar,
  MessageCircle,
  PhoneOff,
  Share2,
  Building2,
  ChevronRight,
  Flame,
  Zap,
  ArrowRight,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface FormData {
  businessName: string;
  websiteUrl: string;
  vertical: string;
  googleRating: string;
  reviewCount: string;
  hasBooking: string;
  hasChat: string;
  answersAfterHours: string;
  socialActive: string;
  estimatedRevenue: string;
  notes: string;
}

interface PitchAnalysis {
  score: number;
  painPoints: { icon: typeof AlertTriangle; text: string; severity: "critical" | "high" | "medium" }[];
  recommendedTier: { name: string; price: string; reasoning: string };
  openingLine: string;
  revenueImpact: {
    missedCallsWeek: number;
    avgJobValue: number;
    captureRate: number;
    monthlyRecovery: number;
  };
  talkingPoints: string[];
  nextSteps: string[];
}

// ─── Constants ──────────────────────────────────────────────────────────────

const VERTICALS = [
  "Home Services",
  "Legal",
  "Dental",
  "Salon & Spa",
  "Real Estate",
  "Restaurant",
  "Auto",
  "Fitness",
  "Other",
];

const RATING_OPTIONS = [
  "No listing",
  "1-2 stars",
  "2-3 stars",
  "3-4 stars",
  "4-5 stars",
];

const YES_NO_OPTIONS = ["Yes", "No", "Don't know"];

const REVENUE_OPTIONS = [
  "Under $20K",
  "$20-50K",
  "$50-100K",
  "$100K-500K",
  "$500K+",
];

// Vertical-specific data for revenue impact calculations
const VERTICAL_DATA: Record<
  string,
  { avgJobValue: number; missedCallsBase: number; captureRate: number; painContext: string }
> = {
  "Home Services": { avgJobValue: 850, missedCallsBase: 8, captureRate: 0.35, painContext: "Every missed HVAC/plumbing call is $500-$2,000 walking to a competitor" },
  Legal: { avgJobValue: 3500, missedCallsBase: 5, captureRate: 0.25, painContext: "Legal leads are high-intent — a missed intake call can cost $5K-$50K in case value" },
  Dental: { avgJobValue: 450, missedCallsBase: 10, captureRate: 0.40, painContext: "New patient lifetime value is $3,000+ but they'll call the next dentist if nobody answers" },
  "Salon & Spa": { avgJobValue: 120, missedCallsBase: 12, captureRate: 0.45, painContext: "Clients want instant booking — 60% abandon if they can't book online or reach someone" },
  "Real Estate": { avgJobValue: 8500, missedCallsBase: 6, captureRate: 0.20, painContext: "Buyer/seller leads have a 5-minute response window before going cold" },
  Restaurant: { avgJobValue: 85, missedCallsBase: 15, captureRate: 0.50, painContext: "Party reservations and catering inquiries are high-value calls that get lost in rush hours" },
  Auto: { avgJobValue: 650, missedCallsBase: 9, captureRate: 0.35, painContext: "Shop owners are under cars all day — phones ring unanswered during peak hours" },
  Fitness: { avgJobValue: 200, missedCallsBase: 8, captureRate: 0.40, painContext: "New member interest is impulse-driven — delay kills conversion" },
  Other: { avgJobValue: 500, missedCallsBase: 7, captureRate: 0.30, painContext: "Most small businesses miss 30-60% of inbound calls during business hours" },
};

const INITIAL_FORM: FormData = {
  businessName: "",
  websiteUrl: "",
  vertical: "",
  googleRating: "",
  reviewCount: "",
  hasBooking: "",
  hasChat: "",
  answersAfterHours: "",
  socialActive: "",
  estimatedRevenue: "",
  notes: "",
};

// ─── Analysis Logic ─────────────────────────────────────────────────────────

function generateAnalysis(form: FormData): PitchAnalysis {
  const vData = VERTICAL_DATA[form.vertical] || VERTICAL_DATA["Other"];
  const reviewCount = parseInt(form.reviewCount) || 0;
  const noBooking = form.hasBooking === "No" || form.hasBooking === "Don't know";
  const noChat = form.hasChat === "No" || form.hasChat === "Don't know";
  const noAfterHours = form.answersAfterHours === "No" || form.answersAfterHours === "Don't know";
  const inactiveSocial = form.socialActive === "No" || form.socialActive === "Don't know";
  const lowRating = form.googleRating === "1-2 stars" || form.googleRating === "2-3 stars";
  const noListing = form.googleRating === "No listing";
  const highRevenue = form.estimatedRevenue === "$500K+";
  const lowReviews = reviewCount < 20;
  const veryLowReviews = reviewCount < 5;

  // ── Prospect Score (1-10) ──
  let score = 5; // baseline
  if (noAfterHours) score += 2;
  if (noBooking) score += 1;
  if (noChat) score += 0.5;
  if (lowReviews) score += 1;
  if (inactiveSocial) score += 0.5;
  if (lowRating) score += 0.5;
  if (noListing) score += 1;
  if (highRevenue) score += 0.5;
  if (form.hasBooking === "Yes" && form.hasChat === "Yes" && form.answersAfterHours === "Yes") {
    score -= 2;
  }
  score = Math.max(1, Math.min(10, Math.round(score)));

  // ── Pain Points ──
  const painPoints: PitchAnalysis["painPoints"] = [];

  if (noAfterHours) {
    painPoints.push({
      icon: PhoneOff,
      text: `Calls after hours go to voicemail — the average ${form.vertical.toLowerCase()} business loses $4,200/mo from missed after-hours calls alone.`,
      severity: "critical",
    });
  }

  if (noBooking) {
    painPoints.push({
      icon: Calendar,
      text: `No online booking system — 67% of consumers prefer self-service scheduling. Every friction point costs conversions.`,
      severity: "high",
    });
  }

  if (noChat) {
    painPoints.push({
      icon: MessageCircle,
      text: `No website chat — 42% of website visitors expect live chat. Without it, high-intent visitors bounce to competitors.`,
      severity: "high",
    });
  }

  if (veryLowReviews) {
    painPoints.push({
      icon: Star,
      text: `Only ${reviewCount} Google review${reviewCount !== 1 ? "s" : ""} — competitors with 50+ reviews are outranking them in local search. They're invisible on Google Maps.`,
      severity: "critical",
    });
  } else if (lowReviews) {
    painPoints.push({
      icon: Star,
      text: `Low review count (${reviewCount}) — competitors with 50+ reviews are outranking them. Needs automated review collection after every job.`,
      severity: "high",
    });
  }

  if (lowRating) {
    painPoints.push({
      icon: Star,
      text: `Google rating is ${form.googleRating} — below the 4.0 threshold where consumers filter results. Needs reputation management strategy.`,
      severity: "critical",
    });
  }

  if (noListing) {
    painPoints.push({
      icon: Globe,
      text: `No Google Business listing — completely invisible in local search. Missing 100% of "near me" searches.`,
      severity: "critical",
    });
  }

  if (inactiveSocial) {
    painPoints.push({
      icon: Share2,
      text: `Inactive social media — no recent posts means lost trust signals and zero organic lead generation from social channels.`,
      severity: "medium",
    });
  }

  if (form.websiteUrl === "") {
    painPoints.push({
      icon: Globe,
      text: `No website provided — if they don't have a website, they're losing the 97% of consumers who research businesses online before calling.`,
      severity: "high",
    });
  }

  // ── Recommended Tier ──
  let recommendedTier: PitchAnalysis["recommendedTier"];

  if (highRevenue) {
    recommendedTier = {
      name: "Scale",
      price: "$1,997/mo",
      reasoning: `With estimated revenue of $500K+, ${form.businessName} is a Scale-tier prospect. They have the budget and the most to gain from full automation — AI phone, CRM, marketing, and dedicated account management. ROI is a no-brainer at this revenue level.`,
    };
  } else if (inactiveSocial || lowReviews || noListing || form.websiteUrl === "") {
    recommendedTier = {
      name: "Growth",
      price: "$997/mo",
      reasoning: `${form.businessName} needs more than just call capture — they need visibility. ${inactiveSocial ? "Inactive social media" : ""}${inactiveSocial && (lowReviews || noListing) ? ", " : ""}${lowReviews ? `only ${reviewCount} reviews` : ""}${(lowReviews && noListing) ? ", " : ""}${noListing ? "no Google listing" : ""} means they're not getting enough calls in the first place. Growth tier adds SEO, social content, and review automation to drive MORE calls while capturing the ones they get.`,
    };
  } else {
    recommendedTier = {
      name: "Starter",
      price: "$497/mo",
      reasoning: `${form.businessName} has ${noAfterHours || noBooking || noChat ? "clear operational gaps" : "room for optimization"} that Starter covers: AI phone answering 24/7, online booking, website chat, CRM, and automated follow-ups. This solves their core problem of ${noAfterHours ? "missed after-hours calls" : noBooking ? "friction in booking" : "lead capture"} at the entry price point.`,
    };
  }

  // Override to at least Starter if critical gaps exist
  if (noBooking && noChat && noAfterHours && recommendedTier.name === "Starter") {
    recommendedTier.reasoning = `${form.businessName} has ZERO automation — no booking, no chat, no after-hours answering. They're losing leads at every touchpoint. Starter ($497/mo) is the minimum to stop the bleeding. Pitch the upgrade path to Growth once they see results.`;
  }

  // ── Opening Line ──
  const primaryPain = noAfterHours
    ? `what happens when someone calls ${form.businessName} after 5pm`
    : noBooking
    ? `how customers book appointments with ${form.businessName} right now`
    : lowReviews
    ? `how ${form.businessName} is handling their online reviews`
    : noChat
    ? `what happens when someone visits your website with a question`
    : `how ${form.businessName} is handling their inbound leads`;

  const openingLine = `"Hey, I'm calling because I work with ${form.vertical.toLowerCase()} businesses in your area, and I had a quick question — ${primaryPain}? [PAUSE — let them answer] ... Yeah, that's exactly what I hear from most ${form.vertical.toLowerCase()} owners. The reason I ask is..."`;

  // ── Revenue Impact ──
  // Adjust missed calls based on rating/reviews (worse = more calls needed, but also more calls missed)
  let missedCallsWeek = vData.missedCallsBase;
  if (noAfterHours) missedCallsWeek += 3;
  if (noBooking) missedCallsWeek += 2;

  const monthlyRecovery = Math.round(
    missedCallsWeek * 4.3 * vData.avgJobValue * vData.captureRate
  );

  const revenueImpact = {
    missedCallsWeek,
    avgJobValue: vData.avgJobValue,
    captureRate: vData.captureRate,
    monthlyRecovery,
  };

  // ── Talking Points ──
  const talkingPoints: string[] = [];

  talkingPoints.push(
    `"${form.businessName} is currently missing an estimated ${missedCallsWeek} calls per week — that's roughly $${monthlyRecovery.toLocaleString()}/mo in lost revenue."`
  );

  if (noAfterHours) {
    talkingPoints.push(
      `"80% of callers who hit voicemail never call back. They just call the next ${form.vertical.toLowerCase()} company on Google. Our AI answers in 2 rings, 24/7 — sounds completely natural."`
    );
  }

  if (noBooking) {
    talkingPoints.push(
      `"Right now if someone wants to book with you, they have to call and hope someone picks up. Our system lets them book online, through the AI, or via text — zero friction."`
    );
  }

  if (lowReviews) {
    talkingPoints.push(
      `"You have ${reviewCount} reviews right now. Your competitors likely have 50-100+. Our system automatically sends a review request after every job — clients average 15-25 new reviews per month."`
    );
  }

  if (inactiveSocial) {
    talkingPoints.push(
      `"Your social media presence is quiet right now. Growth tier includes 2-3 posts per week, managed for you — keeps you top of mind and builds trust before people even call."`
    );
  }

  talkingPoints.push(
    `"One platform replaces your phone service, booking system, CRM, review tool, and follow-up sequences. Most ${form.vertical.toLowerCase()} businesses are paying $500-$800/mo for those tools separately — and none of them talk to each other."`
  );

  if (talkingPoints.length < 5) {
    talkingPoints.push(
      `"We can have you live in 5-7 days. No contract, 30-day money-back guarantee. The AI learns your services, pricing, and service area — callers can't tell it's not a real person."`
    );
  }

  // ── Next Steps ──
  const nextSteps: string[] = [];

  if (form.answersAfterHours === "Don't know") {
    nextSteps.push(
      "Call them after 5pm tonight to verify after-hours behavior — document what happens (voicemail, no answer, forwarding)."
    );
  }

  nextSteps.push(
    `Google "${form.businessName}" and screenshot their listing, reviews, and competitor comparison.`
  );

  if (form.websiteUrl) {
    nextSteps.push(
      `Visit ${form.websiteUrl} — check load speed, mobile experience, and whether there's a clear CTA or booking option.`
    );
  }

  nextSteps.push(
    `Use the ${recommendedTier.name} tier pitch. Lead with the ${noAfterHours ? "missed calls" : lowReviews ? "review gap" : "lead capture"} pain point.`
  );

  nextSteps.push(
    `Prepare a personalized ROI calculation showing $${monthlyRecovery.toLocaleString()}/mo recovery vs. ${recommendedTier.price} investment (${Math.round(monthlyRecovery / parseInt(recommendedTier.price.replace(/[^0-9]/g, "")))}x ROI).`
  );

  nextSteps.push(
    "Schedule the demo call — offer two specific times within the next 48 hours."
  );

  return {
    score,
    painPoints,
    recommendedTier,
    openingLine,
    revenueImpact,
    talkingPoints,
    nextSteps,
  };
}

// ─── Helper: Format pitch as copyable text ──────────────────────────────────

function formatPitchAsText(form: FormData, analysis: PitchAnalysis): string {
  const lines: string[] = [];

  lines.push("═══════════════════════════════════════════");
  lines.push(`PROSPECT RESEARCH: ${form.businessName.toUpperCase()}`);
  lines.push("═══════════════════════════════════════════");
  lines.push("");
  lines.push(`Business: ${form.businessName}`);
  if (form.websiteUrl) lines.push(`Website: ${form.websiteUrl}`);
  lines.push(`Vertical: ${form.vertical}`);
  lines.push(`Google Rating: ${form.googleRating} (${form.reviewCount || "0"} reviews)`);
  lines.push(`Est. Revenue: ${form.estimatedRevenue}`);
  lines.push("");

  lines.push(`───── PROSPECT SCORE: ${analysis.score}/10 ─────`);
  lines.push("");

  lines.push("PAIN POINTS:");
  analysis.painPoints.forEach((p) => {
    const tag = p.severity === "critical" ? "[CRITICAL]" : p.severity === "high" ? "[HIGH]" : "[MEDIUM]";
    lines.push(`  ${tag} ${p.text}`);
  });
  lines.push("");

  lines.push(`RECOMMENDED TIER: ${analysis.recommendedTier.name} (${analysis.recommendedTier.price})`);
  lines.push(`  ${analysis.recommendedTier.reasoning}`);
  lines.push("");

  lines.push("OPENING LINE:");
  lines.push(`  ${analysis.openingLine}`);
  lines.push("");

  lines.push("ESTIMATED REVENUE IMPACT:");
  lines.push(`  Missed calls/week: ~${analysis.revenueImpact.missedCallsWeek}`);
  lines.push(`  Avg job value: $${analysis.revenueImpact.avgJobValue.toLocaleString()}`);
  lines.push(`  Capture rate: ${Math.round(analysis.revenueImpact.captureRate * 100)}%`);
  lines.push(`  Monthly recovery: $${analysis.revenueImpact.monthlyRecovery.toLocaleString()}`);
  lines.push("");

  lines.push("KEY TALKING POINTS:");
  analysis.talkingPoints.forEach((tp, i) => {
    lines.push(`  ${i + 1}. ${tp}`);
  });
  lines.push("");

  lines.push("NEXT STEPS:");
  analysis.nextSteps.forEach((ns, i) => {
    lines.push(`  ${i + 1}. ${ns}`);
  });
  lines.push("");

  if (form.notes) {
    lines.push("NOTES:");
    lines.push(`  ${form.notes}`);
    lines.push("");
  }

  lines.push("═══════════════════════════════════════════");
  lines.push("Generated by TotalFlow AI Sales Hub");
  lines.push("═══════════════════════════════════════════");

  return lines.join("\n");
}

// ─── Score color helpers ────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 8) return "text-green-400";
  if (score >= 6) return "text-orange-400";
  return "text-red-400";
}

function getScoreBg(score: number): string {
  if (score >= 8) return "bg-green-500/10 border-green-500/20";
  if (score >= 6) return "bg-orange-500/10 border-orange-500/20";
  return "bg-red-500/10 border-red-500/20";
}

function getScoreLabel(score: number): string {
  if (score >= 9) return "Hot Prospect";
  if (score >= 7) return "Strong Lead";
  if (score >= 5) return "Qualified";
  if (score >= 3) return "Needs Nurturing";
  return "Low Priority";
}

function getSeverityColor(severity: "critical" | "high" | "medium"): string {
  if (severity === "critical") return "bg-red-500/10 text-red-500 border-red-500/20";
  if (severity === "high") return "bg-orange-500/10 text-orange-500 border-orange-500/20";
  return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
}

function getSeverityLabel(severity: "critical" | "high" | "medium"): string {
  if (severity === "critical") return "Critical";
  if (severity === "high") return "High";
  return "Medium";
}

// ─── Component: FormField ───────────────────────────────────────────────────

function FormField({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium flex items-center gap-1">
        {label}
        {required && <span className="text-orange-500">*</span>}
      </label>
      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {children}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function ProspectResearch() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [analysis, setAnalysis] = useState<PitchAnalysis | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!form.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!form.vertical) newErrors.vertical = "Select a vertical";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleGenerate() {
    if (!validate()) return;
    const result = generateAnalysis(form);
    setAnalysis(result);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setAnalysis(null);
    setErrors({});
    setCopied(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCopyPitch() {
    if (!analysis) return;
    const text = formatPitchAsText(form, analysis);
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  // ─── Render: Pitch Sheet ──────────────────────────────────────────────────

  if (analysis) {
    const tierColors: Record<string, string> = {
      Starter: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Growth: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      Scale: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    };

    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6" data-testid="pitch-sheet">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              <h1 className="text-xl font-bold tracking-tight" data-testid="text-prospect-name">
                {form.businessName}
              </h1>
              <Badge className={`${tierColors[analysis.recommendedTier.name] || tierColors.Starter} text-xs`}>
                {analysis.recommendedTier.name} — {analysis.recommendedTier.price}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {form.vertical} {form.websiteUrl ? `• ${form.websiteUrl}` : ""} • {form.googleRating || "No rating"} ({form.reviewCount || "0"} reviews)
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={handleCopyPitch}
              data-testid="button-copy-pitch"
            >
              {copied ? (
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied!" : "Copy Full Pitch"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={handleReset}
              data-testid="button-new-research"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              New Research
            </Button>
          </div>
        </div>

        {/* Score Card */}
        <Card data-testid="card-prospect-score">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className={`p-6 flex flex-col items-center justify-center sm:w-48 border-b sm:border-b-0 sm:border-r ${getScoreBg(analysis.score)}`}>
                <div className={`text-5xl font-black tabular-nums ${getScoreColor(analysis.score)}`} data-testid="text-prospect-score">
                  {analysis.score}
                </div>
                <div className="text-xs text-muted-foreground mt-1">out of 10</div>
                <Badge className={`mt-2 text-[10px] ${getScoreBg(analysis.score)} ${getScoreColor(analysis.score)}`}>
                  {analysis.score >= 8 && <Flame className="w-3 h-3 mr-0.5" />}
                  {getScoreLabel(analysis.score)}
                </Badge>
              </div>
              <div className="p-6 flex-1">
                <div className="text-sm font-semibold mb-3">Quick Assessment</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="text-muted-foreground">After Hours</div>
                    <div className={`font-medium ${form.answersAfterHours === "No" ? "text-red-400" : form.answersAfterHours === "Yes" ? "text-green-400" : "text-yellow-400"}`}>
                      {form.answersAfterHours || "Unknown"}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-muted-foreground">Online Booking</div>
                    <div className={`font-medium ${form.hasBooking === "No" ? "text-red-400" : form.hasBooking === "Yes" ? "text-green-400" : "text-yellow-400"}`}>
                      {form.hasBooking || "Unknown"}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-muted-foreground">Website Chat</div>
                    <div className={`font-medium ${form.hasChat === "No" ? "text-red-400" : form.hasChat === "Yes" ? "text-green-400" : "text-yellow-400"}`}>
                      {form.hasChat || "Unknown"}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-muted-foreground">Social Active</div>
                    <div className={`font-medium ${form.socialActive === "No" ? "text-red-400" : form.socialActive === "Yes" ? "text-green-400" : "text-yellow-400"}`}>
                      {form.socialActive || "Unknown"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two-column layout for Pain Points + Revenue Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pain Points */}
          <Card data-testid="card-pain-points">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                Pain Points Identified
                <Badge variant="outline" className="text-[10px] ml-auto">
                  {analysis.painPoints.length} found
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {analysis.painPoints.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  No major pain points detected. This prospect may already have good systems in place.
                </p>
              ) : (
                analysis.painPoints.map((pp, i) => {
                  const Icon = pp.icon;
                  return (
                    <div
                      key={i}
                      className="flex gap-3 p-3 rounded-lg bg-muted/30 border border-transparent hover:border-muted-foreground/10 transition-colors"
                      data-testid={`pain-point-${i}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        <Icon className={`w-4 h-4 ${pp.severity === "critical" ? "text-red-400" : pp.severity === "high" ? "text-orange-400" : "text-yellow-400"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`text-[9px] px-1.5 py-0 ${getSeverityColor(pp.severity)}`}>
                            {getSeverityLabel(pp.severity)}
                          </Badge>
                        </div>
                        <p className="text-sm leading-relaxed">{pp.text}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Revenue Impact */}
          <Card data-testid="card-revenue-impact">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-orange-500" />
                Estimated Revenue Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4 rounded-lg bg-orange-500/5 border border-orange-500/10 mb-4">
                <div className="text-3xl font-black text-orange-400 tabular-nums" data-testid="text-monthly-recovery">
                  ${analysis.revenueImpact.monthlyRecovery.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">estimated monthly recovery</div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-lg font-bold tabular-nums">~{analysis.revenueImpact.missedCallsWeek}</div>
                  <div className="text-[10px] text-muted-foreground">missed calls/week</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-lg font-bold tabular-nums">${analysis.revenueImpact.avgJobValue.toLocaleString()}</div>
                  <div className="text-[10px] text-muted-foreground">avg job value</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-lg font-bold tabular-nums">{Math.round(analysis.revenueImpact.captureRate * 100)}%</div>
                  <div className="text-[10px] text-muted-foreground">capture rate</div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg border border-dashed text-xs text-muted-foreground">
                <span className="font-medium text-foreground">ROI:</span> At {analysis.recommendedTier.price}/mo, TotalFlow pays for itself{" "}
                <span className="text-orange-400 font-semibold">
                  {Math.round(analysis.revenueImpact.monthlyRecovery / parseInt(analysis.recommendedTier.price.replace(/[^0-9]/g, "")))}x over
                </span>{" "}
                in recovered revenue alone.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Tier */}
        <Card data-testid="card-recommended-tier">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              Recommended Tier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className={`px-4 py-3 rounded-lg border text-center shrink-0 ${tierColors[analysis.recommendedTier.name] || ""}`}>
                <div className="text-lg font-bold">{analysis.recommendedTier.name}</div>
                <div className="text-sm font-semibold">{analysis.recommendedTier.price}</div>
              </div>
              <p className="text-sm leading-relaxed">{analysis.recommendedTier.reasoning}</p>
            </div>
          </CardContent>
        </Card>

        {/* Opening Line */}
        <Card data-testid="card-opening-line">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" />
              Opening Line
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/10">
              <p className="text-sm leading-relaxed italic" data-testid="text-opening-line">
                {analysis.openingLine}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Talking Points */}
        <Card data-testid="card-talking-points">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-orange-500" />
              Key Talking Points
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analysis.talkingPoints.map((tp, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                data-testid={`talking-point-${i}`}
              >
                <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-orange-400">{i + 1}</span>
                </div>
                <p className="text-sm leading-relaxed">{tp}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card data-testid="card-next-steps">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-orange-500" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analysis.nextSteps.map((ns, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/20 transition-colors"
                data-testid={`next-step-${i}`}
              >
                <div className="mt-0.5 shrink-0">
                  <ChevronRight className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-sm leading-relaxed">{ns}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notes (if any) */}
        {form.notes && (
          <Card data-testid="card-notes">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-orange-500" />
                Your Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">{form.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white gap-2"
            onClick={handleCopyPitch}
            data-testid="button-copy-pitch-bottom"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied to Clipboard!" : "Copy Full Pitch"}
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={handleReset}
            data-testid="button-new-research-bottom"
          >
            <RotateCcw className="w-4 h-4" />
            New Research
          </Button>
        </div>
      </div>
    );
  }

  // ─── Render: Input Form ───────────────────────────────────────────────────

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6" data-testid="prospect-form">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-orange-500" />
          <h1 className="text-xl font-bold tracking-tight" data-testid="text-prospect-research-title">
            Prospect Research
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Enter what you know about a prospect. The more detail you provide, the sharper the pitch.
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Business Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-500" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="Business Name" required>
              <Input
                placeholder="e.g., ABC Plumbing"
                value={form.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
                className={errors.businessName ? "border-red-500" : ""}
                data-testid="input-business-name"
              />
              {errors.businessName && (
                <p className="text-xs text-red-500">{errors.businessName}</p>
              )}
            </FormField>

            <FormField label="Website URL">
              <Input
                placeholder="e.g., https://abcplumbing.com"
                value={form.websiteUrl}
                onChange={(e) => updateField("websiteUrl", e.target.value)}
                data-testid="input-website-url"
              />
            </FormField>

            <FormField label="Vertical" required>
              <Select
                value={form.vertical}
                onValueChange={(v) => updateField("vertical", v)}
              >
                <SelectTrigger
                  className={errors.vertical ? "border-red-500" : ""}
                  data-testid="select-vertical"
                >
                  <SelectValue placeholder="Select industry vertical" />
                </SelectTrigger>
                <SelectContent>
                  {VERTICALS.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vertical && (
                <p className="text-xs text-red-500">{errors.vertical}</p>
              )}
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Google Rating">
                <Select
                  value={form.googleRating}
                  onValueChange={(v) => updateField("googleRating", v)}
                >
                  <SelectTrigger data-testid="select-google-rating">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {RATING_OPTIONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Review Count">
                <Input
                  type="number"
                  min={0}
                  placeholder="e.g., 12"
                  value={form.reviewCount}
                  onChange={(e) => updateField("reviewCount", e.target.value)}
                  data-testid="input-review-count"
                />
              </FormField>
            </div>

            <FormField label="Estimated Monthly Revenue">
              <Select
                value={form.estimatedRevenue}
                onValueChange={(v) => updateField("estimatedRevenue", v)}
              >
                <SelectTrigger data-testid="select-estimated-revenue">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  {REVENUE_OPTIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </CardContent>
        </Card>

        {/* Right Column: Capability Assessment */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-orange-500" />
              Capability Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="Has Online Booking?">
              <Select
                value={form.hasBooking}
                onValueChange={(v) => updateField("hasBooking", v)}
              >
                <SelectTrigger data-testid="select-has-booking">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {YES_NO_OPTIONS.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Has Website Chat?">
              <Select
                value={form.hasChat}
                onValueChange={(v) => updateField("hasChat", v)}
              >
                <SelectTrigger data-testid="select-has-chat">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {YES_NO_OPTIONS.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Answers After Hours?" hint="Call them after 5pm to check">
              <Select
                value={form.answersAfterHours}
                onValueChange={(v) => updateField("answersAfterHours", v)}
              >
                <SelectTrigger data-testid="select-answers-after-hours">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {YES_NO_OPTIONS.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Social Media Active?" hint="Posted in last 2 weeks?">
              <Select
                value={form.socialActive}
                onValueChange={(v) => updateField("socialActive", v)}
              >
                <SelectTrigger data-testid="select-social-active">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {YES_NO_OPTIONS.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Notes" hint="Anything else you noticed during research">
              <Textarea
                placeholder="e.g., Met owner at chamber event. They mentioned losing calls on weekends. Competitor down the street has 200+ reviews..."
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                className="min-h-[100px] resize-none"
                data-testid="textarea-notes"
              />
            </FormField>
          </CardContent>
        </Card>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center pt-2">
        <Button
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white gap-2 px-8 text-sm font-semibold"
          onClick={handleGenerate}
          data-testid="button-generate-pitch"
        >
          <Target className="w-4 h-4" />
          Generate Pitch
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
