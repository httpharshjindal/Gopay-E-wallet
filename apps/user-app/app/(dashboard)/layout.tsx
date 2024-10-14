import { SideBarClient } from "../../components/SideBarClient";
import { SidebarItem } from "../../components/SidebarItem";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideBarClient />
      <div className="w-full">{children}</div>
    </div>
  );
}

