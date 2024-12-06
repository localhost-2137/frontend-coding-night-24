import { useLocation, useRoutes } from "react-router-dom";
import Header from "./Layout/Header";
import { cloneElement } from "react";
import MainPage from "./Pages/Main";
import Dashboard from "./Pages/Dashboard";

export default function App(): JSX.Element | null {
  const element = useRoutes([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  const location = useLocation();
  if (!element) return null;

  return (
    <>
      {cloneElement(element, { key: location.pathname })}
    </>
  );
}
