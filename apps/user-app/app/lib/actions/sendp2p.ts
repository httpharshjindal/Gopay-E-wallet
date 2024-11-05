"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { TransactionClient } from "@prisma/client"; // Import PrismaClient and TransactionClient
import prisma from "@repo/db/prisma";

export const sendp2p = async (to: string, amount: number) => {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!to || !amount) {
    return {
      message: "Fields cannot be empty",
    };
  }
  if (!from) {
    return {
      message: "Error while sending",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to.toString(),
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
      status: 404,
    };
  }

  try {
    const transaction = await prisma.$transaction(async (tx: TransactionClient) => {
      // Lock the balance for update
      const fromBalance = await tx.balance.findFirst({
        where: {
          userId: Number(from),
        },
        lock: { mode: 'UPDATE' }, // Using optimistic concurrency
      });

      if (!fromBalance || fromBalance.amount < amount * 100) {
        throw new Error("Insufficient balance");
      }

      await tx.balance.update({
        where: {
          userId: Number(from),
        },
        data: {
          amount: {
            decrement: amount * 100,
          },
        },
      });

      await tx.balance.update({
        where: {
          userId: Number(toUser.id),
