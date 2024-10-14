import { P2PTransactions } from "../../../components/P2PTransactions";
import { BoldHeading } from "@repo/ui/boldHeading";
import { getp2pTransactions } from "../../lib/actions/getp2pTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async () => {
  const session = await getServerSession(authOptions);
  const transactions = await getp2pTransactions();

  return (
    <div className="w-full p-5">
      {/* {JSON.stringify(transactions)} */}
      <BoldHeading title="Transactions" />
      <P2PTransactions session={session} transactions={transactions} />
    </div>
  );
};
