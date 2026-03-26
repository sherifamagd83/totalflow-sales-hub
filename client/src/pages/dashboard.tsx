import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, BookOpen, Shield, Target, Rocket, TrendingUp, Users, Zap } from "lucide-react";

export default function Dashboard() {
  const quickActions = [
    { icon: Phone, label: "Call Scripts", href: "/scripts", color: "text-orange-500", desc: "Cold call, door-to-door, email" },
    { icon: Shield, label: "Objection Playbook", href: "/objections", color: "text-blue-500", desc: "Handle any pushback" },
    { icon: BookOpen, label: "Demo Guide", href: "/demo", color: "text-green-500", desc: "Walk-through demos step by step" },
    { icon: Target, label: "Sales Process", href: "/process", color: "text-purple-500", desc: "Prospect to close to retain" },
    { icon: TrendingUp, label: "ROI Calculator", href: "/roi", color: "text-yellow-500", desc: "Show prospects their ROI" },
    { icon: Users, label: "Verticals", href: "/verticals", color: "text-pink-500", desc: "Industry-specific playbooks" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <div className="rounded-xl bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 p-6 md:p-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight" data-testid="text-hero-title">
              TotalFlow AI Sales Hub
            </h1>
            <p className="text-muted-foreground mt-1 max-w-xl text-sm">
              Everything you need to close deals. Scripts, demos, objection handlers, and ROI calculators — all in one place.
            </p>
          </div>
          <Badge variant="outline" className="text-orange-500 border-orange-500/30 text-xs">
            <Zap className="w-3 h-3 mr-1" /> v1.0
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Verticals", value: "5", sub: "industries covered" },
            { label: "Scripts", value: "6+", sub: "ready to use" },
            { label: "Objections", value: "10", sub: "responses loaded" },
            { label: "Avg ROI", value: "29x", sub: "for clients" },
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Rocket className="w-4 h-4 text-orange-500" />
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="cursor-pointer transition-all hover:border-orange-500/40 hover:bg-accent/50 group h-full" data-testid={`card-action-${action.label.toLowerCase().replace(/\s/g, '-')}`}>
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
        <h2 className="text-base font-semibold mb-4">Daily Gameplan</h2>
        <Card>
          <CardContent className="p-5">
            <div className="space-y-3">
              {[
                { time: "7:00 - 8:00 AM", task: "Cold calls — catch contractors before they head to jobs", icon: "📞" },
                { time: "8:00 - 10:00 AM", task: "Send cold email sequence & follow-up texts", icon: "📧" },
                { time: "10:00 AM - 2:00 PM", task: "Door-to-door visits — bring tear sheets", icon: "🚪" },
                { time: "2:00 - 4:00 PM", task: "Demos & follow-up calls", icon: "💻" },
                { time: "4:00 - 6:00 PM", task: "Second round of cold calls — catch owners after jobs", icon: "📞" },
                { time: "Evening", task: "Update CRM, prep tomorrow's outreach list", icon: "📋" },
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
        <h2 className="text-base font-semibold mb-4">Numbers to Remember</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { stat: "80%", desc: "of contractor calls go unanswered" },
            { stat: "$12,600", desc: "average monthly revenue lost to missed calls" },
            { stat: "29x", desc: "average ROI for TotalFlow AI clients" },
            { stat: "48 hours", desc: "from signup to live system" },
            { stat: "$497/mo", desc: "plus $500 one-time setup" },
            { stat: "90%", desc: "of callers don't realize it's AI" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-card" data-testid={`number-${i}`}>
              <div className="text-lg font-bold text-orange-500 w-24 shrink-0">{item.stat}</div>
              <div className="text-sm text-muted-foreground">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
