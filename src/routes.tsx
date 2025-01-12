import {RouteObject} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import Layout from "./components/Layout.tsx";

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
            { path: '/team', element: <TeamPage /> },
        ],
    },
];

export const routes: RouteObject[] = [...guestRoutes];