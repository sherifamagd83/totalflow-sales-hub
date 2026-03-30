import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Zap, MessageSquare, Phone, ArrowRight, Copy, CheckCircle } from "lucide-react";

interface Pitch {
  id: string;
  duration: string;
  context: string;
  icon: typeof Clock;
  lines: string[];
}

const pitches: Pitch[] = [
  {
    id: "15sec",
    duration: "15 Seconds",
    context: "Voicemail, texting after a missed call, elevator pitch",
    icon: Zap,
    lines: [
      "Hey [Name], [Your Name] with TotalFlow AI. We stop local businesses from losing customers to missed calls. Our AI answers your phone 24/7, books jobs, sends follow-ups, and collects reviews — automatically. One platform replaces 5-6 tools. Want to see a quick demo? Call me back at [number] or text me anytime.",
    ],
  },
  {
    id: "30sec",
    duration: "30 Seconds",
    context: "Cold call opener, networking event, quick intro",
    icon: Zap,
    lines: [
      "Hey [Name], I'm [Your Name] with TotalFlow AI. I work with [industry] companies in [city].",
      "Quick question — when someone calls your business after hours or while you're on a job, what happens to that call?",
      "[Let them answer]",
      "Yeah, that's what most guys say. 80% of people who get voicemail never call back. They just call the next company on Google.",
      "We fix that. Our AI answers every call, books the job, follows up automatically, collects reviews, and gives you one dashboard to run everything — 24/7. Takes 5 minutes to see a demo. You free [time]?",
    ],
  },
  {
    id: "60sec",
    duration: "60 Seconds",
    context: "Cold call full pitch, door-to-door, warm intro from referral",
    icon: Clock,
    lines: [
      "Hey [Name], I'm [Your Name] with TotalFlow AI. I work with [industry] companies in [city] to capture every phone call and turn them into booked jobs.",
      "Here's the problem most [industry] companies face: when you're on a job or it's after hours, calls go to voicemail. And 80% of those callers never call back — they just call your competitor.",
      "What we do is set up a complete business system. AI answers your phone 24/7 — sounds like a real person, knows your services, pricing, hours, service area. It qualifies the lead, books the appointment, and texts the customer a confirmation. Plus you get an AI chatbot on your website and social media that captures leads around the clock.",
      "On top of that: full CRM to track every lead, automated follow-up sequences, Google review collection after every job, appointment reminders, invoicing, lead capture forms, and a mobile app so you can manage everything from your phone. One platform replaces 5-6 separate tools.",
      "One of our clients captured 23 missed calls in their first month — that's about $15,000 in jobs that would have gone to competitors. Another went from 13 to 85 Google reviews in 90 days.",
      "Plans start at $497/month. No contract, 30-day money-back guarantee. Live in 5-7 days.",
      "Worth a 5-minute demo?",
    ],
  },
  {
    id: "2min",
    duration: "2 Minutes",
    context: "Full pitch when you have their attention, scheduled call, in-person visit",
    icon: MessageSquare,
    lines: [
      "Hey [Name], thanks for taking a few minutes. I'm [Your Name] with TotalFlow AI. Let me ask you something — what happens right now when someone calls your business and nobody picks up?",
      "[Let them answer — usually 'voicemail' or 'we try to call back']",
      "That's what I hear from everyone. And here's the scary part — 80% of callers who get voicemail never call back. They Google the next company and call them instead. For the average [industry] company, that's about $12,600 a month in lost revenue.",
      "So here's what we built: a complete business system. First — an AI phone assistant that answers every call, 24/7. Sounds completely natural, 90% of callers don't realize it's AI. It knows your services, pricing, hours, service area. Books the appointment, texts the customer confirmation — all in about 60 seconds.",
      "But that's just the phone. You also get an AI chatbot on your website and social media that captures leads. A full CRM that tracks every single lead from first call to completed job. Automated follow-up sequences — texts, emails, reminders. After every job, it automatically asks for a Google review.",
      "You also get a unified inbox — SMS, email, Instagram DMs, Facebook messages, Google — all in one screen. Plus invoicing, lead capture forms, workflow automation, and a mobile app. One platform, one login, replaces 5-6 tools.",
      "For Growth tier clients, we also handle Google optimization, local SEO, social media content 2-3x per week, landing pages, and email/SMS marketing campaigns. We don't just capture calls — we drive MORE calls.",
      "One of our clients went from 13 Google reviews to 85 in 90 days. Another captured $29,000 in additional monthly revenue from calls they were missing.",
      "Starter plan is $497/month. Growth — which includes the marketing — is $997/month. No contracts, 30-day money-back guarantee. Live in 5-7 days. Go annual and the setup fee is completely waived plus 20% off.",
      "I can show you exactly what it looks like right now — 5-minute demo. Or I can call our demo line and you can hear the AI yourself. What works better?",
    ],
  },
  {
    id: "text",
    duration: "Text Message",
    context: "Send after leaving a voicemail, cold text outreach, follow-up after meeting",
    icon: Phone,
    lines: [
      "AFTER VOICEMAIL:",
      "Hey [Name], [Your Name] here. Just left you a quick message. I help [industry] companies stop losing customers to missed calls. Our AI answers 24/7, books jobs, follows up, and collects reviews — all in one platform. Worth a 5-min call? Hear it live: (417) 607-6412",
      "",
      "COLD TEXT:",
      "[Name], quick question — how many calls does your business miss per week? For most [industry] companies it's 5-8. That's $3,000-$6,000/month going to competitors. We fix that with AI + CRM + marketing automation in one platform. Plans from $497/mo. Hear it: (417) 607-6412",
      "",
      "AFTER IN-PERSON VISIT:",
      "Hey [Name], great meeting you! Quick recap: TotalFlow AI = AI phone 24/7 + chatbot + CRM + follow-ups + reviews + booking + app. All in one platform. Plans start at $497/mo, no contract, 30-day guarantee. Ready to get started? Just reply YES.",
      "",
      "REFERRAL INTRO:",
      "Hey [Name], [Referrer Name] mentioned you might benefit from what we do. We give [industry] companies a complete business system — AI phone, chatbot, CRM, marketing automation, reviews, and more. One platform. Mind if I send you a quick 60-second video?",
    ],
  },
];

