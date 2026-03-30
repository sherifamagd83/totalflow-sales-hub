import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Printer,
  Zap,
  Phone,
  PhoneOff,
  Clock,
  Star,
  Smartphone,
  Users,
  Bot,
  DollarSign,
  AlertTriangle,
  Droplets,
  Plug,
  Scale,
  Smile,
  Scissors,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  UtensilsCrossed,
  Car,
  Dumbbell,
  Bug,
  Hammer,
  SprayCan,
  Dog,
} from "lucide-react";

type VerticalKey = "hvac" | "plumbing" | "electrical" | "legal" | "dental" | "salon" | "restaurant" | "auto" | "fitness" | "pest" | "roofing" | "cleaning" | "pet";

interface VerticalData {
  label: string;
  icon: typeof Zap;
  headline: string;
  monthlyLoss: string;
  painPoints: { icon: typeof Zap; stat: string; detail: string }[];
  color: string;
}

const verticals: Record<VerticalKey, VerticalData> = {
  hvac: {
    label: "HVAC",
    icon: Zap,
    headline: "HVAC Companies Lose $12,600/Month to Missed Calls",
    monthlyLoss: "$12,600",
    color: "bg-red-500/10 text-red-500",
    painPoints: [
      {
        icon: PhoneOff,
        stat: "80% of callers who get voicemail never call back",
        detail: "They call the next HVAC company on Google instead.",
      },
      {
        icon: AlertTriangle,
        stat: "AC emergencies need instant response",
        detail: "When it's 100°F, the first company to answer wins the job.",
      },
      {
        icon: Clock,
        stat: "After-hours calls are your highest-value leads",
        detail: "Emergency repairs = premium pricing. Don't send them to voicemail.",
      },
    ],
  },
  plumbing: {
    label: "Plumbing",
    icon: Droplets,
    headline: "Plumbing Companies Lose $8,400/Month to Missed Calls",
    monthlyLoss: "$8,400",
    color: "bg-blue-500/10 text-blue-500",
    painPoints: [
      {
        icon: AlertTriangle,
        stat: "Emergency leaks can't wait for callbacks",
        detail: "Water damage costs thousands — customers call someone who answers now.",
      },
      {
        icon: Clock,
        stat: "After-hours = your biggest revenue window",
        detail: "Evenings and weekends are peak emergency plumbing calls.",
      },
      {
        icon: PhoneOff,
        stat: "80% of voicemail callers never call back",
        detail: "Every missed call is a $500-$2,000 job walking to your competitor.",
      },
    ],
  },
  electrical: {
    label: "Electrical",
    icon: Plug,
    headline: "Electrical Companies Lose $7,200/Month to Missed Calls",
    monthlyLoss: "$7,200",
    color: "bg-yellow-500/10 text-yellow-600",
    painPoints: [
      {
        icon: AlertTriangle,
        stat: "Safety concerns need immediate response",
        detail: "Electrical issues are urgent. Customers won't wait for a callback.",
      },
      {
        icon: Users,
        stat: "Commercial + residential calls both missed",
        detail: "You're on a job site and can't pick up — that commercial contract goes elsewhere.",
      },
      {
        icon: PhoneOff,
        stat: "80% of callers who hit voicemail never try again",
        detail: "They Google the next electrician. First to answer wins.",
      },
    ],
  },
  legal: {
    label: "Legal",
    icon: Scale,
    headline: "Law Firms Lose $20,000/Month in Missed Retainers",
    monthlyLoss: "$20,000",
    color: "bg-purple-500/10 text-purple-500",
    painPoints: [
      {
        icon: Phone,
        stat: "Clients call 2-3 firms — first to answer wins",
        detail: "Legal prospects are actively shopping. Speed is everything.",
      },
      {
        icon: Clock,
        stat: "After-hours intake is critical",
        detail: "Arrests, accidents, and emergencies don't happen 9-5.",
      },
      {
        icon: DollarSign,
        stat: "Each missed call = $3,000-$10,000+ in lost retainers",
        detail: "One personal injury case could be worth your entire month.",
      },
    ],
  },
  dental: {
    label: "Dental",
    icon: Smile,
    headline: "Dental Practices Lose $10,000/Month to Missed Calls",
    monthlyLoss: "$10,000",
    color: "bg-cyan-500/10 text-cyan-500",
    painPoints: [
      {
        icon: DollarSign,
        stat: "New patients = $3,000+ lifetime value",
        detail: "One missed new-patient call costs you years of revenue.",
      },
      {
        icon: Clock,
        stat: "Emergency dental calls come after hours",
        detail: "Toothaches don't wait until Monday morning.",
      },
      {
        icon: PhoneOff,
        stat: "Front desk can't answer during procedures",
        detail: "Your hygienists and front desk are busy — calls roll to voicemail.",
      },
    ],
  },
  salon: {
    label: "Salon",
    icon: Scissors,
    headline: "Salons Lose $4,000-$8,000/Month to Missed Calls",
    monthlyLoss: "$4,000-$8,000",
    color: "bg-pink-500/10 text-pink-500",
    painPoints: [
      { icon: Scissors, stat: "Stylists can't answer during appointments", detail: "Your hands are busy — and so is your revenue walking out the door." },
      { icon: PhoneOff, stat: "50%+ of calls go unanswered", detail: "More than half your inbound calls are missed every single day." },
      { icon: DollarSign, stat: "Each missed call = $80-$300 in lost bookings", detail: "Color, cuts, and treatments add up — and they book with whoever answers." },
    ],
  },
  restaurant: {
    label: "Restaurant",
    icon: UtensilsCrossed,
    headline: "Restaurants Lose $6,000/Month to Missed Reservations & Orders",
    monthlyLoss: "$6,000",
    color: "bg-orange-500/10 text-orange-600",
    painPoints: [
      { icon: PhoneOff, stat: "Rush hour = missed calls", detail: "During peak service, nobody can answer the phone. Reservations go elsewhere." },
      { icon: DollarSign, stat: "Catering & event calls are high-value", detail: "A missed catering inquiry could be a $2,000-$10,000 order." },
      { icon: Clock, stat: "After-hours orders go unanswered", detail: "Late-night takeout requests hit voicemail and never come back." },
    ],
  },
  auto: {
    label: "Auto Shop",
    icon: Car,
    headline: "Auto Shops Lose $5,400/Month to Missed Service Calls",
    monthlyLoss: "$5,400",
    color: "bg-slate-500/10 text-slate-500",
    painPoints: [
      { icon: PhoneOff, stat: "Techs under cars can't answer phones", detail: "40%+ of calls go to voicemail when your team is working." },
      { icon: Clock, stat: "Oil change & service reminders are manual", detail: "Customers forget — no reminder means no return visit." },
      { icon: Star, stat: "Low reviews vs. chain competitors", detail: "Jiffy Lube has 200+ reviews. Your 15 reviews make you invisible." },
    ],
  },
  fitness: {
    label: "Fitness",
    icon: Dumbbell,
    headline: "Gyms Lose $4,800/Month to Missed Membership Inquiries",
    monthlyLoss: "$4,800",
    color: "bg-green-500/10 text-green-600",
    painPoints: [
      { icon: PhoneOff, stat: "Membership inquiries go to voicemail after hours", detail: "People research gyms at night. If you don't answer, they join somewhere else." },
      { icon: Users, stat: "No automated follow-up for trial members", detail: "They tried a class but never heard from you again. Gone." },
      { icon: DollarSign, stat: "Each lost member = $600-$1,200/year", detail: "One missed signup is a year of recurring revenue lost." },
    ],
  },
  pest: {
    label: "Pest Control",
    icon: Bug,
    headline: "Pest Control Companies Lose $7,200/Month to Missed Calls",
    monthlyLoss: "$7,200",
    color: "bg-amber-500/10 text-amber-600",
    painPoints: [
      { icon: AlertTriangle, stat: "Emergency pest calls need instant response", detail: "Termites, rodents, bed bugs — customers call whoever picks up first." },
      { icon: Clock, stat: "Seasonal surges overwhelm your phone", detail: "Spring and summer = 3x the call volume. You can't answer them all." },
      { icon: PhoneOff, stat: "Techs in the field miss office calls", detail: "While you're on a job, the next customer is calling your competitor." },
    ],
  },
  roofing: {
    label: "Roofing",
    icon: Hammer,
    headline: "Roofing Companies Lose $15,000/Month After Storms",
    monthlyLoss: "$15,000",
    color: "bg-stone-500/10 text-stone-600",
    painPoints: [
      { icon: AlertTriangle, stat: "Storm damage calls surge 5-10x", detail: "After a hailstorm, your phone explodes. You physically can't answer every call." },
      { icon: DollarSign, stat: "Each missed estimate = $8,000-$25,000", detail: "A full roof replacement is a massive job. One missed call is devastating." },
      { icon: PhoneOff, stat: "60%+ of calls missed during storm season", detail: "Your crew is on roofs. Nobody is in the office." },
    ],
  },
  cleaning: {
    label: "Cleaning",
    icon: SprayCan,
    headline: "Cleaning Companies Lose $3,600/Month to Missed Quotes",
    monthlyLoss: "$3,600",
    color: "bg-sky-500/10 text-sky-600",
    painPoints: [
      { icon: PhoneOff, stat: "Quote requests come in after hours", detail: "People search for cleaning services at night. Your voicemail loses the lead." },
      { icon: Clock, stat: "No recurring reminders", detail: "Clients forget to rebook. No reminder = no repeat business." },
      { icon: Star, stat: "Price competition without reviews", detail: "Without 50+ reviews, you're competing on price alone. Reviews justify premium." },
    ],
  },
  pet: {
    label: "Pet Services",
    icon: Dog,
    headline: "Pet Businesses Lose $4,000/Month to Missed Bookings",
    monthlyLoss: "$4,000",
    color: "bg-amber-500/10 text-amber-700",
    painPoints: [
      { icon: PhoneOff, stat: "Can't answer while grooming or boarding", detail: "Your hands are full with animals — calls go to voicemail." },
      { icon: Clock, stat: "Holiday boarding fills up — but callers can't get through", detail: "Peak seasons = missed revenue from unanswered booking requests." },
      { icon: DollarSign, stat: "Loyal pet owners = recurring revenue", detail: "One new client books grooming every 6 weeks for years. Don't lose them." },
    ],
  },
};

