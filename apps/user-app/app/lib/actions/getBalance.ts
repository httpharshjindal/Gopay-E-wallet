"use server";
import prisma from "@repo/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id ||  session?.user?.userId),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}
