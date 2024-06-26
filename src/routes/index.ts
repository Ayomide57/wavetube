import { Home, LucideIcon, Settings } from "lucide-react";
import { IconType } from "react-icons";
import { MdDashboard, MdUpload, MdCurrencyExchange } from "react-icons/md";
import { GrChannel } from "react-icons/gr";


export type ROUTES = {
  label: string;
  href: string;
  icon?: IconType | LucideIcon;
};

export const ROUTES: ROUTES[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: MdDashboard,
  },
  {
    label: "My Channel",
    href: "/my-channel",
    icon: GrChannel ,
  },
  {
    label: "Upload",
    href: "/upload",
    icon: MdUpload,
  },
  /**{
    label: "Wormhole Bridge",
    href: "/bridge",
    icon: MdCurrencyExchange,
  },*/
];
