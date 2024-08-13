import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Counter } from "./common/components/Counter";
import Home from "./modules/home";
import Games from "./modules/games/list";
import Tcs from "./modules/games/贪吃蛇";
import Wzq from "./modules/games/五子棋";
import ErrorPage from "./modules/home/ErrorPage";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "games",
    element: <Games />,
  },
  {
    path: "games/贪吃蛇",
    element: <Tcs />,
  },
  {
    path: "games/五子棋",
    element: <Wzq />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "counter",
    element: <Counter />,
  },
]);
