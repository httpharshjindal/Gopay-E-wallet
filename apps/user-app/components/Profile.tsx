import { Avtar } from "@repo/ui/avtar";


export const Profile = ({ userDetails }: { userDetails: any }) => {
  const data = {
    login: "httpharshjindal",
    id: 118842011,
    node_id: "U_kgDOBxVimw",
    avatar_url: "https://avatars.githubusercontent.com/u/118842011?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/httpharshjindal",
    html_url: "https://github.com/httpharshjindal",
    followers_url: "https://api.github.com/users/httpharshjindal/followers",
    following_url:
      "https://api.github.com/users/httpharshjindal/following{/other_user}",
    gists_url: "https://api.github.com/users/httpharshjindal/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/httpharshjindal/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/httpharshjindal/subscriptions",
    organizations_url: "https://api.github.com/users/httpharshjindal/orgs",
    repos_url: "https://api.github.com/users/httpharshjindal/repos",
    events_url: "https://api.github.com/users/httpharshjindal/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/httpharshjindal/received_events",
    type: "User",
    site_admin: false,
    name: "Harsh Jindal",
    company: null,
    blog: "",
    location: "India",
    email: null,
    hireable: null,
    bio: "CS Student | DevOps & MERN Stack Enthusiast | Aspiring Technologist 🚀",
    twitter_username: "httpharshjindal",
    public_repos: 13,
    public_gists: 0,
    followers: 0,
    following: 3,
    created_at: "2022-11-22T17:10:38Z",
    updated_at: "2024-09-24T13:05:08Z",
  };


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
