// TotalFlow AI Sales Coach — Built-in Knowledge Engine (no external API key required)

// ─── KNOWLEDGE BASE ───

const PRICING = {
  starter: {
    name: "Starter",
    monthly: 497,
    setup: 1497,
    annualMonthly: 398,
    annualSetup: 0,
    includes: [
      "AI Phone Answering (Voice AI) — 24/7 call answering",
      "AI Webchat & SMS Bot (Conversation AI)",
      "Reputation & Review Management",
      "Invoicing & Payments",
      "Lead Capture (forms, surveys, lead scoring)",
      "Advanced Workflow Automation",
      "Branded Mobile App",
      "CRM with full pipeline management",
    ],
    bestFor: "Solo operators and small teams who need to stop missing calls immediately.",
  },
  growth: {
    name: "Growth (Most Popular)",
    monthly: 997,
    setup: 2497,
    annualMonthly: 798,
    annualSetup: 0,
    includes: [
      "Everything in Starter, PLUS:",
      "Google Business Optimization & Local SEO",
      "Social Media Management (2-3 posts/week)",
      "Website & Landing Page Builder",
      "Email/SMS Marketing Campaigns",
      "AI-Powered Review Responses",
      "Monthly Performance Report",
    ],
    bestFor: "Businesses wanting done-for-you marketing on top of AI answering.",
  },
  scale: {
    name: "Scale",
    monthly: 1997,
    setup: 2997,
    annualMonthly: 1598,
    annualSetup: 0,
    includes: [
      "Everything in Growth, PLUS:",
      "Multi-Location Support (up to 10 locations)",
      "Dedicated Account Manager",
      "White-Label Option",
      "Priority Support",
    ],
    bestFor: "Multi-location businesses, franchises, and companies doing $2M+ revenue.",
  },
};

