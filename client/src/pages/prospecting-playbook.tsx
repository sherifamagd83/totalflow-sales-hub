import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  User,
  Phone,
  Mail,
  Linkedin,
  Clock,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Target,
  Zap,
  Globe,
  Star,
  Copy,
  Check,
  AlertCircle,
  Building2,
  Database,
  Filter,
  PhoneOff,
} from "lucide-react";

/* ─── Clay Workflow Steps ─── */
const claySteps = [
  {
    step: 1,
    title: "Build Your Target List in Clay",
    description: "Start with Google Maps data to find local businesses",
    details: [
      "Create a new Clay table",
      "Use the 'Find Companies' enrichment → search by vertical + city (e.g., 'HVAC companies in Kansas City')",
      "Or use Google Maps enrichment → pulls business name, address, phone, website, rating, review count",
      "Filter by: review count (10-100 = sweet spot), rating (3.0-4.5 = room to improve), has website",
      "Add 50-100 businesses per city per vertical",
    ],
    proTip: "Businesses with 10-50 reviews are the sweet spot. Under 10 = too small. Over 200 = probably already has automation.",
  },
  {
    step: 2,
    title: "Enrich with Owner Data",
    description: "Find the actual owner — name, email, cell phone",
    details: [
      "Add 'Find People at Company' enrichment → filter by title: Owner, Founder, President, CEO, General Manager",
      "Add 'Find Email' enrichment → gets their direct business or personal email",
      "Add 'Find Phone Number' enrichment → gets direct/cell phone (this is the gatekeeper bypass)",
      "Add 'Find LinkedIn Profile' enrichment → for social selling and research",
      "Add 'Company Enrichment' → gets employee count, revenue estimate, tech stack",
    ],
    proTip: "The cell phone number is the single most valuable data point. If you have the owner's cell, you skip the gatekeeper entirely.",
  },
  {
    step: 3,
    title: "Score & Prioritize Leads",
    description: "Focus on the hottest prospects first",
    details: [
      "Add a formula column: Score = (low reviews × 3) + (no website chat × 2) + (no online booking × 2) + (bad Google rating × 1)",
      "Sort by score — highest = most pain = easiest to close",
      "Flag any business you called after 5pm that went to voicemail (they NEED TotalFlow)",
      "Tag by vertical so reps can filter to their assigned industries",
      "Mark 'has owner cell' vs 'office number only' — cell phone leads get called first",
    ],
    proTip: "A business with 15 reviews, no website chat, and a voicemail after hours is a 9/10 prospect. They're losing money every day.",
  },
  {
    step: 4,
    title: "Export & Assign to Reps",
    description: "Get the data to your reps so they can start calling",
    details: [
      "Export from Clay as CSV with: Business Name, Owner Name, Cell Phone, Email, Website, Google Rating, Review Count, City, Vertical",
      "Assign 20-30 leads per rep per week",
      "Reps log each contact in the Activity Log page of this Sales Hub",
      "Track deals in the pipeline as they progress",
      "Re-enrich monthly — new businesses open, owners change, data gets stale",
    ],
    proTip: "20 quality leads with owner cell phones will outperform 200 leads with just office numbers. Quality over quantity.",
  },
];