const verticalKeys: VerticalKey[] = ["hvac", "plumbing", "electrical", "legal", "dental", "salon", "restaurant", "auto", "fitness", "pest", "roofing", "cleaning", "pet"];

const features = [
  { icon: Phone, text: "AI Phone Agent — answers every call 24/7, sounds human" },
  { icon: Bot, text: "AI Chatbot on your website & social media" },
  { icon: Users, text: "Full CRM — track every lead from call to close" },
  { icon: MessageSquare, text: "Automated follow-ups — text, email, voicemail drops" },
  { icon: Star, text: "Google review collection after every job" },
  { icon: Smartphone, text: "Mobile app — manage everything from your phone" },
];

const results = [
  { value: "+96%", label: "Average revenue increase" },
  { value: "10-29x", label: "Return on investment" },
  { value: "5-7 days", label: "Live and running" },
];

export default function TearSheets() {
  const [activeVertical, setActiveVertical] = useState<VerticalKey>("hvac");
  const data = verticals[activeVertical];

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          [data-testid="tear-sheet-printable"],
          [data-testid="tear-sheet-printable"] * {
            visibility: visible;
          }
          [data-testid="tear-sheet-printable"] {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          [data-testid="tear-sheet-controls"] {
            display: none !important;
          }
        }
      `}</style>

      <div data-testid="tear-sheets-page" className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div data-testid="tear-sheet-controls">
          <div className="flex items-center gap-3 mb-2">
            <Printer className="h-7 w-7 text-orange-500" />
            <h1 className="text-2xl md:text-3xl font-bold">Tear Sheets</h1>
          </div>
          <p className="text-muted-foreground">
            Print these or screenshot from your phone. Hand them to prospects during door-to-door visits.
          </p>

          {/* Vertical Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {verticalKeys.map((key) => {
              const v = verticals[key];
              const Icon = v.icon;
              return (
                <Button
                  key={key}
                  data-testid={`tab-${key}`}
                  variant={activeVertical === key ? "default" : "outline"}
                  className={
                    activeVertical === key
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : ""
                  }
                  onClick={() => setActiveVertical(key)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {v.label}
                </Button>
              );
            })}
          </div>

          {/* Print Button */}
          <div className="mt-4">
            <Button
              data-testid="print-button"
              onClick={handlePrint}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print This
            </Button>
          </div>
        </div>

        {/* Tear Sheet Card */}
        <Card
          data-testid="tear-sheet-printable"
          className="border-2 border-orange-500/30 overflow-hidden"
        >
          <CardContent className="p-6 md:p-8 space-y-6">
            {/* Logo / Brand */}
            <div data-testid="tear-sheet-header" className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-orange-500 rounded-lg p-2">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">
                  TotalFlow <span className="text-orange-500">AI</span>
                </span>
              </div>
              <Badge variant="outline" className="border-orange-500 text-orange-500 text-xs">
                {data.label} Edition
              </Badge>
            </div>

            {/* Headline */}
            <div data-testid="tear-sheet-headline" className="text-center py-4 border-y border-border">
              <h2 className="text-xl md:text-2xl font-bold leading-tight">
                {data.headline}
              </h2>
            </div>

            {/* Pain Points */}
            <div data-testid="tear-sheet-pain-points">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                The Problem
              </h3>
              <div className="grid gap-3">
                {data.painPoints.map((point, i) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                    >
                      <div className={`rounded-full p-1.5 mt-0.5 ${data.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{point.stat}</p>
                        <p className="text-xs text-muted-foreground">{point.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What TotalFlow AI Does */}
            <div data-testid="tear-sheet-features">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                What TotalFlow AI Does
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {features.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm">{f.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* The Results */}
            <div data-testid="tear-sheet-results">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                The Results
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {results.map((r, i) => (
                  <div
                    key={i}
                    className="text-center rounded-lg bg-orange-500/10 p-3"
                  >
                    <p className="text-xl md:text-2xl font-bold text-orange-500">
                      {r.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div
              data-testid="tear-sheet-pricing"
              className="text-center rounded-lg border border-orange-500/30 bg-orange-500/5 p-4"
            >
              <p className="font-bold text-lg">
                Plans start at <span className="text-orange-500">$497/mo</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                No contracts. 30-day money-back guarantee.
              </p>
            </div>

            {/* Demo + CTA */}
            <div data-testid="tear-sheet-cta" className="space-y-3 text-center">
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
                  Scan to learn more:{" "}
                  <span className="text-orange-500">totalflowai.ai</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
