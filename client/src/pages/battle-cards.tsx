import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  XCircle,
  Minus,
  Shield,
  Swords,
  DollarSign,
  Zap,
  Phone,
  MessageSquare,
  Globe,
  Mail,
  Share2,
  Star,
  CreditCard,
  ClipboardList,
  Workflow,
  Smartphone,
  ChevronDown,
  ChevronUp,
  TrendingDown,
} from "lucide-react";

interface Competitor {
  id: string;
  name: string;
  type: string;
  price: string;
  icon: React.ReactNode;
  weaknesses: string[];
  yourEdge: string[];
  killShot: string;
  costBreakdown?: { item: string; cost: string }[];
}

const competitors: Competitor[] = [
  {
    id: "cheap-ai",
    name: "Cheap AI Answering (Dialzara/Goodcall/Smith.ai)",
    type: "Single-Purpose AI",
    price: "$29–$199/mo",
    icon: <Phone className="w-4 h-4" />,
    weaknesses: [
      "Only answers calls — no CRM, no booking integration",
      "No review or reputation management system",
      "No website builder or landing pages",
      "No email/SMS marketing campaigns",
      "No unified inbox — messages scattered everywhere",
      "You need 5–6 other tools to match TotalFlow",
    ],
    yourEdge: [
      "Complete 10-in-1 platform vs single-purpose tool",
      "AI answering + CRM + marketing + automation in one login",
      "Everything connected — calls flow into CRM, trigger automations, request reviews",
    ],
    killShot:
      '"Those tools just answer the phone and take a message. We answer the phone, book the job, text the customer, track in CRM, follow up automatically, collect reviews, AND drive new customers with marketing. You\'d need 6 separate tools to match us."',
  },
  {
    id: "ghl-resellers",
    name: "Other GHL Resellers",
    type: "White-Label CRM",
    price: "$97–$497/mo",
    icon: <Globe className="w-4 h-4" />,
    weaknesses: [
      "Generic setup — same templates for everyone",
      "No AI phone answering built in",
      "Self-service with minimal support — you figure it out",
      "No industry-specific automations pre-built",
      "Often sold by marketers, not business automation experts",
      "No done-for-you marketing services",
    ],
    yourEdge: [
      "Done-for-you setup — not DIY software",
      "AI phone answering included at every tier",
      "Industry-specific configuration and automations",
      "Growth tier includes full marketing execution",
    ],
    killShot:
      '"The platform is just a tool. What matters is how it\'s configured. We pre-build everything for [their industry] — the AI agent, automations, workflows. AND we handle your marketing at the Growth level."',
  },
  {
    id: "receptionist",
    name: "Full-Time Receptionist",
    type: "Human Staffing",
    price: "$2,500–$4,000/mo + benefits",
    icon: <DollarSign className="w-4 h-4" />,
    weaknesses: [
      "Only works 8 hours/day, 5 days/week",
      "Calls in sick, takes vacation, quits",
      "Can only handle one call at a time",
      "Doesn't do marketing, reviews, CRM, or follow-up",
      "No after-hours or weekend coverage",
      "No data tracking or analytics",
    ],
    yourEdge: [
      "24/7/365 — works 168 hours/week vs 40",
      "Handles unlimited simultaneous calls",
      "Does 10 jobs, not just answering",
      "75% cheaper than a full-time hire",
    ],
    killShot:
      '"A receptionist costs $3,000/month minimum and only works 40 hours. We work 168 hours a week, handle unlimited calls, AND do the marketing, reviews, follow-up, and CRM work. All for $497."',
  },
  {
    id: "diy-stack",
    name: "DIY / Separate Tools Stack",
    type: "Patchwork Software",
    price: "$344–$1,928/mo combined",
    icon: <Workflow className="w-4 h-4" />,
    weaknesses: [
      "Nothing integrated — manual data entry between tools",
      "6+ separate logins and dashboards",
      "No automation between systems",
      "Managing multiple vendors and billing",
      "No single support team — you're on your own",
      "Hours wasted on tool maintenance instead of revenue work",
    ],
    yourEdge: [
      "One platform, one login, everything connected",
      "Fully automated end-to-end workflows",
      "Single support team for everything",
      "Lower cost than the sum of parts",
    ],
    killShot:
      '"You could piece together 8 separate tools and spend $500–2,000/month with none of them talking to each other. Or one platform at $497 where everything is automated and connected."',
    costBreakdown: [
      { item: "AI Phone Answering", cost: "$79–$199" },
      { item: "CRM / Pipeline", cost: "$50–$300" },
      { item: "Email Marketing", cost: "$13–$350" },
      { item: "Calendar / Booking", cost: "$12–$16" },
      { item: "Website / Funnels", cost: "$16–$49" },
      { item: "Social Media Mgmt", cost: "$99–$739" },
      { item: "Review Management", cost: "$50–$200" },
      { item: "Forms / Surveys", cost: "$25–$75" },
    ],
  },
  {
    id: "do-nothing",
    name: "Do Nothing / Status Quo",
    type: "Hidden Cost",
    price: "~$4,200/mo in missed opportunity",
    icon: <TrendingDown className="w-4 h-4" />,
    weaknesses: [
      "Missing calls = sending customers directly to competitors",
      "No reviews = invisible on Google — losing local SEO",
      "No follow-up = dead leads piling up",
      "No data = flying blind on business performance",
      "Falling behind competitors who ARE automating",
      "Every day without action costs ~$140 in missed revenue",
    ],
    yourEdge: [
      "Immediate ROI from Day 1 — first captured call pays for itself",
      "30-day money-back guarantee removes all risk",
      "No long-term contract required",
      "Setup in days, not months",
    ],
    killShot:
      '"Every day you wait, you\'re paying $140 to send customers to your competitor. $497/month to stop that is the easiest ROI you\'ll ever see."',
  },
];

