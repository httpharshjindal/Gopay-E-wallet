"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { sendp2p } from "../app/lib/actions/sendp2p";
import { useRouter } from "next/navigation";

export const SendMoney = () => {
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  return (
    <center>
      <div className="w-64">
        <Card title="Send Money">
          <div className=" w-full pt-2">
            <TextInput
              label="Phone/email"
              placeholder="9589856898"
              onChange={(value) => {
                setValue(value)
              }}
            />
            <TextInput
              label="Amount"
              placeholder="9589856898"
              onChange={(value) => {
                setAmount(Number(value));
              }}
            />
          </div>
          <div className="pt-4 flex justify-center">
            <Button
              onClick={async () => {
                const res = await sendp2p(value, Number(amount));
                alert(res?.message);
                if (res.status == 404) {
                  router.push("/transfer");
                } else if (res.status == 200) {
                  router.push("/transactions");
                }
              }}
            >
              Send
            </Button>
          </div>
        </Card>
      </div>
    </center>
  );
};
