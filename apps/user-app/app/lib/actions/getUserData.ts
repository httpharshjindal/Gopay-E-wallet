"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/prisma";

export const getUserData = async () => {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session?.user?.id),
    }
  });

  return user;
};
