import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Check,
  Star,
  ArrowRight,
  TrendingUp,
  Users,
  Building2,
  Zap,
  Shield,
  MessageSquare,
  CalendarCheck,
  Gift,
  AlertTriangle,
  ChevronRight,
  Crown,
  Target,
  Lightbulb,
  Scale,
} from "lucide-react";

/* ─── Tier Data ─── */

interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: string;
  setupFee: string;
  popular?: boolean;
  features: string[];
  bestFor: string;
  icon: typeof DollarSign;
  annualMonthly: string;
}

const tiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: "$497",
    setupFee: "$1,497",
    icon: Zap,
    features: [
      "AI Phone Answering 24/7",
      "Online Booking + Calendar",
      "SMS & Email Reminders",
      "Lead Nurture Sequences",
      "Review Request Automation",
      "Conversation AI Chatbot (Web/SMS)",
      "Unified Inbox (SMS, Email, IG, FB, Google)",
      "Custom AI Voice Scripts",
      "CRM Pipeline & Contact Management",
      "Mobile App Access",
      "Performance Dashboard",
      "Invoicing & Payments",
      "Forms & Lead Capture",
      "Email Support",
    ],
    bestFor: "Solo operators, small teams who need to stop missing calls",
    annualMonthly: "$398",
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: "$997",
    setupFee: "$2,497",
    popular: true,
    icon: TrendingUp,
    features: [
      "Everything in Starter PLUS:",
      "Google Business Optimization",
      "Local SEO to Rank #1",
      "Social Media Content (2-3x/week)",
      "Review Responses (within 24hrs)",
      "High-Converting Landing Pages",
      "Email/SMS Marketing Campaigns",
      "Website (if needed)",
      "Monthly Performance Report",
      "Priority Chat Support",
    ],
    bestFor: "Growing businesses wanting done-for-you marketing",
    annualMonthly: "$798",
  },
  {
    id: "scale",
    name: "Scale",
    monthlyPrice: "$1,997",
    setupFee: "$2,997",
    icon: Building2,
    features: [
      "Everything in Growth PLUS:",
      "Multi-Location (Up to 10)",
      "Multi-Brand Support",
      "Unlimited SMS & Contacts",
      "Dedicated Account Manager",
      "Quarterly Strategy Calls",
      "Cross-Location Reporting",
      "White-Label Options",
      "Advanced Workflow Automation",
    ],
    bestFor: "Multi-location, franchises, $2M+ revenue",
    annualMonthly: "$1,598",
  },
];

/* ─── Recommendation Guide ─── */

interface Recommendation {
  tier: string;
  icon: typeof Zap;
  color: string;
  bgColor: string;
  borderColor: string;
  signals: string[];
}

const recommendations: Recommendation[] = [
  {
    tier: "Starter",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-500/5",
    borderColor: "border-blue-500/20",
    signals: [
      "Solo operator or 1-5 person team",
      "Main pain point is missing calls / no follow-up",
      "Currently has no CRM or automation",
      "Budget-conscious — needs to see ROI first",
      "Just getting started with AI / tech adoption",
      "Revenue under $500K/year",
    ],
  },
  {
    tier: "Growth",
    icon: TrendingUp,
    color: "text-orange-500",
    bgColor: "bg-orange-500/5",
    borderColor: "border-orange-500/20",
    signals: [
      "5-20 person team with office staff",
      "Wants marketing done FOR them, not just tools",
      "Already has some systems but they're disconnected",
      "Needs SEO, social, and reputation management",
      "Revenue $500K-$2M and actively trying to grow",
      "Willing to invest in marketing but doesn't have time to DIY",
    ],
  },
  {
    tier: "Scale",
    icon: Building2,
    color: "text-purple-500",
    bgColor: "bg-purple-500/5",
    borderColor: "border-purple-500/20",
    signals: [
      "Multiple locations or franchise model",
      "Multiple brands under one umbrella",
      "Needs cross-location reporting & dashboards",
      "Revenue $2M+ and scaling aggressively",
      "Wants a dedicated account manager / strategic partner",
      "Considering white-labeling for sub-brands",
    ],
  },
];

