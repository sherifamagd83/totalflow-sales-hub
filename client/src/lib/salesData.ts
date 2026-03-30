// ============================================
// TotalFlow AI — Sales Enablement Data
// Complete scripts, objections, demos, and processes
// for multiple verticals
// Aligned with totalflowai.ai pricing & capabilities
// ============================================

/* ─── PRICING & PACKAGES ─── */

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  setupFee: number;
  tagline: string;
  popular?: boolean;
  features: string[];
  bestFor: string;
  upsellTip: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: 497,
    setupFee: 1497,
    tagline: "Never Miss Another Call",
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
    bestFor: "Solo operators and small teams who need to stop missing calls and start automating follow-ups.",
    upsellTip: "Once they see the results at 30 days, pitch Growth: 'Now that you're capturing every call, let's DRIVE more calls with SEO, social media, and marketing campaigns.'",
  },
  {
    id: "growth",
    name: "Growth",
    price: 997,
    setupFee: 2497,
    tagline: "We Drive New Customers To You",
    popular: true,
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
    bestFor: "Growing businesses that want done-for-you marketing on top of the automation. This is where the real money is.",
    upsellTip: "Most businesses should be on Growth. Lead with: 'Starter captures the calls you already get. Growth brings you MORE calls.'",
  },
  {
    id: "scale",
    name: "Scale",
    price: 1997,
    setupFee: 2997,
    tagline: "Multi-Location & Enterprise",
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
    bestFor: "Multi-location businesses, franchises, and companies with $2M+ revenue who need enterprise features.",
    upsellTip: "If they have 2+ locations, go straight to Scale. The per-location cost is way cheaper than running separate systems.",
  },
];

export const annualDiscount = {
  setupWaived: true,
  monthlyDiscount: 0.20, // 20% off
  pitch: "Pay annually: setup fee waived + 20% off monthly. Starter drops to $398/mo, Growth to $798/mo, Scale to $1,598/mo.",
};

/* ─── 10 CORE CAPABILITIES ─── */

export interface Capability {
  id: string;
  number: number;
  name: string;
  shortName: string;
  description: string;
  tier: "starter" | "growth" | "scale";
  sellingPoints: string[];
  whatToSay: string;
}

