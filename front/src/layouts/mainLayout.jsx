import { Outlet } from 'react-router-dom';
import { lazy } from 'react';
import Header from '../components/designSystem/header';
import '../assets/css/index.css';

const WppButton = lazy(() => import('../components/wppButton'));
const Footer = lazy(() => import('../components/designSystem/footer'));

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