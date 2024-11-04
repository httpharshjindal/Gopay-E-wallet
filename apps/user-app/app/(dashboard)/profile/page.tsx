import { Profile } from "../../../components/Profile";
import { getUserData } from "../../lib/actions/getUserData";

export default async () => {
  const userDetails = await getUserData();
  return (
    <div className="flex justify-center items-center h-[90vh] select-none">
      <Profile userDetails={userDetails} />
    </div>
  );
};
