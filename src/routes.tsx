import {RouteObject} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import Layout from "./components/Layout.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import PostsPage from "./pages/PostsPage.tsx";
import SearchProvider from "@/hooks/SearchContext.tsx";
import NotFound from "@/pages/NotFound.tsx";

// Guest routes that need no authentication
const guestRoutes: RouteObject[] = [
    {
        path: '/landing',
        element: <LandingPage />,
    },
    {
        path: '/',
        element: <SearchProvider><Layout /></SearchProvider>,
        children: [
            { path: '', element: <DashboardPage /> },
            { path: '/dashboard', element: <DashboardPage /> },
            { path: '/users', element: <UsersPage /> },
            { path: '/posts', element: <PostsPage /> },
        ],
    },
    { path: '*', element: <NotFound /> },
];

export const routes: RouteObject[] = [...guestRoutes];