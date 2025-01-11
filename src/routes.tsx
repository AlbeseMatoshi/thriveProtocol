import {RouteObject} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";

// Guest routes that need no authentication
const guestRoutes: RouteObject[] = [
    {
        path: '/landing',
        element: <LandingPage />,
    },
    {
        path: '/dashboard',
        element: <DashboardPage />,
    },
];

export const routes: RouteObject[] = [...guestRoutes];