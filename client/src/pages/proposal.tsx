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
  FileText,
  Zap,
  Phone,
  Star,
  CalendarCheck,
  TrendingUp,
  DollarSign,
  Copy,
  Printer,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  Shield,
  AlertTriangle,
} from "lucide-react";

type Vertical =
  | "hvac"
  | "plumbing"
  | "electrical"
  | "legal"
  | "dental"
  | "salon"
  | "general";

type Tier = "starter" | "growth" | "scale";
type Billing = "monthly" | "annual";

interface FormData {
  prospectName: string;
  businessName: string;
  vertical: Vertical;
  tier: Tier;
  billing: Billing;
  missedCallsPerWeek: string;
  avgJobValue: string;
  painPoints: string;
}

interface TierInfo {
  name: string;
  price: number;
  annualPrice: number;
  features: string[];
  setupFee: number;
}

const tiers: Record<Tier, TierInfo> = {
  starter: {
    name: "Starter",
    price: 497,
    annualPrice: 447,
    setupFee: 497,
    features: [
      "AI Phone Agent — answers every call 24/7",
      "AI Chatbot for website",
      "Basic CRM with lead tracking",
      "Automated text follow-ups",
      "Google review requests",
      "Mobile app access",
    ],
  },
  growth: {
    name: "Growth",
    price: 997,
    annualPrice: 897,
    setupFee: 997,
    features: [
      "Everything in Starter, plus:",
      "AI Phone Agent with advanced call routing",
      "AI Chatbot for website + social media",
      "Full CRM with pipeline management",
      "Multi-channel follow-ups (text, email, voicemail drops)",
      "Google review collection + management",
      "Appointment scheduling & reminders",
      "Invoicing & payment collection",
      "Lead capture forms & funnels",
      "Mobile app with full functionality",
    ],
  },
  scale: {
    name: "Scale",
    price: 1997,
    annualPrice: 1797,
    setupFee: 0,
    features: [
      "Everything in Growth, plus:",
      "Unlimited AI phone minutes",
      "Multi-location support",
      "Advanced reporting & analytics",
      "Custom integrations",
      "Priority onboarding & support",
      "Dedicated account manager",
      "Custom AI training for your business",
      "White-label options",
      "API access",
    ],
  },
};

const verticalLabels: Record<Vertical, string> = {
  hvac: "HVAC",
  plumbing: "Plumbing",
  electrical: "Electrical",
  legal: "Legal",
  dental: "Dental",
  salon: "Salon",
  general: "General / Other",
};