const OBJECTIONS: Record<string, string> = {
  "too expensive|costs too much|can't afford|budget|pricey|overpriced|price is high|too much money":
    `Great question. Here's how to handle the "too expensive" objection:

**Say this:** "I totally get it — let me ask you one question. How much is one new customer worth to your business?"

*Wait for their answer.*

**Then say:** "So if our system brings you just ONE extra job or client per month, it's already paid for itself. Most of our clients see 10-29x ROI. That's not a cost — that's the best investment you'll make this year."

**If they're still hesitant:** "And here's the thing — you can start with our Starter plan at $497/month. That's less than $17/day to never miss another call. How many calls are you missing right now?"

**Power close:** "We also have a 30-day money-back guarantee. Zero risk. If it doesn't work, you get every penny back."`,

  "cheap ai|$29|cheaper|seen cheaper|less expensive alternative|budget option":
    `This is one of the most common objections. Here's your kill shot:

**Say this:** "You're right, there ARE $29/month AI answering services out there. But let me ask — do they also give you a CRM, marketing automation, review management, a website builder, SMS campaigns, and a mobile app? Because we do. Those $29 tools do ONE thing. We replace 5-6 tools with one platform."

**Break it down:** "If you added up a basic CRM ($50), phone answering ($100), review tool ($50), email marketing ($50), website builder ($30), and text messaging ($40) — you're at $320/month minimum, and NOTHING talks to each other. We're $497 and everything is integrated."

**Close it:** "That $29 tool answers your phone. We run your entire business. There's a big difference."`,

  "think about it|need to think|let me think|sleep on it|get back to you|not ready":
    `"Let me think about it" usually means one of three things. Here's how to uncover the real objection:

**Say this:** "Absolutely, take your time. But can I ask — when you say you want to think about it, is it the price, the technology, or whether it's the right fit? I just want to make sure you have all the information you need."

*This forces them to tell you the REAL concern.*

**If it's price:** Pivot to annual billing (setup waived + 20% off) or step down to Starter.
**If it's technology:** Offer the demo line: "Call (417) 607-6412 right now — hear it yourself. 90% of callers can't tell it's AI."
**If it's fit:** Ask about their specific pain points and map TotalFlow features to each one.

**Don't let them ghost:** "How about this — I'll send you a quick recap text with the pricing and the demo line number. What's the best number to reach you? And let's set a follow-up for [specific day]. Does Thursday work?"`,

  "setup fee|upfront cost|$1,497|$2,497|setup is too high|too much upfront":
    `The setup fee objection has a built-in solution:

**Say this:** "I hear you — the setup fee covers custom buildout of your entire system: AI training, CRM setup, automation workflows, all tailored to YOUR business. But here's the thing..."

**The annual close:** "If you go annual, the setup fee is completely waived. Zero upfront. PLUS you save 20% on the monthly — Growth drops from $997 to $798/month. That's almost $2,400 saved in year one."

**Do the math for them:**
- Monthly Growth: $997/mo + $2,497 setup = $14,461/year
- Annual Growth: $798/mo + $0 setup = $9,576/year
- **They save $4,885 going annual**

**Say:** "So instead of paying $2,497 upfront, you pay nothing upfront and save almost $5,000 in the first year. No-brainer, right?"`,

  "already have|have a crm|use hubspot|use salesforce|already got|current system|already using":
    `When they already have a CRM or system in place:

**Say this:** "That's great — how many different tools are you logging into every day to run your business?"

*Usually the answer is 3-6 different tools.*

**Then say:** "So you've got your CRM here, phone system there, review management somewhere else, email marketing in another tab, website on a different platform... What if all of that was ONE login? One place where when a call comes in, the AI answers, qualifies the lead, adds them to your CRM, sends a follow-up text, requests a review after the job — all automatically?"

**Key angle:** "We're not asking you to replace your CRM. We're asking if you want ONE platform that does everything, instead of duct-taping 5 tools together. Most business owners who switch save 3-5 hours per week just on admin."`,

  "too busy|no time|don't have time|swamped|overwhelmed|slammed":
    `"Too busy" is actually your BEST selling point:

**Say this:** "That's literally the BEST reason to do this. You're busy because you're doing everything manually — answering calls, following up, chasing reviews, managing your calendar. That's exactly what we automate."

**Get specific:** "How many calls did you miss last week? Every missed call is a lost customer. 80% of callers who hit voicemail never call back. Our AI picks up every single call, 24/7 — while you're on a job, eating dinner, sleeping."

**Remove the work:** "And here's the best part — we do ALL the setup. You give us 30 minutes for an onboarding call, and we build everything. Your system is live in 5-7 days. You literally don't have to do anything."

**Close:** "So the question isn't whether you have time for this. It's whether you can afford to keep losing customers while you're too busy to answer the phone."`,

  "ai sounds fake|robotic|people will know|sounds like a robot|artificial":
    `This one is easy to handle live:

**Say this:** "I totally understand that concern. Here — call this number right now: **(417) 607-6412**. It's our live demo line. Have a conversation with it and tell me what you think."

*Let them call. 90% of callers can't tell it's AI.*

**After they call:** "So what did you think? Could you tell it was AI? Most people can't. And here's the thing — even if a caller figures it out, which is rare, they'd rather talk to a smart AI that books their appointment than hit voicemail and never call back."

**Stats:** "We've handled thousands of calls. 90% of callers don't realize they're talking to AI. And our clients' customers actually leave BETTER reviews because the AI is always friendly, always patient, never has a bad day."`,

  "contract|commitment|locked in|cancel|cancellation":
    `Easy close — there's zero lock-in:

**Say this:** "No contracts. Month to month. Cancel anytime. And we back that up with a 30-day money-back guarantee."

**Reinforce:** "If you don't see the value in the first 30 days, you get every penny back. We can offer that because our clients see results fast — usually within the first week when they stop missing calls."

**The real close:** "So there's literally zero risk. Try it for 30 days. If it doesn't bring you more calls, more bookings, and more revenue, cancel and get your money back. Fair enough?"`,

  "competitor|smith.ai|ruby|answering service|virtual receptionist|human receptionist":
    `Here's how we stack up against traditional receptionist services:

**Say this:** "Great question — how much are you paying for that service? Most virtual receptionist companies charge $2,500-$4,000/month."

**The comparison:**
- Human receptionist: Works 40 hours/week, calls in sick, takes vacation, costs $2,500-$4,000/mo
- TotalFlow AI: Works **168 hours/week** (24/7/365), never calls in sick, never takes vacation, starts at $497/mo

**But that's not all:** "A receptionist answers your phone. We answer your phone AND give you a CRM, website builder, marketing automation, review management, SMS campaigns, and a mobile app. It's like comparing a bicycle to a Tesla."

**Close:** "So you get MORE coverage, MORE features, and you save $2,000+/month. The math is pretty clear."`,

  "growth|upgrade|upsell|starter vs growth|which plan|which tier|recommend":
    `Here's how to position Growth vs Starter:

**Always lead with Growth ($997/mo)** — it's the sweet spot.

**The pitch:** "I'd recommend Growth. Here's why: Starter stops your bleeding — it catches the calls you're missing right now. But Growth actually DRIVES more calls to your business. With Growth, you get Google optimization, social media management, landing pages, and email/SMS campaigns. Starter captures leads. Growth CREATES leads."

**If they push back on price:** "Totally fair. Here's what I'd suggest — start with Starter at $497 to see the results. Once you see the ROI from just the AI answering alone, upgrading to Growth is a no-brainer because now you KNOW it works."

**Annual angle:** "If you go Growth annual, the setup fee is waived and it drops to $798/month. That's only $301 more than Starter monthly, but you get full marketing services included."

**The question to ask:** "Is your main goal to STOP missing opportunities, or to GROW your business? If it's both, Growth is the move."`,
};

