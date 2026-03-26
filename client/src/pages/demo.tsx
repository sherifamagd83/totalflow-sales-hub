import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { demoSteps } from "@/lib/salesData";
import { Play, CheckCircle, Clock, Phone, ChevronRight, AlertCircle } from "lucide-react";

export default function Demo() {
  const [currentStep, setCurrentStep] = useState(0);

  const totalTime = demoSteps.reduce((acc, s) => {
    const mins = parseInt(s.duration);
    return acc + (isNaN(mins) ? 2 : mins);
  }, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight" data-testid="text-demo-title">
          Demo Walkthrough
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Step-by-step guide for running a killer demo. Total time: ~{totalTime} minutes.
        </p>
      </div>

      {/* Demo Line Call-out */}
      <Card className="border-orange-500/30 bg-orange-500/5">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 rounded-full bg-orange-500/10">
            <Phone className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <div className="font-semibold text-sm">Demo Line: (417) 607-6412</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Call this during every demo. Let the prospect hear the AI live.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress bar */}
      <div className="flex items-center gap-1">
        {demoSteps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors cursor-pointer ${
              i <= currentStep ? "bg-orange-500" : "bg-muted"
            }`}
            onClick={() => setCurrentStep(i)}
            data-testid={`progress-step-${i}`}
          />
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {demoSteps.map((step, i) => {
          const isActive = i === currentStep;
          const isDone = i < currentStep;

          return (
            <Card
              key={step.id}
              className={`transition-all cursor-pointer ${
                isActive ? "border-orange-500/40 bg-card" : isDone ? "opacity-60" : ""
              }`}
              onClick={() => setCurrentStep(i)}
              data-testid={`card-demo-step-${i}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                    isActive ? "bg-orange-500 text-white" : isDone ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
                  }`}>
                    {isDone ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium text-sm">{step.title}</div>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                        <Clock className="w-2.5 h-2.5 mr-0.5" />
                        {step.duration}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{step.description}</div>

                    {isActive && (
                      <div className="mt-3 space-y-2">
                        {step.talkingPoints.map((point, pi) => (
                          <div key={pi} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          data-testid="button-prev-step"
        >
          Previous
        </Button>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {demoSteps.length}
        </span>
        <Button
          size="sm"
          onClick={() => setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))}
          disabled={currentStep === demoSteps.length - 1}
          className="bg-orange-500 hover:bg-orange-600 text-white"
          data-testid="button-next-step"
        >
          Next Step
        </Button>
      </div>

      {/* Pro Tips */}
      <Card className="border-yellow-500/20 bg-yellow-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-sm mb-2">Pro Tips</div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>- In-person demos close at 2x the rate of video calls</li>
                <li>- Always call THEIR number first so they feel the pain</li>
                <li>- Let them interact with the AI — have them ask questions</li>
                <li>- Get their average job value during the demo for the ROI close</li>
                <li>- The demo line is your most powerful sales tool — use it</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