const capabilities = [
  { name: "AI Phone Answering (Voice AI)", icon: <Phone className="w-3.5 h-3.5" /> },
  { name: "AI Webchat & SMS Bot", icon: <MessageSquare className="w-3.5 h-3.5" /> },
  { name: "Website & Funnel Builder", icon: <Globe className="w-3.5 h-3.5" /> },
  { name: "Email/SMS Marketing Campaigns", icon: <Mail className="w-3.5 h-3.5" /> },
  { name: "Social Media Management", icon: <Share2 className="w-3.5 h-3.5" /> },
  { name: "Reputation & Review Management", icon: <Star className="w-3.5 h-3.5" /> },
  { name: "Invoicing & Payments", icon: <CreditCard className="w-3.5 h-3.5" /> },
  { name: "Lead Capture (Forms, Surveys, Scoring)", icon: <ClipboardList className="w-3.5 h-3.5" /> },
  { name: "Advanced Workflow Automation", icon: <Workflow className="w-3.5 h-3.5" /> },
  { name: "Branded Mobile App", icon: <Smartphone className="w-3.5 h-3.5" /> },
];

type FeatureStatus = "yes" | "no" | "partial" | "addon";

interface MatrixFeature {
  name: string;
  starter: FeatureStatus;
  growth: FeatureStatus;
  cheapAi: FeatureStatus;
  diyStack: FeatureStatus;
  receptionist: FeatureStatus;
}

const featureMatrix: MatrixFeature[] = [
  { name: "AI Phone Answering (Voice AI)", starter: "yes", growth: "yes", cheapAi: "yes", diyStack: "partial", receptionist: "no" },
  { name: "AI Webchat & SMS Bot", starter: "yes", growth: "yes", cheapAi: "no", diyStack: "partial", receptionist: "no" },
  { name: "Website & Funnel Builder", starter: "yes", growth: "yes", cheapAi: "no", diyStack: "partial", receptionist: "no" },
  { name: "Email/SMS Marketing Campaigns", starter: "partial", growth: "yes", cheapAi: "no", diyStack: "partial", receptionist: "no" },
  { name: "Social Media Management", starter: "no", growth: "yes", cheapAi: "no", diyStack: "partial", receptionist: "no" },
  { name: "Reputation & Review Management", starter: "yes", growth: "yes", cheapAi: "no", diyStack: "partial", receptionist: "no" },
  { name: "Invoicing & Payments", starter: "yes", growth: "yes", cheapAi: "no", diyStack: "partial", receptionist: "no" },
  { name: "Lead Capture (Forms, Surveys, Scoring)", starter: "yes", growth: "yes", cheapAi: "no", diyStack: "partial", receptionist: "no" },
  { name: "Advanced Workflow Automation", starter: "yes", growth: "yes", cheapAi: "no", diyStack: "no", receptionist: "no" },
  { name: "Branded Mobile App", starter: "yes", growth: "yes", cheapAi: "no", diyStack: "no", receptionist: "no" },
];

