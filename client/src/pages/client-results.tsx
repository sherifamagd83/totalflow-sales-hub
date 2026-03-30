import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  TrendingUp,
  Phone,
  DollarSign,
  Clock,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Quote,
  BarChart3,
  Users,
  Zap,
  ArrowRight,
  Building2,
} from "lucide-react";

/* ─── Case Studies Data ─── */
const caseStudies = [
  {
    id: "hvac",
    business: "Premier HVAC Solutions",
    vertical: "Home Services",
    owner: "Mike T.",
    location: "Dallas, TX",
    monthsUsing: 6,
    plan: "$997/mo Managed",
    beforeStats: {
      missedCalls: "40-50%",
      avgResponseTime: "4+ hours",
      monthlyRevenue: "$18,000",
      googleReviews: "3.2 stars (22 reviews)",
      bookingRate: "~30%",
    },
    afterStats: {
      missedCalls: "<5%",
      avgResponseTime: "Instant",
      monthlyRevenue: "$47,000",
      googleReviews: "4.8 stars (89 reviews)",
      bookingRate: "72%",
    },
    keyMetrics: [
      { label: "Revenue Increase", value: "+161%", icon: DollarSign },
      { label: "Missed Calls", value: "40% → 5%", icon: Phone },
      { label: "Response Time", value: "4hrs → 0s", icon: Clock },
      { label: "New Reviews", value: "+67", icon: Star },
    ],
    quote:
      "I was losing thousands every month from calls going to voicemail. Now every call gets answered, appointments get booked automatically, and my reviews went from 3.2 to 4.8 stars. This thing literally pays for itself 10x over.",
    story:
      "Mike was running a 3-truck HVAC operation and personally answering every call. After hours, weekends, and during jobs — calls went straight to voicemail. He estimated he was missing 20+ calls a week. Within the first month of TotalFlow AI, his booking rate doubled. By month 3, he hired two more techs to handle the volume. The automated review requests alone generated 67 new 5-star reviews in 6 months.",
    results: [
      "Captured $29,000 in additional monthly revenue from previously missed calls",
      "Automated review system generated 67 new Google reviews",
      "Reduced admin time by 15+ hours per week",
      "Hired 2 additional technicians to handle increased demand",
      "After-hours calls now convert at 68% booking rate",
    ],
  },
  {
    id: "plumbing",
    business: "Rapid Response Plumbing",
    vertical: "Home Services",
    owner: "Sarah K.",
    location: "Phoenix, AZ",
    monthsUsing: 4,
    plan: "$497/mo + $500 Setup",
    beforeStats: {
      missedCalls: "35%",
      avgResponseTime: "2-3 hours",
      monthlyRevenue: "$22,000",
      googleReviews: "3.8 stars (41 reviews)",
      bookingRate: "40%",
    },
    afterStats: {
      missedCalls: "<8%",
      avgResponseTime: "Instant",
      monthlyRevenue: "$38,000",
      googleReviews: "4.7 stars (98 reviews)",
      bookingRate: "65%",
    },
    keyMetrics: [
      { label: "Revenue Increase", value: "+73%", icon: DollarSign },
      { label: "Missed Calls", value: "35% → 8%", icon: Phone },
      { label: "New Reviews", value: "+57", icon: Star },
      { label: "Booking Rate", value: "40% → 65%", icon: TrendingUp },
    ],
    quote:
      "My receptionist was overwhelmed. Now TotalFlow handles the overflow and after-hours calls, books appointments right into our calendar, and follows up for reviews. Best investment I've made in 12 years of business.",
    story:
      "Sarah's plumbing company was growing but her single receptionist couldn't keep up during peak hours. Emergency calls after 5pm were going to a generic answering service that just took messages. TotalFlow AI now handles overflow during business hours and takes over completely after hours — booking directly into their GHL calendar with all job details captured.",
    results: [
      "Captured $16,000 in additional monthly revenue",
      "After-hours emergency calls now get immediate AI response and booking",
      "57 new reviews in 4 months pushed them to page 1 of local search",
      "Receptionist freed up to handle in-person customers",
      "No more paying for a third-party answering service ($400/mo savings)",
    ],
  },
  {
    id: "legal",
    business: "Martinez Family Law",
    vertical: "Legal",
    owner: "Carlos M.",
    location: "Houston, TX",
    monthsUsing: 3,
    plan: "$997/mo Managed",
    beforeStats: {
      missedCalls: "30%",
      avgResponseTime: "Next business day",
      monthlyRevenue: "$35,000",
      googleReviews: "4.0 stars (18 reviews)",
      bookingRate: "25%",
    },
    afterStats: {
      missedCalls: "<3%",
      avgResponseTime: "Instant",
      monthlyRevenue: "$52,000",
      googleReviews: "4.9 stars (47 reviews)",
      bookingRate: "55%",
    },
    keyMetrics: [
      { label: "Revenue Increase", value: "+49%", icon: DollarSign },
      { label: "Consultations Booked", value: "+120%", icon: Users },
      { label: "Response Time", value: "24hrs → 0s", icon: Clock },
      { label: "Reviews", value: "18 → 47", icon: Star },
    ],
    quote:
      "In family law, when someone calls, they need help NOW. If we don't answer, they call the next attorney. TotalFlow captures those leads instantly and books consultations. We went from 8 to 20 consults per month.",
    story:
      "Carlos was losing potential clients because his small firm couldn't answer every call during court appearances and meetings. In family law, leads are extremely time-sensitive — a prospective client who doesn't get an immediate response moves on to the next attorney. TotalFlow AI now screens calls, captures case details, and books initial consultations automatically.",
    results: [
      "Consultation bookings increased from 8 to 20 per month",
      "Captured $17,000 in additional monthly revenue",
      "After-hours intake now captures 40% of new client leads",
      "Review automation helped establish trust for sensitive legal matters",
      "Freed up paralegal from phone duty — 10 hours per week saved",
    ],
  },
  {
    id: "salon",
    business: "Luxe Beauty Studio",
    vertical: "Salon & Spa",
    owner: "Jessica L.",
    location: "Atlanta, GA",
    monthsUsing: 5,
    plan: "$497/mo + $500 Setup",
    beforeStats: {
      missedCalls: "50%+",
      avgResponseTime: "Often never",
      monthlyRevenue: "$12,000",
      googleReviews: "3.5 stars (15 reviews)",
      bookingRate: "20%",
    },
    afterStats: {
      missedCalls: "<10%",
      avgResponseTime: "Instant",
      monthlyRevenue: "$24,000",
      googleReviews: "4.8 stars (72 reviews)",
      bookingRate: "58%",
    },
    keyMetrics: [
      { label: "Revenue Increase", value: "+100%", icon: DollarSign },
      { label: "Missed Calls", value: "50% → 10%", icon: Phone },
      { label: "Booking Rate", value: "20% → 58%", icon: TrendingUp },
      { label: "Reviews", value: "15 → 72", icon: Star },
    ],
    quote:
      "I'm a stylist — I can't answer the phone when I have foils in someone's hair! I was losing half my calls. Now TotalFlow books appointments while I'm working. My revenue literally doubled in 5 months.",
    story:
      "Jessica is a solo stylist who expanded to a 3-chair salon. With stylists unable to answer phones during appointments, over half of incoming calls went unanswered. TotalFlow AI now handles all booking calls, sends appointment confirmations, and follows up for reviews. The automated system even handles rescheduling and cancellation requests.",
    results: [
      "Revenue doubled from $12K to $24K monthly",
      "No-show rate dropped 35% with automated reminders",
      "72 reviews in 5 months (was getting ~1 per month before)",
      "Eliminated front desk receptionist cost ($2,800/mo savings)",
      "Stylists can focus 100% on clients during appointments",
    ],
  },
];

