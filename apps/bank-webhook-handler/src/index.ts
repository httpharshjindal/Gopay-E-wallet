import prisma from "@repo/db/prisma";
import express from "express";

const app = express();

app.use(express.json());

app.post("/hdfc-webhook", async (req, res) => {
  const paymentInfo: {
    token: string;
    userid: number;
    amount: number;
  } = {
    token: req.body.token,
    userid: req.body.user_identifier,
    amount: req.body.amount,
  };
  try {
    prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: paymentInfo.userid,
        },
        data: {
          amount: {
            increment: paymentInfo.amount,
          },
        },
      }),
      prisma.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({
      message: "captured",
    });
  } catch (e) {
    prisma.onRampTransaction.update({
      where: {
        token: paymentInfo.token,
      },
      data: {
        status: "Failure",
      },
    });
    res.status(411).json({
      message: "Error While processing Web-hook",
    });
  }
});

app.listen(3003);