/* ─── Upsell Path ─── */

interface UpsellStep {
  from: string;
  to: string;
  trigger: string;
  talkTrack: string;
}

const upsellSteps: UpsellStep[] = [
  {
    from: "Starter",
    to: "Growth",
    trigger:
      "They mention wanting more leads, needing SEO, struggling with social media, or asking about marketing help.",
    talkTrack:
      '"You\'re capturing every call now — great. But imagine if we also drove MORE calls to you with SEO, social, and Google optimization. Growth plan adds done-for-you marketing so you can focus on running the business while we fill your pipeline."',
  },
  {
    from: "Growth",
    to: "Scale",
    trigger:
      "They're opening a second location, managing multiple brands, or hitting capacity and need enterprise features.",
    talkTrack:
      '"You\'re growing fast — that\'s exactly what Scale is built for. You get multi-location dashboards, a dedicated account manager, and unlimited contacts. Most clients at your stage need centralized reporting across locations. This pays for itself with the efficiency gains."',
  },
];

/* ─── Price Objections ─── */

interface Objection {
  objection: string;
  response: string;
}

const objections: Objection[] = [
  {
    objection: '"$497/month is too expensive."',
    response:
      "What's one missed call worth to you? If your average job is $500-$2,000, you only need ONE extra booked job per month to get a 2-4x return. Our clients see 10-29x ROI. The real question is: how much are missed calls costing you right now?",
  },
  {
    objection: '"I can\'t afford the setup fee."',
    response:
      "Mention annual billing — the setup fee is completely waived AND you save 20% monthly. That's over $1,100 in savings on Starter alone in year one. If they still hesitate, remind them the setup includes done-for-you configuration — it would cost $3,000-$5,000 to hire someone to do this.",
  },
  {
    objection: '"I\'ll just do it myself / use free tools."',
    response:
      "What's your hourly rate? If you spend 60 hours setting up and maintaining 5-6 separate tools, at $100/hour that's $6,000 in lost billable time. Plus you'll have no support when things break. We handle everything for $497/mo — you give us 30 minutes for onboarding and you're done.",
  },
  {
    objection: '"I need to think about it / talk to my partner."',
    response:
      "Totally understand. While you think about it, you're still missing calls. Every day without a system is money walking out the door. We have a 30-day money-back guarantee — there's zero risk. Can we get you started now so you're not losing another week of leads?",
  },
];

/* ─── Competitor Comparison ─── */

interface CompetitorTool {
  name: string;
  purpose: string;
  cost: string;
}

const competitorTools: CompetitorTool[] = [
  { name: "Dialzara", purpose: "AI phone answering only", cost: "$29-199/mo" },
  { name: "Mailchimp", purpose: "Email marketing only", cost: "$13-350/mo" },
  { name: "Calendly", purpose: "Booking only", cost: "$12-16/mo" },
  {
    name: "Squarespace",
    purpose: "Website only",
    cost: "$16-49/mo",
  },
  {
    name: "Hootsuite",
    purpose: "Social media management only",
    cost: "$99-739/mo",
  },
  { name: "Separate CRM", purpose: "Contact management only", cost: "$50-300/mo" },
];

/* ─── Component ─── */

