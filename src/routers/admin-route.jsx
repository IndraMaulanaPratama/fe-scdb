import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  SquaresPlusIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "../pages/dashboard";
import { SignIn, SignUp } from "../pages/auth";
import { AppList } from "../pages/dashboard/app-list";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const adminRoute = [
  // Admin Page Area
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <SquaresPlusIcon {...icon} />,
        name: "Kumpulan Aplikasi",
        path: "/daftar-aplikasi",
        element: <AppList />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <Notifications />,
      },
    ],
  },
  
];

export default adminRoute;
