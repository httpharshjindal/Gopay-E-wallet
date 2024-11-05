import { Avtar } from "@repo/ui/avtar";


export const Profile = ({ userDetails }: { userDetails: any }) => {
  return (
    <div className="w-72 h-72  flex  items-center flex-col bg-zinc-50 justify-between border">
      <div className="w-full h-1/4 relative">
        <div className="z-10 bg-white w-24 h-24 rounded-full absolute top-20 left-2/4 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex justify-center items-center">
          <Avtar className="h-full w-full"  />
        </div>

        <img
          className="h-full w-full "
          src="https://s.tmimgcdn.com/scr/800x500/345800/bg--dark-blue-background-blue-texture-background_345824-original.jpg"
          alt=""
        />
      </div>

      <div className="flex flex-col justify-start items-center min-h-40 w-full ">
        <h1 className=" text-xl font-bold mt-14">{userDetails.name}</h1>
        <h3 className="font-semibold text-zinc-500 text-xs">@{userDetails.number}</h3>
        <h3 className="font-semibold text-zinc-500 text-xs  text-center">
          {userDetails.email}
        </h3>
        <h1>Balance: {userDetails.Balance[0].amount / 100 }</h1>
      </div>

      <div className="w-full bg-zinc-300"></div>
      
    </div>
  );
};
