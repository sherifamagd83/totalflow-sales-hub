import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { scripts, type Script } from "@/lib/salesData";
import { Phone, MapPin, RotateCcw, CheckCircle, Mail, MessageSquare, ChevronDown, ChevronUp, User, Users as UsersIcon, StickyNote } from "lucide-react";

const typeIcons: Record<string, typeof Phone> = {
  "cold-call": Phone,
  "door-to-door": MapPin,
  "follow-up": RotateCcw,
  "closing": CheckCircle,
  "cold-email": Mail,
  "text": MessageSquare,
};

const typeLabels: Record<string, string> = {
  "cold-call": "Cold Call",
  "door-to-door": "Walk-In",
  "follow-up": "Follow-Up",
  "closing": "Closing",
  "cold-email": "Cold Email",
  "text": "Text",
};

export default function Scripts() {
  const [expandedScript, setExpandedScript] = useState<string | null>(scripts[0]?.id || null);

  const types = [...new Set(scripts.map((s) => s.type))];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight" data-testid="text-scripts-title">
          Sales Scripts
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Word-for-word scripts for every situation. Tap to expand, read it like a conversation.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
          <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs rounded-full px-3 py-1.5">
            All Scripts
          </TabsTrigger>
          {types.map((type) => {
            const Icon = typeIcons[type] || Phone;
            return (
              <TabsTrigger key={type} value={type} className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs rounded-full px-3 py-1.5">
                <Icon className="w-3 h-3 mr-1" />
                {typeLabels[type]}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {["all", ...types].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4 space-y-3">
            {scripts
              .filter((s) => tab === "all" || s.type === tab)
              .map((script) => (
                <ScriptCard
                  key={script.id}
                  script={script}
                  expanded={expandedScript === script.id}
                  onToggle={() => setExpandedScript(expandedScript === script.id ? null : script.id)}
                />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ScriptCard({ script, expanded, onToggle }: { script: Script; expanded: boolean; onToggle: () => void }) {
  const Icon = typeIcons[script.type] || Phone;

  return (
    <Card className={`transition-all ${expanded ? "border-orange-500/40 bg-card" : ""}`} data-testid={`card-script-${script.id}`}>
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-center justify-between gap-3"
        data-testid={`button-toggle-${script.id}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`p-2 rounded-lg ${expanded ? "bg-orange-500/10 text-orange-500" : "bg-muted text-muted-foreground"}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm truncate">{script.name}</div>
            <div className="flex gap-2 mt-0.5">
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {typeLabels[script.type]}
              </Badge>
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>

      {expanded && (
        <CardContent className="pt-0 pb-4 px-4">
          <div className="border-t pt-4 space-y-3">
            {script.lines.map((line, i) => (
              <div key={i} className={`flex gap-3 ${line.speaker === "note" ? "py-2" : ""}`}>
                {line.speaker === "rep" && (
                  <div className="w-7 h-7 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                )}
                {line.speaker === "prospect" && (
                  <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <UsersIcon className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                )}
                {line.speaker === "note" && (
                  <div className="w-7 h-7 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <StickyNote className="w-3.5 h-3.5 text-yellow-500" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {line.speaker !== "note" && (
                    <div className={`text-[10px] font-semibold uppercase tracking-wide mb-0.5 ${line.speaker === "rep" ? "text-orange-500" : "text-blue-500"}`}>
                      {line.speaker === "rep" ? "You" : "Prospect"}
                    </div>
                  )}
                  <div className={`text-sm leading-relaxed ${
                    line.speaker === "note"
                      ? "text-yellow-600 dark:text-yellow-400 italic bg-yellow-500/5 rounded-lg px-3 py-2 border border-yellow-500/10"
                      : line.speaker === "rep"
                        ? "bg-orange-500/5 rounded-lg px-3 py-2 border border-orange-500/10"
                        : "bg-blue-500/5 rounded-lg px-3 py-2 border border-blue-500/10"
                  }`}>
                    {line.text.split('\n').map((paragraph, pi) => (
                      <p key={pi} className={pi > 0 ? "mt-2" : ""}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