const VERTICALS: Record<string, string> = {
  "plumb|home service|hvac|electric|handyman|contractor|garage door|landscap":
    `**Home Services Vertical — Key Talking Points:**

The BIGGEST pain point: Missed calls while on the job. A plumber can't answer the phone when they're under a sink. An HVAC tech can't pick up during an install.

**Opening line:** "Quick question — when you're on a job site, what happens to the phone calls coming in?"

**Stats to use:**
- 80% of callers who get voicemail never call back
- Average plumbing job: $300-500. Miss 3 calls/week = $4,000+/month lost
- Home service businesses miss 30-40% of incoming calls

**Pain points to probe:**
1. Missed calls during jobs
2. After-hours emergency calls going to voicemail
3. No system for collecting reviews after jobs
4. Spending evenings doing admin instead of being with family
5. Competitors answering faster and stealing customers

**Demo angle:** "Let me show you what happens when a homeowner calls YOUR number at 9pm with a burst pipe. Right now, they get voicemail. With TotalFlow, our AI picks up, qualifies the emergency, books them into your calendar, and sends them a confirmation text — all while you're sleeping."`,

  "dental|dentist|orthodont":
    `**Dental Vertical — Key Talking Points:**

Dental offices live and die by their phones. Front desk is always juggling check-ins, insurance verification, and ringing phones.

**Opening line:** "How many calls does your front desk miss because they're busy with a patient at the window?"

**Stats to use:**
- Average new dental patient worth: $1,200-$1,500/year
- Most dental offices miss 20-30% of calls during peak hours
- 70% of patients choose a dentist based on online reviews

**Pain points to probe:**
1. Front desk overwhelmed — phone ringing while checking patients in
2. New patient inquiries lost to voicemail
3. After-hours calls going unanswered (emergencies)
4. Low review count vs. competitors
5. No-shows and last-minute cancellations

**Demo angle:** "Imagine your phone rings during lunch hour when the front desk is closed. Right now, that's a lost new patient worth $1,200+ per year. With TotalFlow, the AI picks up, answers their insurance questions, and books them right into your schedule. Your front desk comes back from lunch to see a new booking already confirmed."`,

  "legal|lawyer|attorney|law firm|law office":
    `**Legal Vertical — Key Talking Points:**

For law firms, every missed call could be a $5,000-$50,000 case. The stakes are HIGH.

**Opening line:** "When a potential client calls your firm after 5pm, what happens to that call?"

**Stats to use:**
- Average personal injury case value: $10,000-$100,000
- 42% of law firms take over 3 days to respond to leads
- Firms that respond within 5 minutes are 100x more likely to connect

**Pain points to probe:**
1. Missed calls = missed cases (huge revenue impact)
2. After-hours calls going to generic voicemail
3. Intake process is slow and manual
4. Receptionist costs $3,000-$5,000/month
5. Competitors responding faster to the same leads

**Demo angle:** "A car accident victim calls 3 law firms at 8pm. Two go to voicemail. YOUR firm has TotalFlow AI — it picks up, asks qualifying questions, captures their case details, and books a consultation. You wake up to a $30,000 case already in your pipeline."`,

  "salon|spa|beauty|hair|barber|nail":
    `**Salon & Spa Vertical — Key Talking Points:**

Salon owners are usually behind the chair and can't answer the phone. Their staff is also busy with clients.

**Opening line:** "When you're with a client, who's answering the phone when someone calls to book?"

**Stats to use:**
- Average salon appointment: $75-$150
- Miss 5 booking calls/week = $1,500-$3,000/month lost
- 60% of salon clients book by phone

**Pain points to probe:**
1. Can't answer while with clients (hands are busy!)
2. Walk-in chaos — phone ringing during rush
3. No-shows with no automated reminders
4. Low Google reviews vs. competition
5. Manually managing the schedule

**Demo angle:** "You're doing a color treatment, phone rings — you can't answer with gloves on. TotalFlow AI picks up, checks your real-time availability, books the appointment, sends a confirmation text, and adds a reminder. The client is booked before you even rinse."`,

  "real estate|realtor|real-estate|property|broker":
    `**Real Estate Vertical — Key Talking Points:**

Realtors are ALWAYS on the move — showings, open houses, closings. Speed-to-lead is everything.

**Opening line:** "How fast do you respond when a new lead comes in from Zillow or your website?"

**Stats to use:**
- Realtors who respond in under 5 minutes are 21x more likely to convert
- Average home commission: $8,000-$15,000
- 78% of buyers go with the first agent who responds

**Pain points to probe:**
1. Leads coming in during showings (can't answer)
2. Zillow/Realtor.com leads going cold
3. No follow-up system for open house visitors
4. Spending hours on admin instead of selling
5. Missing after-hours buyer inquiries

**Demo angle:** "You're at a showing and a hot buyer lead comes in from Zillow. Right now, it sits in your inbox for 2 hours. With TotalFlow, the AI instantly calls them back, qualifies their needs, and books a showing — all before you even leave the current appointment."`,

  "restaurant|food|diner|cafe|bar|pizza|catering":
    `**Restaurant Vertical — Key Talking Points:**

Restaurants get SLAMMED with calls — reservations, takeout orders, catering inquiries, hours. Staff is too busy cooking and serving.

**Opening line:** "During your dinner rush, how many phone calls do you think go unanswered?"

**Pain points to probe:**
1. Phone ringing off the hook during rush hours
2. Takeout/delivery orders lost to missed calls
3. Catering inquiries going to voicemail (big $$$)
4. Staff pulled away from customers to answer phones
5. Low reviews despite great food

**Demo angle:** "It's Friday at 7pm, every table is full, kitchen is slammed. Phone rings 15 times in an hour. Your staff can't answer. With TotalFlow, every call gets picked up — reservations booked, takeout orders placed, catering inquiries captured. Your team stays focused on the guests in front of them."`,

  "auto|car|mechanic|body shop|dealer|tire|oil change|automotive":
    `**Auto Services Vertical — Key Talking Points:**

Mechanics and shop owners are under the hood all day. They can't stop working to answer the phone.

**Opening line:** "When you're under a car, who's answering the phone?"

**Pain points to probe:**
1. Missed calls while working on vehicles
2. No system for appointment scheduling
3. Customers don't leave voicemails — they call the next shop
4. Low online reviews despite great work
5. Estimates and follow-ups are manual

**Demo angle:** "A customer calls at 3pm to schedule an oil change. You're wrist-deep in a transmission. They get voicemail, hang up, and call the shop down the street. With TotalFlow, the AI picks up, schedules them into your next available slot, and sends a confirmation. You never even knew the phone rang — but you got the customer."`,

  "fitness|gym|personal train|yoga|crossfit|martial art|boxing":
    `**Fitness Vertical — Key Talking Points:**

Gym owners and trainers are on the floor coaching — they can't stop a session to answer calls.

**Opening line:** "When a potential new member calls during class time, what happens?"

**Pain points to probe:**
1. Missed calls during classes/training sessions
2. Trial/membership inquiries going to voicemail
3. No automated follow-up after trial visits
4. Member retention — no re-engagement system
5. Reviews not being collected from happy members

**Demo angle:** "Someone sees your gym on Instagram, calls to ask about membership. You're in the middle of a class. They get voicemail, Google the next gym, and sign up there instead. With TotalFlow, the AI answers, tells them about your plans, and books a trial visit — all while you're coaching."`,

  "pest|exterminator|termite|bug|rodent":
    `**Pest Control Vertical — Key Talking Points:**

Pest control is URGENT — when someone has roaches or termites, they're calling everyone until someone picks up.

**Opening line:** "When a homeowner finds termites at 7pm, and they call you — what happens?"

**Pain points to probe:**
1. Emergency calls after hours (pests don't wait for business hours)
2. Seasonal surges — phone blowing up but can't answer while on jobs
3. Recurring service scheduling is manual
4. Competitors who answer first get the job
5. No review collection after treatments

**Demo angle:** "A homeowner finds a wasp nest Saturday morning. They call 3 pest control companies. Two get voicemail. YOUR AI picks up, asks about the pest, books an emergency visit for Monday, and sends a confirmation. You win the job while your competitors are still sleeping."`,

  "roof|roofing|gutter|siding":
    `**Roofing Vertical — Key Talking Points:**

Roofers are on roofs all day. The phone rings, they can't answer. And roofing jobs are HIGH-VALUE.

**Opening line:** "What's your average roofing job worth? And how many calls do you miss while you're up on a roof?"

**Pain points to probe:**
1. Can't answer phone while on a roof (safety issue!)
2. High-value leads lost ($5,000-$20,000 per job)
3. Storm damage surges — phone blows up, can't keep up
4. Estimates and follow-ups are manual
5. Insurance claim coordination is complex

**Demo angle:** "A hailstorm hits. Your phone gets 50 calls in 3 hours. You're on a job site. Without TotalFlow, you lose 40+ of those leads. With TotalFlow, EVERY call is answered, the homeowner's info is captured, and they're scheduled for an estimate. That storm just became a $200K month instead of $20K."`,

  "clean|cleaning|maid|janitorial|house clean|pressure wash":
    `**Cleaning Services Vertical — Key Talking Points:**

Cleaning business owners are cleaning houses all day — can't answer the phone with rubber gloves on.

**Opening line:** "When you're at a client's house cleaning, what happens to the calls coming in for quotes?"

**Pain points to probe:**
1. Missing calls while on cleaning jobs
2. Quote requests going to voicemail
3. Recurring scheduling is managed manually
4. No system for getting reviews after each clean
5. Competing with dozens of other cleaners on Google

**Demo angle:** "You're cleaning a house, phone rings in your pocket — you can't answer with wet gloves. That's a $200/month recurring client who just called the next cleaner on Google instead. With TotalFlow, every quote request is captured, every booking is automated, and your reviews stack up to beat the competition."`,

  "pet|vet|veterinar|dog|groom|kennel|boarding":
    `**Pet Services Vertical — Key Talking Points:**

Pet owners are emotionally invested — they want to talk to someone RIGHT NOW about their fur baby.

**Opening line:** "When a worried pet owner calls about their sick dog after hours, what happens?"

**Pain points to probe:**
1. After-hours calls from worried pet owners
2. Grooming/boarding booking calls missed during appointments
3. Vaccination reminders are manual
4. Pet owners choosing based on Google reviews
5. Staff overwhelmed with scheduling

**Demo angle:** "A pet owner's dog starts limping at 8pm. They call your clinic, get voicemail, panic, and drive to the emergency vet 30 minutes away. With TotalFlow, the AI answers, asks symptoms, determines urgency, and either books a morning appointment or directs them to emergency care. That pet owner becomes a loyal client because you were there when it mattered."`,
};