/* ─── Testimonials for quick social proof ─── */
const quickTestimonials = [
  {
    text: "Setup took less than an hour. By the end of the first week, I had 5 new booked appointments from calls I would have missed.",
    name: "David R.",
    business: "DR Electric",
    vertical: "Electrical",
  },
  {
    text: "The review automation alone is worth the price. We went from 2 reviews a month to 15. Our Google ranking shot up.",
    name: "Angela W.",
    business: "White Dental Group",
    vertical: "Dental",
  },
  {
    text: "I was paying $1,200/month for a call center that just took messages. TotalFlow actually books the appointments. Half the price, 10x the results.",
    name: "Robert J.",
    business: "RJ Roofing",
    vertical: "Roofing",
  },
  {
    text: "My agents love it. They pull up the demo on their iPad and close the deal right there. Best sales tool we have.",
    name: "Tony M.",
    business: "Metro Pest Control",
    vertical: "Pest Control",
  },
  {
    text: "We captured 23 after-hours leads in the first month. At $800 average ticket, that's $18,400 we were leaving on the table.",
    name: "Lisa P.",
    business: "Comfort Air Heating",
    vertical: "HVAC",
  },
  {
    text: "The CRM pipeline view alone changed how we run our business. We can see every lead, every stage, every follow-up.",
    name: "James H.",
    business: "Horizon Realty",
    vertical: "Real Estate",
  },
];

