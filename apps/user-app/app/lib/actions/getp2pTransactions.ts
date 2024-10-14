"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/prisma";

export async function getp2pTransactions() {
  const session = await getServerSession(authOptions);

  const transactions = await prisma.user.findUnique({
    where: {
      id: Number(session?.user?.id),
    },
    include: {
      sentTransfers: {
        include: {
          toUser: {
            select: {
              number: true,
              name: true,
            },
          },
        },
      },
      receivedTransfers: {
        include: {
          fromUser: {
            select: {
              number: true,
              name: true,
            },
          },
        },
      },
    },
  });

  // Combine both sent and received transactions
  const combinedTransactions = [
    ...(transactions?.sentTransfers || []),
    ...(transactions?.receivedTransfers || []),
  ];

  // Sort transactions by timestamp in descending order (latest first)
  combinedTransactions.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return combinedTransactions;
}