const COLD_CALL_SCRIPTS: Record<string, string> = {
  "cold call|opening line|first call|initial call|door to door|walk in|cold outreach":
    `**Cold Call Opening Script:**

**First 10 seconds (hook):**
"Hey [Name], this is [Your Name] with TotalFlow AI. I'm not selling you anything right now — I just have a quick question. When someone calls your business after hours, what happens to that call?"

*Pause. Let them answer.*

**Follow up based on their response:**
- If "voicemail": "So what percentage of those callers do you think actually leave a message? It's about 20%. That means 80% of your after-hours callers are just... gone. We fix that."
- If "answering service": "How much are you paying for that? And do they also manage your reviews, send follow-up texts, and book appointments? Because we do all of that."
- If "I answer them all": "That's impressive. But what about when you're on a job? Or at dinner? Or sleeping? Our AI handles it 24/7 so you don't have to."

**Transition to demo:** "Here — take 30 seconds and call this number: (417) 607-6412. Have a conversation with our AI. I'll wait. Most people can't tell it's not a real person."`,

  "follow up|following up|haven't responded|no response|ghosted|went dark":
    `**Follow-Up Scripts:**

**Text after no response (Day 2):**
"Hey [Name], [Your name] from TotalFlow. Quick question — I did the math on your business. Based on your industry, you're likely losing $3,000-5,000/month to missed calls alone. Want me to show you the numbers? Takes 5 min."

**Text after no response (Day 5):**
"[Name], one last thing — I called your business at [time] yesterday and got voicemail. That's exactly what your customers experience too. Our AI would've answered that call, qualified the lead, and booked them. Just saying. 😉 Want to see it in action?"

**Email follow-up (Day 3):**
Subject: "I called your business yesterday..."
"Hi [Name], I called [Business Name] at 6pm yesterday and got voicemail. I'm not pointing that out to be annoying — I'm pointing it out because that's what your potential customers experience every single day. 80% of them will never call back. What if every single one of those calls was answered, the caller was qualified, and an appointment was booked — automatically? That's what TotalFlow does. Want 5 minutes to see it? [Your Name]"`,

  "door|walk-in|in person|face to face|drop by":
    `**Door-to-Door / Walk-In Script:**

**The approach (be casual, not salesy):**
"Hey, is the owner around? I'm [Your Name] with TotalFlow AI. I work with [type] businesses in the area to help them stop losing customers to missed phone calls."

**If owner is there:**
"Perfect. Quick question — [look at their phone on the wall/counter] — when that phone rings and you're busy with a customer, who answers it?"

**The demo move:**
Pull out your phone: "Here, watch this." Call (417) 607-6412 on speaker. Let them hear the AI conversation.

"That's what we'd set up for YOUR business. Custom trained on your services, your pricing, your availability. It answers 24/7, books appointments, and follows up automatically."

**Door-to-door tips:**
1. Go AFTER business hours (5-7pm) — catch owners closing up, phones already going to voicemail
2. Bring proof: "We just set this up for [type of business] down the street. They booked 12 new customers last month from calls they would've missed."
3. Keep it under 3 minutes. Get the demo line call done and set a follow-up.
4. Leave a one-pager with the demo line number.`,
};

