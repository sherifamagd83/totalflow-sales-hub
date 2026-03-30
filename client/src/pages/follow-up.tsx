import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Copy,
  CheckCircle,
  Clock,
  MessageSquare,
  Phone,
  UserPlus,
  Send,
  RefreshCw,
  MapPin,
  Undo2,
  User,
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  timing: string;
  icon: typeof Clock;
  body: string;
}

const templates: Template[] = [
  {
    id: "after-voicemail",
    name: "After Voicemail",
    timing: "Send immediately",
    icon: Phone,
    body: "Hey [Name], [Rep] here. Just left you a quick message. I help [industry] companies stop losing customers to missed calls. Our AI answers 24/7, books jobs, follows up, and collects reviews — all in one platform. Worth a 5-min call? Hear it live: (417) 607-6412",
  },
  {
    id: "after-demo-starter",
    name: "After Demo — Starter",
    timing: "Within 1 hour of demo",
    icon: Send,
    body: "Hey [Name], great chatting! Quick recap: TotalFlow AI = AI phone 24/7 + chatbot + CRM + follow-ups + reviews + booking + app. All in one platform. Setup is $1,497, then $497/mo. We can have you live in 5-7 days. Ready to get started? Just reply YES.",
  },
  {
    id: "after-demo-growth",
    name: "After Demo — Growth",
    timing: "Within 1 hour of demo",
    icon: Send,
    body: "Hey [Name], great chatting! Quick recap: TotalFlow AI gives you everything — AI phone, chatbot, CRM, follow-ups, reviews — PLUS we handle your Google optimization, social media, landing pages, and marketing campaigns. $2,497 setup, $997/mo. Live in 5-7 days. Ready?",
  },
  {
    id: "24hr-follow-up",
    name: "24-Hour Follow-Up",
    timing: "No response after 24hrs",
    icon: Clock,
    body: "Hey [Name], wanted to follow up from yesterday. One thing I forgot to mention — if you go annual, we waive the setup fee entirely and take 20% off monthly. That drops Starter to $398/mo with zero upfront. Worth a quick chat?",
  },
  {
    id: "72hr-follow-up",
    name: "72-Hour Follow-Up",
    timing: "No response after 72hrs",
    icon: RefreshCw,
    body: "Hey [Name], no pressure at all. Just know the offer stands whenever you're ready. In the meantime, try calling our demo line at (417) 607-6412 — it'll show you exactly what your callers would experience. Talk soon.",
  },
  {
    id: "referral-ask",
    name: "Referral Ask",
    timing: "After 30-day review",
    icon: UserPlus,
    body: "Hey [Name], glad to hear the results are looking great! Quick question — do you know any other [industry] business owners who are dealing with missed calls or no online presence? I'd love to help them get the same results you're seeing. Happy to send them a quick demo.",
  },
  {
    id: "cold-text",
    name: "Cold Text Outreach",
    timing: "Cold outreach",
    icon: MessageSquare,
    body: "[Name], quick question — how many calls does [Business] miss per week? For most [industry] companies it's 5-8. That's $3,000-$6,000/month going to competitors. We fix that with AI + CRM + marketing automation in one platform. Plans from $497/mo. Hear it: (417) 607-6412",
  },
  {
    id: "after-visit",
    name: "After In-Person Visit",
    timing: "Same day as visit",
    icon: MapPin,
    body: "Hey [Name], great meeting you at [Business] today! Here's what we talked about: TotalFlow AI answers your calls 24/7, books jobs, follows up automatically, and collects Google reviews. Plans start at $497/mo, no contract, 30-day guarantee. Ready to get started?",
  },
  {
    id: "win-back",
    name: "Win-Back (Prospect Went Cold)",
    timing: "Re-engage cold prospect",
    icon: Undo2,
    body: "Hey [Name], I know it's been a while since we chatted. Just wanted to let you know — we recently helped a [industry] company capture $29K in extra monthly revenue from calls they were missing. If that sounds interesting, I'd love to pick up where we left off. No pressure.",
  },
];

function fillTemplate(
  body: string,
  prospectName: string,
  businessName: string,
  industry: string,
  repName: string
): string {
  let result = body;
  result = result.replace(
    /\[Name\]/g,
    prospectName.trim() || "[Name]"
  );
  result = result.replace(
    /\[Business\]/g,
    businessName.trim() || "[Business]"
  );
  result = result.replace(
    /\[industry\]/g,
    industry.trim() || "[industry]"
  );
  result = result.replace(
    /\[Rep\]/g,
    repName.trim() || "[Rep]"
  );
  return result;
}

export default function FollowUp() {
  const [prospectName, setProspectName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [repName, setRepName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6" data-testid="follow-up-center">
      {/* Page header */}
      <div>
        <h1
          className="text-xl font-bold tracking-tight"
          data-testid="text-followup-title"
        >
          Follow-Up Center
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in prospect details below and every template auto-populates. Copy and send.
        </p>
      </div>

      {/* Prospect Details Form */}
      <Card data-testid="card-prospect-details">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-orange-500" />
            Prospect Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Prospect Name
              </label>
              <Input
                data-testid="input-prospect-name"
                placeholder="John Smith"
                value={prospectName}
                onChange={(e) => setProspectName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Business Name
              </label>
              <Input
                data-testid="input-business-name"
                placeholder="Smith's Plumbing"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Industry
              </label>
              <Input
                data-testid="input-industry"
                placeholder="HVAC, plumber, dentist…"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Rep Name
              </label>
              <Input
                data-testid="input-rep-name"
                placeholder="Your Name"
                value={repName}
                onChange={(e) => setRepName(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Cards */}
      <div className="space-y-4">
        {templates.map((template) => {
          const Icon = template.icon;
          const filledText = fillTemplate(
            template.body,
            prospectName,
            businessName,
            industry,
            repName
          );
          const isCopied = copiedId === template.id;

          return (
            <Card key={template.id} data-testid={`card-template-${template.id}`}>
              <CardContent className="p-0">
                {/* Template header */}
                <div className="p-4 flex items-center justify-between border-b">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-sm font-semibold truncate"
                          data-testid={`text-template-name-${template.id}`}
                        >
                          {template.name}
                        </span>
                        <Badge
                          className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px] flex-shrink-0"
                          data-testid={`badge-timing-${template.id}`}
                        >
                          <Clock className="w-2.5 h-2.5 mr-0.5" />
                          {template.timing}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={isCopied ? "outline" : "default"}
                    size="sm"
                    className={
                      isCopied
                        ? "text-xs gap-1.5 h-8 border-green-500/30 text-green-500"
                        : "text-xs gap-1.5 h-8 bg-orange-500 hover:bg-orange-600 text-white"
                    }
                    onClick={() => copyToClipboard(filledText, template.id)}
                    data-testid={`button-copy-${template.id}`}
                  >
                    {isCopied ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {isCopied ? "Copied!" : "Copy"}
                  </Button>
                </div>

                {/* Template body */}
                <div className="p-4">
                  <div
                    className="text-sm leading-relaxed bg-muted/30 rounded-lg px-4 py-3 whitespace-pre-wrap"
                    data-testid={`text-template-body-${template.id}`}
                  >
                    {filledText}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
