import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { verticals, type Vertical } from "@/lib/salesData";
import { ChevronDown, ChevronUp, Target, DollarSign, TrendingUp, AlertCircle, Users } from "lucide-react";

export default function Verticals() {
  const [expandedId, setExpandedId] = useState<string>(verticals[0]?.id || "");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight" data-testid="text-verticals-title">
          Industry Playbooks
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pain points, ideal clients, and pricing by vertical. Know your prospect before you call.
        </p>
      </div>

      {/* Quick Select */}
      <div className="flex flex-wrap gap-2">
        {verticals.map((v) => (
          <button
            key={v.id}
            onClick={() => setExpandedId(v.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              expandedId === v.id
                ? "bg-orange-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            data-testid={`button-vertical-${v.id}`}
          >
            <span>{v.icon}</span>
            {v.name}
          </button>
        ))}
      </div>

      {/* Vertical Cards */}
      <div className="space-y-3">
        {verticals.map((vertical) => {
          const isExpanded = expandedId === vertical.id;

          return (
            <Card
              key={vertical.id}
              className={`transition-all ${isExpanded ? "border-orange-500/40" : ""}`}
              data-testid={`card-vertical-${vertical.id}`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? "" : vertical.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-2xl">{vertical.icon}</div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm">{vertical.name}</div>
                    <div className="flex gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {vertical.avgDealSize}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {vertical.closingRate}
                      </Badge>
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>

              {isExpanded && (
                <CardContent className="pt-0 pb-4 px-4">
                  <div className="border-t pt-4 space-y-4">
                    {/* Pain Points */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Pain Points — Lead With These
                      </div>
                      <div className="space-y-1.5">
                        {vertical.painPoints.map((pain, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm bg-red-500/5 border border-red-500/10 rounded-lg px-3 py-2">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{pain}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ideal Client */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-blue-500 mb-2 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        Ideal Client
                      </div>
                      <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg px-3 py-2 text-sm">
                        {vertical.idealClient}
                      </div>
                    </div>

                    {/* Deal Info */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-500/5 border border-green-500/10 rounded-lg p-3 text-center">
                        <DollarSign className="w-4 h-4 text-green-500 mx-auto mb-1" />
                        <div className="text-sm font-bold">{vertical.avgDealSize}</div>
                        <div className="text-[10px] text-muted-foreground">Avg Deal</div>
                      </div>
                      <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-3 text-center">
                        <TrendingUp className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                        <div className="text-sm font-bold">{vertical.closingRate}</div>
                        <div className="text-[10px] text-muted-foreground">Close Rate</div>
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
