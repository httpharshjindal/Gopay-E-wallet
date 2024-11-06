"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import prisma from "@repo/db/prisma";

// Define the type based on the fields in your 'onRampTransaction' table
type OnRampTransaction = {
  startTime: Date;
  amount: number;
  status: string;
  provider: string;
};

export async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id || session?.user?.userId),
    },
  });

  return txns.map((t: OnRampTransaction) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

  