export const capabilities: Capability[] = [
  {
    id: "voice-ai",
    number: 1,
    name: "AI Phone Answering (Voice AI)",
    shortName: "Voice AI",
    description: "AI answers every call 24/7, qualifies leads, books appointments, and texts you the details. Sounds like a real person.",
    tier: "starter",
    sellingPoints: [
      "80% of callers who get voicemail never call back",
      "AI answers in under 2 rings, day or night",
      "Customized to your business — services, pricing, hours, service area",
      "90% of callers don't realize it's AI",
      "Transfers to a human if the caller requests it",
    ],
    whatToSay: "\"Right now, when someone calls you after hours, what happens? Voicemail. And 80% of those people just call the next company on Google. Our AI answers every call, sounds like your staff, and books the appointment before they even think about calling someone else.\"",
  },
  {
    id: "conversation-ai",
    number: 2,
    name: "AI Webchat & SMS Bot (Conversation AI)",
    shortName: "Chatbot",
    description: "AI chatbot that engages website visitors, responds to Instagram DMs, Facebook messages, and SMS — 24/7.",
    tier: "starter",
    sellingPoints: [
      "Captures website visitors who would otherwise bounce",
      "Responds to Instagram/Facebook DMs automatically",
      "Handles SMS conversations and qualifies leads via text",
      "Books appointments directly from chat",
      "Feels human — not a clunky bot",
    ],
    whatToSay: "\"You know how people message you on Instagram or text your business at 11pm? Right now those sit unanswered until morning — by then they've moved on. Our AI responds instantly across every channel.\"",
  },
  {
    id: "website-funnels",
    number: 3,
    name: "Website & Funnel Builder",
    shortName: "Websites",
    description: "Custom websites, landing pages, and sales funnels — all built in and connected to your CRM.",
    tier: "growth",
    sellingPoints: [
      "Replaces WordPress, Squarespace, Wix, ClickFunnels",
      "Every form submission goes straight into the CRM",
      "Landing pages for specific campaigns or services",
      "Mobile-optimized and fast-loading",
      "No separate hosting fees",
    ],
    whatToSay: "\"You're paying $20-50/month for a website that doesn't talk to anything. Our sites are built into the system — when someone fills out a form, they instantly become a lead in your CRM with automated follow-up.\"",
  },
  {
    id: "marketing-automation",
    number: 4,
    name: "Email & SMS Marketing Campaigns",
    shortName: "Marketing",
    description: "Drip sequences, broadcast campaigns, and multi-touch follow-up that runs on autopilot.",
    tier: "growth",
    sellingPoints: [
      "Automated follow-up sequences (SMS + email)",
      "Seasonal promotions and holiday campaigns",
      "Win-back campaigns for lapsed customers",
      "New customer welcome sequences",
      "Replaces Mailchimp, Constant Contact, etc.",
    ],
    whatToSay: "\"Most businesses get a customer, do the job, and never talk to them again. We set up campaigns that automatically bring them back — seasonal reminders, special offers, rebooking nudges. It's like having a marketing team on autopilot.\"",
  },
  {
    id: "social-media",
    number: 5,
    name: "Social Media Management",
    shortName: "Social Media",
    description: "Content creation and scheduling for Facebook, Instagram, Google Business Profile, and TikTok.",
    tier: "growth",
    sellingPoints: [
      "2-3 posts per week created for you",
      "Scheduled across Facebook, Instagram, GBP, TikTok",
      "Consistent posting builds trust and SEO",
      "Replaces hiring a social media manager ($1,500-3,000/mo)",
      "Tracks engagement and analytics",
    ],
    whatToSay: "\"When's the last time you posted on your business Facebook? A month ago? Three months? Consistent posting is one of the biggest factors in local search ranking. We handle it for you — 2-3 times a week, across every platform.\"",
  },
  {
    id: "reputation-management",
    number: 6,
    name: "Reputation & Review Management",
    shortName: "Reputation",
    description: "Automated review requests, review monitoring, AI-powered review responses, and business listing management.",
    tier: "starter",
    sellingPoints: [
      "Auto-sends review requests after every completed job",
      "Happy customers → Google. Unhappy → private feedback to you",
      "AI responds to every Google review within 24 hours (Growth+)",
      "Monitors reviews across all platforms",
      "One client went from 13 to 85 reviews in 90 days",
    ],
    whatToSay: "\"88% of people trust online reviews as much as a personal recommendation. But most businesses never ask. We automate it — after every job, the customer gets a text asking for a review. You don't have to remember, it just happens.\"",
  },
  {
    id: "invoicing-payments",
    number: 7,
    name: "Invoicing & Payments",
    shortName: "Payments",
    description: "Send invoices, estimates, and collect payments — all from the same platform.",
    tier: "starter",
    sellingPoints: [
      "Send professional invoices from the CRM",
      "Customers can pay online instantly",
      "Track paid vs. unpaid invoices",
      "Send estimates and convert to invoices",
      "No separate payment processor needed",
    ],
    whatToSay: "\"Right now you're probably using QuickBooks or sending invoices from a separate app. With TotalFlow, the same system that books the appointment also sends the invoice and collects payment. Everything in one place.\"",
  },
  {
    id: "lead-capture",
    number: 8,
    name: "Lead Capture (Forms, Surveys, Scoring)",
    shortName: "Lead Capture",
    description: "Custom forms, surveys, and lead scoring that feed directly into your CRM with automated follow-up.",
    tier: "starter",
    sellingPoints: [
      "Embed forms on your website or share via link",
      "Every submission triggers automated follow-up",
      "Lead scoring prioritizes hot leads",
      "Surveys to qualify leads before they book",
      "Replaces Typeform, JotForm, etc.",
    ],
    whatToSay: "\"Instead of a generic 'Contact Us' form that dumps into your email, we build smart forms that qualify the lead and trigger the right follow-up automatically. Hot leads get a call. Warm leads get a nurture sequence.\"",
  },
  {
    id: "workflow-automation",
    number: 9,
    name: "Advanced Workflow Automation",
    shortName: "Workflows",
    description: "Multi-step automation that handles everything from lead capture to job completion to review collection.",
    tier: "starter",
    sellingPoints: [
      "If-then logic: 'If call missed → text back in 30 seconds'",
      "Multi-step sequences: call → book → remind → complete → review → follow-up",
      "Internal notifications to your team",
      "Task assignment and tracking",
      "Conditional branching based on lead behavior",
    ],
    whatToSay: "\"Everything we've talked about — the AI answering, the booking, the follow-up, the reviews — it's all connected through automations that run 24/7 without you touching anything. You literally set it and forget it.\"",
  },
  {
    id: "mobile-app",
    number: 10,
    name: "Branded Mobile App",
    shortName: "Mobile App",
    description: "Run your business from your phone — see leads, respond to messages, check your calendar, track performance.",
    tier: "starter",
    sellingPoints: [
      "See new leads in real-time on your phone",
      "Respond to messages across all channels from one app",
      "Check your calendar and upcoming appointments",
      "View your dashboard and metrics",
      "Works on iPhone and Android",
    ],
    whatToSay: "\"You get an app on your phone that shows you everything — new leads coming in, your calendar, messages, reviews. You can run your entire business from your pocket.\"",
  },
];

