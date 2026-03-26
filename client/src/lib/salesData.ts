// ============================================
// TotalFlow AI — Sales Enablement Data
// Complete scripts, objections, demos, and processes
// for multiple verticals
// ============================================

export interface Vertical {
  id: string;
  name: string;
  icon: string;
  painPoints: string[];
  idealClient: string;
  avgDealSize: string;
  closingRate: string;
}

export const verticals: Vertical[] = [
  {
    id: "home-services",
    name: "Home Services",
    icon: "🔧",
    painPoints: [
      "80% of contractor calls go unanswered",
      "Average $12,600/month lost revenue from missed calls",
      "No automated follow-up — leads go cold within 5 minutes",
      "Relying on word-of-mouth with zero digital lead capture",
      "Paying for ads but nobody answers the phone after hours",
    ],
    idealClient: "HVAC, plumbing, electrical, roofing companies doing $500K-$5M/year with 2-20 employees",
    avgDealSize: "$497/mo + $500 setup",
    closingRate: "25-35% from qualified leads",
  },
  {
    id: "legal",
    name: "Legal / Law Firms",
    icon: "⚖️",
    painPoints: [
      "Potential clients call outside business hours and never call back",
      "Intake forms are manual — no automated qualification",
      "Zero follow-up on consultation no-shows",
      "Reputation relies on reviews but nobody asks for them",
      "Paying $200+ per lead on ads with no tracking",
    ],
    idealClient: "Solo practitioners and small firms (1-10 attorneys) in criminal defense, personal injury, family law",
    avgDealSize: "$697/mo + $750 setup",
    closingRate: "30-40% from qualified leads",
  },
  {
    id: "salons",
    name: "Salons & Spas",
    icon: "💇",
    painPoints: [
      "Missed calls while stylists are with clients",
      "No-shows cost $150-$500/day in lost revenue",
      "Client rebooking is manual — 40% of clients lapse",
      "Running 3+ separate tools (booking, social, payments)",
      "No automated review collection despite great service",
    ],
    idealClient: "Salon owners with 2-8 stylists doing $200K-$1M/year",
    avgDealSize: "$397/mo + $500 setup",
    closingRate: "35-45% from qualified leads",
  },
  {
    id: "dental",
    name: "Dental & Medical",
    icon: "🦷",
    painPoints: [
      "35% of dental calls go to voicemail",
      "Patient recall systems are manual and inconsistent",
      "No automated appointment reminders — high no-show rate",
      "New patient intake is paper-based and slow",
      "Online reputation matters but reviews aren't solicited",
    ],
    idealClient: "Private dental practices and small medical offices with 1-5 providers",
    avgDealSize: "$597/mo + $750 setup",
    closingRate: "25-30% from qualified leads",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: "🏠",
    painPoints: [
      "Leads from Zillow/Realtor.com go cold without instant response",
      "No automated drip campaigns for long-cycle buyers",
      "Open house leads collected on paper and never followed up",
      "Agents juggling 5+ tools with no central CRM",
      "No way to track which marketing channels produce closings",
    ],
    idealClient: "Independent agents and small brokerages with 2-15 agents",
    avgDealSize: "$497/mo + $500 setup",
    closingRate: "20-30% from qualified leads",
  },
];

export interface Script {
  id: string;
  name: string;
  type: "cold-call" | "door-to-door" | "follow-up" | "closing" | "cold-email" | "text";
  vertical: string;
  lines: { speaker: "rep" | "prospect" | "note"; text: string }[];
}

