"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Transactions, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Circle } from "lucide-react";
import { TypeBadge } from "./_components/type.badge";

export const transactionColumns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "Ações",
  },
];
