import React, { useContext, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { GlobalContext } from '../contexts/globalContext';
import { FaX } from 'react-icons/fa6';
import { Button } from 'primereact/button';
import useWindowSize from '../hooks/useWindowSize';

const ImgDialog = ({ visible, onclose, imgSelected }) => {
    const context = useContext(GlobalContext);
    const isMobile = context.isMobile;
    const size = useWindowSize();
    const width = size.width;

    const backdrop = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    const modal = {
        hidden: { opacity: 0, y: "-100vh", scale: 0.6 },
        visible: {
            opacity: 1,
            y: "0",
            scale: 1,
            transition: { delay: 0.1, duration: 0.3 }
        },
        exit: { opacity: 0, scale: 0.7, transition: { duration: 0.2 } }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onclose();
            }
        };

        if (visible) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [visible, onclose]);

    const imageTemplate = (image) => {
        return (
            <div className="bg-white border-round-xl grid">
                <div
                    className={`${width < 768 ? 'col-12' : 'col-6'} flex justify-content-center align-items-center`}
                    style={{ padding: '1rem' }}
                >
                    <img
                        src={image?.itemImageSrc}
                        alt={image?.title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: isMobile ? '200px' : '400px',
                            objectFit: 'contain',
                            borderRadius: '12px'
                        }}
                    />
                </div>
                <div className={`${width < 768 ? 'col-12' : 'col-6'} pr-5`} style={{ padding: '1rem' }}>
                    <h1 style={{ color: 'var(--primary-color)' }}>{image?.title} - Informações:</h1>
                    <p style={{
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                        fontFamily: 'var(--font-family-suport)',
                    }}>{image?.infos}</p>
                </div>
            </div>
        );
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="backdrop overflow-hidden"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onclose}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10
                    }}
                >
                    <Button
                        icon={() => <FaX size={35} />}
                        rounded
                        text
                        className={`absolute top-0 right-0 z-5 text-white p-2 ${width < 769 ? 'm-3' : 'm-5'}`}
                        onClick={onclose}
                    />

                    <motion.div
                        className="modal flex justify-content-center align-items-center"
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'var(--background-color)',
                            borderRadius: '8px',
                            width: '80%',
                            maxWidth: '650px',
                        }}
                    >
                        {imgSelected && imageTemplate(imgSelected)}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ImgDialog;