export const scripts: Script[] = [
  {
    id: "cold-call-home",
    name: "Cold Call — Home Services",
    type: "cold-call",
    vertical: "home-services",
    lines: [
      { speaker: "note", text: "Best time to call: Tuesday-Thursday, 7-8am or 4-6pm (before/after jobs)" },
      { speaker: "rep", text: "Hey [Name], this is [Your Name] with TotalFlow AI. I know you're probably on a job right now so I'll keep this to 30 seconds — is that cool?" },
      { speaker: "note", text: "Wait for yes. If voicemail, leave a 15-second message and text immediately." },
      { speaker: "rep", text: "I work with [type of contractor] companies in [city] and the #1 thing I keep hearing is that calls come in while you're on the ladder or under a house, and by the time you call back, they've already called someone else. Sound familiar?" },
      { speaker: "prospect", text: "[Usually agrees — this is their biggest pain point]" },
      { speaker: "rep", text: "Yeah, so what we do is — we set up an AI that answers your phone 24/7, sounds like a real person, books the job on your calendar, and sends you a text with the details. Your competitors are losing 80% of their calls. We make sure you don't lose any." },
      { speaker: "rep", text: "I'd love to show you a quick demo — takes 5 minutes. You free tomorrow around [time] or would [alternative time] work better?" },
      { speaker: "note", text: "Always give two specific time options. Never say 'whenever works for you.'" },
    ],
  },
  {
    id: "cold-call-legal",
    name: "Cold Call — Law Firms",
    type: "cold-call",
    vertical: "legal",
    lines: [
      { speaker: "note", text: "Best time: Monday-Wednesday, 8-9am or 12-1pm" },
      { speaker: "rep", text: "Hi, is this [Attorney Name]? This is [Your Name] with TotalFlow AI. I help law firms in [city] capture more clients from the leads they're already generating. Do you have 30 seconds?" },
      { speaker: "prospect", text: "[If receptionist] Can I ask what this is regarding?" },
      { speaker: "rep", text: "Absolutely — I work with [practice area] firms to make sure every potential client who calls or visits their website gets an instant response, even nights and weekends. [Attorney Name] will want to hear this. Is there a good time to reach them directly?" },
      { speaker: "note", text: "When you reach the attorney:" },
      { speaker: "rep", text: "I noticed your firm ranks well on Google and has solid reviews. The question is — how many of those people who call after 5pm or on weekends are you actually converting? Most firms we work with are losing 30-40% of potential clients just because nobody picks up." },
      { speaker: "rep", text: "We set up an AI receptionist that answers every call, qualifies the lead, and books the consultation — 24/7. One firm we work with went from 15 consultations a month to 28 without spending another dollar on ads. Can I show you how it works? It's a 10-minute demo." },
    ],
  },
  {
    id: "door-to-door-home",
    name: "Walk-In / Door-to-Door — Home Services",
    type: "door-to-door",
    vertical: "home-services",
    lines: [
      { speaker: "note", text: "Visit during slow hours (10am-2pm). Bring the tear sheet. Dress business casual — not a suit, not a t-shirt." },
      { speaker: "rep", text: "[Walk in, find the owner or office manager] Hey, I'm [Your Name] — I work with [type] companies in the area. Is [Owner Name] around?" },
      { speaker: "note", text: "If owner isn't there, leave the tear sheet with your card and say:" },
      { speaker: "rep", text: "No worries. Could you give them this? [Hand tear sheet] It shows how contractors in the area are losing about $12,000 a month in missed calls. We fix that. My number's right there — tell them to call or text me anytime." },
      { speaker: "note", text: "If owner IS there:" },
      { speaker: "rep", text: "Quick question — when someone calls your company after hours or while your guys are on a job, what happens to that call?" },
      { speaker: "prospect", text: "[Usually: 'Goes to voicemail' or 'We try to call back']" },
      { speaker: "rep", text: "Yeah, that's what most guys say. Here's the problem — 80% of people who get voicemail never call back. They just call the next company on Google. We set up an AI system that answers every call instantly, sounds like a real person, qualifies the lead, and books it on your calendar. Want to hear what it sounds like? I can call our demo line right now — takes 60 seconds." },
      { speaker: "note", text: "Pull out your phone and call (417) 607-6412 on speaker. Let them hear the AI in action. This is your most powerful sales tool." },
    ],
  },
  {
    id: "follow-up-general",
    name: "Follow-Up After Demo",
    type: "follow-up",
    vertical: "home-services",
    lines: [
      { speaker: "note", text: "Send within 1 hour of the demo. Text first, then email." },
      { speaker: "rep", text: "[TEXT] Hey [Name], it was great chatting. Here's the quick recap: TotalFlow AI answers your calls 24/7, books jobs automatically, and sends review requests to every happy customer. Setup is $500, then $497/mo. We can have you live in 48 hours. Ready to get started?" },
      { speaker: "note", text: "If no response in 24 hours:" },
      { speaker: "rep", text: "[TEXT] Hey [Name], just wanted to follow up. One thing I forgot to mention — our first client in [city] captured 23 missed calls in the first month alone. That's roughly $15K in jobs that would have gone to competitors. Worth a quick chat?" },
      { speaker: "note", text: "If no response in 72 hours:" },
      { speaker: "rep", text: "[TEXT] [Name], no pressure at all. Just know the offer stands whenever you're ready. In the meantime, try calling our demo line at (417) 607-6412 — it'll show you exactly what your callers would experience. Talk soon." },
      { speaker: "note", text: "After 3 follow-ups with no response, add to monthly nurture sequence. Don't burn the bridge." },
    ],
  },
  {
    id: "closing-general",
    name: "Closing Script",
    type: "closing",
    vertical: "home-services",
    lines: [
      { speaker: "note", text: "Use after a successful demo when the prospect is warm." },
      { speaker: "rep", text: "So [Name], based on what you're telling me, you're losing roughly [X] calls per week. At your average job value of [Y], that's about $[Z] in potential revenue walking out the door every month." },
      { speaker: "rep", text: "TotalFlow captures those calls on Day 1. The setup is $500 and it's $497 per month — which means you only need to close ONE extra job per month to more than cover the investment. Most of our clients see a 10-29x return." },
      { speaker: "rep", text: "I can have your system live within 48 hours. Want to get started today, or would you prefer to kick it off Monday?" },
      { speaker: "note", text: "Choice close — always give two positive options. Never ask 'What do you think?' or 'Does that sound good?'" },
      { speaker: "prospect", text: "[If they need to think about it]" },
      { speaker: "rep", text: "Totally understand. What specifically do you want to think about? Is it the investment, the technology, or something else? I want to make sure you have all the info you need." },
      { speaker: "note", text: "This surfaces the real objection. Address it, then trial close again." },
    ],
  },
  {
    id: "cold-email-home",
    name: "Cold Email Sequence — Home Services",
    type: "cold-email",
    vertical: "home-services",
    lines: [
      { speaker: "note", text: "EMAIL 1 — Send Tuesday or Wednesday, 7-8am" },
      { speaker: "rep", text: "Subject: Quick question about [Company Name]\n\nHey [Name],\n\nI was looking at [Company Name] online — solid reviews, great work. Quick question: what happens when someone calls you after hours or while your crew is on a job?\n\nFor most contractors I talk to, those calls go to voicemail. And 80% of people who hit voicemail never call back — they just call the next company on Google.\n\nWe built a system that answers every call 24/7, qualifies the lead, and books it on your calendar automatically. Your callers don't even realize they're not talking to your team.\n\nWorth a 5-minute call to see how it works?\n\n[Your Name]\nTotalFlow AI\n[Phone]" },
      { speaker: "note", text: "EMAIL 2 — Send 3 days later if no response" },
      { speaker: "rep", text: "Subject: Re: Quick question about [Company Name]\n\nHey [Name],\n\nJust wanted to follow up. One thing I should mention — a [type] company we work with captured 23 calls in their first month that would have gone to voicemail. At their average ticket size, that's over $15K in revenue they would have lost.\n\nHere's the best part: you can hear the AI in action right now by calling (417) 607-6412.\n\nLet me know if you want a quick walkthrough.\n\n[Your Name]" },
      { speaker: "note", text: "EMAIL 3 — Send 5 days later. Last touch, keep it short." },
      { speaker: "rep", text: "Subject: Last note\n\nHey [Name],\n\nNot trying to fill your inbox. Just one last thought:\n\nIf you're spending money on Google Ads or SEO but missing calls when they come in, you're basically paying to send customers to your competitors.\n\nWe fix that for $497/month. Happy to show you anytime.\n\n[Your Name]" },
    ],
  },
];

