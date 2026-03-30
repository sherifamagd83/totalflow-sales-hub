import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Copy,
  Check,
  MessageCircle,
  Volume2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface TalkTrack {
  id: number;
  scenario: string;
  objection: string;
  response: string;
  toneGuidance: string;
  pacingNotes: string;
  emphasisWords: string[];
}

const TALK_TRACKS: TalkTrack[] = [
  {
    id: 1,
    scenario: '"Too expensive"',
    objection:
      "I get it, but $497 a month? That's a lot for my small business. I'm not sure I can justify that.",
    response:
      "I totally understand — and honestly, I'd question it too if I didn't see the numbers every day. Let me ask you this: how many calls do you think you miss in a week? Even just 3? At your average ticket... that's probably $2,000 to $4,000 a month walking out the door. TotalFlow pays for itself with **one recovered call**. We're not an expense — we're the thing that **stops the bleeding**. And there's a **30-day money-back guarantee**, so if the math doesn't work, you get every penny back.",
    toneGuidance:
      "Tone: Calm, empathetic → shift to confident when presenting numbers. Never defensive. You believe in the ROI because you've seen it.",
    pacingNotes:
      "Pause after 'how many calls do you think you miss in a week?' Let them answer. Their own number sells for you.",
    emphasisWords: ["one recovered call", "stops the bleeding", "30-day money-back guarantee"],
  },
  {
    id: 2,
    scenario: '"I\'ve seen cheaper AI services"',
    objection:
      "Yeah, I've seen other AI phone answering services for like $100 a month. Why would I pay five times that?",
    response:
      "Great question — and you're right, there are cheaper options out there. But here's what they don't tell you: those are **one-trick ponies**. They answer the phone and that's it. TotalFlow is **10 tools in one platform** — AI phone, AI text-back, CRM, automated follow-ups, review requests, appointment booking, email marketing, a mobile app, reporting dashboard, and reputation management. If you bought all of those separately, you'd be spending **$3,000+ a month** and logging into 6 different tools. We replace all of that for **one flat price** with **one login**. It's not even a comparison.",
    toneGuidance:
      "Tone: Confident, not defensive. Acknowledge their point quickly, then pivot with energy. You're excited to explain the difference.",
    pacingNotes:
      "Speed up slightly when listing the 10 tools — the volume of the list is the point. Slow down on 'one flat price, one login' for emphasis.",
    emphasisWords: ["one-trick ponies", "10 tools in one platform", "$3,000+ a month", "one flat price", "one login"],
  },
  {
    id: 3,
    scenario: '"Let me think about it"',
    objection:
      "This looks interesting. Let me think about it and I'll get back to you.",
    response:
      "Absolutely — I never want you to feel rushed. But can I ask... **what specifically** do you want to think about? Is it the price, the setup, whether it'll actually work for your business? Because if there's something I can clear up right now, I'd hate for that to be the reason you keep missing calls for another month. What's the **main thing** on your mind?",
    toneGuidance:
      "Tone: Curious and genuinely helpful — not pushy. You're asking because you care, not because you're trying to corner them.",
    pacingNotes:
      "Pause after 'what specifically do you want to think about?' — this is the key moment. Wait for their answer. Whatever they say IS the real objection. Handle that.",
    emphasisWords: ["what specifically", "main thing"],
  },
  {
    id: 4,
    scenario: '"We already have a CRM"',
    objection:
      "We're already using a CRM. We've got our system set up. I don't want to switch everything.",
    response:
      "I totally respect that — and honestly, most of our clients said the same thing before they switched. Quick question: **how many different tools** are you logging into right now? Your CRM, your phone system, your review platform, your email tool, your booking calendar... it adds up. What TotalFlow does is **consolidate all of that into one place**. Less tabs, less monthly bills, less headache. And the AI handles the stuff your CRM can't — like answering calls at 9 PM, texting leads back in **2 seconds**, and following up automatically so nothing falls through the cracks. We don't replace your process — we **upgrade** it.",
    toneGuidance:
      "Tone: Respectful and understanding first, then consultative. You're not attacking their current setup — you're showing them what they're missing.",
    pacingNotes:
      "Pause after 'how many different tools are you logging into right now?' Let them count. The higher the number, the better your point lands.",
    emphasisWords: ["how many different tools", "consolidate all of that into one place", "2 seconds", "upgrade"],
  },
  {
    id: 5,
    scenario: '"AI sounds robotic"',
    objection:
      "I don't know... AI answering my phones? My customers are going to know it's a robot. That's going to turn people off.",
    response:
      "I hear that a lot — and honestly, that's the best part. **90% of callers have no idea it's AI.** Don't take my word for it — let me prove it to you right now. Pull out your phone and call this number: **(417) 607-6412**. Talk to it like you're a customer. Ask it a question. Try to stump it. I'll wait. ... See? That's what your customers experience. It sounds **natural**, it books appointments, it answers questions about your business, and it works **24/7** without calling in sick. That's the future — and your competitors are already using it.",
    toneGuidance:
      "Tone: Excited and enthusiastic. This is your moment to shine. You LOVE this demo because it does the selling for you.",
    pacingNotes:
      "When you say 'call this number,' slow down and read the number clearly. Then actually pause and let them call. Silence is power here.",
    emphasisWords: ["90% of callers have no idea it's AI", "natural", "24/7"],
  },
  {
    id: 6,
    scenario: '"I\'m too busy to set this up"',
    objection:
      "Look, I'm sure it's great, but I'm slammed right now. I don't have time to learn a new system or set anything up.",
    response:
      "I completely get it — you're running a business, not sitting behind a computer all day. Here's the good news: **you don't set up anything.** Our team does **100% of the build-out for you**. We set up your AI phone agent, your CRM, your automations, your review system — everything. All customized to your business. You just give us 30 minutes for a kickoff call, and within **5 to 7 days**, your entire system is live. After that, you manage everything from a **simple mobile app** — takes 5 minutes a day, max. We built this specifically for busy business owners who **don't have time** to mess around.",
    toneGuidance:
      "Tone: Empathetic first, then reassuring with authority. You're taking the weight off their shoulders.",
    pacingNotes:
      "Emphasize 'you don't set up anything' — pause slightly before and after. It's the relief moment. Then list what you do for them at a conversational pace.",
    emphasisWords: ["you don't set up anything", "100% of the build-out for you", "5 to 7 days", "simple mobile app", "don't have time"],
  },
  {
    id: 7,
    scenario: '"No contract? What if it doesn\'t work?"',
    objection:
      "So there's no contract? What's the catch? And what if it doesn't work for my business?",
    response:
      "No catch at all. **No contracts, cancel anytime.** We don't lock people in because we don't need to — people stay because it works. And to make it even easier, we've got a **30-day money-back guarantee**. If you don't see the value in 30 days, we refund you — no questions, no hassle. We've processed exactly **two refunds** because once people see the missed calls getting answered and the leads coming in, they don't want to go back to the old way. We're so confident in the system that **all the risk is on us**, not on you.",
    toneGuidance:
      "Tone: Reassuring and transparent. Zero pressure. Let the guarantee do the heavy lifting. Your confidence in the product should be obvious.",
    pacingNotes:
      "Slow down on 'no contracts, cancel anytime' — let it land. Speed up slightly on the social proof (two refunds), then slow down again on 'all the risk is on us.'",
    emphasisWords: ["No contracts, cancel anytime", "30-day money-back guarantee", "two refunds", "all the risk is on us"],
  },
  {
    id: 8,
    scenario: '"How is this different from the other GHL guys?"',
    objection:
      "I've talked to other GoHighLevel resellers. What makes you any different?",
    response:
      "Honest question — and I'm glad you asked. Most GHL resellers hand you a login and say 'good luck.' They give you the tools but you have to figure everything out yourself. That's like giving someone a race car but no mechanic, no pit crew, and no map. **TotalFlow is completely done-for-you.** We build your entire system — the AI phone agent that's trained on **your** business, your CRM pipelines, your automations, your follow-up sequences, your review funnels — all of it. Plus our AI voice agent is **custom-trained on your industry**. A plumber's AI sounds different than a dentist's. We don't just give you software — we give you a **full revenue system** with a team behind it. That's the difference between a tool and a **solution**.",
    toneGuidance:
      "Tone: Confident and authoritative. You know the competition and you know why you're better. Not arrogant — just clear.",
    pacingNotes:
      "The race car analogy should be delivered conversationally — almost like an aside. Speed up through the list of what you build, then slow down for 'full revenue system' and 'solution.'",
    emphasisWords: ["TotalFlow is completely done-for-you", "your", "custom-trained on your industry", "full revenue system", "solution"],
  },
];