/* ─── VERTICALS ─── */

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
      "Running 3-5 separate tools with no integration",
      "No online presence beyond a basic Wix/Google site",
    ],
    idealClient: "HVAC, plumbing, electrical, roofing companies doing $500K-$5M/year with 2-20 employees",
    avgDealSize: "$497-$997/mo + $1,497-$2,497 setup",
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
      "Website is static with no lead capture or chat",
      "Staff spends 15+ hours/week on admin and scheduling",
    ],
    idealClient: "Solo practitioners and small firms (1-10 attorneys) in criminal defense, personal injury, family law",
    avgDealSize: "$997/mo + $2,497 setup",
    closingRate: "30-40% from qualified leads",
  },
  {
    id: "salons",
    name: "Salons & Spas",
    icon: "💇",
    painPoints: [
      "Missed calls while stylists are with clients — 50%+ unanswered",
      "No-shows cost $150-$500/day in lost revenue",
      "Client rebooking is manual — 40% of clients lapse",
      "Running 3+ separate tools (booking, social, payments)",
      "No automated review collection despite great service",
      "Instagram engagement doesn't convert to bookings",
      "No email/SMS marketing to bring back past clients",
    ],
    idealClient: "Salon owners with 2-8 stylists doing $200K-$1M/year",
    avgDealSize: "$497-$997/mo + $1,497-$2,497 setup",
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
      "Paying for Google Ads with no conversion tracking",
      "Front desk overwhelmed with calls, scheduling, and admin",
    ],
    idealClient: "Private dental practices and small medical offices with 1-5 providers",
    avgDealSize: "$997/mo + $2,497 setup",
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
      "Website is a basic IDX template with no lead capture",
      "Social media is inconsistent or nonexistent",
    ],
    idealClient: "Independent agents and small brokerages with 2-15 agents",
    avgDealSize: "$497-$997/mo + $1,497-$2,497 setup",
    closingRate: "20-30% from qualified leads",
  },
  {
    id: "restaurant",
    name: "Restaurants & Food",
    icon: "🍽️",
    painPoints: [
      "Missed reservation and catering calls during rush hours",
      "No automated system for large party or event bookings",
      "Online ordering inquiries go unanswered after hours",
      "Inconsistent review responses — bad reviews sit publicly unanswered",
      "No loyalty or win-back campaigns for past diners",
      "Social media posting is sporadic despite great food photos",
      "Still using pen and paper for reservations",
    ],
    idealClient: "Restaurant owners with 1-3 locations doing $500K-$3M/year",
    avgDealSize: "$497-$997/mo + $1,497-$2,497 setup",
    closingRate: "30-40% from qualified leads",
  },
  {
    id: "auto",
    name: "Auto Services",
    icon: "🚗",
    painPoints: [
      "Missed calls while techs are under cars — 40%+ unanswered",
      "No automated appointment reminders — high no-show rate",
      "Service reminders (oil changes, inspections) are manual or nonexistent",
      "No system to collect reviews after completed service",
      "Website is a basic template with no booking capability",
      "Competitors with more reviews are winning on Google",
      "No way to track which marketing brings customers in",
    ],
    idealClient: "Auto repair shops, tire shops, detailing businesses doing $300K-$2M/year",
    avgDealSize: "$497-$997/mo + $1,497-$2,497 setup",
    closingRate: "25-35% from qualified leads",
  },
  {
    id: "fitness",
    name: "Fitness & Gyms",
    icon: "💪",
    painPoints: [
      "Inquiry calls about memberships go to voicemail after hours",
      "No automated trial-to-member conversion follow-up",
      "Member retention is reactive — no automated win-back for lapsed members",
      "Class/session booking is manual or uses a separate app",
      "No review collection system despite loyal community",
      "Social media engagement doesn't convert to signups",
      "Running 4+ tools (booking, billing, email, website) that don't connect",
    ],
    idealClient: "Gym owners, personal trainers, yoga/pilates studios doing $200K-$2M/year",
    avgDealSize: "$497-$997/mo + $1,497-$2,497 setup",
    closingRate: "30-40% from qualified leads",
  },
  {
    id: "pest-control",
    name: "Pest Control",
    icon: "🐜",
    painPoints: [
      "Emergency pest calls (termites, rodents) go to voicemail after hours",
      "Seasonal demand spikes overwhelm the phone — calls get missed",
      "No automated recurring service reminders (quarterly treatments)",
      "Technicians in the field can't answer the office phone",
      "Low review count compared to competitors",
      "No follow-up system for quotes that weren't accepted",
      "Paying for Google Ads but missing the calls they generate",
    ],
    idealClient: "Pest control companies with 2-10 techs doing $300K-$3M/year",
    avgDealSize: "$497-$997/mo + $1,497-$2,497 setup",
    closingRate: "30-40% from qualified leads",
  },
  {
    id: "roofing",
    name: "Roofing & Exterior",
    icon: "🏗️",
    painPoints: [
      "Storm damage calls surge and overwhelm the phone — 60%+ missed",
      "No system to track leads from door-knocking after storms",
      "Insurance claim follow-ups are manual and inconsistent",
      "Estimates given but never followed up — leads go cold",
      "Low Google reviews despite quality work",
      "No automated text to homeowners after inspections",
      "Website is a basic page with no lead capture",
    ],
    idealClient: "Roofing companies doing $500K-$5M/year with 5-20 crew members",
    avgDealSize: "$497-$997/mo + $1,497-$2,497 setup",
    closingRate: "20-30% from qualified leads",
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    icon: "🧹",
    painPoints: [
      "Quote requests come in after hours and never get answered",
      "No recurring service reminders — clients forget to rebook",
      "Scheduling is manual via text/phone — double bookings happen",
      "No review system despite consistently happy customers",
      "Competing on price because no online reputation to justify premium",
      "No follow-up on estimates that weren't booked",
      "Social media is nonexistent or inconsistent",
    ],
    idealClient: "Residential and commercial cleaning companies doing $100K-$1M/year",
    avgDealSize: "$497/mo + $1,497 setup",
    closingRate: "35-45% from qualified leads",
  },
  {
    id: "pet-services",
    name: "Pet Services",
    icon: "🐕",
    painPoints: [
      "Boarding and grooming calls go to voicemail when staff is with animals",
      "No automated booking confirmations or reminders",
      "Vaccination and grooming recall reminders are manual",
      "No review system despite emotionally loyal customer base",
      "Website has no online booking — clients must call",
      "Seasonal demand (holidays, summer) overwhelms phone lines",
      "No way to send promotions or fill last-minute openings",
    ],
    idealClient: "Pet groomers, boarding facilities, dog trainers, vet clinics doing $200K-$2M/year",
    avgDealSize: "$497/mo + $1,497 setup",
    closingRate: "35-45% from qualified leads",
  },
];

