"use server";
import prisma from "@repo/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export const createOnRampTransaction = async ({
  provider,
  amount,
}: {
  provider: string;
  amount: number;
}) => {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthencated request",
    };
  }
  if (!amount && provider) {
    return {
      message: "fields can not be empty",
      status: 404,
    };
  }
  const token = (Math.random() * 1000).toString();
  try {
    await prisma.onRampTransaction.create({
      data: {
        status: "Processing",
        token: token,
        provider: provider,
        startTime: new Date(),
        amount: amount * 100,
        userId: Number(session?.user?.id || session?.user?.userId),
      },
    });
    return {
      message: "transaction started",
    };
  } catch (e) {
    console.log(e);
  }
};
