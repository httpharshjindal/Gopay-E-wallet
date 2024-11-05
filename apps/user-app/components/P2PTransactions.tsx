"use client";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

interface UserType {
  name: string | null; // Allow name to be null
  number: string;
}

interface Transaction {
  id: number;
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
  fromUser?: UserType; // Optional UserType
  toUser?: UserType;   // Optional UserType
}

interface P2PTransactionsProps {
  enableScroll?: boolean;
  transactions: Transaction[];
  session: {
    user: {
      id: number;
    };
  };
}

export const P2PTransactions = ({
  enableScroll = false,
  transactions,
  session,
}: P2PTransactionsProps) => {
  const router = useRouter();

  return (
    <div className="h-full">
      <Card
        className={enableScroll ? "h-full" : ""}
        title="Recent P2P Transactions"
      >
        {transactions.length > 0 ? (
          <div
            className={`pt-2 ${
              enableScroll ? "h-full overflow-y-scroll bg-gradient-to-t from-slate-300 from-1% to-15%" : ""
            }`}
          >
            {(enableScroll ? transactions.slice(0, 8) : transactions).map((t) => (
              <div key={t.id} className="flex justify-between mb-2 p-2 border-b">
                <div>
                  <h2>
                    {t.fromUserId === session.user.id
                      ? t.toUser?.name || "Anonymous"  // Handle null name
                      : t.fromUser?.name || "Anonymous"}
                  </h2>
                  <h2>
                    {t.fromUserId === session.user.id
                      ? t.toUser?.number || "Unknown"  // Handle missing number
                      : t.fromUser?.number || "Unknown"}
                  </h2>
                  <div className="text-slate-600 text-xs">
                    {t.timestamp?.toDateString() || "Date unavailable"}  // Handle missing date
                  </div>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <div
                    className={`text-xl ${
                      t.fromUserId === session.user.id ? "text-red-700" : "text-green-600"
                    }`}
                  >
                    {t.fromUserId === session.user.id ? `- Rs ${t.amount}` : `+ Rs ${t.amount}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">No Transactions Found</div>
        )}
      </Card>
      {enableScroll && (
        <div className="mt-4">
          <Button onClick={() => router.push("/transactions")}>
            Show all Transactions
          </Button>
        </div>
      )}
    </div>
  );
};