export interface Objection {
  id: string;
  objection: string;
  category: "price" | "trust" | "timing" | "competition" | "technical";
  response: string;
  followUp: string;
}

export const objections: Objection[] = [
  {
    id: "price-too-expensive",
    objection: "That's too expensive / I can't afford $497/month",
    category: "price",
    response: "I totally get it — $497/month is real money. Let me ask you this: how much is one average job worth to you? [Wait for answer] So if our system captures just ONE extra call per month that turns into a job, you're already ahead. Most of our clients see a 10-29x return. The question isn't whether you can afford it — it's whether you can afford to keep losing those calls.",
    followUp: "Would it help if I showed you the math on how many calls you're likely missing right now?",
  },
  {
    id: "price-cheaper-options",
    objection: "I've seen AI answering services for $29-79/month",
    category: "price",
    response: "You're right, those exist. The difference is — those are generic AI answering services. They answer the phone and take a message. That's it. TotalFlow is a complete business system: AI phone answering PLUS a CRM that tracks every lead, automated follow-up sequences, review collection, appointment booking, website, and reputation management. You'd need 5-6 separate tools to match what we do, and you'd be paying more than $497 combined.",
    followUp: "Want me to show you the side-by-side of what's included vs. a basic AI answering service?",
  },
  {
    id: "trust-ai-sounds-fake",
    objection: "AI doesn't sound natural / My customers won't like talking to a robot",
    category: "trust",
    response: "That's a fair concern — let me show you. [Call demo line on speaker] Hear that? 90% of callers don't realize it's AI. And here's the thing — right now, what are your callers getting? Voicemail. Which would you rather your customers experience: a friendly AI that actually helps them and books their appointment, or a voicemail box that 80% of them never leave a message on?",
    followUp: "The choice isn't between AI and a human — it's between AI and nothing.",
  },
  {
    id: "trust-let-me-think",
    objection: "Let me think about it / I need to talk to my partner",
    category: "trust",
    response: "Absolutely, this is a business decision and you should take the time you need. Can I ask — what specifically do you want to think about? Is it the investment, the technology, or whether it'll actually work for your business? I just want to make sure you have all the info you need to make the best decision.",
    followUp: "What would need to be true for this to be a no-brainer for you?",
  },
  {
    id: "timing-too-busy",
    objection: "I'm too busy right now to set something new up",
    category: "timing",
    response: "That's actually the best reason TO do this. You're too busy to answer every call — which means you're definitely missing some. We handle the entire setup. You give us 30 minutes for an onboarding call, and we build everything. Your system is live in 48 hours and from that point on, it runs itself. Zero maintenance on your end.",
    followUp: "When would be a good 30 minutes this week? I'll handle everything else.",
  },
  {
    id: "timing-slow-season",
    objection: "Business is slow right now",
    category: "timing",
    response: "I hear you. But here's the thing — when business is slow, every single lead matters even more. You literally can't afford to miss any. And the best time to build a system is BEFORE the busy season hits. That way when spring comes, you're capturing every call from day one instead of scrambling to set things up when you're slammed.",
    followUp: "What if we got you set up now so you're ready when things pick up?",
  },
  {
    id: "competition-already-have-something",
    objection: "I already have a CRM / answering service / website",
    category: "competition",
    response: "That's great — what are you using? [Listen] Got it. So here's the difference: those are separate tools that don't talk to each other. When someone calls, does it automatically create a lead in your CRM? Does it trigger a follow-up text? Does it request a review after the job? With TotalFlow, everything is connected in one system. One login, one dashboard, everything automated.",
    followUp: "How many hours a week do you spend manually managing those separate tools?",
  },
  {
    id: "competition-diy",
    objection: "I can just do this myself / hire someone",
    category: "competition",
    response: "You absolutely could. Hiring a full-time receptionist runs $2,500-3,500/month plus benefits, and they only work 8 hours a day. Building a comparable system yourself on separate platforms would take 40-60 hours and you'd still need to maintain it. We're $497/month, work 24/7, and we handle all the setup and maintenance. What's your time worth per hour?",
    followUp: "Let me show you everything that's included — I think you'll see why even tech-savvy business owners choose to let us handle it.",
  },
  {
    id: "technical-will-it-work",
    objection: "Will this actually work for my type of business?",
    category: "technical",
    response: "Great question. We customize everything for your specific business. The AI is trained on your services, your pricing, your hours, your service area. It doesn't give generic responses — it sounds like it works for YOUR company. And we test everything before going live so you can hear exactly what your callers will experience.",
    followUp: "Want me to set up a test call so you can experience it as if you were a customer calling your business?",
  },
  {
    id: "technical-contract",
    objection: "Is there a contract / commitment?",
    category: "technical",
    response: "No long-term contract. It's month-to-month. You can cancel anytime. We're confident enough in the results that we don't need to lock you in. Most clients stay because the ROI is obvious within the first 30 days. The only upfront cost is the $500 setup fee, which covers building your custom AI agent, configuring your CRM, and getting everything live.",
    followUp: "Want to get started and see the results for yourself?",
  },
];

