import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import {
  Bot,
  Send,
  User,
  Zap,
  Loader2,
  Trash2,
  Lightbulb,
  Phone,
  DollarSign,
  Shield,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  { icon: Phone, text: "A plumber says he's too busy to set anything up. What do I say?", label: "Too Busy" },
  { icon: DollarSign, text: "How do I pitch the Growth tier over Starter? What's the upsell angle?", label: "Upsell Growth" },
  { icon: Shield, text: "Prospect says 'I've seen AI answering for $29/month.' Give me the kill shot.", label: "$29 Objection" },
  { icon: MessageSquare, text: "Write me a follow-up text for a dental practice owner I demoed yesterday who hasn't responded.", label: "Follow-Up Text" },
  { icon: Lightbulb, text: "I'm walking into an HVAC company cold. What's my opening line?", label: "Cold Walk-In" },
  { icon: DollarSign, text: "Prospect loves the product but says the $2,497 setup fee is too much. How do I handle this?", label: "Setup Fee" },
];

export default function AIAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text?: string) {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: messageText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await apiRequest("POST", "/api/ai/chat", { messages: newMessages });
      const data = await res.json();

      if (data.response) {
        setMessages([...newMessages, { role: "assistant", content: data.response }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: "Sorry, I couldn't process that. Try again." }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "AI service is temporarily unavailable. Check your connection and try again." }]);
    }
    setLoading(false);
  }

  function clearChat() {
    setMessages([]);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (!user) {
    return (
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <Card><CardContent className="p-8 text-center text-muted-foreground">Log in to use the AI Assistant.</CardContent></Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] md:h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="shrink-0 p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="p-1.5 rounded-lg hover:bg-muted md:hidden" data-testid="button-back">
                <ArrowLeft className="w-4 h-4" />
              </button>
            </Link>
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold flex items-center gap-2">
                AI Sales Coach
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[9px]">Online</Badge>
              </div>
              <div className="text-[10px] text-muted-foreground">
                Trained on TotalFlow AI's pricing, scripts, objections, and processes
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearChat} className="text-xs text-muted-foreground gap-1" data-testid="button-clear-chat">
              <Trash2 className="w-3 h-3" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="space-y-6 pt-4">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto">
                <Zap className="w-7 h-7 text-orange-500" />
              </div>
              <div>
                <div className="text-base font-bold">What do you need help with?</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Ask me anything — objection handling, pricing questions, scripts, closing strategies, prospect analysis.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
              {quickPrompts.map((qp, i) => {
                const Icon = qp.icon;
                return (
                  <button
                    key={i}
                    onClick={() => sendMessage(qp.text)}
                    className="flex items-start gap-2.5 p-3 rounded-lg border text-left hover:border-orange-500/40 hover:bg-orange-500/5 transition-colors text-xs"
                    data-testid={`quick-prompt-${i}`}
                  >
                    <Icon className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{qp.label}</div>
                      <div className="text-muted-foreground mt-0.5 line-clamp-2">{qp.text}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-orange-500 text-white"
                    : "bg-muted/50 border text-foreground"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === "user" && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 text-[9px] font-bold text-white"
                  style={{ backgroundColor: user.avatarColor }}
                >
                  {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
              )}
            </div>
          ))
        )}

        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="bg-muted/50 border rounded-xl px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Thinking...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="shrink-0 p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything — objections, pricing, scripts, strategy..."
            className="resize-none min-h-[44px] max-h-[120px] text-sm"
            rows={1}
            data-testid="input-ai-chat"
          />
          <Button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 shrink-0"
            data-testid="button-send"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-[10px] text-muted-foreground text-center mt-2">
          AI trained on TotalFlow pricing, scripts, objections, and processes. Press Enter to send.
        </div>
      </div>
    </div>
  );
}
