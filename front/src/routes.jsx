import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EventsDetails from './pages/eventsDetails'

const MainLayout = React.lazy(() => import('./components/mainLayout'))
const BlankLayout = React.lazy(() => import('./components/blankLayout'))
const Home = React.lazy(() => import('./pages/home'))
const About = React.lazy(() => import('./pages/about'))
const Activities = React.lazy(() => import('./pages/activities'))
const Contacts = React.lazy(() => import('./pages/contact'))
const NewsDetails = React.lazy(() => import('./pages/newsDetails'))
const LogIn = React.lazy(() => import('./pages/login'))
const Error = React.lazy(() => import('./pages/error'))

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
                    path: 'novidades/:id',
                    element: <NewsDetails />,
                    errorElement: <Error />
                },
                {
                    id: 6,
                    path: 'eventos/:id',
                    element: <EventsDetails />,
                    errorElement: <Error />
                },
            ]
        },
        {
            id: 2,
            element: <BlankLayout />,
            children: [
                {
                    path: '/login',
                    element: <LogIn />,
                    errorElement: <Error />
                }
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