const CLOSING_TECHNIQUES: Record<string, string> = {
  "close|closing|ask for the sale|get them to sign|seal the deal|commitment":
    `**Closing Techniques That Work:**

**1. The Assumptive Close:**
"So it sounds like Growth is the best fit. Should we get you started this week or next Monday?"

**2. The Math Close:**
"Your average job is $[X]. You told me you miss about [Y] calls/week. That's $[X × Y × 4] per month walking out the door. TotalFlow is $497/month. You'd need ONE extra customer to cover it. You'll get 10-20."

**3. The Risk-Reversal Close:**
"Here's what I'd suggest — try it for 30 days. If you don't see results, full money-back guarantee. No contract, no cancellation fee. What do you have to lose?"

**4. The Pain Close:**
"You told me you're missing calls, working late doing admin, and your competition has better reviews. In 30 days, none of those will be problems. Do you want to keep dealing with them, or fix them?"

**5. The Annual Close (for price objections):**
"Go annual and the setup fee is completely waived — that saves you $2,497 right there. Plus 20% off monthly. It's the smartest move financially."`,

  "demo|demonstration|show them|present|pitch meeting|presentation":
    `**How to Run the Perfect Demo:**

**Step 1: Call THEIR number first** (2 min)
"Let me show you something. I'm going to call your business right now."
*Call their number.* It goes to voicemail.
"See that? I just became a customer who'll never call back. 80% of callers do exactly what I just did."

**Step 2: Call the demo line** (3 min)
"Now let me show you what it COULD be like. Call this number: (417) 607-6412."
*Put it on speaker. Let them have a conversation with the AI.*
"Pretty amazing, right? 90% of callers can't tell it's AI. And this would be customized for YOUR business — your services, your hours, your pricing."

**Step 3: Show the CRM** (2 min)
"When that call happens, here's what you see..." [Show the Sales Hub dashboard]
"Every call logged, every lead captured, appointments booked. No more sticky notes, no more lost leads."

**Step 4: ROI Math** (2 min)
"You said your average job is $[X]. If we save you just 5 missed calls per week — that's $[X × 5 × 4]/month. You're paying $497. That's a [X]x return."

**Step 5: Close** (1 min)
"So here's what I'd recommend — Growth tier gives you everything: the AI, the marketing, the full platform. Want to get started this week?"`,
};

