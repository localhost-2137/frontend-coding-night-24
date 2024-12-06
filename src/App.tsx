import {useLocation, useRoutes} from "react-router-dom";
import Header from "./Layout/Header";
import {cloneElement} from "react";
import MainPage from "./Pages/Main";
import Dashboard from "./Pages/Dashboard";
import {
    QueryClient, QueryClientProvider,
} from '@tanstack/react-query'

export default function App(): JSX.Element | null {
    const queryClient = new QueryClient()

    const element = useRoutes([
        {
            path: "/",
            element: <Header/>,
            children: [
                {
                    path: "/",
                    element: <MainPage/>,
                },
                {
                    path: "/dashboard",
                    element: <Dashboard/>,
                },
            ],
        },
    ]);

    const location = useLocation();
    if (!element) return null;

    return (
        <>
            <QueryClientProvider client={queryClient}>
                {cloneElement(element, {key: location.pathname})}
            </QueryClientProvider>
        </>
    );
}
