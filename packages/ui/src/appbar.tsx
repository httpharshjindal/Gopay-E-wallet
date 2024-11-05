import { useState } from "react";
import { Button } from "./button";
import { Avatar } from "./avatar";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onProfile: () => void;
  onSignout: any;
}



export const Appbar = ({
  user,
  onSignin,
  onSignout,
  onProfile,
}: AppbarProps) => {
  const [ProfileDropDown, setProfileDropDown] = useState(false);
  return (
    <div className="flex justify-between items-center border-b px-4 relative py-1 h-14">
      <div className="text-lg flex flex-col justify-center">
        <img
          src="https://i.pinimg.com/originals/02/8b/92/028b92bb43a9f6c80e26c3ea403cb698.png"
          alt=""
          className="w-40 absolute"
        />
      </div>
      <div
        className="flex flex-col justify-center"
        onClick={() => {
          setProfileDropDown(!ProfileDropDown);
          console.log(ProfileDropDown);
        }}
      >
        {user && <Avatar /> }
      </div>

      {ProfileDropDown && (
        <div className="w-44 h-28 gap-1 p-2 bg-slate-300  rounded-sm absolute top-14 right-8 flex flex-col justify-center items-center ">
          <Button onClick={onProfile}>Profile</Button>
          <Button onClick={onSignout} className=" bg-red-600 hover:bg-red-700">
            <div className="flex justify-center items-center">
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};
