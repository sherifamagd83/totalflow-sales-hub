import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  DollarSign,
  Phone,
  Award,
  CheckCircle2,
  Users,
  Target,
} from "lucide-react";

interface Leader {
  id: number;
  name: string;
  avatarColor: string;
  role: string;
  dealsWon: number;
  totalDeals: number;
  monthlyRevenue: number;
  totalCalls: number;
  totalDemos: number;
  certified: boolean;
  quizScore: number | null;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getRankStyle(rank: number): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  switch (rank) {
    case 1:
      return {
        bg: "bg-yellow-500/15",
        text: "text-yellow-500",
        border: "border-yellow-500/30",
        label: "Gold",
      };
    case 2:
      return {
        bg: "bg-gray-400/15",
        text: "text-gray-400",
        border: "border-gray-400/30",
        label: "Silver",
      };
    case 3:
      return {
        bg: "bg-amber-700/15",
        text: "text-amber-700 dark:text-amber-600",
        border: "border-amber-700/30",
        label: "Bronze",
      };
    default:
      return {
        bg: "bg-muted/50",
        text: "text-muted-foreground",
        border: "border-transparent",
        label: "",
      };
  }
}

export default function Leaderboard() {
  const { data: leaders = [] } = useQuery<Leader[]>({
    queryKey: ["/api/leaderboard"],
  });

  const totalDealsWon = leaders.reduce((sum, l) => sum + l.dealsWon, 0);
  const totalMRR = leaders.reduce((sum, l) => sum + l.monthlyRevenue, 0);
  const totalCalls = leaders.reduce((sum, l) => sum + l.totalCalls, 0);
  const certifiedCount = leaders.filter((l) => l.certified).length;

  if (leaders.length === 0) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto" data-testid="leaderboard-page">
        <div className="flex items-center gap-2 mb-8">
          <Trophy className="w-6 h-6 text-orange-500" />
          <h1 className="text-xl font-bold tracking-tight" data-testid="leaderboard-title">
            Leaderboard
          </h1>
        </div>
        <Card>
          <CardContent className="p-12 text-center" data-testid="leaderboard-empty">
            <Users className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">No Reps Yet</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Once sales reps log in and start closing deals, their rankings will
              appear here. Get the team onboard to see the leaderboard come to
              life!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6" data-testid="leaderboard-page">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-orange-500" />
        <h1 className="text-xl font-bold tracking-tight" data-testid="leaderboard-title">
          Leaderboard
        </h1>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="leaderboard-summary">
        {[
          {
            label: "Total Deals Won",
            value: totalDealsWon.toLocaleString(),
            icon: Target,
            color: "text-orange-500",
          },
          {
            label: "Total MRR",
            value: formatCurrency(totalMRR),
            icon: DollarSign,
            color: "text-green-500",
          },
          {
            label: "Total Calls",
            value: totalCalls.toLocaleString(),
            icon: Phone,
            color: "text-blue-500",
          },
          {
            label: "Certified Reps",
            value: `${certifiedCount}/${leaders.length}`,
            icon: Award,
            color: "text-purple-500",
          },
        ].map((stat) => (
          <Card key={stat.label} data-testid={`summary-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-lg font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ranked List */}
      <Card data-testid="leaderboard-table">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Rankings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {leaders.map((leader, index) => {
              const rank = index + 1;
              const rankStyle = getRankStyle(rank);
              const winRate =
                leader.totalDeals > 0
                  ? Math.round((leader.dealsWon / leader.totalDeals) * 100)
                  : 0;

              return (
                <div
                  key={leader.id}
                  className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-4 hover:bg-muted/30 transition-colors"
                  data-testid={`leaderboard-row-${rank}`}
                >
                  {/* Rank */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${rankStyle.bg} ${rankStyle.text} ${rank <= 3 ? rankStyle.border + " border" : ""}`}
                    data-testid={`rank-${rank}`}
                  >
                    #{rank}
                  </div>

                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                    style={{ backgroundColor: leader.avatarColor }}
                    data-testid={`avatar-${leader.id}`}
                  >
                    {getInitials(leader.name)}
                  </div>

                  {/* Name + Role + Certified */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm truncate" data-testid={`name-${leader.id}`}>
                        {leader.name}
                      </span>
                      <Badge
                        variant={leader.role === "admin" ? "default" : "outline"}
                        className="text-[10px] px-1.5 py-0 h-4 capitalize"
                        data-testid={`role-${leader.id}`}
                      >
                        {leader.role}
                      </Badge>
                      {leader.certified && (
                        <span
                          className="inline-flex items-center gap-0.5 text-green-500"
                          data-testid={`certified-${leader.id}`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-medium hidden sm:inline">
                            Certified
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                      {winRate}% win rate ({leader.dealsWon}/{leader.totalDeals}{" "}
                      deals)
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 shrink-0">
                    <div className="text-center" data-testid={`deals-${leader.id}`}>
                      <div className="text-sm font-semibold">{leader.dealsWon}</div>
                      <div className="text-[10px] text-muted-foreground">Deals</div>
                    </div>
                    <div className="text-center" data-testid={`mrr-${leader.id}`}>
                      <div className="text-sm font-semibold text-green-500">
                        {formatCurrency(leader.monthlyRevenue)}
                      </div>
                      <div className="text-[10px] text-muted-foreground">MRR</div>
                    </div>
                    <div className="text-center" data-testid={`calls-${leader.id}`}>
                      <div className="text-sm font-semibold">{leader.totalCalls}</div>
                      <div className="text-[10px] text-muted-foreground">Calls</div>
                    </div>
                    <div className="text-center" data-testid={`demos-${leader.id}`}>
                      <div className="text-sm font-semibold">{leader.totalDemos}</div>
                      <div className="text-[10px] text-muted-foreground">Demos</div>
                    </div>
                    {leader.quizScore !== null && leader.quizScore !== undefined && (
                      <div className="text-center" data-testid={`quiz-${leader.id}`}>
                        <div className="text-sm font-semibold text-orange-500">
                          {leader.quizScore}%
                        </div>
                        <div className="text-[10px] text-muted-foreground">Quiz</div>
                      </div>
                    )}
                  </div>

                  {/* Mobile stats condensed */}
                  <div className="flex md:hidden flex-col items-end shrink-0">
                    <div className="text-sm font-semibold text-green-500">
                      {formatCurrency(leader.monthlyRevenue)}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {leader.dealsWon} deals · {leader.totalCalls} calls
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
