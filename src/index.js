import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { routers } from "./router";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./modules/home/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>
  </ErrorBoundary>
);

reportWebVitals();
