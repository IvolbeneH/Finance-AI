import { Badge } from "@/app/_components/ui/badge";
import { Transactions, TransactionType } from "@prisma/client";
import { Circle } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transactions;
}

export function TypeBadge({ transaction }: TransactionTypeBadgeProps) {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-[#55B02E14] font-bold text-primary hover:bg-[#55B02E14]">
        <Circle size={9} className="mr-1 fill-primary" />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-[#E9303014] font-bold text-red-600 hover:bg-[#E9303014]">
        <Circle size={9} className="mr-1 fill-red-600" />
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="bg-[#FFFFFF14] font-bold text-zinc-50 hover:bg-[#FFFFFF14]">
      <Circle size={9} className="mr-1 fill-zinc-50" />
      Investimento
    </Badge>
  );
}