const GENERAL_KNOWLEDGE: Record<string, string> = {
  "what is totalflow|about totalflow|tell me about|what do you do|what does totalflow":
    `**TotalFlow AI** is an all-in-one business automation platform built on GoHighLevel (GHL). We white-label GHL and add AI phone answering + done-for-you setup.

**In simple terms:** We replace 5-6 separate tools with ONE platform. CRM, AI phone answering, website builder, email/SMS marketing, review management, invoicing — all in one place.

**What makes us different:**
1. AI Phone Answering — answers every call 24/7, qualifies leads, books appointments
2. Full CRM + Automation — not just a phone tool, it's a complete business platform
3. Done-For-You Setup — we build everything, clients give us 30 minutes
4. 10-29x ROI — most clients see massive returns
5. 12+ Industries — works for any service business

**Key stats:** 40+ local businesses automated, 90% of callers can't tell it's AI, live in 5-7 days.`,

  "roi|return on investment|worth it|does it work|results":
    `**ROI Talking Points:**

Our clients see **10-29x ROI**. Here's how to calculate it for any prospect:

**The Formula:**
1. Ask: "What's your average job/customer worth?" (e.g., $500)
2. Ask: "How many calls do you miss per week?" (usually 5-10)
3. Math: $500 × 5 missed calls × 4 weeks = **$10,000/month lost**
4. TotalFlow cost: $497-$997/month
5. ROI: **10-20x return**

**Real scenarios:**
- Plumber ($400 avg job, 8 missed calls/week): $12,800/mo lost → 25x ROI on Starter
- Dentist ($1,200 new patient value, 5 missed/week): $24,000/mo lost → 24x ROI on Growth
- Lawyer ($5,000 avg case, 3 missed/week): $60,000/mo lost → 60x ROI

**Key stat:** 80% of callers who get voicemail NEVER call back. That's the money they're leaving on the table.`,

  "commission|comp|pay|earn|making money|compensation|how much do i make":
    `**Commission Structure:**

Talk to Sherif about current commission rates and structure. General guidance for reps:

**Typical SaaS sales commission models:**
- Monthly recurring revenue (MRR) based
- Usually 10-20% of first month, 5-10% ongoing
- Higher commissions for annual plans (since setup fee is waived)
- Bonuses for hitting monthly targets

**Focus areas for maximizing earnings:**
1. Push annual plans — higher total contract value
2. Upsell Growth over Starter — more revenue per deal
3. Focus on high-value verticals (legal, dental, real estate)
4. Get referrals from happy clients — warm leads close faster
5. Volume: 50+ calls/day, 3-5 demos/week is the target cadence`,

  "demo line|phone number|call number|test number":
    `**TotalFlow AI Demo Line: (417) 607-6412**

This is your most powerful sales tool. Use it in EVERY pitch.

**How to use it:**
1. During cold calls: "Call this number right now, I'll wait."
2. During demos: Put it on speaker and let the prospect have a conversation
3. Door-to-door: Pull out your phone and call it in front of them
4. Follow-up texts: "Still curious? Call (417) 607-6412 and talk to our AI. 90% of people can't tell it's not real."
5. To overcome the "AI sounds fake" objection — let them experience it

**Pro tip:** Call the prospect's OWN number first, let it go to voicemail. THEN call the demo line. The contrast is powerful.`,

  "annual|yearly|annual billing|save money|discount":
    `**Annual Billing — Your Secret Weapon:**

Annual billing solves the two biggest objections (setup fee and price):

**Starter Annual:** $398/mo (was $497) + $0 setup (was $1,497)
- Saves: $2,685/year

**Growth Annual:** $798/mo (was $997) + $0 setup (was $2,497)
- Saves: $4,885/year

**Scale Annual:** $1,598/mo (was $1,997) + $0 setup (was $2,997)
- Saves: $7,785/year

**When to use:**
- Prospect says "setup fee is too much" → Annual = zero setup
- Prospect says "it's too expensive" → Annual = 20% cheaper
- Prospect compares to cheaper tools → "Annual Growth at $798 is only a few hundred more than basic tools, but you get EVERYTHING"

**How to pitch it:** "Most of our smartest clients go annual. Setup fee is completely waived, and you save 20%. Growth drops from $997 to $798 — that's basically getting 2.5 months free per year."`,

  "process|sales process|steps|how to sell|workflow|playbook":
    `**The TotalFlow Sales Process (6 Steps):**

**1. PROSPECT** (find the target)
- Google Maps → search "[service] near me" → check reviews
- Call their number after 5pm → do they answer?
- Check their website → do they have chat? Online booking?
- Businesses with bad reviews + no after-hours answering = PERFECT targets

**2. OUTREACH** (make contact)
- Cold call: Focus on the one question — "what happens when you miss a call?"
- Door-to-door: 3x better conversion than cold calls
- Text/email: Lead with a pain point stat

**3. DEMO** (show the value)
- Call THEIR number (voicemail) → Call demo line (AI answers)
- Show CRM dashboard
- Do ROI math specific to their business

**4. CLOSE** (ask for the business)
- Lead with Growth ($997) — it's the best value
- Step to Starter ($497) if price is a blocker
- Offer annual if setup fee is the objection
- Always mention 30-day money-back guarantee

**5. ONBOARD** (set them up)
- 30-minute onboarding call
- We build everything — live in 5-7 days
- Client does almost nothing

**6. RETAIN** (keep them happy)
- 7-day check-in call
- 30-day review with actual numbers
- Ask for referral at 30 days`,
};

