import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  FolderOpen,
  Phone,
  Globe,
  Mail,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Play,
  Calculator,
  MessageSquare,
  Swords,
  CreditCard,
  GraduationCap,
  Users,
  ClipboardList,
  BarChart3,
  Video,
  ArrowRight,
  Zap,
  Star,
  BookOpen,
} from "lucide-react";

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs h-7 px-2 gap-1"
      onClick={handleCopy}
      data-testid={`copy-${label || "btn"}`}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          Copy
        </>
      )}
    </Button>
  );
}

export default function Resources() {
  const salesAssets = [
    { label: "Tear Sheets", href: "/tear-sheets", icon: FileText, desc: "Printable leave-behind sheets" },
    { label: "Live Demo", href: "/live-demo", icon: Play, desc: "Interactive AI demo for prospects" },
    { label: "ROI Calculator", href: "/roi", icon: Calculator, desc: "Show prospects their ROI" },
    { label: "Quick Pitch Scripts", href: "/quick-pitch", icon: MessageSquare, desc: "15s, 30s, 60s & 2-min pitches" },
    { label: "Battle Cards", href: "/battle-cards", icon: Swords, desc: "Competitor comparisons" },
    { label: "Pricing Reference", href: "/pricing", icon: CreditCard, desc: "3-tier pricing breakdown" },
  ];

  const trainingLinks = [
    { label: "Quiz & Certification", href: "/training", icon: GraduationCap, desc: "Test your product knowledge" },
    { label: "Role-Play Scenarios", href: "/training", icon: Users, desc: "Practice common sales situations" },
    { label: "Onboarding Checklist", href: "/onboarding", icon: ClipboardList, desc: "Post-close client setup" },
  ];

  const externalLinks = [
    { label: "GHL Dashboard", url: "https://app.gohighlevel.com", desc: "GoHighLevel CRM platform" },
    { label: "TotalFlow Website", url: "https://totalflowai.ai", desc: "Main marketing website" },
  ];

  const keyStats = [
    { stat: "80%", desc: "of callers who get voicemail never call back" },
    { stat: "$4,200/mo", desc: "average lost to missed calls" },
    { stat: "90%", desc: "of callers don't realize it's AI" },
    { stat: "10-29x", desc: "average ROI" },
    { stat: "30-day", desc: "money-back guarantee" },
    { stat: "No contracts", desc: "cancel anytime" },
    { stat: "5-7 days", desc: "live from signup" },
  ];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-8" data-testid="resources-page">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FolderOpen className="w-6 h-6 text-orange-500" />
          <h1 className="text-xl font-bold tracking-tight" data-testid="resources-title">
            Resource Library
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Central hub for all links, assets, and reference material.
        </p>
      </div>

      {/* Quick Access Cards */}
      <section data-testid="quick-access">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2 text-orange-500 uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Demo Line */}
          <Card className="border-orange-500/20 bg-orange-500/5" data-testid="card-demo-line">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Demo Line
                </span>
              </div>
              <div className="text-lg font-bold mb-3" data-testid="demo-phone">
                (417) 607-6412
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="tel:4176076412"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-colors"
                  data-testid="call-demo"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </a>
                <CopyButton text="(417) 607-6412" label="phone" />
              </div>
            </CardContent>
          </Card>

          {/* Website */}
          <Card data-testid="card-website">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Website
                </span>
              </div>
              <div className="text-lg font-bold mb-3" data-testid="website-url">
                totalflowai.ai
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://totalflowai.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition-colors"
                  data-testid="open-website"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open
                </a>
                <CopyButton text="https://totalflowai.ai" label="website" />
              </div>
            </CardContent>
          </Card>

          {/* Support Email */}
          <Card data-testid="card-support-email">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Support Email
                </span>
              </div>
              <div className="text-lg font-bold mb-3" data-testid="support-email">
                support@totalflow-ai.com
              </div>
              <div className="flex items-center gap-2">
                <CopyButton text="support@totalflow-ai.com" label="email" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sales Assets */}
      <section data-testid="sales-assets">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-orange-500" />
          Sales Assets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {salesAssets.map((asset) => (
            <Link key={asset.href} href={asset.href}>
              <Card
                className="cursor-pointer transition-all hover:border-orange-500/40 hover:bg-accent/50 group h-full"
                data-testid={`asset-${asset.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <asset.icon className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm group-hover:text-orange-500 transition-colors flex items-center gap-1.5">
                      {asset.label}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{asset.desc}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Training */}
      <section data-testid="training-section">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-orange-500" />
          Training
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {trainingLinks.map((item) => (
            <Link key={item.label} href={item.href}>
              <Card
                className="cursor-pointer transition-all hover:border-orange-500/40 hover:bg-accent/50 group h-full"
                data-testid={`training-${item.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm group-hover:text-orange-500 transition-colors flex items-center gap-1.5">
                      {item.label}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* External Links */}
      <section data-testid="external-links">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-orange-500" />
          External Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`external-${link.label.toLowerCase().replace(/\s/g, "-")}`}
            >
              <Card className="cursor-pointer transition-all hover:border-orange-500/40 hover:bg-accent/50 group h-full">
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium text-sm group-hover:text-orange-500 transition-colors">
                      {link.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{link.desc}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-orange-500 transition-colors" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Demo Video */}
      <section data-testid="demo-video">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Video className="w-4 h-4 text-orange-500" />
          Demo Video
        </h2>
        <Card className="border-dashed border-2 border-muted-foreground/20" data-testid="card-demo-video">
          <CardContent className="p-8 text-center">
            <Video className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <Badge variant="outline" className="text-orange-500 border-orange-500/30 text-xs mb-3">
              Coming Soon
            </Badge>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Record a 2-minute screen walkthrough of the GHL dashboard and AI call demo.
              Upload the link here.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Key Stats to Remember */}
      <section data-testid="key-stats">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-orange-500" />
          Key Stats to Remember
        </h2>
        <Card className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <CardContent className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {keyStats.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/60"
                  data-testid={`key-stat-${i}`}
                >
                  <div className="text-base font-bold text-orange-500 w-24 shrink-0">
                    {item.stat}
                  </div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