/* ─── SCRIPTS ─── */

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
      { speaker: "rep", text: "Yeah, so here's what we do — we give you a complete business system. AI answers your phone 24/7, books jobs on your calendar, sends follow-up texts automatically, collects Google reviews after every job, and gives you a CRM dashboard to track every lead. One platform replaces 5-6 tools. And your customers don't even realize it's AI." },
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
      { speaker: "rep", text: "We set up a complete client acquisition system — AI receptionist that answers every call and books consultations 24/7, a chatbot on your website that captures leads, automated intake forms, review collection, and a CRM that tracks every potential client from first call to retained. One firm we work with went from 15 consultations a month to 28 without spending another dollar on ads. Can I show you how it works? 10-minute demo." },
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
      { speaker: "rep", text: "No worries. Could you give them this? [Hand tear sheet] It shows how contractors in the area are losing about $12,000 a month in missed calls. We fix that — and a lot more. My number's right there — tell them to call or text me anytime." },
      { speaker: "note", text: "If owner IS there:" },
      { speaker: "rep", text: "Quick question — when someone calls your company after hours or while your guys are on a job, what happens to that call?" },
      { speaker: "prospect", text: "[Usually: 'Goes to voicemail' or 'We try to call back']" },
      { speaker: "rep", text: "Yeah, that's what most guys say. Here's the problem — 80% of people who get voicemail never call back. They just call the next company on Google." },
      { speaker: "rep", text: "We set up a complete system — AI answers every call instantly, books the job, sends follow-up texts, collects reviews, and gives you a dashboard to track everything. Plus we handle your Google listing, social media, and marketing campaigns. One platform, one login, everything automated." },
      { speaker: "rep", text: "Want to hear what the AI sounds like? I can call our demo line right now — takes 60 seconds." },
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
      { speaker: "rep", text: "[TEXT] Hey [Name], great chatting. Quick recap: TotalFlow AI = AI phone answering 24/7 + CRM + automated follow-ups + review collection + booking + your own app. Setup is $1,497, then $497/mo. We can have you live in 5-7 days. Ready to get started?" },
      { speaker: "note", text: "If you demoed the Growth tier:" },
      { speaker: "rep", text: "[TEXT] Hey [Name], great chatting. Quick recap: TotalFlow AI = Everything from the AI system PLUS Google optimization, local SEO, social media content 2-3x/week, marketing campaigns, and landing pages. Setup is $2,497, then $997/mo. We handle everything. Live in 5-7 days. Ready?" },
      { speaker: "note", text: "If no response in 24 hours:" },
      { speaker: "rep", text: "[TEXT] Hey [Name], just wanted to follow up. One thing I forgot to mention — we do annual pricing where we waive the setup fee entirely and take 20% off monthly. That drops Starter to $398/mo with zero setup cost. Worth a quick chat?" },
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
      { speaker: "rep", text: "TotalFlow captures those calls on Day 1. And it doesn't just answer the phone — you get the CRM, the follow-up automation, the review system, the booking, the app, the dashboard. Everything." },
      { speaker: "note", text: "Present the right tier based on their needs:" },
      { speaker: "rep", text: "[For Starter] The investment is $1,497 for setup and $497 per month. You only need ONE extra job per month to more than cover it. Most clients see a 10-29x return." },
      { speaker: "rep", text: "[For Growth — recommended for most] I'd recommend our Growth plan at $997/month with $2,497 setup. That includes everything PLUS we handle your Google optimization, social media, landing pages, and marketing campaigns. You don't just capture more calls — we DRIVE more calls to you." },
      { speaker: "rep", text: "[Annual option] And if you do annual billing, we waive the setup fee entirely and take 20% off monthly. That's a significant savings." },
      { speaker: "rep", text: "We can have your system live in 5-7 days. Want to get started today, or would you prefer to kick it off Monday?" },
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
      { speaker: "rep", text: "Subject: Quick question about [Company Name]\n\nHey [Name],\n\nI was looking at [Company Name] online — solid reviews, great work. Quick question: what happens when someone calls you after hours or while your crew is on a job?\n\nFor most contractors I talk to, those calls go to voicemail. And 80% of people who hit voicemail never call back — they just call the next company on Google.\n\nWe built a complete business system that answers every call 24/7, books jobs on your calendar, follows up automatically, collects Google reviews, and gives you one dashboard to manage everything. Your callers don't even realize they're not talking to your team.\n\nWorth a 5-minute call to see how it works?\n\n[Your Name]\nTotalFlow AI\n[Phone]" },
      { speaker: "note", text: "EMAIL 2 — Send 3 days later if no response" },
      { speaker: "rep", text: "Subject: Re: Quick question about [Company Name]\n\nHey [Name],\n\nJust wanted to follow up. One thing I should mention — our clients see an average 30% increase in booked appointments within the first month. One HVAC company captured $29K in additional monthly revenue from calls that used to go to voicemail.\n\nHere's the best part: you can hear the AI in action right now by calling (417) 607-6412.\n\nPlans start at $497/mo. No contracts, cancel anytime, 30-day money-back guarantee.\n\nLet me know if you want a quick walkthrough.\n\n[Your Name]" },
      { speaker: "note", text: "EMAIL 3 — Send 5 days later. Last touch, keep it short." },
      { speaker: "rep", text: "Subject: Last note\n\nHey [Name],\n\nNot trying to fill your inbox. Just one last thought:\n\nIf you're spending money on Google Ads or SEO but missing calls when they come in, you're basically paying to send customers to your competitors.\n\nWe fix that — plus handle your social media, Google optimization, reviews, and marketing campaigns all in one platform.\n\nHappy to show you anytime.\n\n[Your Name]" },
    ],
  },
];

