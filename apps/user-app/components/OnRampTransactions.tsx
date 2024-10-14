import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions" className="h-full">
      <div className=" p-5 overflow-y-scroll h-full">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center items-end">
              <div className="text-xl">+ Rs {t.amount / 100}</div>
              <div
                className={`${t.status == "Processing" ? "text-yellow-500" : "text-green-600"} text-xs`}
              >
                ({t.status})
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
