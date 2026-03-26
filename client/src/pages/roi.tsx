import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { calculateROI } from "@/lib/salesData";
import { Calculator, TrendingUp, DollarSign, Phone, Calendar, ArrowUpRight } from "lucide-react";

export default function ROI() {
  const [avgJobValue, setAvgJobValue] = useState(1500);
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(5);
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(500);

  const results = calculateROI({ avgJobValue, missedCallsPerWeek, monthlyAdSpend });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight" data-testid="text-roi-title">
          ROI Calculator
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Use this during demos. Enter the prospect's numbers and show them the math.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-5">
          <Card>
            <CardContent className="p-5 space-y-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Calculator className="w-4 h-4 text-orange-500" />
                Prospect's Numbers
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Average Job Value</Label>
                  <span className="text-sm font-semibold text-orange-500" data-testid="text-avg-job-value">
                    ${avgJobValue.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[avgJobValue]}
                  onValueChange={(v) => setAvgJobValue(v[0])}
                  min={100}
                  max={10000}
                  step={100}
                  className="w-full"
                  data-testid="slider-avg-job"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>$100</span>
                  <span>$10,000</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Missed Calls Per Week</Label>
                  <span className="text-sm font-semibold text-orange-500" data-testid="text-missed-calls">
                    {missedCallsPerWeek}
                  </span>
                </div>
                <Slider
                  value={[missedCallsPerWeek]}
                  onValueChange={(v) => setMissedCallsPerWeek(v[0])}
                  min={1}
                  max={30}
                  step={1}
                  className="w-full"
                  data-testid="slider-missed-calls"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>1/week</span>
                  <span>30/week</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Monthly Ad Spend</Label>
                  <span className="text-sm font-semibold text-orange-500" data-testid="text-ad-spend">
                    ${monthlyAdSpend.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[monthlyAdSpend]}
                  onValueChange={(v) => setMonthlyAdSpend(v[0])}
                  min={0}
                  max={5000}
                  step={100}
                  className="w-full"
                  data-testid="slider-ad-spend"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>$0</span>
                  <span>$5,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pitch Script */}
          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardContent className="p-4">
              <div className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-2">
                Say This to the Prospect
              </div>
              <div className="text-sm leading-relaxed">
                "So {'{Name}'}, you're telling me you miss about <strong>{missedCallsPerWeek} calls per week</strong>.
                At <strong>${avgJobValue.toLocaleString()}</strong> per job,
                that's roughly <strong>${(missedCallsPerWeek * 4 * avgJobValue * 0.18).toLocaleString()}</strong> walking out the door every month.
                TotalFlow captures those calls for <strong>$497/month</strong> — that's a <strong>{results.roi}x return</strong>.
                You only need <strong>one extra job</strong> to more than cover it."
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {/* Big ROI */}
          <Card className="bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/20">
            <CardContent className="p-5 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Monthly ROI</div>
              <div className="text-4xl font-bold text-orange-500 mt-1" data-testid="text-roi-result">
                {results.roi}x
              </div>
              <div className="text-xs text-muted-foreground mt-1">return on investment</div>
            </CardContent>
          </Card>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <Phone className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <div className="text-lg font-bold" data-testid="text-captured-calls">
                  {results.capturedCalls}
                </div>
                <div className="text-[10px] text-muted-foreground">Calls captured/mo</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="w-4 h-4 text-green-500 mx-auto mb-1" />
                <div className="text-lg font-bold" data-testid="text-new-jobs">
                  {results.newJobs}
                </div>
                <div className="text-[10px] text-muted-foreground">New jobs/mo</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                <div className="text-lg font-bold text-green-500" data-testid="text-additional-revenue">
                  ${results.additionalRevenue.toLocaleString()}
                </div>
                <div className="text-[10px] text-muted-foreground">Added revenue/mo</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                <div className="text-lg font-bold" data-testid="text-annual-impact">
                  ${results.annualImpact.toLocaleString()}
                </div>
                <div className="text-[10px] text-muted-foreground">Annual impact</div>
              </CardContent>
            </Card>
          </div>

          {/* Investment vs Return */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="text-sm font-semibold">Investment vs. Return</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Monthly cost</span>
                  <span className="font-medium">$497</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Setup fee (one-time)</span>
                  <span className="font-medium">$500</span>
                </div>
                <div className="border-t pt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Additional monthly revenue</span>
                  <span className="font-bold text-green-500 flex items-center gap-1">
                    +${results.additionalRevenue.toLocaleString()}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Net monthly gain</span>
                  <span className="font-bold text-green-500">
                    +${(results.additionalRevenue - 497).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
