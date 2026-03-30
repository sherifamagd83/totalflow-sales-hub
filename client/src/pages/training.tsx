import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  MessageSquare,
  Phone,
  Shield,
  DollarSign,
  Zap,
  Star,
  User,
  Bot,
  ChevronRight,
  Award,
  Target,
  Clock,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

/* ═══════════════════════════════════════════════
   SECTION 1: KNOWLEDGE QUIZ
   ═══════════════════════════════════════════════ */

interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correct: number; // index
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  // Product Knowledge
  {
    id: "q1",
    category: "Product",
    question: "How many core capabilities does TotalFlow AI include?",
    options: ["5 — phone, CRM, reviews, booking, dashboard", "8 — phone, CRM, reviews, booking, email, forms, app, chat", "10 — voice AI, chatbot, websites, marketing, social, reputation, payments, forms, workflows, app", "12 — everything above plus SEO and hosting"],
    correct: 2,
    explanation: "TotalFlow AI includes 10 core capabilities: Voice AI, Conversation AI (chatbot), Website/Funnel Builder, Email/SMS Marketing, Social Media Management, Reputation Management, Invoicing & Payments, Lead Capture, Workflow Automation, and Branded Mobile App.",
  },
  {
    id: "q2",
    category: "Product",
    question: "What happens when a customer calls a TotalFlow AI number after hours?",
    options: ["Goes to voicemail like normal", "AI answers, qualifies the lead, books the appointment, and texts confirmation", "AI takes a message and emails it to the owner", "Call forwards to the owner's cell phone"],
    correct: 1,
    explanation: "The AI answers instantly, sounds natural, qualifies the lead by asking about their needs, books the appointment on the calendar, and sends the customer a text confirmation — all automatically.",
  },
  {
    id: "q3",
    category: "Product",
    question: "What channels does TotalFlow's Unified Inbox cover?",
    options: ["Just SMS and email", "SMS, email, and phone", "SMS, email, Instagram DMs, Facebook messages, and Google", "Only social media messages"],
    correct: 2,
    explanation: "The Unified Inbox pulls in SMS, email, Instagram DMs, Facebook Messenger, and Google messages — all in one screen. No more checking 5 different apps.",
  },
  {
    id: "q4",
    category: "Product",
    question: "What does Conversation AI (the chatbot) do that Voice AI doesn't?",
    options: ["Nothing — they're the same thing", "Handles website chat, Instagram DMs, Facebook messages, and SMS text conversations", "Only answers emails", "Replaces the phone system entirely"],
    correct: 1,
    explanation: "Voice AI handles phone calls. Conversation AI handles text-based channels — website chat widget, Instagram DMs, Facebook messages, and SMS conversations. Together they cover every communication channel 24/7.",
  },
  // Pricing
  {
    id: "q5",
    category: "Pricing",
    question: "What are the three TotalFlow AI pricing tiers?",
    options: ["Basic $297, Pro $597, Enterprise $1,497", "Starter $497, Growth $997, Scale $1,997", "Standard $397, Premium $797, Ultimate $1,597", "Solo $497, Team $997, Agency $2,497"],
    correct: 1,
    explanation: "Starter at $497/mo, Growth at $997/mo (most popular), and Scale at $1,997/mo. Growth adds done-for-you marketing. Scale adds multi-location support.",
  },
  {
    id: "q6",
    category: "Pricing",
    question: "What's included in Growth that's NOT in Starter?",
    options: ["AI phone answering and CRM", "Multi-location support and white-label", "Google optimization, local SEO, social media content, landing pages, email/SMS campaigns, review responses", "Just priority support"],
    correct: 2,
    explanation: "Growth adds done-for-you marketing: Google Business optimization, local SEO, social media content 2-3x/week, high-converting landing pages, email/SMS marketing campaigns, review responses within 24hrs, and monthly performance reports.",
  },
  {
    id: "q7",
    category: "Pricing",
    question: "What happens when a prospect signs up for annual billing?",
    options: ["Nothing changes, same price", "10% off monthly only", "Setup fee waived + 20% off monthly price", "Free for the first 3 months"],
    correct: 2,
    explanation: "Annual billing = setup fee waived entirely + 20% off monthly. Starter drops to $398/mo, Growth to $798/mo, Scale to $1,598/mo. This is your best tool for hesitant buyers.",
  },
  {
    id: "q8",
    category: "Pricing",
    question: "What's the setup fee for the Growth plan?",
    options: ["$500", "$997", "$1,497", "$2,497"],
    correct: 3,
    explanation: "Growth setup is $2,497 (waived with annual billing). Starter is $1,497, Scale is $2,997.",
  },
  // Objection Handling
  {
    id: "q9",
    category: "Objections",
    question: "A prospect says 'I've seen AI answering for $29/month.' Best response?",
    options: ["Match the price to win the deal", "Say those services are terrible", "Explain TotalFlow is 10 tools in one — phone AI is just the start. They'd need 5-6 separate tools to match us", "Tell them to go with the cheaper option"],
    correct: 2,
    explanation: "Never trash competitors. Instead, reframe: those are single-purpose AI answering tools. TotalFlow is a complete 10-in-1 platform. They'd need to buy 5-6 separate subscriptions and nothing would be connected.",
  },
  {
    id: "q10",
    category: "Objections",
    question: "Prospect says 'Let me think about it.' What do you do?",
    options: ["Say 'OK, call me when you're ready' and leave", "Ask 'What specifically do you want to think about?' to surface the real objection", "Offer a bigger discount immediately", "Send them a follow-up email next week"],
    correct: 1,
    explanation: "'Let me think about it' is never the real objection. Ask what specifically they want to think about — is it the price, the technology, or whether it'll work? This surfaces the actual concern so you can address it.",
  },
  {
    id: "q11",
    category: "Objections",
    question: "Prospect says the setup fee is too high. Best counter?",
    options: ["Waive the fee to close the deal", "Explain annual billing waives the setup fee + gives 20% off monthly", "Tell them it's non-negotiable", "Say you'll cut it in half"],
    correct: 1,
    explanation: "Never waive fees without a reason — it devalues the product. Instead, pitch annual billing: setup is completely waived AND they get 20% off monthly. Starter annual = $398/mo with zero upfront.",
  },
  // Sales Process
  {
    id: "q12",
    category: "Process",
    question: "What's the single most powerful sales tool during an in-person demo?",
    options: ["A printed brochure", "Calling their number to show it goes to voicemail, then calling the demo line (417) 607-6412", "Showing them a PowerPoint", "Sending them to the website"],
    correct: 1,
    explanation: "Call THEIR number first so they feel the pain (voicemail). Then immediately call the demo line on speaker so they hear the solution. This contrast is the most powerful close tool you have.",
  },
  {
    id: "q13",
    category: "Process",
    question: "Which plan should you lead with for most prospects?",
    options: ["Always Starter — it's the lowest risk", "Always Scale — it's the most revenue", "Growth — it's the best value and includes marketing. Step down to Starter if needed", "Let the prospect decide on their own"],
    correct: 2,
    explanation: "Lead with Growth ($997/mo). It includes done-for-you marketing which is the real differentiator. If they push back on price, step down to Starter. Never lose a deal over $500/mo — get them on Starter and upsell later.",
  },
  {
    id: "q14",
    category: "Process",
    question: "What stat should you use to close?",
    options: ["'Our AI is better than competitors'", "Calculate their specific missed-call revenue loss, then show ROI: 'You need ONE extra job to cover the cost'", "'Everyone in your industry uses us'", "'We have the best reviews'"],
    correct: 1,
    explanation: "Use their OWN numbers. 'You said your average job is $X. Even capturing 2-3 extra calls a month at that rate = $Y. The system pays for itself 10x over.' Personalized math beats generic claims every time.",
  },
  {
    id: "q15",
    category: "Process",
    question: "When's the best time to ask for a referral?",
    options: ["Right after they sign up", "At the 30-day results review — after showing them real numbers", "Never — let them come to you", "After 6 months"],
    correct: 1,
    explanation: "The 30-day review is your best referral moment. You just showed them real results — captured calls, revenue impact, new reviews. They're at peak satisfaction. Ask directly: 'Who do you know that's dealing with the same missed-call problem?'",
  },
];