/* ─── Aggregate Stats ─── */
const aggregateStats = [
  { label: "Average Revenue Increase", value: "+96%", icon: TrendingUp },
  { label: "Missed Calls Eliminated", value: "90%+", icon: Phone },
  { label: "Avg New Reviews/Quarter", value: "45+", icon: Star },
  { label: "Average ROI", value: "8-12x", icon: DollarSign },
];

export default function ClientResults() {
  const [expandedCase, setExpandedCase] = useState<string | null>("hvac");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyTestimonial = (text: string, name: string, id: string) => {
    const full = `"${text}" — ${name}`;
    navigator.clipboard.writeText(full).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-1">
          <BarChart3 className="w-4 h-4" />
          Client Results & Social Proof
        </div>
        <h1 className="text-xl font-bold text-foreground">
          Real Results From Real Businesses
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Use these case studies and testimonials during your pitch. Copy quotes, share stats, and show prospects exactly what TotalFlow AI delivers.
        </p>
      </div>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {aggregateStats.map((stat) => (
          <Card key={stat.label} className="bg-orange-500/5 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <stat.icon className="w-5 h-5 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How to Use This Section */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-foreground mb-1">How to Use These in Your Pitch</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 shrink-0 mt-0.5 text-blue-500" />
                  <span>Match the case study to the prospect's vertical — a plumber wants to hear about plumber results</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 shrink-0 mt-0.5 text-blue-500" />
                  <span>Lead with the money number — "Our HVAC client went from $18K to $47K per month"</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 shrink-0 mt-0.5 text-blue-500" />
                  <span>Use the before/after stats when they say "does this actually work?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 shrink-0 mt-0.5 text-blue-500" />
                  <span>Copy testimonial quotes and paste them into follow-up texts or emails</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Case Studies */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-orange-500" />
          Detailed Case Studies
        </h2>
        <div className="space-y-4">
          {caseStudies.map((cs) => {
            const isExpanded = expandedCase === cs.id;
            return (
              <Card key={cs.id} className="overflow-hidden">
                {/* Case study header - always visible */}
                <button
                  onClick={() => setExpandedCase(isExpanded ? null : cs.id)}
                  className="w-full text-left"
                  data-testid={`case-study-toggle-${cs.id}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-base">{cs.business}</CardTitle>
                          <Badge variant="outline" className="text-[10px]">
                            {cs.vertical}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {cs.owner} · {cs.location} · {cs.monthsUsing} months on TotalFlow · {cs.plan}
                        </div>
                      </div>
                      <div className="shrink-0 ml-2">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {/* Key metrics — always visible */}
                  <CardContent className="pt-0 pb-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {cs.keyMetrics.map((m) => (
                        <div
                          key={m.label}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50"
                        >
                          <m.icon className="w-4 h-4 text-orange-500 shrink-0" />
                          <div>
                            <div className="text-xs font-bold text-foreground">{m.value}</div>
                            <div className="text-[10px] text-muted-foreground">{m.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <CardContent className="border-t pt-4 space-y-4">
                    {/* Quote */}
                    <div className="relative bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
                      <Quote className="w-6 h-6 text-orange-500/30 absolute top-3 left-3" />
                      <p className="text-sm italic text-foreground pl-6">
                        "{cs.quote}"
                      </p>
                      <div className="text-xs text-muted-foreground mt-2 pl-6">
                        — {cs.owner}, {cs.business}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-7 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyTestimonial(cs.quote, `${cs.owner}, ${cs.business}`, cs.id);
                        }}
                        data-testid={`copy-quote-${cs.id}`}
                      >
                        {copiedId === cs.id ? (
                          <><Check className="w-3 h-3 mr-1" /> Copied</>
                        ) : (
                          <><Copy className="w-3 h-3 mr-1" /> Copy Quote</>
                        )}
                      </Button>
                    </div>

                    {/* Before / After */}
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-red-500 uppercase tracking-wider">Before TotalFlow</div>
                        {Object.entries(cs.beforeStats).map(([key, val]) => (
                          <div key={key} className="flex justify-between items-center py-1 px-3 rounded bg-red-500/5 text-xs">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-medium text-red-500">{val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-green-500 uppercase tracking-wider">After TotalFlow</div>
                        {Object.entries(cs.afterStats).map(([key, val]) => (
                          <div key={key} className="flex justify-between items-center py-1 px-3 rounded bg-green-500/5 text-xs">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-medium text-green-500">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Story */}
                    <div>
                      <div className="text-xs font-semibold text-foreground mb-1">The Story</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{cs.story}</p>
                    </div>

                    {/* Results List */}
                    <div>
                      <div className="text-xs font-semibold text-foreground mb-2">Key Results</div>
                      <ul className="space-y-1.5">
                        {cs.results.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Testimonials */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-orange-500" />
          Quick Testimonials
          <span className="text-xs font-normal text-muted-foreground ml-1">Tap to copy</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {quickTestimonials.map((t, i) => (
            <Card
              key={i}
              className="cursor-pointer hover:border-orange-500/30 transition-colors group"
              onClick={() => copyTestimonial(t.text, `${t.name}, ${t.business}`, `quick-${i}`)}
              data-testid={`testimonial-${i}`}
            >
              <CardContent className="p-4 relative">
                <Quote className="w-4 h-4 text-orange-500/20 absolute top-3 right-3" />
                <p className="text-xs text-foreground leading-relaxed mb-3 pr-6">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-foreground">{t.name}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {t.business} · {t.vertical}
                    </div>
                  </div>
                  <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    {copiedId === `quick-${i}` ? (
                      <><Check className="w-3 h-3 text-green-500" /> Copied</>
                    ) : (
                      <><Copy className="w-3 h-3" /> Copy</>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Framework for building your own case study */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500" />
            Build Your Own Case Study
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            After a client has been using TotalFlow for 30+ days, gather their numbers and create a case study using this framework.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              step: "1",
              title: "Capture Baseline Numbers",
              detail:
                "Before onboarding or in the first call: How many calls per week? What % go unanswered? Average response time? Monthly revenue? Current Google review count and rating?",
            },
            {
              step: "2",
              title: "Track TotalFlow Metrics at 30 Days",
              detail:
                "Pull from GHL dashboard: Total calls handled by AI, appointments booked, reviews generated, pipeline value, missed call rate.",
            },
            {
              step: "3",
              title: "Calculate Revenue Impact",
              detail:
                "New appointments × average ticket value = captured revenue. Add: review impact on search ranking, time saved × hourly rate, replaced service costs.",
            },
            {
              step: "4",
              title: "Get the Quote",
              detail:
                "Ask: 'If you had to tell another business owner about your experience with TotalFlow in 2-3 sentences, what would you say?' Record it word for word.",
            },
            {
              step: "5",
              title: "Package and Share",
              detail:
                "Create a before/after comparison with the numbers. Add the quote. Share with the team so every rep can use it for that vertical.",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {item.step}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.detail}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