/* ─── OBJECTIONS ─── */

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
    followUp: "Would it help if I showed you the math on how many calls you're likely missing right now? Also — if you do annual billing, we waive the setup fee entirely and take 20% off monthly.",
  },
  {
    id: "price-cheaper-options",
    objection: "I've seen AI answering services for $29-79/month",
    category: "price",
    response: "You're right, those exist. The difference is — those are generic AI answering services. They answer the phone and take a message. That's it. TotalFlow is 10 tools in one: AI phone answering, AI webchat, CRM, automated follow-up, review management, appointment booking, invoicing, forms, workflow automation, and a mobile app. You'd need 5-6 separate subscriptions to match what we do, and you'd spend MORE than $497 combined — without anything talking to each other.",
    followUp: "Want me to show you the side-by-side of what's included vs. a basic AI answering service?",
  },
  {
    id: "price-setup-fee",
    objection: "The setup fee is too high",
    category: "price",
    response: "The setup fee covers us custom-building your entire system — AI voice agent trained on your business, CRM configured for your workflow, all automations built, forms created, integrations set up. It's 10-15 hours of expert work. That said, if you go annual, we waive the setup fee entirely and take 20% off monthly. So Starter drops to $398/mo with zero upfront cost.",
    followUp: "Want me to run the annual numbers for you?",
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
    response: "That's actually the best reason TO do this. You're too busy to answer every call — which means you're definitely missing some. We handle the entire setup. You give us 30 minutes for an onboarding call, and we build everything. Your system is live in 5-7 days and from that point on, it runs itself. Zero maintenance on your end.",
    followUp: "When would be a good 30 minutes this week? I'll handle everything else.",
  },
  {
    id: "timing-slow-season",
    objection: "Business is slow right now",
    category: "timing",
    response: "I hear you. But here's the thing — when business is slow, every single lead matters even more. You literally can't afford to miss any. And the best time to build a system is BEFORE the busy season hits. Plus, if you go annual, the setup fee is waived — so there's no big upfront cost to get started.",
    followUp: "What if we got you set up now so you're ready when things pick up?",
  },
  {
    id: "competition-already-have-something",
    objection: "I already have a CRM / answering service / website",
    category: "competition",
    response: "That's great — what are you using? [Listen] Got it. So here's the difference: those are separate tools that don't talk to each other. When someone calls, does it automatically create a lead in your CRM, send a follow-up text, book the appointment, AND request a review after the job? With TotalFlow, everything is connected in one system. One login, one dashboard, one app, everything automated. Most of our clients were paying MORE for their separate tools than our all-in-one.",
    followUp: "How many different tools are you logging into every day?",
  },
  {
    id: "competition-diy",
    objection: "I can just do this myself / hire someone",
    category: "competition",
    response: "You absolutely could. Hiring a full-time receptionist runs $2,500-3,500/month plus benefits, and they only work 8 hours. A social media manager is another $1,500-3,000/month. Building a comparable system yourself on separate platforms would take 40-60 hours and you'd still need to maintain it. We're $497-$997/month, work 24/7, and we handle all the setup and maintenance. The Growth plan at $997 includes the marketing too.",
    followUp: "Let me show you everything that's included — I think you'll see why even tech-savvy business owners choose to let us handle it.",
  },
  {
    id: "technical-will-it-work",
    objection: "Will this actually work for my type of business?",
    category: "technical",
    response: "Great question. We serve 12+ industries — home services, legal, dental, salons, real estate, restaurants, auto, fitness, and more. The AI is trained on YOUR specific business — your services, your pricing, your hours, your service area. It doesn't give generic responses — it sounds like it works for YOUR company. Plus we have a 30-day money-back guarantee, so there's zero risk.",
    followUp: "Want me to set up a test call so you can experience it as if you were a customer calling your business?",
  },
  {
    id: "technical-contract",
    objection: "Is there a contract / commitment?",
    category: "technical",
    response: "No long-term contract. Month-to-month, cancel anytime. We also offer a 30-day money-back guarantee — if you're not happy, you get your money back. The only commitment is the setup fee, which covers building your custom system. And if you go annual, the setup fee is waived entirely.",
    followUp: "Want to get started with the 30-day guarantee and see the results for yourself?",
  },
  {
    id: "price-growth-too-much",
    objection: "Growth at $997/month is too much — can I just do Starter?",
    category: "price",
    response: "Absolutely — Starter at $497/mo is a great place to begin. It covers the AI phone answering, CRM, follow-up automation, reviews, booking, and your app. Most clients start there and upgrade to Growth once they see the results. The difference is: Starter captures the calls you're already getting. Growth DRIVES more calls to you with SEO, social media, landing pages, and marketing campaigns. It's the difference between catching fish and stocking the pond.",
    followUp: "Want to start with Starter and upgrade when you're ready?",
  },
];