/* ═══════════════════════════════════════════════
   SECTION 2: ROLE-PLAY SCENARIOS
   ═══════════════════════════════════════════════ */

interface DialogChoice {
  text: string;
  quality: "best" | "ok" | "bad";
  feedback: string;
  nextNodeId: string;
}

interface DialogNode {
  id: string;
  speaker: "prospect" | "system";
  text: string;
  choices: DialogChoice[];
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: typeof Phone;
  vertical: string;
  prospectName: string;
  prospectBusiness: string;
  difficulty: "Easy" | "Medium" | "Hard";
  nodes: DialogNode[];
}

const scenarios: Scenario[] = [
  {
    id: "cold-call-hvac",
    title: "Cold Call — HVAC Owner",
    description: "You're calling Mike, owner of a 3-truck HVAC company. It's 4:30 PM on a Tuesday.",
    icon: Phone,
    vertical: "HVAC",
    prospectName: "Mike",
    prospectBusiness: "Comfort Zone Heating & Cooling",
    difficulty: "Easy",
    nodes: [
      {
        id: "start",
        speaker: "prospect",
        text: "Hello?",
        choices: [
          {
            text: "Hey Mike, this is [Name] with TotalFlow AI. I know you're probably wrapping up jobs — got 30 seconds?",
            quality: "best",
            feedback: "Perfect opener — acknowledges he's busy, asks for permission, keeps it short.",
            nextNodeId: "mike-listening",
          },
          {
            text: "Hi, I'd like to tell you about our AI phone answering and CRM platform that can help your business grow.",
            quality: "bad",
            feedback: "Too salesy and feature-focused. You led with your product instead of his problem. He's going to tune out.",
            nextNodeId: "mike-skeptical",
          },
          {
            text: "Hey Mike, I'm calling from TotalFlow AI. We help HVAC companies in the area. Do you have a few minutes?",
            quality: "ok",
            feedback: "Decent, but 'a few minutes' is too vague and too much to ask a stranger. '30 seconds' is better — it's a smaller commitment.",
            nextNodeId: "mike-listening",
          },
        ],
      },
      {
        id: "mike-listening",
        speaker: "prospect",
        text: "Yeah, make it quick. I'm heading to a job.",
        choices: [
          {
            text: "Quick question — when someone calls your company after hours or while your guys are on jobs, what happens?",
            quality: "best",
            feedback: "Great — you're making him feel the pain by asking HIM to say the problem out loud. That's 10x more powerful than you telling him.",
            nextNodeId: "mike-admits-problem",
          },
          {
            text: "We have an AI that answers your phone 24/7, books appointments, sends follow-ups, manages your CRM, and collects reviews.",
            quality: "ok",
            feedback: "You're listing features instead of connecting to his pain. He hasn't acknowledged the problem yet — slow down and let him feel it first.",
            nextNodeId: "mike-maybe",
          },
          {
            text: "How many calls would you say you miss per week?",
            quality: "ok",
            feedback: "Good direction but too direct — feels like a survey. The 'what happens to that call?' question is softer and gets the same answer.",
            nextNodeId: "mike-admits-problem",
          },
        ],
      },
      {
        id: "mike-skeptical",
        speaker: "prospect",
        text: "I get like 10 of these calls a day. What makes you different?",
        choices: [
          {
            text: "Fair enough. Quick question — when someone calls you after hours, what happens to that call?",
            quality: "best",
            feedback: "Smart pivot — you redirected from a defensive position to making HIM think about his problem. Now he's engaged.",
            nextNodeId: "mike-admits-problem",
          },
          {
            text: "We're the only platform that gives you 10 tools in one — AI phone, chatbot, CRM, marketing, reviews, invoicing...",
            quality: "bad",
            feedback: "He asked what makes you different and you listed features. He's heard this before. You need to connect to his PAIN first.",
            nextNodeId: "mike-done",
          },
          {
            text: "I understand. We work specifically with HVAC companies and know the problems you deal with. Can I just ask one thing?",
            quality: "ok",
            feedback: "Decent save — showing vertical expertise. But get to the pain faster.",
            nextNodeId: "mike-admits-problem",
          },
        ],
      },
      {
        id: "mike-admits-problem",
        speaker: "prospect",
        text: "Honestly? Goes to voicemail. I try to call back but sometimes it's the next day. I know I'm losing jobs over it.",
        choices: [
          {
            text: "Yeah, 80% of people who get voicemail never call back — they just call the next company. That's $4,200 a month on average for HVAC companies. What we do is give you a complete system — AI answers every call 24/7, books the job, follows up automatically, collects reviews, and gives you one dashboard to manage everything. 10 tools in one platform. Can I show you a 5-minute demo tomorrow?",
            quality: "best",
            feedback: "Textbook. You validated his pain with a stat, quantified the cost, presented the full solution, and asked for a specific next step. Well done.",
            nextNodeId: "mike-interested",
          },
          {
            text: "We can fix that. Our AI answers your phone 24/7.",
            quality: "ok",
            feedback: "Too thin — you only mentioned one capability. This is the moment to paint the full picture: AI phone + chatbot + CRM + follow-up + reviews + app. Sell the platform, not just one feature.",
            nextNodeId: "mike-maybe",
          },
          {
            text: "You should definitely get something set up for that. Want me to send you some information?",
            quality: "bad",
            feedback: "'Send information' is where deals go to die. You need to ask for a specific meeting time, not offer to email them a brochure they'll never read.",
            nextNodeId: "mike-done",
          },
        ],
      },
      {
        id: "mike-interested",
        speaker: "prospect",
        text: "Maybe. What does something like this cost?",
        choices: [
          {
            text: "Plans start at $497/month. But before we talk price — let me show you the system so you can see the ROI. What's your average job worth? [Let him answer] So even ONE extra job per month more than covers it. Free tomorrow at 2 or 4?",
            quality: "best",
            feedback: "Perfect price framing — state the number confidently, immediately pivot to ROI, use his own numbers, and give two time options.",
            nextNodeId: "end-success",
          },
          {
            text: "$497 a month plus a setup fee. No contracts though.",
            quality: "ok",
            feedback: "Honest, but you gave the price without any context. Always anchor price to ROI: 'You need ONE extra job to cover it.'",
            nextNodeId: "end-ok",
          },
          {
            text: "It depends on the plan. Let me send you a pricing sheet.",
            quality: "bad",
            feedback: "Never punt on pricing. If they ask, tell them. Vagueness kills trust. And 'send a pricing sheet' means they'll never look at it.",
            nextNodeId: "mike-done",
          },
        ],
      },
      {
        id: "mike-maybe",
        speaker: "prospect",
        text: "I don't know... I'm pretty busy. Can you send me something?",
        choices: [
          {
            text: "I totally get it. How about this — instead of sending you stuff to read, let me call our demo line right now. Takes 60 seconds. You can hear the AI answer and decide if it's worth 5 minutes tomorrow. Deal?",
            quality: "best",
            feedback: "Great recovery. The demo line is your secret weapon. Once they HEAR the AI, their interest level jumps dramatically.",
            nextNodeId: "end-ok",
          },
          {
            text: "Sure, what's your email? I'll send everything over.",
            quality: "bad",
            feedback: "You just lost this lead. Sending information is where deals die. You needed to give him something immediate — the demo line call.",
            nextNodeId: "mike-done",
          },
          {
            text: "Before I do — try calling this number real quick: (417) 607-6412. That's our AI in action. If it impresses you, call me back. Sound fair?",
            quality: "ok",
            feedback: "Better than sending an email, but you're putting all the work on him. It's better if YOU call the demo line while he's on the phone.",
            nextNodeId: "end-ok",
          },
        ],
      },
      {
        id: "mike-done",
        speaker: "system",
        text: "Mike has lost interest and ended the call. The lead is cold.",
        choices: [],
      },
      {
        id: "end-success",
        speaker: "system",
        text: "Mike agreed to a demo. You've got a meeting booked. Great work — that's how you do it.",
        choices: [],
      },
      {
        id: "end-ok",
        speaker: "system",
        text: "Mike is mildly interested but not committed. Follow up within 24 hours or you'll lose him.",
        choices: [],
      },
    ],
  },
  {
    id: "objection-price",
    title: "Objection Handling — \"Too Expensive\"",
    description: "You just demoed for Lisa, owner of a dental practice. She loved it but is pushing back on price.",
    icon: DollarSign,
    vertical: "Dental",
    prospectName: "Lisa",
    prospectBusiness: "Bright Smile Dental",
    difficulty: "Medium",
    nodes: [
      {
        id: "start",
        speaker: "prospect",
        text: "I really like what I saw, but $997 a month is a lot. I'm already paying for Mailchimp and our scheduling software. I don't know if I can justify adding another $1,000.",
        choices: [
          {
            text: "I hear you, Lisa. Quick question — how much are you paying for Mailchimp, your scheduling tool, and your current review system separately?",
            quality: "best",
            feedback: "Smart — you're about to show her she's already paying $300-500+ for tools that don't talk to each other. TotalFlow replaces all of them.",
            nextNodeId: "lisa-adds-up",
          },
          {
            text: "I understand. We can start you on our Starter plan at $497/month instead. That gives you the AI, CRM, booking, follow-ups, and reviews. You can always upgrade to Growth later.",
            quality: "ok",
            feedback: "Good fallback — you didn't lose the deal. But you missed the chance to show her Growth is actually cheaper than her current tool stack. Try the comparison first, step down second.",
            nextNodeId: "lisa-considers-starter",
          },
          {
            text: "Well, it's worth it because we offer a lot of features.",
            quality: "bad",
            feedback: "'It's worth it' is the weakest price defense. You need to quantify the value with HER numbers, not just assert it.",
            nextNodeId: "lisa-pushback",
          },
        ],
      },
      {
        id: "lisa-adds-up",
        speaker: "prospect",
        text: "Hmm... Mailchimp is $75, the scheduling software is $89, we pay $50 for a review tool, and our website is $35 a month. So... around $250?",
        choices: [
          {
            text: "So $250 for 4 separate tools that don't talk to each other. TotalFlow replaces ALL of those — plus adds AI phone answering, a chatbot, CRM, invoicing, workflows, and a mobile app. And everything is connected. Now, you mentioned you get about 15 calls a day — how many go to voicemail?",
            quality: "best",
            feedback: "Now pivot to revenue. She's $250/mo on tools that don't integrate. For $997 she gets 10x the capability PLUS revenue she's currently losing.",
            nextNodeId: "lisa-revenue",
          },
          {
            text: "See? You're already spending $250. $997 isn't that much more for everything we include.",
            quality: "ok",
            feedback: "Right direction but lazy math. '$250 for 4 disconnected tools vs. $997 for 10 connected tools PLUS revenue capture' is much stronger.",
            nextNodeId: "lisa-revenue",
          },
          {
            text: "You could save money by canceling those and switching to us.",
            quality: "bad",
            feedback: "Never frame it as 'saving money.' Frame it as an INVESTMENT with ROI. The goal isn't to save her $250 — it's to capture $5K+ in missed revenue.",
            nextNodeId: "lisa-pushback",
          },
        ],
      },
      {
        id: "lisa-revenue",
        speaker: "prospect",
        text: "Probably... 5-6 calls go to voicemail during lunch and after hours? But some of those are just existing patients calling about their bills.",
        choices: [
          {
            text: "Even if just 3 of those are new patients and you capture 1-2 extra per week — at your average new patient value of $600-800 for the first visit plus lifetime value... that's $2,400-$6,400 a month in captured revenue. The $997 pays for itself in the first week.",
            quality: "best",
            feedback: "You used her numbers to show 3-6x ROI. She can't argue with her own math. Now close: 'Want to get started today or Monday?'",
            nextNodeId: "lisa-close",
          },
          {
            text: "Well, even those billing calls — the AI can handle those too. It can answer common questions and route the rest. You'd free up your front desk for in-person patients.",
            quality: "ok",
            feedback: "Good point about operational efficiency, but you missed the revenue play. New patient revenue is the strongest close — go there first.",
            nextNodeId: "lisa-close",
          },
          {
            text: "5-6 missed calls is a lot. You should really look into fixing that.",
            quality: "bad",
            feedback: "You're telling her what she should do instead of showing her the money. Quantify it. 'At $600 per new patient, 5 missed calls a week is $X per month walking out the door.'",
            nextNodeId: "lisa-pushback",
          },
        ],
      },
      {
        id: "lisa-considers-starter",
        speaker: "prospect",
        text: "$497 sounds more doable. What am I giving up compared to Growth?",
        choices: [
          {
            text: "Starter gives you all the automation — AI phone, chatbot, CRM, follow-ups, reviews, booking, invoicing, forms, and the app. What Growth adds is we do the marketing FOR you: SEO, social media content 2-3x/week, landing pages, and email/SMS campaigns. Starter captures the calls you already get. Growth drives MORE calls to you. Most clients start Starter and upgrade within 60 days once they see the results.",
            quality: "best",
            feedback: "Clear differentiation, no pressure, and you planted the upgrade seed. 'Starter captures, Growth drives' is a great line.",
            nextNodeId: "lisa-close",
          },
          {
            text: "Just the marketing stuff — social media, SEO, landing pages. The core AI and CRM is all in Starter.",
            quality: "ok",
            feedback: "Accurate but too casual. This was a chance to sell the VALUE of what Growth adds, not just list features. Use the 'catch vs. stock the pond' analogy.",
            nextNodeId: "lisa-close",
          },
          {
            text: "Honestly, Growth is way better. You really should go with Growth if you can.",
            quality: "bad",
            feedback: "She literally just told you $997 is too much. Pressuring her toward Growth right now will lose the deal entirely. Get her on Starter, prove value, upsell later.",
            nextNodeId: "lisa-pushback",
          },
        ],
      },
      {
        id: "lisa-pushback",
        speaker: "prospect",
        text: "I don't know... I need to think about this more.",
        choices: [
          {
            text: "Totally fair. What specifically do you want to think about — is it the investment, the technology, or whether it'll work for a dental practice?",
            quality: "best",
            feedback: "Good recovery — you're surfacing the real objection. Whatever she says next, address it directly.",
            nextNodeId: "lisa-close",
          },
          {
            text: "OK, I'll follow up with you next week.",
            quality: "bad",
            feedback: "You let her off the hook. 'Think about it' is almost never about thinking — there's a specific concern she hasn't voiced. Ask what it is.",
            nextNodeId: "end-lost",
          },
          {
            text: "What if I could waive the setup fee? Would that help?",
            quality: "ok",
            feedback: "Discounting before understanding the objection devalues your product. Find out WHAT she's concerned about first. If it's the setup fee specifically, THEN offer annual billing.",
            nextNodeId: "lisa-close",
          },
        ],
      },
      {
        id: "lisa-close",
        speaker: "prospect",
        text: "OK, that makes more sense. What's the next step?",
        choices: [
          {
            text: "We can have you live in 5-7 days. I'll send over the agreement right now, and we'll schedule a 30-minute onboarding call for this week. Does Thursday or Friday work better?",
            quality: "best",
            feedback: "Choice close — two positive options. You assumed the sale and moved straight to logistics. That's how you close.",
            nextNodeId: "end-success",
          },
          {
            text: "I'll send you a proposal and we can go from there.",
            quality: "bad",
            feedback: "'Send a proposal' adds friction and delay. She said she's ready — close NOW. Get the commitment on this call.",
            nextNodeId: "end-lost",
          },
          {
            text: "Great! Let me process the setup fee and we'll get started. No contracts, 30-day money-back guarantee if you're not happy.",
            quality: "ok",
            feedback: "Good urgency but you missed the choice close. 'Thursday or Friday?' is better than open-ended next steps.",
            nextNodeId: "end-success",
          },
        ],
      },
      {
        id: "end-success",
        speaker: "system",
        text: "Lisa signed up. Deal closed. Excellent objection handling — you turned a price pushback into a commitment.",
        choices: [],
      },
      {
        id: "end-lost",
        speaker: "system",
        text: "Lisa went cold and stopped responding. The deal is dead. You needed to surface the real objection and close on the call.",
        choices: [],
      },
    ],
  },
  {
    id: "closing-plumber",
    title: "Closing — Plumbing Company Owner",
    description: "You just finished a great demo for Dave. He's impressed but hasn't said yes yet. Time to close.",
    icon: Target,
    vertical: "Plumbing",
    prospectName: "Dave",
    prospectBusiness: "Dave's Plumbing & Drain",
    difficulty: "Hard",
    nodes: [
      {
        id: "start",
        speaker: "prospect",
        text: "That demo was pretty impressive. The AI really sounded good. But look, I've been running this business for 15 years without any of this fancy tech stuff. Why do I need it now?",
        choices: [
          {
            text: "Dave, 15 years is incredible — you've clearly built something great. The question isn't whether your business is good. It's whether you're capturing EVERY customer who's trying to reach you. You told me you miss about 8 calls a week. At your $400 average ticket... that's $12,800 a month in jobs that are calling you and not getting through.",
            quality: "best",
            feedback: "Respect his experience, validate his business, then use HIS numbers to show the gap. This isn't about 'fancy tech' — it's about money he's already losing.",
            nextNodeId: "dave-numbers",
          },
          {
            text: "Because your competitors are going to start using AI and you'll fall behind if you don't.",
            quality: "bad",
            feedback: "Fear-based selling doesn't work on 15-year veterans. He's survived plenty of trends. You need to show HIM what HE is losing, not scare him about competitors.",
            nextNodeId: "dave-resistant",
          },
          {
            text: "You don't NEED it. But the businesses that use it are going to capture the calls you're missing. It's just math.",
            quality: "ok",
            feedback: "The 'just math' angle is right, but 'You don't need it' undermines your sale. Reframe: 'You've built a great business — imagine how much bigger it would be if you never missed a call.'",
            nextNodeId: "dave-numbers",
          },
        ],
      },
      {
        id: "dave-numbers",
        speaker: "prospect",
        text: "I guess I never really thought about it that way. $12K is a lot. But I'm not a computer guy — I don't want to be managing some software system.",
        choices: [
          {
            text: "You won't. We handle the entire setup. After a 30-minute onboarding call, we build everything for you. Then it runs itself — you just check the app on your phone when you want to see what's coming in. It's like having a receptionist, a marketing team, and a CRM manager all in one, working 24/7, for less than the cost of one part-time employee.",
            quality: "best",
            feedback: "Perfect 'done for you' framing. He's not a tech guy, so emphasize: zero management, runs itself, just check the app. The receptionist analogy makes it tangible.",
            nextNodeId: "dave-almost",
          },
          {
            text: "It's really easy to use. We have a great interface and you can learn it in a few hours.",
            quality: "ok",
            feedback: "'Easy to use' still implies he has to learn something. His objection isn't about difficulty — it's about TIME and EFFORT. 'We do it all for you' is the answer.",
            nextNodeId: "dave-almost",
          },
          {
            text: "You should have your office manager handle it.",
            quality: "bad",
            feedback: "You just added another person to the decision. Now he has to convince his office manager AND himself. Keep it simple: WE handle everything.",
            nextNodeId: "dave-resistant",
          },
        ],
      },
      {
        id: "dave-resistant",
        speaker: "prospect",
        text: "I appreciate the pitch, but I think I'm going to hold off for now.",
        choices: [
          {
            text: "I respect that, Dave. Can I ask one thing — what's holding you back? Is it the price, the technology, or just the timing? I want to make sure I'm not leaving you without something that could help.",
            quality: "best",
            feedback: "Good save attempt. You respected his decision but pushed to surface the real objection. Sometimes 'hold off' means 'I need one more push in the right direction.'",
            nextNodeId: "dave-almost",
          },
          {
            text: "OK, no problem. I'll follow up in a few weeks.",
            quality: "bad",
            feedback: "You accepted the rejection without understanding why. He was impressed by the demo — something specific is holding him back. Find out what it is.",
            nextNodeId: "end-lost",
          },
          {
            text: "I understand. Just so you know, every day without this system, about $600 in jobs are going to your competitors. No pressure, but that's $18,000 by the time I follow up next month.",
            quality: "ok",
            feedback: "The math is powerful but the delivery feels like a guilt trip. Let him arrive at that conclusion himself by asking what he's thinking about.",
            nextNodeId: "dave-almost",
          },
        ],
      },
      {
        id: "dave-almost",
        speaker: "prospect",
        text: "Alright, honestly? My concern is the $1,497 setup fee. That's a big chunk right now. I just had to replace a truck engine last month.",
        choices: [
          {
            text: "I totally get it — unexpected expenses hit hard. Here's what I can do: if you go annual, the setup fee is completely waived. Monthly drops to $398. So instead of $1,497 + $497 this month, it's just $398. Zero upfront. And you're locked into a lower rate for the year.",
            quality: "best",
            feedback: "You found the real objection (cash flow) and solved it with annual billing. Setup waived + 20% off. He gets the system with zero upfront cost.",
            nextNodeId: "dave-close",
          },
          {
            text: "We could split the setup fee into 3 monthly payments if that helps?",
            quality: "ok",
            feedback: "Creative, but annual billing is a better answer — it waives the setup entirely AND gives 20% off. Lead with the best offer.",
            nextNodeId: "dave-close",
          },
          {
            text: "The setup fee covers a lot of custom work. It's really fair for what you get.",
            quality: "bad",
            feedback: "He knows it's fair — he said the demo was impressive. His problem is CASH FLOW right now. Offer the annual billing solution.",
            nextNodeId: "dave-resistant",
          },
        ],
      },
      {
        id: "dave-close",
        speaker: "prospect",
        text: "Wait, no setup fee at all? And $398 a month? That's... actually really reasonable. And I can cancel if it doesn't work?",
        choices: [
          {
            text: "Correct — zero upfront, $398/month, and there's a 30-day money-back guarantee. If you're not happy in the first 30 days, you get a full refund. Zero risk. We can have you live in 5-7 days. Want to kick it off today, or start Monday?",
            quality: "best",
            feedback: "Confirmed the offer, added the guarantee to remove all risk, and hit the choice close. This is textbook closing.",
            nextNodeId: "end-success",
          },
          {
            text: "Yep! Want to sign up?",
            quality: "ok",
            feedback: "Right energy but too casual. Restate the guarantee to remove any last hesitation, then use the choice close with two specific options.",
            nextNodeId: "end-success",
          },
          {
            text: "Yes, and I should mention we also have a Growth plan at $997 that includes marketing...",
            quality: "bad",
            feedback: "He's about to say yes at $398/month and you're trying to upsell to $997?! Close the deal that's in front of you. Upsell at the 30-day review.",
            nextNodeId: "dave-resistant",
          },
        ],
      },
      {
        id: "end-success",
        speaker: "system",
        text: "Dave signed up on annual Starter. $398/month, no setup fee. You turned a 'hold off' into a closed deal by finding the real objection and solving it. That's elite selling.",
        choices: [],
      },
      {
        id: "end-lost",
        speaker: "system",
        text: "Dave didn't sign up and went cold. You gave up too early without surfacing the real objection. Always ask: 'What specifically is holding you back?'",
        choices: [],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════ */

type Mode = "menu" | "quiz" | "quiz-results" | "roleplay" | "roleplay-end";

export default function Training() {
  const [mode, setMode] = useState<Mode>("menu");

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);

  // Roleplay state
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [rpHistory, setRpHistory] = useState<{ speaker: string; text: string; quality?: string; feedback?: string }[]>([]);
  const [rpScore, setRpScore] = useState({ best: 0, ok: 0, bad: 0 });
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastFeedback, setLastFeedback] = useState("");
  const [lastQuality, setLastQuality] = useState<string>("");

  // Quiz logic
  const quizScore = quizAnswers.filter((a, i) => a === quizQuestions[i].correct).length;
  const quizPercent = Math.round((quizScore / quizQuestions.length) * 100);
  const passed = quizPercent >= 80;

  function answerQuiz(optionIndex: number) {
    const newAnswers = [...quizAnswers];
    newAnswers[quizIndex] = optionIndex;
    setQuizAnswers(newAnswers);
    setShowExplanation(true);
  }

  function nextQuestion() {
    setShowExplanation(false);
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setMode("quiz-results");
    }
  }

  function resetQuiz() {
    setQuizIndex(0);
    setQuizAnswers(new Array(quizQuestions.length).fill(null));
    setShowExplanation(false);
    setMode("quiz");
  }

  // Roleplay logic
  function startScenario(idx: number) {
    setSelectedScenario(idx);
    setCurrentNodeId("start");
    setRpHistory([]);
    setRpScore({ best: 0, ok: 0, bad: 0 });
    setShowFeedback(false);
    setMode("roleplay");
  }

  function makeChoice(choice: DialogChoice) {
    const scenario = scenarios[selectedScenario];
    const node = scenario.nodes.find((n) => n.id === currentNodeId)!;

    // Add prospect message + rep choice to history
    setRpHistory((prev) => [
      ...prev,
      { speaker: node.speaker, text: node.text },
      { speaker: "rep", text: choice.text, quality: choice.quality, feedback: choice.feedback },
    ]);

    // Update score
    setRpScore((prev) => ({
      ...prev,
      [choice.quality]: prev[choice.quality as keyof typeof prev] + 1,
    }));

    // Show feedback
    setLastFeedback(choice.feedback);
    setLastQuality(choice.quality);
    setShowFeedback(true);

    // Check if end
    const nextNode = scenario.nodes.find((n) => n.id === choice.nextNodeId);
    if (!nextNode || nextNode.choices.length === 0) {
      // Add the end message to history
      if (nextNode) {
        setTimeout(() => {
          setRpHistory((prev) => [...prev, { speaker: nextNode.speaker, text: nextNode.text }]);
          setMode("roleplay-end");
          setShowFeedback(false);
        }, 2000);
      } else {
        setMode("roleplay-end");
        setShowFeedback(false);
      }
    } else {
      setTimeout(() => {
        setCurrentNodeId(choice.nextNodeId);
        setShowFeedback(false);
      }, 2500);
    }
  }

  const scenario = scenarios[selectedScenario];
  const currentNode = scenario?.nodes.find((n) => n.id === currentNodeId);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-1">
          <GraduationCap className="w-4 h-4" />
          Rep Training
        </div>
        <h1 className="text-xl font-bold text-foreground">Training & Certification</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Master the product, pricing, and pitch. Pass the quiz, then practice with realistic role-play scenarios.
        </p>
      </div>

      {/* ═══ MENU ═══ */}
      {mode === "menu" && (
        <div className="space-y-6">
          {/* Two cards: Quiz + Roleplay */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card
              className="cursor-pointer hover:border-orange-500/40 transition-colors group"
              onClick={() => setMode("quiz")}
              data-testid="card-start-quiz"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto">
                  <Award className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <div className="text-base font-bold group-hover:text-orange-500 transition-colors">Knowledge Quiz</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {quizQuestions.length} questions on product, pricing, objections, and process. Score 80% to pass.
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" /> ~10 minutes
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:border-orange-500/40 transition-colors group"
              onClick={() => {}}
              data-testid="card-start-roleplay"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto">
                  <MessageSquare className="w-7 h-7 text-orange-500" />
                </div>
                <div>
                  <div className="text-base font-bold group-hover:text-orange-500 transition-colors">Role-Play Scenarios</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Practice cold calls, objection handling, and closing with realistic branching dialog.
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Target className="w-3 h-3 mr-1" /> {scenarios.length} scenarios
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Scenario cards */}
          <div>
            <h2 className="text-sm font-semibold mb-3">Choose a Scenario</h2>
            <div className="grid gap-3">
              {scenarios.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Card
                    key={s.id}
                    className="cursor-pointer hover:border-orange-500/40 transition-colors"
                    onClick={() => startScenario(i)}
                    data-testid={`scenario-${s.id}`}
                  >
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold">{s.title}</span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${
                              s.difficulty === "Easy"
                                ? "text-green-500 border-green-500/20"
                                : s.difficulty === "Medium"
                                ? "text-yellow-500 border-yellow-500/20"
                                : "text-red-500 border-red-500/20"
                            }`}
                          >
                            {s.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">{s.vertical}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{s.description}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-3" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ QUIZ ═══ */}
      {mode === "quiz" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Question {quizIndex + 1} of {quizQuestions.length}
            </div>
            <Badge variant="secondary" className="text-[10px]">{quizQuestions[quizIndex].category}</Badge>
          </div>
          <Progress value={((quizIndex + 1) / quizQuestions.length) * 100} className="h-1.5" />

          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="text-base font-semibold text-foreground">
                {quizQuestions[quizIndex].question}
              </div>

              <div className="space-y-2">
                {quizQuestions[quizIndex].options.map((opt, i) => {
                  const answered = quizAnswers[quizIndex] !== null;
                  const isSelected = quizAnswers[quizIndex] === i;
                  const isCorrect = quizQuestions[quizIndex].correct === i;
                  return (
                    <button
                      key={i}
                      onClick={() => !answered && answerQuiz(i)}
                      disabled={answered}
                      className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                        answered
                          ? isCorrect
                            ? "border-green-500/50 bg-green-500/10 text-foreground"
                            : isSelected
                            ? "border-red-500/50 bg-red-500/10 text-foreground"
                            : "border-transparent bg-muted/30 text-muted-foreground opacity-50"
                          : "border-border hover:border-orange-500/40 hover:bg-orange-500/5 text-foreground"
                      }`}
                      data-testid={`quiz-option-${i}`}
                    >
                      <div className="flex items-start gap-2">
                        {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />}
                        {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                        {!answered && <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />}
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className={`p-3 rounded-lg text-sm ${quizAnswers[quizIndex] === quizQuestions[quizIndex].correct ? "bg-green-500/10 border border-green-500/20" : "bg-orange-500/10 border border-orange-500/20"}`}>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-orange-500" />
                    <span>{quizQuestions[quizIndex].explanation}</span>
                  </div>
                </div>
              )}

              {showExplanation && (
                <div className="flex justify-end">
                  <Button onClick={nextQuestion} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 text-sm" data-testid="button-next-question">
                    {quizIndex < quizQuestions.length - 1 ? "Next Question" : "See Results"} <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => setMode("menu")}>
            ← Back to Menu
          </Button>
        </div>
      )}

      {/* ═══ QUIZ RESULTS ═══ */}
      {mode === "quiz-results" && (
        <div className="space-y-5">
          <Card className={`border-2 ${passed ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
            <CardContent className="p-6 text-center space-y-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${passed ? "bg-green-500/10" : "bg-red-500/10"}`}>
                {passed ? <Trophy className="w-8 h-8 text-green-500" /> : <RotateCcw className="w-8 h-8 text-red-500" />}
              </div>
              <div>
                <div className="text-2xl font-bold">{quizScore}/{quizQuestions.length}</div>
                <div className={`text-lg font-semibold ${passed ? "text-green-500" : "text-red-500"}`}>
                  {quizPercent}% — {passed ? "CERTIFIED" : "Not Yet"}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {passed
                  ? "You've demonstrated strong product knowledge. You're ready to sell TotalFlow AI."
                  : "You need 80% to pass. Review the material and try again. Focus on the questions you missed."}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                {!passed && (
                  <Button onClick={resetQuiz} className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                    <RotateCcw className="w-4 h-4" /> Try Again
                  </Button>
                )}
                <Button variant="outline" onClick={() => setMode("menu")} className="gap-2">
                  Back to Menu
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Answer review */}
          <div className="space-y-2">
            <div className="text-sm font-semibold">Question Review</div>
            {quizQuestions.map((q, i) => {
              const correct = quizAnswers[i] === q.correct;
              return (
                <div key={q.id} className={`flex items-start gap-3 p-3 rounded-lg border ${correct ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"}`}>
                  {correct ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                  <div>
                    <div className="text-xs font-medium">{q.question}</div>
                    {!correct && (
                      <div className="text-[10px] text-muted-foreground mt-1">
                        Correct answer: {q.options[q.correct]}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ ROLE-PLAY ═══ */}
      {(mode === "roleplay" || mode === "roleplay-end") && (
        <div className="space-y-4">
          {/* Scenario header */}
          <Card className="bg-muted/30">
            <CardContent className="p-3 flex items-center gap-3">
              <scenario.icon className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{scenario.title}</div>
                <div className="text-[10px] text-muted-foreground">{scenario.prospectName} — {scenario.prospectBusiness}</div>
              </div>
              <Badge variant="outline" className="text-[10px]">{scenario.difficulty}</Badge>
            </CardContent>
          </Card>

          {/* Chat history */}
          <div className="space-y-3">
            {rpHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.speaker === "rep" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  msg.speaker === "rep"
                    ? msg.quality === "best"
                      ? "bg-green-500/10 border border-green-500/20"
                      : msg.quality === "ok"
                      ? "bg-yellow-500/10 border border-yellow-500/20"
                      : msg.quality === "bad"
                      ? "bg-red-500/10 border border-red-500/20"
                      : "bg-orange-500/10 border border-orange-500/20"
                    : msg.speaker === "system"
                    ? "bg-muted border border-border text-center w-full italic"
                    : "bg-blue-500/10 border border-blue-500/20"
                }`}>
                  <div className="text-[10px] font-semibold mb-0.5 opacity-60">
                    {msg.speaker === "rep" ? "👤 You" : msg.speaker === "system" ? "📋 System" : `🎯 ${scenario.prospectName}`}
                  </div>
                  {msg.text}
                  {msg.quality && (
                    <div className="flex items-center gap-1 mt-1.5 text-[10px]">
                      {msg.quality === "best" && <><ThumbsUp className="w-3 h-3 text-green-500" /> Best response</>}
                      {msg.quality === "ok" && <><AlertCircle className="w-3 h-3 text-yellow-500" /> Acceptable</>}
                      {msg.quality === "bad" && <><ThumbsDown className="w-3 h-3 text-red-500" /> Poor choice</>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Feedback overlay */}
          {showFeedback && (
            <Card className={`border ${lastQuality === "best" ? "border-green-500/30 bg-green-500/5" : lastQuality === "ok" ? "border-yellow-500/30 bg-yellow-500/5" : "border-red-500/30 bg-red-500/5"}`}>
              <CardContent className="p-3">
                <div className="flex items-start gap-2 text-sm">
                  {lastQuality === "best" && <ThumbsUp className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />}
                  {lastQuality === "ok" && <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />}
                  {lastQuality === "bad" && <ThumbsDown className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                  <span>{lastFeedback}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Current choices */}
          {mode === "roleplay" && currentNode && currentNode.choices.length > 0 && !showFeedback && (
            <div className="space-y-3">
              {/* Show the prospect's current message */}
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-xl px-3 py-2 text-sm bg-blue-500/10 border border-blue-500/20">
                  <div className="text-[10px] font-semibold mb-0.5 opacity-60">🎯 {scenario.prospectName}</div>
                  {currentNode.text}
                </div>
              </div>

              <div className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Choose your response:</div>
              <div className="space-y-2">
                {currentNode.choices.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => makeChoice(choice)}
                    className="w-full text-left p-3 rounded-lg border border-border hover:border-orange-500/40 hover:bg-orange-500/5 text-sm transition-colors"
                    data-testid={`rp-choice-${i}`}
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Roleplay end */}
          {mode === "roleplay-end" && (
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardContent className="p-5 space-y-4">
                <div className="text-sm font-bold text-center">Scenario Complete</div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <div className="text-lg font-bold text-green-500">{rpScore.best}</div>
                    <div className="text-[10px] text-muted-foreground">Best</div>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-500/10">
                    <div className="text-lg font-bold text-yellow-500">{rpScore.ok}</div>
                    <div className="text-[10px] text-muted-foreground">Acceptable</div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10">
                    <div className="text-lg font-bold text-red-500">{rpScore.bad}</div>
                    <div className="text-[10px] text-muted-foreground">Poor</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Button onClick={() => startScenario(selectedScenario)} variant="outline" className="gap-2">
                    <RotateCcw className="w-4 h-4" /> Try Again
                  </Button>
                  <Button onClick={() => setMode("menu")} className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                    Back to Menu
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {mode === "roleplay" && (
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => setMode("menu")}>
              ← Back to Menu
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