// ─── RESPONSE ENGINE ───

function findBestMatch(input: string, knowledgeBase: Record<string, string>): string | null {
  const lower = input.toLowerCase();
  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const [patterns, response] of Object.entries(knowledgeBase)) {
    const keywords = patterns.split("|");
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw.trim())) {
        score += kw.trim().length; // longer matches score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = response;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

function generateResponse(messages: { role: "user" | "assistant"; content: string }[]): string {
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.role !== "user") {
    return "What can I help you with? Ask me about objection handling, pricing, scripts, verticals, or closing strategies.";
  }

  const input = lastMessage.content;
  const lower = input.toLowerCase();

  // Check each knowledge base in priority order
  // 1. Objection handling (most common need)
  const objectionMatch = findBestMatch(input, OBJECTIONS);
  if (objectionMatch) return objectionMatch;

  // 2. Vertical-specific advice
  const verticalMatch = findBestMatch(input, VERTICALS);
  if (verticalMatch) return verticalMatch;

  // 3. Cold call / outreach scripts
  const scriptMatch = findBestMatch(input, COLD_CALL_SCRIPTS);
  if (scriptMatch) return scriptMatch;

  // 4. Closing techniques
  const closingMatch = findBestMatch(input, CLOSING_TECHNIQUES);
  if (closingMatch) return closingMatch;

  // 5. General knowledge
  const generalMatch = findBestMatch(input, GENERAL_KNOWLEDGE);
  if (generalMatch) return generalMatch;

  // 6. Pricing-specific questions
  if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("how much") || lower.includes("tier") || lower.includes("plan")) {
    return `**TotalFlow AI Pricing:**

**Starter — $497/mo** (Setup: $1,497)
${PRICING.starter.includes.map(i => `• ${i}`).join("\n")}
Best for: ${PRICING.starter.bestFor}

**Growth (Most Popular) — $997/mo** (Setup: $2,497)
${PRICING.growth.includes.map(i => `• ${i}`).join("\n")}
Best for: ${PRICING.growth.bestFor}

**Scale — $1,997/mo** (Setup: $2,997)
${PRICING.scale.includes.map(i => `• ${i}`).join("\n")}
Best for: ${PRICING.scale.bestFor}

**Annual Billing:** Setup fee waived + 20% off monthly.
- Starter: $398/mo ($0 setup)
- Growth: $798/mo ($0 setup)
- Scale: $1,598/mo ($0 setup)

All plans: No contracts, cancel anytime, 30-day money-back guarantee, live in 5-7 days.

**Pro tip:** Always lead with Growth. Step down to Starter only if price is a real blocker.`;
  }

  // 7. Greeting / generic
  if (lower.match(/^(hi|hello|hey|sup|yo|what's up|howdy)/)) {
    return `Hey! I'm your TotalFlow AI Sales Coach. I'm here to help you close more deals.

**Try asking me about:**
• **Objections** — "A prospect says it's too expensive"
• **Verticals** — "How do I pitch to a dental office?"
• **Scripts** — "Give me a cold call opening"
• **Closing** — "How do I close the deal?"
• **Pricing** — "Walk me through the tiers"
• **Demo tips** — "How do I run the perfect demo?"
• **Follow-up** — "Write me a follow-up text"

What situation are you dealing with?`;
  }

  // 8. Fallback — still helpful
  return `Great question! Here's my best guidance:

Based on what you're asking, here are the most relevant resources:

**If you're dealing with an objection:** Tell me exactly what the prospect said, and I'll give you the exact words to say back.

**If you need a script:** Ask me for a cold call script, follow-up text, walk-in pitch, or demo walkthrough.

**If it's about a specific vertical:** Tell me the business type (plumber, dentist, lawyer, salon, etc.) and I'll give you the vertical-specific playbook.

**If you need pricing help:** Ask me to walk through the tiers, how to upsell Growth, or how to handle the setup fee objection.

**Quick reminders:**
• Demo line: (417) 607-6412 — use it in EVERY pitch
• Always lead with Growth ($997/mo)
• 30-day money-back guarantee — zero risk for the prospect
• Annual billing = setup fee waived + 20% off

What specifically can I help with?`;
}

// ─── EXPORTS ───

export async function chatWithAI(messages: { role: "user" | "assistant"; content: string }[]) {
  return generateResponse(messages);
}

export async function getDealCoaching(deal: {
  businessName: string;
  contactName: string;
  vertical: string;
  tier: string;
  monthlyValue: number;
  status: string;
  notes: string;
  daysSinceCreated: number;
}) {
  const { businessName, contactName, vertical, tier, monthlyValue, status, daysSinceCreated, notes } = deal;

  let assessment = "";
  let riskLevel = "medium";
  let actions: string[] = [];

  // Assess deal health based on status and age
  if (status === "demo_scheduled" || status === "demo_completed") {
    if (daysSinceCreated <= 7) {
      assessment = `${businessName} is progressing well. Demo stage within the first week is right on track.`;
      riskLevel = "low";
    } else if (daysSinceCreated <= 14) {
      assessment = `${businessName} is in the demo stage but at ${daysSinceCreated} days, momentum could be fading. Act fast.`;
      riskLevel = "medium";
    } else {
      assessment = `${businessName} has been in the pipeline ${daysSinceCreated} days — that's too long for a demo-stage deal. This is at risk of going cold.`;
      riskLevel = "high";
    }
  } else if (status === "proposal_sent") {
    if (daysSinceCreated <= 10) {
      assessment = `${businessName} has the proposal — this is the critical moment. Follow up within 24 hours.`;
      riskLevel = "medium";
    } else {
      assessment = `${businessName} has had the proposal for over ${daysSinceCreated - 7} days. This deal is going cold. Urgent follow-up needed.`;
      riskLevel = "high";
    }
  } else if (status === "negotiation") {
    assessment = `${businessName} is in negotiation — they're interested but have concerns. This is closeable.`;
    riskLevel = "medium";
  } else if (status === "new_lead") {
    if (daysSinceCreated <= 3) {
      assessment = `${businessName} is a fresh lead. Speed matters — reach out TODAY.`;
      riskLevel = "low";
    } else {
      assessment = `${businessName} has been a lead for ${daysSinceCreated} days with no progression. You need to make contact immediately or this is lost.`;
      riskLevel = "high";
    }
  } else {
    assessment = `${businessName} (${status}) has been in your pipeline ${daysSinceCreated} days. Review and take action.`;
  }

  // Generate specific actions
  const tierLabel = tier === "growth" ? "Growth ($997/mo)" : tier === "scale" ? "Scale ($1,997/mo)" : "Starter ($497/mo)";

  if (riskLevel === "high") {
    actions = [
      `**Call ${contactName} TODAY.** Script: "Hey ${contactName}, it's [Your Name] from TotalFlow. I was thinking about ${businessName} and wanted to follow up. Are you still dealing with [missed calls / the issue they mentioned]? I've got 5 minutes to walk through something that might help."`,
      `**Send a value text RIGHT NOW:** "${contactName}, quick thought — I ran the numbers for ${businessName}. Based on your industry, you're likely losing $3,000-5,000/month in missed calls alone. Our ${tierLabel} plan pays for itself with just ONE extra customer/month. Worth 5 min?"`,
      `**Create urgency:** "I've got 2 onboarding slots left this week. If we get started now, your system would be live by [date 7 days out]. Want me to lock one in for you?"`
    ];
  } else if (riskLevel === "medium") {
    actions = [
      `**Follow up within 24 hours.** Script: "Hey ${contactName}, following up on our conversation about TotalFlow for ${businessName}. Any questions I can answer? Happy to do a quick 5-min call."`,
      `**Send social proof:** Find a ${vertical || "similar"} business success story. Text: "Thought you'd like this — we just set up a ${vertical || "business"} similar to ${businessName}. They booked 8 new customers in the first 2 weeks just from calls they were missing before."`,
      `**Offer the demo line:** "By the way, if you want to hear the AI in action, call (417) 607-6412. It's our live demo. Most people can't tell it's not a real person. 😉"`
    ];
  } else {
    actions = [
      `**Book the demo:** "Hey ${contactName}, I'd love to show you what TotalFlow would look like for ${businessName}. Got 15 minutes this week? I'll call your current number first so you can see what customers experience, then show you the alternative."`,
      `**Research ${businessName}:** Check their Google reviews, call their number after hours, note gaps. Use this intel in your pitch: "I noticed ${businessName} has X reviews — we can help you 3x that in 90 days."`,
      `**Prepare a custom ROI calculation:** Based on the ${tierLabel} at $${monthlyValue}/mo, calculate their breakeven point. If they get ONE extra customer worth $${monthlyValue}+, it's already paid for itself.`
    ];
  }

  return `**Assessment:** ${assessment}

**Risk Level:** ${riskLevel.toUpperCase()}

**Action Items:**
1. ${actions[0]}

2. ${actions[1]}

3. ${actions[2]}`;
}
