import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/globalContext';
import useWindowSize from '../hooks/useWindowSize';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from 'primereact/button';
import { FaX } from 'react-icons/fa6';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';

const ImgDialog = ({ visible, onclose, imgSelected }) => {
    const { isMobile, zoomLevel, setZoomLevel } = useContext(GlobalContext);
    const { width } = useWindowSize();

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

    const zoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.2, 3)); // máximo 3x
    };

    const zoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.2, 1)); // mínimo 1x
    };

    const imageTemplate = (image) => {
        const baseWidth = isMobile ? 300 : 500; // base para a largura da imagem
        const containerWidth = baseWidth * zoomLevel;

        return (
            <div
                className="flex justify-content-center align-items-center overflow-auto"
                style={{
                    width: '100%',
                    maxHeight: isMobile ? '250px' : '500px',
                }}
            >
                <div
                    style={{
                        width: `${containerWidth}px`,
                        transition: 'width 0.3s ease',
                    }}
                >
                    <img
                        id='imgSelected'
                        src={image?.src}
                        alt={image?.title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            borderRadius: '12px',
                            display: 'block',
                        }}
                    />
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
                    <div className={`absolute top-0 right-0 z-5 flex gap-5 ${width < 769 ? 'm-3' : 'm-5'}`}>
                        <Button
                            icon={() => <FiZoomOut size={55} />}
                            rounded
                            text
                            className="text-white"
                            onClick={zoomOut}
                        />
                        <Button
                            icon={() => <FiZoomIn size={55} />}
                            rounded
                            text
                            className="text-white"
                            onClick={zoomIn}
                        />
                        <Button
                            icon={() => <FaX size={35} />}
                            rounded
                            text
                            className="text-white p-2"
                            onClick={onclose}
                        />
                    </div>
                    <motion.div
                        className="modal flex justify-content-center align-items-center"
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            borderRadius: '8px',
                            width: '100%',
                            maxWidth: '1000px',
                        }}
                    >
                        {imgSelected && imageTemplate(imgSelected)}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ImgDialog
