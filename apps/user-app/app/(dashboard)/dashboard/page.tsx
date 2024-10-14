import { getServerSession } from "next-auth";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { UserProfile } from "../../../components/UserProfile";
import { getBalance } from "../../lib/actions/getBalance";
import { getp2pTransactions } from "../../lib/actions/getp2pTransactions";
import { authOptions } from "../../lib/auth";
import { RecentContact } from "../../../components/RecentContact";

export default async () => {
  const balance = await getBalance();
  const session = await getServerSession(authOptions);
  const transactions = await getp2pTransactions();

  return (
    <div className="p-5 gap-2 flex h-screen flex-col sm:flex-row">
      <div className="w-full h-full flex flex-col gap-5 sm:w-1/2 ">
        <div className="h-28">
          <RecentContact transactions={transactions}/>
        </div>
        <UserProfile balance={balance} />
      </div>
      <div className="w-full sm:w-1/2 h-4/5 bg-gradient-to-t from-slate-300 from-1% to-15% ">
        <P2PTransactions
          enableScroll={true}
          session={session}
          transactions={transactions}
        />
      </div>

      {/* {JSON.stringify(user)} */}
    </div>
  );
};
