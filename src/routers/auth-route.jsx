import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  SquaresPlusIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "../../pages/dashboard";
import { SignIn, SignUp } from "../../pages/auth";
import { AppList } from "../../pages/dashboard/app-list";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const authRoute = [
  // Authentication Area
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign-in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default authRoute;
