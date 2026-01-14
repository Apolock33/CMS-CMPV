import React, { useContext, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import { motion } from 'motion/react';
import { GlobalContext } from '../contexts/globalContext';

const Events = () => {
    const { width } = useWindowSize();
    const navigate = useNavigate();
    const { eventsInfos } = useContext(GlobalContext);

    return (
        <div className='p-4'>
            <div className='flex gap-3 align-items-center justify-content-between mb-4'>
                <h1 className="text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>Eventos</h1>
                <Link
                    to="/eventos"
                    className='flex align-items-center no-underline gap-2 font-medium'
                    style={{ color: 'var(--primary-color)', fontFamily: 'var(--font-family-suport)' }}
                >
                    Veja Mais
                    <FaArrowRight />
                </Link>
            </div>

            <div className="flex flex-column gap-3">
                {eventsInfos?.map((event) => (
                    <motion.div
                        key={event.id}
                        className="w-full cursor-pointer"
                        style={{ height: width < 768 ? '100px' : '155px' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/eventos/' + event.id)}
                    >
                        <div className="w-full  overflow-hidden border-round-xl  shadow-1 bg-white">
                            <div className="flex h-full justify-content-start align-items-center">
                                <img
                                    src={event.img}
                                    alt={event.title}
                                    style={{
                                        width: width < 768 ? '100px' : '150px',
                                        height: width < 768 ? '100px' : '150px',
                                        objectFit: 'cover',
                                        flexShrink: 0,
                                    }}
                                />

                                <div className="flex flex-column justify-content-center px-3 w-70 h-full">
                                    <h2 className="text-lg font-semibold mb-1">{event.date}</h2>
                                    <p className={`text-color-secondary m-0 ${width < 768 ? 'text-sm' : 'text-xl'}`}>{event.title}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

            </div>
        </div>
    );
};

export default Events;
