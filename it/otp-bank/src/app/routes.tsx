import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/screens/Home";
import { Modes } from "./components/screens/Modes";
import { Finance } from "./components/screens/Finance";
import { Profile } from "./components/screens/Profile";
import { Calendar } from "./components/screens/Calendar";
import { Notifications } from "./components/screens/Notifications";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "modes", Component: Modes },
      { path: "finance", Component: Finance },
      { path: "profile", Component: Profile },
      { path: "calendar", Component: Calendar },
      { path: "notifications", Component: Notifications },
    ],
  },
]);
