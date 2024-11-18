import { AddTransactionButton } from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { canUserAddTransaction } from "@/app/_data/can-user-add-transaction";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

export async function SummaryCard({
  amount,
  icon,
  title,
  size = "small",
}: SummaryCardProps) {
  const canUserAddTransactions = await canUserAddTransaction();

  return (
    <Card className={`rounded-3xl ${size === "large" && "bg-[#FFFFFF08]"}`}>
      <CardHeader className="flex-row items-center gap-4">
        <div className="rounded-xl bg-zinc-950 p-3">{icon}</div>
        <p
          className={
            size === "small" ? "text-muted-foreground" : "text-white opacity-70"
          }
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={
            size === "small" ? "text-2xl font-bold" : "text-4xl font-bold"
          }
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton
            userCanAddTransaction={canUserAddTransactions}
          />
        )}
      </CardContent>
    </Card>
  );
}
