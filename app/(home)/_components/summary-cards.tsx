import { PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { SummaryCard } from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month: string;
  balance: number;
  totalInvestiment: number;
  totalDeposit: number;
  totalExpense: number;
}

export async function SummaryCards({
  month,
  balance,
  totalDeposit,
  totalExpense,
  totalInvestiment,
}: SummaryCardsProps) {
  return (
    <div className="space-y-6">
      {/* Primeiro CARD */}
      <SummaryCard
        icon={<Wallet size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />
      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBank size={16} />}
          title="Investido"
          amount={totalInvestiment}
        />
        <SummaryCard
          icon={<TrendingUp size={16} className="text-primary" />}
          title="Receita"
          amount={totalDeposit}
        />
        <SummaryCard
          icon={<TrendingDown size={16} className="text-red-500" />}
          title="Despesas"
          amount={totalExpense}
        />
      </div>
    </div>
  );
}
