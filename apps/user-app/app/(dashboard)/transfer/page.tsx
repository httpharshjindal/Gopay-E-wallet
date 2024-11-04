import { BoldHeading } from "@repo/ui/boldHeading";
import { AddMoney } from "../../../components/AddMoney";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getBalance } from "../../lib/actions/getBalance";
import { getOnRampTransactions } from "../../lib/actions/getOnRampTransactions";

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  return (
    <div className="p-5 w-full ">
      <BoldHeading title="Transfer" />
      <div className="flex w-full gap-2 h-screen flex-col sm:flex-row">
        <div className="w-1/2">
          <AddMoney />
        </div>
        <div className="w-1/2 flex gap-2 flex-col">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="h-1/2">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