/* ─── Gatekeeper Bypass Scripts ─── */
const gatekeeperScripts = [
  {
    id: "direct-cell",
    title: "Call the Owner's Cell (Best Method)",
    when: "When Clay gives you a direct cell phone number",
    script: "Hey [Owner Name], this is [Your Name] with TotalFlow AI. I know you're probably busy — got 30 seconds?",
    why: "No gatekeeper to bypass. You're talking to the decision maker directly. This is why Clay's phone enrichment is so valuable.",
  },
  {
    id: "early-call",
    title: "Call Early Morning (7-8 AM)",
    when: "Owner answers before staff arrives",
    script: "Hey, is this [Owner Name]? Perfect — I'm [Your Name] with TotalFlow AI. I caught you early because I know once the day starts you're impossible to reach. Got 30 seconds?",
    why: "Most small business owners are at the shop by 7 AM. The receptionist doesn't start until 8-9. Direct line to the boss.",
  },
  {
    id: "after-hours",
    title: "Call After 5 PM",
    when: "Office staff has left, owner is still working",
    script: "Hey [Owner Name], glad I caught you. Most people are gone by now but I figured you'd still be there — that's the life of an owner, right? Quick question...",
    why: "Owners work late. Staff doesn't. After 5pm, the owner often picks up their own phone.",
  },
  {
    id: "referral-drop",
    title: "Name Drop a Referral",
    when: "When a client referred you, or you have a mutual connection",
    script: "Hi, I'm calling for [Owner Name]. [Referrer Name] suggested I reach out — said [Owner] might benefit from what we do. Can you put me through?",
    why: "Gatekeepers let referrals through. If you don't have a real referral, use 'I work with other [industry] companies in the area' — it's softer but still works.",
  },
  {
    id: "wrong-extension",
    title: "The 'Wrong Extension' Trick",
    when: "When you get an automated phone tree",
    script: "[Dial a random extension. When someone answers:] 'Oh, I'm sorry — I was trying to reach [Owner Name]. I must have dialed the wrong extension. Can you transfer me?'",
    why: "Non-sales employees (accounting, warehouse, techs) almost always transfer you without screening. They're not trained as gatekeepers.",
  },
  {
    id: "confident-familiar",
    title: "Sound Like You Know Them",
    when: "When the receptionist asks 'What's this regarding?'",
    script: "'Hey, is [Owner First Name] in? ... Oh, just following up on something we discussed about their Google presence. They'll know what it's about.'",
    why: "Using their first name and sounding familiar makes the gatekeeper assume you have an existing relationship. Never say 'sales call' or 'I'd like to talk about our services.'",
  },
  {
    id: "email-first",
    title: "Email/LinkedIn Before Calling",
    when: "When you have their email from Clay",
    script: "[After sending an email:] 'Hi, I'm following up on an email I sent [Owner Name] earlier this week about their missed call situation. Can you connect me?'",
    why: "Now you have a legitimate reason to call — you're following up, not cold calling. The gatekeeper is more likely to put you through.",
  },
  {
    id: "ask-for-help",
    title: "Ask the Gatekeeper for Help",
    when: "When the gatekeeper blocks you",
    script: "'I totally understand they're busy. Can I ask you — you probably know their schedule better than anyone. When's the best time to catch them for a 2-minute call? Early morning? End of day?'",
    why: "You're acknowledging the gatekeeper's power and asking for their expertise. People help those who respect them. Plus now you know when to call back.",
  },
];

/* ─── Where to Find Owner Info (Free Methods) ─── */
const freeResearch = [
  { source: "Google Business Profile", how: "Search business name → click their GBP listing → often shows owner name under 'About' or in the business description", icon: Globe },
  { source: "Facebook Business Page", how: "Go to their Facebook page → About → often lists owner name, personal Facebook link, and sometimes direct phone", icon: User },
  { source: "State Business Registry", how: "Search '[state] secretary of state business search' → find the LLC/Corp → registered agent is usually the owner", icon: Building2 },
  { source: "LinkedIn", how: "Search '[business name]' on LinkedIn → find employees → filter by title (Owner, Founder, President)", icon: Linkedin },
  { source: "Their Website", how: "Check About page, Team page, or footer. Many small business sites have the owner's name and even direct email", icon: Globe },
  { source: "Yelp", how: "Business owner often responds to reviews with their name. Also check 'Business Owner' section on the listing", icon: Star },
  { source: "BBB (Better Business Bureau)", how: "Search bbb.org → business listing shows principal/owner name and sometimes direct phone", icon: CheckCircle },
  { source: "Google '[Owner Name] [Business Name]'", how: "Once you have the owner's name from any source above, Google them to find cell phone, email, LinkedIn, and personal info", icon: Search },
];