export interface DemoStep {
  id: number;
  title: string;
  description: string;
  talkingPoints: string[];
  duration: string;
}

export const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: "The Hook — Show the Problem",
    description: "Start by demonstrating the pain before showing the solution",
    talkingPoints: [
      "\"Let me show you something. I'm going to call your business right now...\" [Call their number — it'll probably go to voicemail]",
      "\"See that? That's what your potential customers experience. 80% of them will never call back.\"",
      "\"Now let me show you what it could sound like...\" [Call demo line (417) 607-6412]",
    ],
    duration: "2 min",
  },
  {
    id: 2,
    title: "Live AI Demo",
    description: "Call the demo line and let the prospect hear the AI in action",
    talkingPoints: [
      "Put it on speaker so they can hear the whole interaction",
      "Ask the AI about services, pricing, and scheduling — show it handles real questions",
      "\"Notice how natural it sounds? 90% of callers don't realize it's AI\"",
      "\"And every call like this automatically creates a lead in your system\"",
    ],
    duration: "3 min",
  },
  {
    id: 3,
    title: "CRM Dashboard Tour",
    description: "Show how every call becomes a tracked, actionable lead",
    talkingPoints: [
      "Show the contacts view — \"Every call, text, form submission lands here\"",
      "Show a contact record — \"Full call recording, transcript, notes, all in one place\"",
      "Show the pipeline — \"You can see exactly where every lead is in your sales process\"",
      "Show automations — \"After a call, a follow-up text goes out automatically in 2 minutes\"",
    ],
    duration: "3 min",
  },
  {
    id: 4,
    title: "Review & Reputation System",
    description: "Show automated review collection",
    talkingPoints: [
      "\"After you complete a job, the system automatically texts the customer asking for a review\"",
      "\"Happy customers get sent to Google. Unhappy customers get sent to you privately so you can fix it\"",
      "\"One of our clients went from 13 to 85 Google reviews in 90 days\"",
    ],
    duration: "2 min",
  },
  {
    id: 5,
    title: "ROI Math & Close",
    description: "Make it a no-brainer with simple math",
    talkingPoints: [
      "\"So [Name], you told me your average job is worth $[X]. How many calls do you think you miss per week? Even 2-3?\"",
      "\"At $[X] per job, even capturing 4 extra calls per month is $[Y] in revenue. The system pays for itself 10x over.\"",
      "\"Setup is $500, then $497/month. We can have you live in 48 hours. Want to get started today or Monday?\"",
    ],
    duration: "3 min",
  },
];

