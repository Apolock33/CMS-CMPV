import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import '../assets/css/index.css'

const WppButton = lazy(() => import('./wppButton'))
const Footer = lazy(() => import('./footer'))

const MainLayout = () => {
    return (
        <main>
            <Header />
            <Outlet />
            <WppButton />
            <Footer />
        </main>
    )
}

export default MainLayout