/* ─── DEMO STEPS ─── */

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
    title: "Live AI Demo — Voice + Chat",
    description: "Call the demo line AND show the chatbot in action",
    talkingPoints: [
      "Put it on speaker so they can hear the whole AI phone interaction",
      "Ask the AI about services, pricing, and scheduling — show it handles real questions",
      "\"Notice how natural it sounds? 90% of callers don't realize it's AI\"",
      "Then show the webchat: \"Same AI also works on your website, Instagram, Facebook, and via text\"",
      "\"Every interaction — phone, chat, text, DM — automatically creates a lead in your system\"",
    ],
    duration: "3 min",
  },
  {
    id: 3,
    title: "The Platform Tour — All 10 Capabilities",
    description: "Show the full platform, not just the phone",
    talkingPoints: [
      "CRM Dashboard: \"Every call, text, form submission, chat — tracked in one place\"",
      "Pipeline: \"See exactly where every lead is from first contact to closed job\"",
      "Unified Inbox: \"SMS, email, Instagram DMs, Facebook messages, Google — all in one screen\"",
      "Booking: \"Customers book directly, you get reminders, no-show recovery is automatic\"",
      "Reviews: \"After every job, automatic review request goes out. One client: 13 to 85 reviews in 90 days\"",
      "Forms: \"Smart forms that qualify leads and trigger the right follow-up\"",
      "Mobile App: \"All of this on your phone — see leads, respond, check calendar, track performance\"",
    ],
    duration: "4 min",
  },
  {
    id: 4,
    title: "Growth Tier Preview (if relevant)",
    description: "Show the marketing side — this is where you upsell",
    talkingPoints: [
      "\"Everything I just showed you is on our Starter plan at $497/mo. But let me show you what Growth adds...\"",
      "Google Business: \"We optimize your listing so you rank higher in local search\"",
      "Social Media: \"We create and post content 2-3x per week across all your platforms\"",
      "Landing Pages: \"Custom pages for specific campaigns — 'Summer AC Tune-Up Special'\"",
      "Email/SMS Campaigns: \"Seasonal promos, win-back campaigns for lapsed customers, holiday blasts\"",
      "\"This is the difference between catching the fish that swim by and stocking the entire pond\"",
    ],
    duration: "3 min",
  },
  {
    id: 5,
    title: "ROI Math & Close",
    description: "Make it a no-brainer with simple math",
    talkingPoints: [
      "\"So [Name], you told me your average job is worth $[X]. How many calls do you think you miss per week? Even 2-3?\"",
      "\"At $[X] per job, even capturing 4 extra calls per month is $[Y] in revenue. The system pays for itself 10x over.\"",
      "[For Starter] \"Setup is $1,497, then $497/month. Or go annual: setup waived, $398/month.\"",
      "[For Growth] \"I'd recommend Growth at $997/month with $2,497 setup. Annual: setup waived, $798/month.\"",
      "\"No contract, 30-day money-back guarantee, live in 5-7 days. Want to get started today or Monday?\"",
    ],
    duration: "3 min",
  },
];

