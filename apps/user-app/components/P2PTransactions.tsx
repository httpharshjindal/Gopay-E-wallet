"use client";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

interface transactionsType {
  id: number;
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
  fromUser: {
    name: string;
    number: number;
  };
  toUser: {
    name: string;
    number: number;
  };
}
export const P2PTransactions = ({
  enableScroll,
  transactions,
  session,
}: {
  enableScroll?: boolean;
  transactions: any;
  session: any;
}) => {
  const router = useRouter();
  return (
    <div className="h-full">
      {/* <h1>{JSON.stringify(transactions)}</h1>  */}
      <Card
        className={`${enableScroll ? "h-full" : ""}`}
        title="Recent P2P Transactions"
      >
        {transactions.length? (
          <div
            className={`pt-2 ${enableScroll && " h-full overflow-y-scroll bg-gradient-to-t from-slate-300 from-1% to-15%"}`}
          >
            {(enableScroll ? transactions?.slice(0, 8) : transactions)?.map(
              (t) => (
                <div className="flex justify-between mb-2 p-2 border-b">
                  <div>
                    <div>
                      <h2>
                        {t.fromUserId == session.user.id
                          ? t.toUser?.name || "Anormous"
                          : t.fromUser?.name || "Anormous"}
                      </h2>
                      <h2>
                        {t.fromUserId == session.user.id
                          ? t.toUser?.number
                          : t.fromUser?.number}
                      </h2>
                    </div>
                    <div className="text-slate-600 text-xs">
                      {t.timestamp.toDateString()}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <div
                      className={`text-xl ${
                        t.fromUserId == session.user.id
                          ? `text-red-700`
                          : `text-green-600`
                      }`}
                    >
                      {t.fromUserId == session.user.id
                        ? `- Rs ${t.amount}`
                        : `+ Rs ${t.amount}`}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex justify-center ">No Transactions Found</div>
        )}
      </Card>
      {enableScroll && (
        <div>
          <Button
            onClick={() => {
              router.push("/transactions");
            }}
          >
            Show all Transactions
          </Button>
        </div>
      )}
    </div>
  );
};
