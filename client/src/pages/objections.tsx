import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { objections, type Objection } from "@/lib/salesData";
import { DollarSign, ShieldCheck, Clock, Swords, Cpu, ChevronDown, ChevronUp, MessageCircle, ArrowRight } from "lucide-react";

const categoryIcons: Record<string, typeof DollarSign> = {
  price: DollarSign,
  trust: ShieldCheck,
  timing: Clock,
  competition: Swords,
  technical: Cpu,
};

const categoryLabels: Record<string, string> = {
  price: "Price",
  trust: "Trust",
  timing: "Timing",
  competition: "Competition",
  technical: "Technical",
};

const categoryColors: Record<string, string> = {
  price: "text-green-500 bg-green-500/10 border-green-500/20",
  trust: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  timing: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
  competition: "text-red-500 bg-red-500/10 border-red-500/20",
  technical: "text-purple-500 bg-purple-500/10 border-purple-500/20",
};

export default function Objections() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const categories = [...new Set(objections.map((o) => o.category))];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight" data-testid="text-objections-title">
          Objection Playbook
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Never get stuck again. Tap any objection to see the exact response and follow-up question.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
          <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs rounded-full px-3 py-1.5">
            All ({objections.length})
          </TabsTrigger>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            const count = objections.filter((o) => o.category === cat).length;
            return (
              <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs rounded-full px-3 py-1.5">
                <Icon className="w-3 h-3 mr-1" />
                {categoryLabels[cat]} ({count})
              </TabsTrigger>
            );
          })}
        </TabsList>

        {["all", ...categories].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4 space-y-3">
            {objections
              .filter((o) => tab === "all" || o.category === tab)
              .map((obj) => (
                <ObjectionCard
                  key={obj.id}
                  objection={obj}
                  expanded={expandedId === obj.id}
                  onToggle={() => setExpandedId(expandedId === obj.id ? null : obj.id)}
                />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ObjectionCard({ objection, expanded, onToggle }: { objection: Objection; expanded: boolean; onToggle: () => void }) {
  const colorClass = categoryColors[objection.category];
  const Icon = categoryIcons[objection.category];

  return (
    <Card className={`transition-all ${expanded ? "border-orange-500/40" : ""}`} data-testid={`card-objection-${objection.id}`}>
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-start justify-between gap-3"
        data-testid={`button-toggle-${objection.id}`}
      >
        <div className="flex items-start gap-3 min-w-0">
          <div className={`p-2 rounded-lg border shrink-0 ${colorClass}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm">"{objection.objection}"</div>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 mt-1">
              {categoryLabels[objection.category]}
            </Badge>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />}
      </button>

      {expanded && (
        <CardContent className="pt-0 pb-4 px-4">
          <div className="border-t pt-4 space-y-4">
            {/* Response */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-500 uppercase tracking-wide">
                <MessageCircle className="w-3.5 h-3.5" />
                Your Response
              </div>
              <div className="bg-orange-500/5 border border-orange-500/10 rounded-lg p-3 text-sm leading-relaxed">
                {objection.response}
              </div>
            </div>

            {/* Follow-up */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 uppercase tracking-wide">
                <ArrowRight className="w-3.5 h-3.5" />
                Follow-Up Question
              </div>
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-3 text-sm leading-relaxed italic">
                {objection.followUp}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