function TalkTrackCard({ track }: { track: TalkTrack }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const fullText = `Objection: ${track.objection}\n\nResponse: ${track.response.replace(/\*\*/g, "")}\n\nTone: ${track.toneGuidance}\n\nPacing: ${track.pacingNotes}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render response text with bold formatting
  const renderResponse = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-orange-500 font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <Card
      className="transition-all hover:border-orange-500/20"
      data-testid={`talk-track-${track.id}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
              <Mic className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-semibold">
                {track.scenario}
              </CardTitle>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs gap-1"
              onClick={handleCopy}
              data-testid={`copy-track-${track.id}`}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setExpanded(!expanded)}
              data-testid={`toggle-track-${track.id}`}
            >
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0 space-y-4">
          {/* Prospect's objection */}
          <div
            className="rounded-lg bg-muted/50 border border-muted-foreground/10 p-4"
            data-testid={`objection-${track.id}`}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <MessageCircle className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                Prospect Says
              </span>
            </div>
            <p className="text-sm italic text-muted-foreground leading-relaxed">
              "{track.objection}"
            </p>
          </div>

          {/* Ideal response */}
          <div
            className="rounded-lg bg-orange-500/5 border border-orange-500/15 p-4"
            data-testid={`response-${track.id}`}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Volume2 className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-[10px] font-medium text-orange-500 uppercase tracking-wider">
                Your Response
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              {renderResponse(track.response)}
            </p>
          </div>

          {/* Coaching notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              className="rounded-lg border p-3"
              data-testid={`tone-${track.id}`}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Mic className="w-3 h-3 text-purple-500" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Tone & Delivery
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {track.toneGuidance}
              </p>
            </div>

            <div
              className="rounded-lg border p-3"
              data-testid={`pacing-${track.id}`}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Clock className="w-3 h-3 text-blue-500" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Pacing Notes
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {track.pacingNotes}
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function TalkTracks() {
  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6" data-testid="talk-tracks-page">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Mic className="w-6 h-6 text-orange-500" />
          <h1 className="text-xl font-bold tracking-tight" data-testid="talk-tracks-title">
            Talk Tracks
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          How the best responses SOUND — read these out loud to practice
        </p>
      </div>

      {/* Recording Note */}
      <Card className="border-orange-500/20 bg-orange-500/5" data-testid="recording-note">
        <CardContent className="p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Practice & Record</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Record yourself reading these scripts and share the audio files with your team.
              Coming soon: audio player integration.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Talk Track Cards */}
      <div className="space-y-4" data-testid="talk-tracks-list">
        {TALK_TRACKS.map((track) => (
          <TalkTrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