const CAPTURE_RATE = 0.6;

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function getToday(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Proposal() {
  const [mode, setMode] = useState<"form" | "proposal">("form");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<FormData>({
    prospectName: "",
    businessName: "",
    vertical: "hvac",
    tier: "growth",
    billing: "monthly",
    missedCallsPerWeek: "",
    avgJobValue: "",
    painPoints: "",
  });

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const missedPerWeek = parseFloat(form.missedCallsPerWeek) || 0;
  const jobValue = parseFloat(form.avgJobValue) || 0;
  const missedPerMonth = missedPerWeek * 4.3;
  const monthlyLoss = missedPerMonth * jobValue;
  const capturedRevenue = monthlyLoss * CAPTURE_RATE;
  const tierInfo = tiers[form.tier];
  const monthlyPrice =
    form.billing === "annual" ? tierInfo.annualPrice : tierInfo.price;
  const setupFee =
    form.billing === "annual" ? 0 : tierInfo.setupFee;
  const roi = monthlyPrice > 0 ? capturedRevenue / monthlyPrice : 0;

  const handleGenerate = () => {
    setMode("proposal");
  };

  const handleReset = () => {
    setMode("form");
    setCopied(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `
PROPOSAL — Prepared for ${form.businessName}
Date: ${getToday()}
Prepared by TotalFlow AI

---

THE PROBLEM
${form.businessName} is estimated to be losing ${formatCurrency(monthlyLoss)}/month from missed calls and no automated follow-up.
- Estimated missed calls/week: ${missedPerWeek}
- Average job value: ${formatCurrency(jobValue)}
- Estimated monthly loss: ${formatCurrency(monthlyLoss)}
${form.painPoints ? `\nKey pain points discussed:\n${form.painPoints}` : ""}

---

THE SOLUTION — TotalFlow AI ${tierInfo.name} Plan
${tierInfo.features.map((f) => `• ${f}`).join("\n")}

---

YOUR ROI
- Missed calls captured/month: ~${Math.round(missedPerMonth * CAPTURE_RATE)}
- Revenue captured/month: ${formatCurrency(capturedRevenue)}
- Monthly investment: ${formatCurrency(monthlyPrice)}
- Net gain: ${formatCurrency(capturedRevenue - monthlyPrice)}/month
- ROI: ${roi.toFixed(1)}x return

---

YOUR INVESTMENT
- Plan: ${tierInfo.name} (${formatCurrency(monthlyPrice)}/mo)
- Billing: ${form.billing === "annual" ? "Annual (10% discount)" : "Monthly"}
- Setup fee: ${setupFee > 0 ? formatCurrency(setupFee) : "Waived (annual billing)"}
- Guarantee: 30-day money-back, no contracts

---

WHAT HAPPENS NEXT
1. Sign up today
2. 30-minute onboarding call
3. Live in 5-7 days

---

Hear our AI live: (417) 607-6412
totalflowai.ai

Prepared by TotalFlow AI
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          [data-testid="proposal-output"],
          [data-testid="proposal-output"] * {
            visibility: visible;
          }
          [data-testid="proposal-output"] {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          [data-testid="proposal-actions"] {
            display: none !important;
          }
        }
      `}</style>

      <div data-testid="proposal-page" className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-7 w-7 text-orange-500" />
            <h1 className="text-2xl md:text-3xl font-bold">Proposal Generator</h1>
          </div>
          <p className="text-muted-foreground">
            Fill in prospect details, generate a professional proposal to print, screenshot, or text.
          </p>
        </div>

        {mode === "form" ? (
          /* ===================== INPUT FORM ===================== */
          <Card data-testid="proposal-form">
            <CardHeader>
              <CardTitle className="text-lg">Prospect Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Row: Prospect Name + Business Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="prospectName">
                    Prospect Name
                  </label>
                  <Input
                    id="prospectName"
                    data-testid="input-prospect-name"
                    placeholder="John Smith"
                    value={form.prospectName}
                    onChange={(e) => updateField("prospectName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="businessName">
                    Business Name
                  </label>
                  <Input
                    id="businessName"
                    data-testid="input-business-name"
                    placeholder="Smith's HVAC"
                    value={form.businessName}
                    onChange={(e) => updateField("businessName", e.target.value)}
                  />
                </div>
              </div>

              {/* Row: Vertical + Tier + Billing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vertical</label>
                  <Select
                    value={form.vertical}
                    onValueChange={(v) => updateField("vertical", v as Vertical)}
                  >
                    <SelectTrigger data-testid="select-vertical">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(verticalLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recommended Tier</label>
                  <Select
                    value={form.tier}
                    onValueChange={(v) => updateField("tier", v as Tier)}
                  >
                    <SelectTrigger data-testid="select-tier">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter — $497/mo</SelectItem>
                      <SelectItem value="growth">Growth — $997/mo</SelectItem>
                      <SelectItem value="scale">Scale — $1,997/mo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Billing</label>
                  <Select
                    value={form.billing}
                    onValueChange={(v) => updateField("billing", v as Billing)}
                  >
                    <SelectTrigger data-testid="select-billing">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="annual">Annual (10% off, setup waived)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row: Missed Calls + Avg Job Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="missedCalls">
                    Estimated Missed Calls/Week
                  </label>
                  <Input
                    id="missedCalls"
                    data-testid="input-missed-calls"
                    type="number"
                    placeholder="10"
                    value={form.missedCallsPerWeek}
                    onChange={(e) =>
                      updateField("missedCallsPerWeek", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="jobValue">
                    Average Job Value ($)
                  </label>
                  <Input
                    id="jobValue"
                    data-testid="input-job-value"
                    type="number"
                    placeholder="500"
                    value={form.avgJobValue}
                    onChange={(e) => updateField("avgJobValue", e.target.value)}
                  />
                </div>
              </div>

              {/* Pain Points */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="painPoints">
                  Key Pain Points
                </label>
                <Textarea
                  id="painPoints"
                  data-testid="input-pain-points"
                  placeholder="What you discussed in the demo — missed calls, no follow-up system, losing to competitors, etc."
                  rows={3}
                  value={form.painPoints}
                  onChange={(e) => updateField("painPoints", e.target.value)}
                />
              </div>

              {/* Generate Button */}
              <Button
                data-testid="generate-button"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
                onClick={handleGenerate}
                disabled={!form.businessName.trim()}
              >
                <FileText className="h-5 w-5 mr-2" />
                Generate Proposal
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* ===================== GENERATED PROPOSAL ===================== */
          <>
            {/* Action Buttons */}
            <div
              data-testid="proposal-actions"
              className="flex flex-wrap gap-3"
            >
              <Button
                data-testid="copy-button"
                variant="outline"
                onClick={handleCopy}
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy as Text"}
              </Button>
              <Button
                data-testid="print-proposal-button"
                variant="outline"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Proposal
              </Button>
              <Button
                data-testid="new-proposal-button"
                variant="outline"
                onClick={handleReset}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New Proposal
              </Button>
            </div>

            {/* Proposal Output */}
            <Card
              data-testid="proposal-output"
              className="border-2 border-orange-500/30 overflow-hidden"
            >
              <CardContent className="p-6 md:p-8 space-y-8">
                {/* ---- Header ---- */}
                <div data-testid="proposal-header">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-500 rounded-lg p-2">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xl font-bold">
                        TotalFlow <span className="text-orange-500">AI</span>
                      </span>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{getToday()}</p>
                      <Badge
                        variant="outline"
                        className="border-orange-500 text-orange-500 mt-1"
                      >
                        {tierInfo.name} Plan
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      Prepared for
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold mt-1">
                      {form.businessName || "Your Business"}
                    </h2>
                    {form.prospectName && (
                      <p className="text-muted-foreground mt-1">
                        Attn: {form.prospectName}
                      </p>
                    )}
                  </div>
                </div>

                {/* ---- The Problem ---- */}
                <div data-testid="proposal-problem" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-bold">The Problem</h3>
                  </div>
                  <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-4">
                    <p className="text-base font-medium">
                      {form.businessName || "Your business"} is estimated to be
                      losing{" "}
                      <span className="text-red-500 font-bold">
                        {formatCurrency(monthlyLoss)}/month
                      </span>{" "}
                      from missed calls and no automated follow-up.
                    </p>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {missedPerWeek || "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Missed calls/week
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {jobValue ? formatCurrency(jobValue) : "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Avg job value
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-500">
                          {monthlyLoss > 0 ? formatCurrency(monthlyLoss) : "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Lost/month
                        </p>
                      </div>
                    </div>
                  </div>
                  {form.painPoints && (
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-sm font-semibold mb-1">
                        Key Pain Points Discussed:
                      </p>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {form.painPoints}
                      </p>
                    </div>
                  )}
                </div>

                {/* ---- The Solution ---- */}
                <div data-testid="proposal-solution" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-bold">
                      The Solution — {tierInfo.name} Plan
                    </h3>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <div className="grid gap-2">
                      {tierInfo.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          {feature.endsWith(":") ? (
                            <span className="text-sm font-semibold text-orange-500">
                              {feature}
                            </span>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ---- Your ROI ---- */}
                <div data-testid="proposal-roi" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-bold">Your ROI</h3>
                  </div>
                  <div className="rounded-lg bg-orange-500/5 border border-orange-500/20 p-4">
                    <div className="space-y-3">
                      {/* The Math */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Missed calls/month:
                            </span>
                            <span className="font-medium">
                              {Math.round(missedPerMonth)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              × Avg job value:
                            </span>
                            <span className="font-medium">
                              {formatCurrency(jobValue)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              × Capture rate (60%):
                            </span>
                            <span className="font-medium">60%</span>
                          </div>
                          <div className="border-t border-border pt-2 flex justify-between font-bold">
                            <span>Revenue captured/mo:</span>
                            <span className="text-green-600 dark:text-green-400">
                              {formatCurrency(capturedRevenue)}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Monthly investment:
                            </span>
                            <span className="font-medium">
                              {formatCurrency(monthlyPrice)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Revenue captured:
                            </span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              {formatCurrency(capturedRevenue)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Net gain/mo:
                            </span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              {formatCurrency(capturedRevenue - monthlyPrice)}
                            </span>
                          </div>
                          <div className="border-t border-border pt-2 flex justify-between font-bold">
                            <span>ROI:</span>
                            <span className="text-orange-500 text-lg">
                              {roi.toFixed(1)}x return
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---- Your Investment ---- */}
                <div data-testid="proposal-investment" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-bold">Your Investment</h3>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-orange-500">
                          {formatCurrency(monthlyPrice)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          per month
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {setupFee > 0 ? formatCurrency(setupFee) : "Waived"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          setup fee
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {form.billing === "annual" ? "Annual" : "Monthly"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          billing
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          30 Days
                        </p>
                        <p className="text-xs text-muted-foreground">
                          money-back guarantee
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <Badge
                        variant="outline"
                        className="border-green-500 text-green-600 dark:text-green-400"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        No contracts — cancel anytime
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* ---- What Happens Next ---- */}
                <div data-testid="proposal-next-steps" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-bold">What Happens Next</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        step: "1",
                        title: "Sign Up Today",
                        desc: "Quick and easy — takes less than 5 minutes.",
                        icon: CheckCircle,
                      },
                      {
                        step: "2",
                        title: "30-Min Onboarding Call",
                        desc: "We set up your AI agent, CRM, and automations.",
                        icon: Phone,
                      },
                      {
                        step: "3",
                        title: "Live in 5-7 Days",
                        desc: "Your system is running and capturing leads.",
                        icon: Zap,
                      },
                    ].map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.step}
                          className="rounded-lg bg-muted/50 p-4 text-center"
                        >
                          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 text-white font-bold text-lg mb-2">
                            {s.step}
                          </div>
                          <p className="font-semibold">{s.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {s.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ---- Footer ---- */}
                <div
                  data-testid="proposal-footer"
                  className="border-t border-border pt-6 space-y-3 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4 text-orange-500" />
                    <p className="font-semibold">
                      Hear our AI live:{" "}
                      <span className="text-orange-500">(417) 607-6412</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ArrowRight className="h-4 w-4 text-orange-500" />
                    <p className="font-semibold">
                      <span className="text-orange-500">totalflowai.ai</span>
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    Prepared by TotalFlow AI
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
