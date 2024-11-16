import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { auth } from "@clerk/nextjs/server";

export async function getDashboard(month: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const where = {
    userId,
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const totalInvestiment = Number(
    (
      await db.transactions.aggregate({
        where: {
          ...where,
          type: "INVESTMENT",
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const totalExpense = Number(
    (
      await db.transactions.aggregate({
        where: {
          ...where,
          type: "EXPENSE",
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const totalDeposit = Number(
    (
      await db.transactions.aggregate({
        where: {
          ...where,
          type: "DEPOSIT",
        },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const balance = totalDeposit - totalExpense - totalInvestiment;

  const transactionsTotal = Number(
    (
      await db.transactions.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(totalDeposit || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(totalExpense || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(totalInvestiment || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transactions.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(totalExpense)) * 100,
    ),
  }));

  const lastTransactions = await db.transactions.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });

  return {
    balance,
    totalDeposit,
    totalExpense,
    totalInvestiment,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
  };
}
