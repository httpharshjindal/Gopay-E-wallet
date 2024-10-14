"use server"

import prisma from "@repo/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";



export async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    };
  }