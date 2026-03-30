import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Phone,
  BookOpen,
  Shield,
  Target,
  Rocket,
  TrendingUp,
  Users,
  Zap,
  Play,
  Swords,
  MessageSquare,
  BarChart3,
  ClipboardList,
  ArrowRight,
  Star,
  CreditCard,
} from "lucide-react";

export default function Dashboard() {
  const featuredActions = [
    {
      icon: Play,
      label: "Live Demo",
      href: "/live-demo",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      desc: "Interactive demo — show prospects the full system live",
      featured: true,
    },
    {
      icon: MessageSquare,
      label: "Quick Pitch",
      href: "/quick-pitch",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      desc: "15sec, 30sec, 60sec & 2min pitches ready to go",
      featured: true,
    },
  ];

  const quickActions = [
    { icon: Phone, label: "Call Scripts", href: "/scripts", color: "text-blue-500", desc: "Cold call, walk-in, email, text" },
    { icon: Shield, label: "Objection Playbook", href: "/objections", color: "text-blue-500", desc: "Handle any pushback instantly" },
    { icon: Swords, label: "Battle Cards", href: "/battle-cards", color: "text-red-500", desc: "Crush competitor comparisons" },
    { icon: CreditCard, label: "Pricing & Plans", href: "/pricing", color: "text-green-500", desc: "3-tier pricing + upsell guidance" },
    { icon: TrendingUp, label: "ROI Calculator", href: "/roi", color: "text-green-500", desc: "Show prospects their ROI" },
    { icon: BookOpen, label: "Demo Guide", href: "/demo", color: "text-purple-500", desc: "Step-by-step demo walk-through" },
    { icon: Target, label: "Sales Process", href: "/process", color: "text-purple-500", desc: "Prospect → close → retain" },
    { icon: Users, label: "Verticals", href: "/verticals", color: "text-pink-500", desc: "Industry-specific playbooks" },
    { icon: BarChart3, label: "Client Results", href: "/client-results", color: "text-yellow-500", desc: "Case studies & social proof" },
    { icon: ClipboardList, label: "Onboarding", href: "/onboarding", color: "text-teal-500", desc: "Post-close checklist & templates" },
  ];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <div className="rounded-xl bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 p-5 md:p-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight" data-testid="text-hero-title">
              TotalFlow AI Sales Hub
            </h1>
            <p className="text-muted-foreground mt-1 max-w-xl text-sm">
              Everything your team needs to close deals. Scripts, live demos, objection handlers, battle cards, ROI calculators, and post-close onboarding — all in one place.
            </p>
          </div>
          <Badge variant="outline" className="text-orange-500 border-orange-500/30 text-xs">
            <Zap className="w-3 h-3 mr-1" /> v3.0
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {[
            { label: "Capabilities", value: "10", sub: "all in one platform" },
            { label: "Pricing Tiers", value: "3", sub: "$497 / $997 / $1,997" },
            { label: "Verticals", value: "12+", sub: "industries served" },
            { label: "Avg ROI", value: "10-29x", sub: "for clients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-lg bg-background/60">
              <div className="text-lg font-bold text-orange-500" data-testid={`stat-${stat.label.toLowerCase()}`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured — Live Demo & Quick Pitch */}
      <div>
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2 text-orange-500 uppercase tracking-wider">
          <Star className="w-4 h-4" />
          Featured Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {featuredActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card
                className="cursor-pointer transition-all hover:border-orange-500/40 hover:shadow-md group h-full border-orange-500/20 bg-orange-500/5"
                data-testid={`card-featured-${action.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm group-hover:text-orange-500 transition-colors flex items-center gap-2">
                      {action.label}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{action.desc}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* All Tools Grid */}
      <div>
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Rocket className="w-4 h-4 text-orange-500" />
          All Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card
                className="cursor-pointer transition-all hover:border-orange-500/40 hover:bg-accent/50 group h-full"
                data-testid={`card-action-${action.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <div className={`${action.color} mt-0.5`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm group-hover:text-orange-500 transition-colors">
                      {action.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{action.desc}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Daily Gameplan */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Daily Gameplan</h2>
        <Card>
          <CardContent className="p-5">
            <div className="space-y-3">
              {[
                { time: "7:00 - 8:00 AM", task: "Cold calls — catch contractors before they head to jobs", icon: "📞" },
                { time: "8:00 - 10:00 AM", task: "Send cold email sequence & follow-up texts", icon: "📧" },
                { time: "10:00 AM - 2:00 PM", task: "Door-to-door visits — bring tear sheets & iPad for live demo", icon: "🚪" },
                { time: "2:00 - 4:00 PM", task: "Scheduled demos & follow-up calls — use Live Demo page", icon: "💻" },
                { time: "4:00 - 6:00 PM", task: "Second round of cold calls — catch owners after jobs", icon: "📞" },
                { time: "Evening", task: "Update CRM, prep tomorrow's outreach, review battle cards", icon: "📋" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors" data-testid={`task-${i}`}>
                  <span className="text-base">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-orange-500">{item.time}</div>
                    <div className="text-sm text-foreground">{item.task}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Numbers */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Numbers to Remember</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { stat: "80%", desc: "of callers who get voicemail never call back" },
            { stat: "$4,200/mo", desc: "average lost to missed calls" },
            { stat: "10-29x", desc: "average ROI for TotalFlow AI clients" },
            { stat: "5-7 days", desc: "from signup to live system" },
            { stat: "$497/mo", desc: "Starter plan (10 tools in one)" },
            { stat: "$997/mo", desc: "Growth plan (includes marketing)" },
            { stat: "90%", desc: "of callers don't realize it's AI" },
            { stat: "40+", desc: "local businesses automated" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-card" data-testid={`number-${i}`}>
              <div className="text-lg font-bold text-orange-500 w-24 shrink-0">{item.stat}</div>
              <div className="text-sm text-muted-foreground">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Line CTA */}
      <Card className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-orange-500/20">
        <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-foreground">Demo Line — Let Prospects Hear It Live</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Have the prospect call this number during your pitch. They'll hear the AI answer in real-time.
            </div>
          </div>
          <a
            href="tel:4176076412"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors shrink-0"
            data-testid="link-demo-cta"
          >
            <Phone className="w-4 h-4" />
            (417) 607-6412
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
