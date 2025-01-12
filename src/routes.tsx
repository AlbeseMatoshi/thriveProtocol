import {RouteObject} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import Layout from "./components/Layout.tsx";
import UsersPage from "./pages/UsersPage.tsx";

// Guest routes that need no authentication
const guestRoutes: RouteObject[] = [
    {
        path: '/landing',
        element: <LandingPage />,
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/dashboard', element: <DashboardPage /> },
            { path: '/users', element: <UsersPage /> },
        ],
    },
];

export const routes: RouteObject[] = [...guestRoutes];