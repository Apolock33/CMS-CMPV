import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

const NewsDetails = React.lazy(() => import('./pages/newsDetails'));
const Activities = React.lazy(() => import('./pages/activities'));
const MainLayout = React.lazy(() => import('./layouts/mainLayout'));
const Contacts = React.lazy(() => import('./pages/contact'));
const Events = React.lazy(() => import('./pages/events'));
// const EventsDetails = React.lazy(() => import('./pages/eventsDetails'));
const About = React.lazy(() => import('./pages/about'));
const Error = React.lazy(() => import('./pages/error'));
const Home = React.lazy(() => import('./pages/home'));
const News = React.lazy(() => import('./pages/news'));

const Routes = () => {
    const publicRoutes = [
        {
            id: 1,
            path: '/',
            element: <MainLayout />,
            errorElement: <Error />,
            children: [
                {
                    id: 1,
                    path: '',
                    element: <Home />,
                    errorElement: <Error />
                },
                {
                    id: 2,
                    path: 'sobrenos',
                    element: <About />,
                    errorElement: <Error />
                },
                {
                    id: 3,
                    path: 'atividades',
                    element: <Activities />
                },
                {
                    id: 4,
                    path: 'contatos',
                    element: <Contacts />,
                    errorElement: <Error />
                },
                {
                    id: 5,
                    path: 'noticias',
                    element: <News />,
                    errorElement: <Error />
                },
                {
                    id: 6,
                    path: 'noticias/:id',
                    element: <NewsDetails />,
                    errorElement: <Error />
                },
                {
                    id: 7,
                    path: 'eventos',
                    element: <Events />,
                    errorElement: <Error />
                },
                // {
                //     id: 8,
                //     path: 'eventos/:id',
                //     element: <EventsDetails />,
                //     errorElement: <Error />
                // },
            ]
        }
    ];

    const router = createBrowserRouter([
        ...publicRoutes
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default Routes