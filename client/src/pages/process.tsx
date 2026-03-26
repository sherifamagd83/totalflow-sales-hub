import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { salesProcess, type ProcessStep } from "@/lib/salesData";
import { Search, Megaphone, Monitor, HandshakeIcon, Settings, TrendingUp, ChevronDown, ChevronUp, CheckCircle, Lightbulb, Clock } from "lucide-react";

const phaseIcons: Record<string, typeof Search> = {
  Prospect: Search,
  Outreach: Megaphone,
  Demo: Monitor,
  Close: HandshakeIcon,
  Onboard: Settings,
  "Retain & Grow": TrendingUp,
};

const phaseColors: Record<string, string> = {
  Prospect: "bg-blue-500 text-white",
  Outreach: "bg-purple-500 text-white",
  Demo: "bg-orange-500 text-white",
  Close: "bg-green-500 text-white",
  Onboard: "bg-yellow-500 text-white",
  "Retain & Grow": "bg-pink-500 text-white",
};

export default function Process() {
  const [expandedId, setExpandedId] = useState<number>(1);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight" data-testid="text-process-title">
          Sales Process
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          The complete A-to-Z playbook. From finding prospects to retaining clients.
        </p>
      </div>

      {/* Visual Pipeline */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {salesProcess.map((step, i) => {
          const isActive = expandedId === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setExpandedId(step.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isActive ? phaseColors[step.phase] : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              data-testid={`button-phase-${step.phase.toLowerCase().replace(/\s/g, '-')}`}
            >
              {(() => { const Icon = phaseIcons[step.phase] || Search; return <Icon className="w-3 h-3" />; })()}
              {step.phase}
            </button>
          );
        })}
      </div>

      {/* Step Cards */}
      <div className="space-y-3">
        {salesProcess.map((step) => {
          const isExpanded = expandedId === step.id;
          const Icon = phaseIcons[step.phase] || Search;

          return (
            <Card
              key={step.id}
              className={`transition-all ${isExpanded ? "border-orange-500/40" : ""}`}
              data-testid={`card-process-${step.id}`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? -1 : step.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${phaseColors[step.phase]}`}>
                    {step.id}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm">{step.phase}: {step.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        <Clock className="w-2.5 h-2.5 mr-0.5" />
                        {step.timeframe}
                      </Badge>
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>

              {isExpanded && (
                <CardContent className="pt-0 pb-4 px-4">
                  <div className="border-t pt-4 space-y-4">
                    {/* Tasks */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-orange-500 mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Tasks
                      </div>
                      <div className="space-y-2">
                        {step.tasks.map((task, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <div className="w-5 h-5 rounded border border-muted-foreground/20 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-muted-foreground">
                              {i + 1}
                            </div>
                            <span className="leading-relaxed">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-yellow-500 mb-2 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5" />
                        Pro Tips
                      </div>
                      <div className="space-y-1.5">
                        {step.tips.map((tip, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground bg-yellow-500/5 rounded-lg px-3 py-2 border border-yellow-500/10">
                            <Lightbulb className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