export interface ProcessStep {
  id: number;
  phase: string;
  title: string;
  tasks: string[];
  tips: string[];
  timeframe: string;
}

export const salesProcess: ProcessStep[] = [
  {
    id: 1,
    phase: "Prospect",
    title: "Find & Qualify Leads",
    tasks: [
      "Search Google Maps for businesses in target vertical + city",
      "Look for: low review count (no automation), limited hours, no online booking",
      "Check their website — does it have chat? Booking? Modern design?",
      "Call their number after hours — if it goes to voicemail, they're a prospect",
      "Add to outreach list with notes on specific pain points",
    ],
    tips: [
      "Businesses with 10-50 Google reviews are the sweet spot",
      "If they have a GHL-looking site already, skip them — they might already have the platform",
      "Focus on companies spending on Google Ads but with bad websites — they have budget but need help",
    ],
    timeframe: "1-2 hours/day",
  },
  {
    id: 2,
    phase: "Outreach",
    title: "Make Contact",
    tasks: [
      "Cold call (best) or cold email (volume play)",
      "In-person visits for local businesses (highest conversion)",
      "Send personalized video message via text",
      "Connect on social media and engage before pitching",
      "Drop off tear sheets at their business location",
    ],
    tips: [
      "In-person converts 3x better than cold calls",
      "Always lead with their specific pain, not your product",
      "Text immediately after leaving a voicemail",
      "Follow up 3x minimum before moving to nurture",
    ],
    timeframe: "2-4 hours/day",
  },
  {
    id: 3,
    phase: "Demo",
    title: "Show the Product",
    tasks: [
      "Call their number first to demonstrate the problem",
      "Call demo line (417) 607-6412 on speaker",
      "Walk through CRM dashboard",
      "Show review/reputation system",
      "Do the ROI math with their specific numbers",
    ],
    tips: [
      "In-person demos close at 2x the rate of video calls",
      "Always call THEIR number first so they feel the pain",
      "Let them interact with the AI — have them ask it questions",
      "Get their average job value during the demo for the ROI close",
    ],
    timeframe: "15-20 min per demo",
  },
  {
    id: 4,
    phase: "Close",
    title: "Get the Yes",
    tasks: [
      "Present ROI math: setup ($500) + monthly ($497) vs. revenue captured",
      "Use the choice close: 'Want to start today or Monday?'",
      "Handle objections using the Objection Playbook",
      "Collect payment (setup fee to start)",
      "Schedule onboarding call within 48 hours",
    ],
    tips: [
      "Never ask 'What do you think?' — always give two positive options",
      "If they say 'let me think about it,' ask WHAT they want to think about",
      "The longer the gap between demo and close, the lower the conversion rate",
      "Offering a 30-day satisfaction guarantee reduces friction dramatically",
    ],
    timeframe: "Same day as demo (ideal)",
  },
  {
    id: 5,
    phase: "Onboard",
    title: "Set Up & Launch",
    tasks: [
      "30-minute onboarding call to gather business details",
      "Build custom AI phone agent with their business info",
      "Set up CRM pipeline, automations, and integrations",
      "Configure review request automation",
      "Test everything and get client approval before going live",
    ],
    tips: [
      "Send a welcome text/email immediately after they sign up",
      "Get their business info via a simple intake form",
      "Have them test-call their new AI before going live",
      "Set a 7-day and 30-day check-in on your calendar",
    ],
    timeframe: "24-48 hours to go live",
  },
  {
    id: 6,
    phase: "Retain & Grow",
    title: "Keep & Upsell",
    tasks: [
      "7-day check-in call: 'How's the system working? Any calls captured?'",
      "30-day review: show them their dashboard metrics",
      "Ask for referrals: 'Know any other contractors who'd benefit?'",
      "Collect testimonial/case study after 60 days",
      "Upsell additional services (website redesign, ads management)",
    ],
    tips: [
      "Clients who see their first captured call within 7 days rarely churn",
      "Monthly reports build trust and prevent surprise cancellations",
      "Referrals from happy clients close at 50%+ — always ask",
      "A $100/month referral credit to existing clients is worth it",
    ],
    timeframe: "Ongoing — 15 min/client/month",
  },
];

export interface ROIInput {
  avgJobValue: number;
  missedCallsPerWeek: number;
  monthlyAdSpend: number;
}

export function calculateROI(input: ROIInput) {
  const monthlyMissedCalls = input.missedCallsPerWeek * 4;
  const captureRate = 0.6; // 60% of missed calls captured
  const closeRate = 0.3; // 30% of captured calls close
  const capturedCalls = monthlyMissedCalls * captureRate;
  const newJobs = capturedCalls * closeRate;
  const additionalRevenue = newJobs * input.avgJobValue;
  const monthlyInvestment = 497;
  const roi = additionalRevenue / monthlyInvestment;
  const annualImpact = additionalRevenue * 12;

  return {
    monthlyMissedCalls,
    capturedCalls: Math.round(capturedCalls),
    newJobs: Math.round(newJobs * 10) / 10,
    additionalRevenue: Math.round(additionalRevenue),
    monthlyInvestment,
    roi: Math.round(roi * 10) / 10,
    annualImpact: Math.round(annualImpact),
    paybackDays: Math.round(30 / roi),
  };
}
