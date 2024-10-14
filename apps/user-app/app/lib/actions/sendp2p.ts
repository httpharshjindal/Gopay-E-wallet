"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/prisma";
import { preloadStyle } from "next/dist/server/app-render/entry-base";

export const sendp2p = async (to: string, amount: number) => {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!to && !amount) {
    return {
      message: "fields can not be empty",
    };
  }
  if (!from) {
    return {
      message: "error while sending",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to.toString(),
    },
  });

  if (!toUser) {
    return {
      message: "user not found",
      status:401
    };
  }

  const transaction = await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
    const fromBalance = await tx.balance.findFirst({
      where: {
        userId: Number(from),
      },
    });
    if (!fromBalance || fromBalance.amount < amount * 100) {
      return {
        message: "insufficient balance",
        status:404
      };
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
      },
      data: {
        amount: {
          increment: amount * 100,
        },
      },
    });

    await tx.p2pTransfer.create({
      data: {
        amount: amount,
        timestamp: new Date(),
        fromUserId: Number(from),
        toUserId: toUser.id,
      },
    });

    return {
      message: "transaction successful",
      status:200
    };

  });

  return transaction
};
