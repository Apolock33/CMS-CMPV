import React, { useContext, useState } from 'react';
import { GlobalContext } from '../contexts/globalContext';
import { Button } from 'primereact/button';
import { FaFacebook, FaLinkedin } from 'react-icons/fa6';
import { motion } from 'motion/react';
import Logo from '../assets/imgs/logos/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import GeneralDrawer from './generalDrawer';
import { InputText } from "primereact/inputtext";
import { TiThMenu } from "react-icons/ti";
import { AiFillInstagram } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import '../assets/css/header.css';

const Header = () => {
    const [visible, setVisible] = useState(false);
    const {
        isMobile,
        isScrollingDown,
        showSecondaryHeader
    } = useContext(GlobalContext);
    const navigate = useNavigate();

    const publicLinks = [
        { id: 1, name: 'Home', path: '/' },
        { id: 2, name: 'Sobre Nós', path: '/sobrenos' },
        { id: 3, name: 'Atividades', path: '/atividades' },
        { id: 4, name: 'Contatos', path: '/contatos' }
    ];

    const socialMedia = [
        {
            id: 1,
            name: 'Instagram',
            path: 'https://www.instagram.com/clube_militar_da_praia_vermelha/',
            icon: <AiFillInstagram size={20} />
        },
        {
            id: 2,
            name: 'Facebook',
            path: 'https://www.facebook.com/clube.militar.da.praia.vermelha/',
            icon: <FaFacebook size={20} />
        },
        {
            id: 3,
            name: 'Youtube',
            path: 'https://www.youtube.com/@clube_militar_da_praia_vermelha',
            icon: <FaLinkedin size={20} />
        }
    ]

    return (
        <>
            <motion.header
                id='header'
                initial={{ opacity: 0, y: -100 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: 'easeInOut'
                    }
                }}
                className={`flex align-items-center justify-content-between ${isMobile ? 'px-4' : 'px-8'} py-2 w-full fixed top-0 z-5 bg-white`}>

                <div className='cursor-pointer' onClick={() => navigate('/')}>
                    <motion.img
                        initial={{ width: 0 }}
                        animate={{
                            width: isMobile ? 190 : 400,
                            transition: {
                                duration: 0.3,
                                ease: 'easeInOut',
                            }
                        }}

                        whileInView={{ width: isScrollingDown ? (isMobile ? 230 : 200) : (isMobile ? 260 : 430) }}
                        src={Logo}
                        alt="Logo"
                        width={isMobile ? 190 : 400}
                    />
                </div>

                {!isMobile ? (
                    <>
                        <nav className="flex align-items-center gap-4 pr-6">
                            <ul
                                className="flex align-items-center gap-4 list-none m-0 p-0"
                                style={{ fontFamily: 'var(--font-family-suport)' }}>
                                {publicLinks.map((link) => (
                                    <li key={link.id}>
                                        <Link to={link.path} className="header-link text-lg font-medium">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <Button
                                    label='Area do Sócio'
                                    rounded
                                    style={{ backgroundColor: '#09294B' }}
                                    className='border-none flex gap-2'
                                    onClick={() => navigate('/login')}
                                />
                            </div>
                        </nav>
                    </>
                ) : (
                    <div>
                        <Button
                            icon={() => <TiThMenu size={30} width={45} color='#09294B' />}
                            rounded
                            outlined
                            className='border-none w-auto'
                            onClick={() => setVisible(!visible)}
                        />
                    </div>
                )}
            </motion.header>
            <motion.div
                className={`w-full search-navbar flex align-items-end gap-3 ${isMobile ? 'px-4 justify-content-center' : 'px-8 justify-content-end'}`}
                initial={{ opacity: 0, height: isMobile ? 80 : 160 }}
                whileInView={{
                    height: isMobile ? 150 : 193,
                    opacity: showSecondaryHeader ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
            >
                <div className={` justify-content-end align-items-end gap-3 mb-2 ${isMobile ? 'hidden' : 'flex'}`}>
                    {socialMedia.map((media) => (
                        <Link
                            key={media.id}
                            to={media.path}>
                            <Button
                                key={media.id}
                                icon={() => media.icon}
                                rounded
                                style={{ backgroundColor: '#09294B' }}
                                className='border-none'
                            />
                        </Link>
                    ))}
                </div>
                <div className={`flex gap-3 align-items-center mb-2 ${isMobile ? 'justify-content-center' : ' justify-content-end pr-6'}`}>
                    <InputText placeholder="Pesquisar..." />
                    <Button
                        icon={() => <FaSearch size={20} />}
                        className='border-none border-round-md'
                        style={{ backgroundColor: '#09294B' }} />
                </div>
            </motion.div>
            {visible && (
                <GeneralDrawer
                    isVisible={visible}
                    onClose={() => setVisible(false)}
                    drawerSide='end'>
                    <div className='flex flex-column gap-3'>
                        {publicLinks.map((link) => (
                            <div key={link.id} className='flex justify-content-center p-3 cursor-pointer links-hover' onClick={() => setVisible(false)}>
                                <Link to={link.path} className='text-lg no-underline text-primary'>
                                    {link.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <hr />
                    <div className='flex justify-content-center mt-3'>
                        <Button
                            label='Area do Sócio'
                            rounded
                            className='border-none flex gap-2'
                            style={{ backgroundColor: '#09294B' }}
                            onClick={() => navigate('/login')}
                        />
                    </div>
                </GeneralDrawer>
            )}

        </>
    );
};

export default Header;