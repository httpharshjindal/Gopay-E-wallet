"use client"
import { useRouter, usePathname } from "next/navigation";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;
  return (
    <div
      className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer px-2 py-2 select-none`}
      onClick={()=>{
        router.push(href)
      }}
    >
      <div className="pr-2">{icon}</div>
      <div
        className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}
      >
        {title}
      </div>
    </div>
  );
};
