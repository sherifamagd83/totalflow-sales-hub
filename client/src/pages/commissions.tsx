import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingUp,
  Target,
  CalendarDays,
  Loader2,
  Sparkles,
  ArrowRight,
  Rocket,
} from "lucide-react";

interface Deal {
  id: number;
  repId: number;
  businessName: string;
  contactName: string;
  vertical: string;
  tier: string;
  monthlyValue: number;
  setupFee: number;
  billing: string;
  status: string;
  notes: string;
  createdAt: string;
  closedAt: string | null;
}

// Commission structure (hardcoded — can be updated later)
const SETUP_FEE_RATE = 0.2; // 20% of setup fee
const MONTHLY_RECURRING_RATE = 0.15; // 15% of monthly value
const ANNUAL_DEAL_BONUS = 200; // $200 flat per annual deal

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getTierColor(tier: string): string {
  switch (tier.toLowerCase()) {
    case "starter":
      return "bg-blue-500/10 text-blue-500 border-blue-500/30";
    case "growth":
      return "bg-orange-500/10 text-orange-500 border-orange-500/30";
    case "scale":
      return "bg-purple-500/10 text-purple-500 border-purple-500/30";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/30";
  }
}

function isThisMonth(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function calcDealCommission(deal: Deal) {
  const setupCommission = deal.setupFee * SETUP_FEE_RATE;
  const monthlyRecurring = deal.monthlyValue * MONTHLY_RECURRING_RATE;
  const annualBonus = deal.billing === "annual" ? ANNUAL_DEAL_BONUS : 0;
  const total = setupCommission + monthlyRecurring + annualBonus;
  return { setupCommission, monthlyRecurring, annualBonus, total };
}

export default function Commissions() {
  const { user } = useAuth();

  const { data: deals = [], isLoading } = useQuery<Deal[]>({
    queryKey: [`/api/deals/rep/${user?.id}`],
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto" data-testid="commissions-page">
        <Card>
          <CardContent className="p-12 text-center">
            <DollarSign className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Login Required</h2>
            <p className="text-sm text-muted-foreground">
              Please log in to view your earnings and commission breakdown.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto flex items-center justify-center min-h-[400px]" data-testid="commissions-loading">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  const closedWonDeals = deals.filter((d) => d.status === "closed_won");
  const activeDeals = deals.filter(
    (d) => d.status !== "closed_won" && d.status !== "closed_lost"
  );

  // Earnings calculations
  const totalEarned = closedWonDeals.reduce(
    (sum, deal) => sum + calcDealCommission(deal).total,
    0
  );

  const thisMonthDeals = closedWonDeals.filter((d) => isThisMonth(d.closedAt));
  const thisMonthEarned = thisMonthDeals.reduce(
    (sum, deal) => sum + calcDealCommission(deal).total,
    0
  );

  // Projected monthly: recurring commission from all closed_won deals
  const projectedMonthly = closedWonDeals.reduce(
    (sum, deal) => sum + deal.monthlyValue * MONTHLY_RECURRING_RATE,
    0
  );

  const dealsClosedCount = closedWonDeals.length;

  // Earnings potential projections (based on Growth tier: $997/mo, $2,990 setup)
  const projections = [
    { deals: 1, label: "1 deal/mo" },
    { deals: 2, label: "2 deals/mo" },
    { deals: 4, label: "4 deals/mo" },
    { deals: 8, label: "8 deals/mo" },
  ].map((p) => {
    const setupPerDeal = 2990 * SETUP_FEE_RATE; // Growth setup fee
    const recurringPerDeal = 997 * MONTHLY_RECURRING_RATE; // Growth monthly
    const monthlySetup = setupPerDeal * p.deals;
    const monthlyRecurring = recurringPerDeal * p.deals;
    const monthlyTotal = monthlySetup + monthlyRecurring;
    return {
      ...p,
      monthlySetup,
      monthlyRecurring,
      monthlyTotal,
      annualTotal: monthlyTotal * 12,
    };
  });

  // No deals empty state
  if (closedWonDeals.length === 0) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6" data-testid="commissions-page">
        {/* Header */}
        <div className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-orange-500" />
          <h1 className="text-xl font-bold tracking-tight" data-testid="commissions-title">
            My Earnings
          </h1>
        </div>

        {/* Empty State */}
        <Card data-testid="commissions-empty">
          <CardContent className="p-12 text-center">
            <Rocket className="w-14 h-14 text-orange-500/60 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">
              Close Your First Deal
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
              Close your first deal to see your earnings here.
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg bg-orange-500/10 border border-orange-500/20 px-4 py-3 text-sm">
              <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
              <span>
                One Growth plan ={" "}
                <span className="font-semibold text-orange-500">$598 setup commission</span>
                {" "}+{" "}
                <span className="font-semibold text-orange-500">$150/mo recurring</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Still show earnings potential */}
        <EarningsPotentialCard projections={projections} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6" data-testid="commissions-page">
      {/* Header */}
      <div className="flex items-center gap-2">
        <DollarSign className="w-6 h-6 text-orange-500" />
        <h1 className="text-xl font-bold tracking-tight" data-testid="commissions-title">
          My Earnings
        </h1>
      </div>

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="earnings-summary">
        {[
          {
            label: "Total Earned",
            value: formatCurrency(totalEarned),
            sub: "all time",
            icon: DollarSign,
            color: "text-green-500",
          },
          {
            label: "This Month",
            value: formatCurrency(thisMonthEarned),
            sub: `${thisMonthDeals.length} deal${thisMonthDeals.length !== 1 ? "s" : ""}`,
            icon: CalendarDays,
            color: "text-orange-500",
          },
          {
            label: "Projected Monthly",
            value: formatCurrency(projectedMonthly),
            sub: "recurring commissions",
            icon: TrendingUp,
            color: "text-blue-500",
          },
          {
            label: "Deals Closed",
            value: dealsClosedCount.toString(),
            sub: "closed won",
            icon: Target,
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
              <div className="text-[10px] text-muted-foreground mt-0.5">{stat.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Commission Breakdown Table */}
      <Card data-testid="commission-breakdown">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Commission Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-7 gap-2 px-4 md:px-6 py-2 border-b text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            <div className="col-span-2">Deal</div>
            <div className="text-right">Monthly Value</div>
            <div className="text-right">Setup (20%)</div>
            <div className="text-right">Recurring (15%)</div>
            <div className="text-right">Annual Bonus</div>
            <div className="text-right">Total</div>
          </div>

          <div className="divide-y">
            {closedWonDeals.map((deal) => {
              const commission = calcDealCommission(deal);
              return (
                <div
                  key={deal.id}
                  className="px-4 md:px-6 py-4 hover:bg-muted/30 transition-colors"
                  data-testid={`commission-row-${deal.id}`}
                >
                  {/* Desktop layout */}
                  <div className="hidden md:grid grid-cols-7 gap-2 items-center">
                    <div className="col-span-2 flex items-center gap-2 min-w-0">
                      <span className="font-medium text-sm truncate">{deal.businessName}</span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 h-4 capitalize shrink-0 ${getTierColor(deal.tier)}`}
                      >
                        {deal.tier}
                      </Badge>
                    </div>
                    <div className="text-right text-sm">{formatCurrency(deal.monthlyValue)}/mo</div>
                    <div className="text-right text-sm text-green-500">{formatCurrency(commission.setupCommission)}</div>
                    <div className="text-right text-sm text-blue-500">{formatCurrency(commission.monthlyRecurring)}/mo</div>
                    <div className="text-right text-sm">
                      {commission.annualBonus > 0 ? (
                        <span className="text-purple-500">{formatCurrency(commission.annualBonus)}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                    <div className="text-right text-sm font-semibold text-green-500">
                      {formatCurrency(commission.total)}
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-medium text-sm truncate">{deal.businessName}</span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 h-4 capitalize shrink-0 ${getTierColor(deal.tier)}`}
                        >
                          {deal.tier}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold text-green-500 shrink-0">
                        {formatCurrency(commission.total)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{formatCurrency(deal.monthlyValue)}/mo</span>
                      <span className="text-green-500">Setup: {formatCurrency(commission.setupCommission)}</span>
                      <span className="text-blue-500">Recurring: {formatCurrency(commission.monthlyRecurring)}/mo</span>
                      {commission.annualBonus > 0 && (
                        <span className="text-purple-500">Bonus: {formatCurrency(commission.annualBonus)}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals row */}
          <div className="px-4 md:px-6 py-3 border-t bg-muted/30">
            <div className="hidden md:grid grid-cols-7 gap-2 items-center">
              <div className="col-span-2 text-sm font-semibold">Total</div>
              <div />
              <div className="text-right text-sm font-semibold text-green-500">
                {formatCurrency(closedWonDeals.reduce((s, d) => s + d.setupFee * SETUP_FEE_RATE, 0))}
              </div>
              <div className="text-right text-sm font-semibold text-blue-500">
                {formatCurrency(closedWonDeals.reduce((s, d) => s + d.monthlyValue * MONTHLY_RECURRING_RATE, 0))}/mo
              </div>
              <div className="text-right text-sm font-semibold text-purple-500">
                {formatCurrency(closedWonDeals.filter((d) => d.billing === "annual").length * ANNUAL_DEAL_BONUS)}
              </div>
              <div className="text-right text-sm font-bold text-green-500">{formatCurrency(totalEarned)}</div>
            </div>
            <div className="md:hidden flex items-center justify-between">
              <span className="text-sm font-semibold">Total Earned</span>
              <span className="text-sm font-bold text-green-500">{formatCurrency(totalEarned)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earnings Potential */}
      <EarningsPotentialCard projections={projections} />
    </div>
  );
}

function EarningsPotentialCard({
  projections,
}: {
  projections: {
    deals: number;
    label: string;
    monthlySetup: number;
    monthlyRecurring: number;
    monthlyTotal: number;
    annualTotal: number;
  }[];
}) {
  return (
    <Card data-testid="earnings-potential">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <CardTitle className="text-base font-semibold">Earnings Potential</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-orange-500/10 border border-orange-500/20 p-4">
          <p className="text-sm leading-relaxed">
            Close <span className="font-semibold text-orange-500">1 Growth deal per week</span> ={" "}
            <span className="font-semibold">$598/mo</span> setup commission +{" "}
            <span className="font-semibold">$598/mo</span> recurring ={" "}
            <span className="font-bold text-orange-500">$1,196/mo</span>.{" "}
            Close <span className="font-semibold text-orange-500">4/month</span> ={" "}
            <span className="font-bold text-orange-500">$4,784/mo</span> in commissions alone.
          </p>
        </div>

        {/* Projection table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-testid="projections-table">
            <thead>
              <tr className="border-b text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="text-left py-2 font-medium">Pace</th>
                <th className="text-right py-2 font-medium">Setup/mo</th>
                <th className="text-right py-2 font-medium">Recurring/mo</th>
                <th className="text-right py-2 font-medium">Monthly Total</th>
                <th className="text-right py-2 font-medium">Annual Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {projections.map((p) => (
                <tr key={p.label} className="hover:bg-muted/30 transition-colors" data-testid={`projection-row-${p.deals}`}>
                  <td className="py-2.5 font-medium">{p.label}</td>
                  <td className="py-2.5 text-right text-green-500">{formatCurrency(p.monthlySetup)}</td>
                  <td className="py-2.5 text-right text-blue-500">{formatCurrency(p.monthlyRecurring)}</td>
                  <td className="py-2.5 text-right font-semibold">{formatCurrency(p.monthlyTotal)}</td>
                  <td className="py-2.5 text-right font-bold text-orange-500">{formatCurrency(p.annualTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