export default function Pricing() {
  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-xl font-bold tracking-tight"
          data-testid="text-pricing-title"
        >
          Pricing & Packages
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Everything you need to recommend the right plan, handle objections, and
          close the deal. Internal reference only — not customer-facing.
        </p>
      </div>

      {/* ─── Tier Cards ─── */}
      <div className="grid md:grid-cols-3 gap-4" data-testid="section-pricing-tiers">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <Card
              key={tier.id}
              className={`relative overflow-hidden ${
                tier.popular
                  ? "border-orange-500 ring-2 ring-orange-500/20"
                  : ""
              }`}
              data-testid={`card-tier-${tier.id}`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-orange-500 text-white rounded-none rounded-bl-lg text-[10px] px-2 py-1">
                    <Star className="w-3 h-3 mr-0.5" /> Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      tier.popular
                        ? "bg-orange-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-base">{tier.name}</CardTitle>
                </div>
                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{tier.monthlyPrice}</span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Setup: {tier.setupFee}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <ul className="space-y-1.5">
                  {tier.features.map((feature, i) => {
                    const isHeader = feature.endsWith("PLUS:");
                    return (
                      <li
                        key={i}
                        className={`flex items-start gap-2 text-xs ${
                          isHeader
                            ? "font-semibold text-orange-500 pt-0.5"
                            : "text-muted-foreground"
                        }`}
                      >
                        {!isHeader && (
                          <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                        )}
                        {isHeader && (
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        )}
                        {feature}
                      </li>
                    );
                  })}
                </ul>
                <div
                  className={`text-xs rounded-lg px-3 py-2 ${
                    tier.popular
                      ? "bg-orange-500/5 border border-orange-500/10"
                      : "bg-muted/50"
                  }`}
                >
                  <span className="font-semibold">Best for:</span> {tier.bestFor}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ─── Annual Pricing Callout ─── */}
      <Card
        className="border-green-500/30 bg-green-500/5 dark:bg-green-500/5"
        data-testid="card-annual-pricing"
      >
        <CardContent className="p-4 md:p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="font-semibold text-sm flex items-center gap-2">
                Annual Billing — Always Pitch This First
                <Badge className="bg-green-500 text-white text-[10px]">
                  Best Deal
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                When a prospect is interested, lead with annual pricing. It removes
                the setup fee entirely and drops monthly cost by 20%.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="bg-background rounded-lg border p-3 text-center"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {tier.name}
                    </div>
                    <div className="text-lg font-bold mt-0.5">
                      {tier.annualMonthly}
                      <span className="text-xs font-normal text-muted-foreground">
                        /mo
                      </span>
                    </div>
                    <div className="text-[10px] text-green-500 font-medium">
                      Setup fee waived • Save 20%
                    </div>
                    <div className="text-[10px] text-muted-foreground line-through mt-0.5">
                      {tier.monthlyPrice}/mo + {tier.setupFee} setup
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-1 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" /> No contracts, cancel anytime
                </span>
                <span className="flex items-center gap-1">
                  <CalendarCheck className="w-3 h-3" /> 30-day money-back guarantee
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Live in 5-7 days
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── How to Recommend the Right Plan ─── */}
      <div data-testid="section-recommendations">
        <h2 className="text-base font-bold tracking-tight mb-1 flex items-center gap-2">
          <Target className="w-4 h-4 text-orange-500" />
          How to Recommend the Right Plan
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Match these signals to the right tier. If you hear 3+ signals from a
          tier, that's your recommendation.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendations.map((rec) => {
            const Icon = rec.icon;
            return (
              <Card key={rec.tier} data-testid={`card-recommend-${rec.tier.toLowerCase()}`}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center ${rec.bgColor}`}
                    >
                      <Icon className={`w-4 h-4 ${rec.color}`} />
                    </div>
                    <span className="text-sm font-semibold">
                      Pitch {rec.tier}
                    </span>
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    When you hear...
                  </div>
                  <ul className="space-y-1.5">
                    {rec.signals.map((signal, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <Check
                          className={`w-3 h-3 shrink-0 mt-0.5 ${rec.color}`}
                        />
                        {signal}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ─── Upsell Path ─── */}
      <div data-testid="section-upsell-path">
        <h2 className="text-base font-bold tracking-tight mb-1 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-orange-500" />
          Upsell Path
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Land them on Starter or Growth, then move them up when the timing is
          right.
        </p>

        {/* Visual progression */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {tiers.map((tier, i) => (
            <div key={tier.id} className="flex items-center gap-2">
              <div
                className={`px-4 py-2 rounded-lg border text-center ${
                  i === 1
                    ? "border-orange-500 bg-orange-500/5"
                    : "border-border"
                }`}
              >
                <div className="text-xs font-semibold">{tier.name}</div>
                <div className="text-[10px] text-muted-foreground">
                  {tier.monthlyPrice}/mo
                </div>
              </div>
              {i < tiers.length - 1 && (
                <ArrowRight className="w-4 h-4 text-orange-500 shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {upsellSteps.map((step, i) => (
            <Card key={i} data-testid={`card-upsell-${i}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] border-orange-500/30 text-orange-500"
                  >
                    {step.from} → {step.to}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" /> Trigger
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {step.trigger}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-orange-500 mb-1 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Say This
                    </div>
                    <div className="text-xs bg-orange-500/5 border border-orange-500/10 rounded-lg px-3 py-2 leading-relaxed">
                      {step.talkTrack}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ─── Handling Price Objections ─── */}
      <div data-testid="section-objections">
        <h2 className="text-base font-bold tracking-tight mb-1 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          Handling Price Objections
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Quick reference — memorize these. Confidence kills objections.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {objections.map((obj, i) => (
            <Card key={i} data-testid={`card-objection-${i}`}>
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-semibold text-red-500 flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3 shrink-0" />
                  {obj.objection}
                </div>
                <div className="text-xs bg-green-500/5 border border-green-500/10 rounded-lg px-3 py-2 leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    Response:{" "}
                  </span>
                  {obj.response}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ─── Quick Comparison vs Competitors ─── */}
      <div data-testid="section-competitor-comparison">
        <h2 className="text-base font-bold tracking-tight mb-1 flex items-center gap-2">
          <Scale className="w-4 h-4 text-orange-500" />
          Quick Comparison vs Competitors
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Prospects often compare us to buying separate tools. Here's why
          TotalFlow wins every time.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Separate tools card */}
          <Card className="border-red-500/20">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-red-500/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    Buying Separate Tools
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Piecing together 6+ tools
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                {competitorTools.map((tool, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs border-b last:border-b-0 pb-1.5 last:pb-0"
                  >
                    <div>
                      <span className="font-medium">{tool.name}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        — {tool.purpose}
                      </span>
                    </div>
                    <span className="text-red-500 font-medium shrink-0 ml-2">
                      {tool.cost}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-red-500/5 border border-red-500/10 rounded-lg px-3 py-2 text-center">
                <div className="text-[10px] text-muted-foreground">
                  Total Monthly Cost
                </div>
                <div className="text-lg font-bold text-red-500">
                  $200 - $1,600+
                </div>
                <div className="text-[10px] text-muted-foreground">
                  For disconnected tools that don't talk to each other
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TotalFlow card */}
          <Card className="border-orange-500/30 ring-2 ring-orange-500/10">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold">TotalFlow AI</div>
                  <div className="text-[10px] text-muted-foreground">
                    All-in-one platform
                  </div>
                </div>
              </div>
              <ul className="space-y-1.5">
                {[
                  "AI phone answering + booking",
                  "Email & SMS marketing",
                  "Online scheduling",
                  "Website + landing pages",
                  "Social media management",
                  "Full CRM + pipeline",
                  "Review management",
                  "Unified inbox",
                  "Invoicing & payments",
                  "Done-for-you setup & support",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-orange-500/5 border border-orange-500/10 rounded-lg px-3 py-2 text-center">
                <div className="text-[10px] text-muted-foreground">
                  TotalFlow Monthly Cost
                </div>
                <div className="text-lg font-bold text-orange-500">
                  $497 - $997
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Everything integrated in one platform — nothing extra to buy
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Talk track for comparison */}
        <Card className="mt-3" data-testid="card-comparison-talktrack">
          <CardContent className="p-4">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-orange-500 mb-1.5 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Comparison Talk Track
            </div>
            <div className="text-xs bg-orange-500/5 border border-orange-500/10 rounded-lg px-3 py-2 leading-relaxed">
              "Right now, to get what TotalFlow does, you'd need to buy Dialzara
              for AI answering, Calendly for booking, Mailchimp for emails,
              Squarespace for a website, Hootsuite for social, and a separate CRM.
              That's 6 different logins, 6 different bills — easily $800 to
              $1,600 a month — and none of those tools talk to each other. With
              us, it's one platform, one login, one bill, and everything works
              together automatically. Starting at $497."
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
