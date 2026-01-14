import React, { useContext } from 'react'
import useWindowSize from '../hooks/useWindowSize';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { motion } from 'motion/react';
import { GlobalContext } from '../contexts/globalContext';

const HomeNews = () => {
    const { width } = useWindowSize();
    const { newsInfos } = useContext(GlobalContext);
    const navigate = useNavigate();

    const cardInfosMobile = newsInfos.slice(0, 2);

    return (
        <div className="p-4">
            <div className="flex gap-3 align-items-center justify-content-between mb-4">
                <h1 className="text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>Noticias</h1>
                <Link to="/novidades" className="flex align-items-center no-underline gap-2 font-medium" style={{ color: 'var(--primary-color)', fontFamily: 'var(--font-family-suport)' }}>
                    Veja Mais
                    <FaArrowRight />
                </Link>
            </div>

            <div className={`${width < 768 ? 'flex flex-column' : 'grid'}`}>
                {(width < 769 ? cardInfosMobile : newsInfos).map((card) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: card.id * 0.1 }}
                        className={`${width < 769 ? 'col-12 mb-3' : 'col-6'} cursor-pointer`}
                        style={{ height: width < 769 ? '350px' : '400px' }}
                        onClick={() => navigate('/novidades/' + card.id)}
                    >
                        <div
                            className="relative overflow-hidden w-full h-full border-round-xl"
                            style={{ borderRadius: '12px' }}
                        >
                            <motion.img
                                src={card.imageUrl}
                                alt={card.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                            />
                            <div
                                className="absolute bottom-0 left-0 w-full text-white px-4 py-3"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(2px)',
                                }}
                            >
                                <h2 className="m-0 text-base font-bold mb-1">{card.title}</h2>
                                <p className="m-0 text-sm">{card.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div >
    )
}

export default HomeNews