function StatusIcon({ status }: { status: FeatureStatus }) {
  if (status === "yes") return <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />;
  if (status === "no") return <XCircle className="w-4 h-4 text-red-400 mx-auto" />;
  if (status === "partial") return <Minus className="w-4 h-4 text-yellow-500 mx-auto" />;
  return <Minus className="w-4 h-4 text-yellow-500 mx-auto" />;
}

export default function BattleCards() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight" data-testid="text-battlecards-title">
          Battle Cards
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Know exactly what to say when prospects mention a competitor or hesitate. Tap any card for the kill shot.
        </p>
      </div>

      {/* Platform Capability Summary */}
      <Card data-testid="card-capabilities-summary">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-500" />
            TotalFlow AI — 10 Capabilities, One Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-2.5 py-2"
              >
                <span className="text-orange-500 shrink-0">{cap.icon}</span>
                {cap.name}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px]">
              Starter $497/mo
            </Badge>
            <Badge className="bg-orange-500/15 text-orange-500 border-orange-500/30 text-[10px]">
              Growth $997/mo
            </Badge>
            <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/40 text-[10px]">
              Scale $1,997/mo
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="cards" className="w-full" data-testid="tabs-battlecards">
        <TabsList className="bg-transparent p-0 gap-1">
          <TabsTrigger
            value="cards"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs rounded-full px-3 py-1.5"
            data-testid="tab-trigger-cards"
          >
            <Swords className="w-3 h-3 mr-1" /> Competitor Cards
          </TabsTrigger>
          <TabsTrigger
            value="matrix"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs rounded-full px-3 py-1.5"
            data-testid="tab-trigger-matrix"
          >
            <Shield className="w-3 h-3 mr-1" /> Feature Comparison Matrix
          </TabsTrigger>
        </TabsList>

        {/* Competitor Cards Tab */}
        <TabsContent value="cards" className="mt-4 space-y-4">
          {competitors.map((comp) => {
            const isExpanded = expandedCard === comp.id;
            return (
              <Card
                key={comp.id}
                className="overflow-hidden"
                data-testid={`card-competitor-${comp.id}`}
              >
                <CardContent className="p-0">
                  {/* Card Header Row */}
                  <div className="p-4 flex items-start justify-between gap-3 border-b">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                        {comp.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{comp.name}</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="secondary" className="text-[10px]">
                            {comp.type}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[10px] text-red-500 border-red-500/20"
                          >
                            {comp.price}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-orange-500 text-white text-[10px] shrink-0">
                      TotalFlow from $497/mo
                    </Badge>
                  </div>

                  {/* Cost Breakdown for DIY Stack */}
                  {comp.costBreakdown && (
                    <div className="px-4 py-3 border-b bg-muted/20">
                      <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> Their Cost Breakdown
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
                        {comp.costBreakdown.map((item, i) => (
                          <div key={i} className="flex justify-between text-xs text-muted-foreground">
                            <span>{item.item}</span>
                            <span className="font-medium text-foreground">{item.cost}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Two-Column Body */}
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                    {/* Weaknesses */}
                    <div className="p-4">
                      <div className="text-[10px] font-semibold text-red-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Their Weaknesses
                      </div>
                      <ul className="space-y-1.5">
                        {comp.weaknesses.map((w, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-1.5 text-xs text-muted-foreground"
                          >
                            <XCircle className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Your Edge + Kill Shot */}
                    <div className="p-4 space-y-3">
                      <div>
                        <div className="text-[10px] font-semibold text-green-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                          <Zap className="w-3 h-3" /> Your Edge
                        </div>
                        <ul className="space-y-1">
                          {comp.yourEdge.map((edge, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5 text-xs bg-green-500/5 border border-green-500/10 rounded-lg px-2 py-1.5"
                            >
                              <CheckCircle className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                              {edge}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Kill Shot - Toggle */}
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-between text-[10px] font-semibold text-orange-500 uppercase tracking-wide px-0 hover:bg-transparent hover:text-orange-600"
                          onClick={() => toggleCard(comp.id)}
                          data-testid={`btn-killshot-${comp.id}`}
                        >
                          <span className="flex items-center gap-1">
                            <Swords className="w-3 h-3" /> Kill Shot — Say This
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </Button>
                        {isExpanded && (
                          <div
                            className="text-xs bg-orange-500/5 border border-orange-500/10 rounded-lg p-3 leading-relaxed mt-1 italic"
                            data-testid={`killshot-content-${comp.id}`}
                          >
                            {comp.killShot}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Feature Comparison Matrix Tab */}
        <TabsContent value="matrix" className="mt-4" data-testid="tab-content-matrix">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">
                Feature Comparison — All 10 Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-xs" data-testid="table-feature-matrix">
                <thead>
                  <tr className="border-b border-t">
                    <th className="text-left p-3 font-semibold min-w-[200px]">Capability</th>
                    <th className="text-center p-3 font-semibold text-orange-500 min-w-[100px]">
                      <div>TotalFlow</div>
                      <div className="text-[10px] font-normal">Starter $497</div>
                    </th>
                    <th className="text-center p-3 font-semibold text-orange-500 min-w-[100px]">
                      <div>TotalFlow</div>
                      <div className="text-[10px] font-normal">Growth $997</div>
                    </th>
                    <th className="text-center p-3 font-semibold min-w-[100px]">
                      <div>Cheap AI</div>
                      <div className="text-[10px] font-normal text-muted-foreground">$29–$199</div>
                    </th>
                    <th className="text-center p-3 font-semibold min-w-[100px]">
                      <div>DIY Stack</div>
                      <div className="text-[10px] font-normal text-muted-foreground">$500–$2,000</div>
                    </th>
                    <th className="text-center p-3 font-semibold min-w-[100px]">
                      <div>Receptionist</div>
                      <div className="text-[10px] font-normal text-muted-foreground">$3,000+</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {featureMatrix.map((f, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-b-0 hover:bg-muted/30"
                    >
                      <td className="p-3 font-medium flex items-center gap-2">
                        <span className="text-orange-500 shrink-0">
                          {capabilities[i]?.icon}
                        </span>
                        {f.name}
                      </td>
                      <td className="p-3 text-center">
                        <StatusIcon status={f.starter} />
                      </td>
                      <td className="p-3 text-center">
                        <StatusIcon status={f.growth} />
                      </td>
                      <td className="p-3 text-center">
                        <StatusIcon status={f.cheapAi} />
                      </td>
                      <td className="p-3 text-center">
                        <StatusIcon status={f.diyStack} />
                      </td>
                      <td className="p-3 text-center">
                        <StatusIcon status={f.receptionist} />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/30 border-t">
                    <td className="p-3 font-semibold">Monthly Cost</td>
                    <td className="p-3 text-center font-bold text-orange-500">$497</td>
                    <td className="p-3 text-center font-bold text-orange-500">$997</td>
                    <td className="p-3 text-center font-medium">$29–$199</td>
                    <td className="p-3 text-center font-medium">$500–$2,000</td>
                    <td className="p-3 text-center font-medium">$3,000+</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-3 font-semibold">Capabilities Included</td>
                    <td className="p-3 text-center font-bold text-orange-500">8 of 10</td>
                    <td className="p-3 text-center font-bold text-orange-500">10 of 10</td>
                    <td className="p-3 text-center font-medium text-red-400">1</td>
                    <td className="p-3 text-center font-medium text-yellow-500">6–8*</td>
                    <td className="p-3 text-center font-medium text-red-400">0</td>
                  </tr>
                  <tr className="bg-muted/10">
                    <td className="p-3 font-semibold">Everything Integrated?</td>
                    <td className="p-3 text-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                    <td className="p-3 text-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                    <td className="p-3 text-center">
                      <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                    </td>
                    <td className="p-3 text-center">
                      <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                    </td>
                    <td className="p-3 text-center">
                      <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>
          <div className="flex flex-wrap gap-4 mt-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" /> Included
            </span>
            <span className="flex items-center gap-1">
              <Minus className="w-3 h-3 text-yellow-500" /> Partial / Limited
            </span>
            <span className="flex items-center gap-1">
              <XCircle className="w-3 h-3 text-red-400" /> Not Included
            </span>
            <span>*DIY Stack requires 6+ separate tools with no integration between them</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