/* ─── SALES PROCESS ─── */

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
      "Look for: low review count (no automation), limited hours, no online booking, basic website",
      "Check their website — does it have chat? Booking? Forms? Modern design?",
      "Call their number after hours — if it goes to voicemail, they're a prospect",
      "Check their social media — if they haven't posted in 2+ weeks, they need Growth tier",
      "Add to outreach list with notes on specific pain points and recommended tier",
    ],
    tips: [
      "Businesses with 10-50 Google reviews are the sweet spot",
      "If they have a GHL-looking site already, skip them — they might already have the platform",
      "Focus on companies spending on Google Ads but with bad websites — they have budget but need help",
      "Multi-location businesses are Scale tier candidates — flag them separately",
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
      "Mention ALL capabilities — don't just sell the phone AI",
      "Text immediately after leaving a voicemail",
      "Follow up 3x minimum before moving to nurture",
    ],
    timeframe: "2-4 hours/day",
  },
  {
    id: 3,
    phase: "Demo",
    title: "Show the Full Platform",
    tasks: [
      "Call their number first to demonstrate the problem",
      "Call demo line (417) 607-6412 on speaker",
      "Use the Live Demo page in the Sales Hub (select their vertical)",
      "Walk through all 10 capabilities, not just phone + CRM",
      "Preview Growth tier features if they're a fit",
      "Do the ROI math with their specific numbers",
    ],
    tips: [
      "In-person demos close at 2x the rate of video calls",
      "Always call THEIR number first so they feel the pain",
      "Show the chatbot, the unified inbox, and the mobile app — not just the phone AI",
      "Match the demo to their vertical using the Live Demo vertical selector",
      "Get their average job value during the demo for the ROI close",
    ],
    timeframe: "15-20 min per demo",
  },
  {
    id: 4,
    phase: "Close",
    title: "Get the Yes",
    tasks: [
      "Present the recommended tier with ROI math",
      "Use the choice close: 'Want to start today or Monday?'",
      "Handle objections using the Objection Playbook",
      "Offer annual billing if setup fee is a blocker (waived + 20% off)",
      "Collect payment (setup fee to start)",
      "Schedule onboarding call within 48 hours",
    ],
    tips: [
      "Most businesses should be on Growth ($997/mo) — lead with it",
      "If they push back on price, step down to Starter ($497/mo) — don't lose the deal",
      "Annual pricing (setup waived + 20% off) is your best tool for hesitant buyers",
      "30-day money-back guarantee removes all risk — use it",
      "The longer the gap between demo and close, the lower the conversion rate",
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
      "Set up chatbot for website/social channels",
      "Build forms and lead capture pages",
      "Test everything and get client approval before going live",
    ],
    tips: [
      "Send a welcome text/email immediately after they sign up",
      "Get their business info via an intake form — don't waste the onboarding call",
      "Have them test-call their new AI before going live",
      "Set a 7-day and 30-day check-in on your calendar",
      "For Growth clients: begin Google optimization and social media in Week 1",
    ],
    timeframe: "5-7 days to go live",
  },
  {
    id: 6,
    phase: "Retain & Grow",
    title: "Keep & Upsell",
    tasks: [
      "7-day check-in call: show them calls captured and leads in CRM",
      "30-day review: present full dashboard metrics and ROI",
      "Ask for referrals: 'Know any other businesses who'd benefit?'",
      "Collect testimonial/case study after 60 days",
      "Upsell Starter → Growth: 'Now let's drive MORE calls with SEO + social + campaigns'",
      "Upsell Growth → Scale for multi-location clients",
    ],
    tips: [
      "Clients who see their first captured call within 7 days rarely churn",
      "The 30-day review is your upsell opportunity — show results, then pitch Growth",
      "Monthly reports build trust and prevent surprise cancellations",
      "Referrals from happy clients close at 50%+ — always ask",
      "A $100/month referral credit to existing clients is worth it",
    ],
    timeframe: "Ongoing — 15 min/client/month",
  },
];

