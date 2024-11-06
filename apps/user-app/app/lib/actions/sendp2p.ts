"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import prisma from "@repo/db/prisma";
export const sendp2p = async (to: string, amount: number) => {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id || session?.user?.userId;

  if (!to || !amount) {
    return {
      message: "Fields cannot be empty"
    };
  }
  if (!from) {
    return {
      message: "Error while sending"
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to.toString()
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
      status: 404,
    };
  }

  try {
    const transaction = await prisma.$transaction(async () => {
      // Lock the balance for update
      const fromBalance = await prisma.balance.findFirst({
        where: {
          userId: Number(from)
        },
      });

      if (!fromBalance || fromBalance.amount < amount * 100) {
        throw new Error("Insufficient balance");
      }

      await prisma.balance.update({
        where: {
          userId: Number(from)
        },
        data: {
          amount: {
            decrement: amount * 100
          },
        },
      });

      await prisma.balance.update({
        where: {
          userId: Number(toUser.id)
        },
        data: {
          amount: {
            increment: amount * 100
          },
        },
      });

      await prisma.p2pTransfer.create({
        data: {
          amount: amount,
          timestamp: new Date(),
          fromUserId: Number(from),
          toUserId: toUser.id,
        },
      });

      return {
        message: "Transaction successful",
        status: 200,
      };
    });

    return transaction;
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message || "Transaction failed",
        status: 500,
      };
    } else {
      return {
        message: "Transaction failed",
        status: 500,
      };
    }
  }
};

