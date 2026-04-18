import { createBrowserRouter } from 'react-router';
import { guestRouteLoader, protectedRouteLoader } from './auth-loader.ts';
import LandingPage from '../pages/LandingPage.tsx';
import Login from '../pages/Login.tsx';
import NotFound from '../pages/NotFound.tsx';
import Home from '../pages/app/Home.tsx';
import AppLayout from '../layouts/AppLayout.tsx';
import AddGame from '../pages/app/AddGame.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: LandingPage,
        loader: guestRouteLoader
    },
    {
        path: '/login',
        Component: Login,
        loader: guestRouteLoader
    },
    {
        id: 'app',
        path: '/app',
        Component: AppLayout,
        loader: protectedRouteLoader,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'add',
                Component: AddGame
            }
        ]
    },
    {
        path: '*',
        Component: NotFound
    }
]);