/* ─── ROI CALCULATOR ─── */

export interface ROIInput {
  avgJobValue: number;
  missedCallsPerWeek: number;
  monthlyAdSpend: number;
}

export function calculateROI(input: ROIInput) {
  const monthlyMissedCalls = input.missedCallsPerWeek * 4;
  const captureRate = 0.6;
  const closeRate = 0.3;
  const capturedCalls = monthlyMissedCalls * captureRate;
  const newJobs = capturedCalls * closeRate;
  const additionalRevenue = newJobs * input.avgJobValue;

  // Calculate for each tier
  const starterMonthly = 497;
  const growthMonthly = 997;

  const starterROI = additionalRevenue / starterMonthly;
  const growthROI = additionalRevenue / growthMonthly;
  const annualImpact = additionalRevenue * 12;

  return {
    monthlyMissedCalls,
    capturedCalls: Math.round(capturedCalls),
    newJobs: Math.round(newJobs * 10) / 10,
    additionalRevenue: Math.round(additionalRevenue),
    starterMonthly,
    growthMonthly,
    starterROI: Math.round(starterROI * 10) / 10,
    growthROI: Math.round(growthROI * 10) / 10,
    annualImpact: Math.round(annualImpact),
    paybackDays: Math.round(30 / starterROI),
  };
}