export default function QuickPitch() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight" data-testid="text-quickpitch-title">Quick Pitch</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Every situation needs a different length pitch. Pick the right one and deliver it.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {pitches.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => document.getElementById(`pitch-${p.id}`)?.scrollIntoView({ behavior: "smooth" })}
              className="p-3 rounded-lg border text-center hover:border-orange-500/40 hover:bg-orange-500/5 transition-colors"
              data-testid={`button-pitch-${p.id}`}
            >
              <Icon className="w-4 h-4 mx-auto text-orange-500 mb-1" />
              <div className="text-xs font-medium">{p.duration}</div>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {pitches.map((pitch) => {
          const fullText = pitch.lines.join("\n\n");
          return (
            <Card key={pitch.id} id={`pitch-${pitch.id}`} data-testid={`card-pitch-${pitch.id}`}>
              <CardContent className="p-0">
                <div className="p-4 flex items-center justify-between border-b">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px]">
                        <Clock className="w-2.5 h-2.5 mr-0.5" />
                        {pitch.duration}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{pitch.context}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs gap-1 h-7"
                    onClick={() => copyToClipboard(fullText, pitch.id)}
                    data-testid={`button-copy-${pitch.id}`}
                  >
                    {copiedId === pitch.id ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    {copiedId === pitch.id ? "Copied" : "Copy"}
                  </Button>
                </div>
                <div className="p-4 space-y-3">
                  {pitch.lines.map((line, i) => {
                    if (line === "") return <div key={i} className="h-2" />;
                    if (line === line.toUpperCase() && line.endsWith(":")) {
                      return (
                        <div key={i} className="text-[10px] font-bold text-orange-500 uppercase tracking-widest pt-2">
                          {line}
                        </div>
                      );
                    }
                    if (line.startsWith("[")) {
                      return (
                        <div key={i} className="text-sm italic text-yellow-500 bg-yellow-500/5 border border-yellow-500/10 rounded-lg px-3 py-2">
                          {line}
                        </div>
                      );
                    }
                    return (
                      <div key={i} className="text-sm leading-relaxed bg-muted/30 rounded-lg px-3 py-2">
                        {line}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