export default function ProspectingPlaybook() {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [expandedScript, setExpandedScript] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function copyText(text: string, id: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-1">
          <Target className="w-4 h-4" />
          Prospecting Playbook
        </div>
        <h1 className="text-xl font-bold text-foreground">
          Find Owners, Bypass Gatekeepers, Fill Your Pipeline
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Use Clay to build lead lists with owner direct contact info. Use these scripts to get past anyone standing between you and the decision maker.
        </p>
      </div>

      {/* Clay Workflow */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-orange-500" />
          Clay Lead Generation Workflow
        </h2>
        <div className="space-y-3">
          {claySteps.map((step) => {
            const isExpanded = expandedStep === step.step;
            return (
              <Card key={step.step} className={isExpanded ? "border-orange-500/30" : ""}>
                <button
                  onClick={() => setExpandedStep(isExpanded ? null : step.step)}
                  className="w-full text-left"
                  data-testid={`clay-step-${step.step}`}
                >
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{step.title}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                  </CardContent>
                </button>

                {isExpanded && (
                  <CardContent className="pt-0 px-4 pb-4">
                    <div className="ml-12 space-y-3">
                      <ul className="space-y-2">
                        {step.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-start gap-2 text-xs bg-orange-500/5 border border-orange-500/20 rounded-lg p-3">
                        <Zap className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span className="text-orange-500 font-medium">Pro Tip: {step.proTip}</span>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Gatekeeper Bypass Scripts */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <PhoneOff className="w-5 h-5 text-orange-500" />
          Gatekeeper Bypass Scripts
          <Badge variant="outline" className="text-xs">8 scripts</Badge>
        </h2>
        <div className="space-y-3">
          {gatekeeperScripts.map((gs) => {
            const isExpanded = expandedScript === gs.id;
            return (
              <Card key={gs.id} className={isExpanded ? "border-orange-500/30" : ""}>
                <button
                  onClick={() => setExpandedScript(isExpanded ? null : gs.id)}
                  className="w-full text-left"
                  data-testid={`gk-script-${gs.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{gs.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          <Badge variant="secondary" className="text-[10px] mr-1">
                            <Clock className="w-2.5 h-2.5 mr-0.5" />
                            {gs.when}
                          </Badge>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                    </div>
                  </CardContent>
                </button>

                {isExpanded && (
                  <CardContent className="pt-0 px-4 pb-4 space-y-3">
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3 relative">
                      <div className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider mb-1">Say This:</div>
                      <div className="text-sm leading-relaxed pr-16">{gs.script}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-7 text-xs"
                        onClick={(e) => { e.stopPropagation(); copyText(gs.script, gs.id); }}
                        data-testid={`copy-gk-${gs.id}`}
                      >
                        {copiedId === gs.id ? <><Check className="w-3 h-3 mr-1 text-green-500" /> Copied</> : <><Copy className="w-3 h-3 mr-1" /> Copy</>}
                      </Button>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <AlertCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Why this works:</strong> {gs.why}</span>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Free Research Methods */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-orange-500" />
          Find Owner Info (Free Methods)
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          When Clay doesn't have the data, or for quick manual research before a walk-in visit.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {freeResearch.map((fr, i) => {
            const Icon = fr.icon;
            return (
              <Card key={i}>
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{fr.source}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{fr.how}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Best Times to Call */}
      <Card className="bg-orange-500/5 border-orange-500/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            Best Times to Reach Owners Directly
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { time: "7:00 - 8:00 AM", reason: "Owner is at the shop before staff arrives. Answers their own phone.", quality: "Excellent" },
            { time: "12:00 - 1:00 PM", reason: "Lunch break — receptionist may step away. Owner eats at their desk.", quality: "Good" },
            { time: "5:00 - 6:30 PM", reason: "Staff has left. Owner is still wrapping up. Direct line.", quality: "Excellent" },
            { time: "Saturday 8:00 - 10:00 AM", reason: "Many owners work Saturdays. No gatekeeper on weekends.", quality: "Good" },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-background/60">
              <div className="text-xs font-bold text-orange-500 w-32 shrink-0">{t.time}</div>
              <div className="text-xs text-muted-foreground flex-1">{t.reason}</div>
              <Badge variant={t.quality === "Excellent" ? "default" : "secondary"} className={`text-[10px] shrink-0 ${t.quality === "Excellent" ? "bg-green-500" : ""}`}>
                {t.quality}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
