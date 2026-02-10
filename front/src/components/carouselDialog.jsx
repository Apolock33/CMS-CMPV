import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Galleria } from 'primereact/galleria';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { FaX } from 'react-icons/fa6';
import useWindowSize from '../hooks/useWindowSize';

const CarouselDialog = ({ visible, onClose, images }) => {
    const [imgsArray, setImgsArray] = useState([]);
    const { width } = useWindowSize();
    const backdrop = { visible: { opacity: 1 }, hidden: { opacity: 0 } };
    const modal = { hidden: { opacity: 0, y: '-100vh', scale: 0.6 }, visible: { opacity: 1, y: '0', scale: 1, transition: { delay: 0.1, duration: 0.3 } }, exit: { opacity: 0, scale: 0.7, transition: { duration: 0.2 } } };

    const getImages = () => {
        if (!images || !Array.isArray(images)) {
            setImgsArray([]);
            return;
        }
        const formattedImages = images.map((image) => {
            if (!image || !image.url) return null; 
            return `${import.meta.env.VITE_URL}${image.url}`;
        }).filter(Boolean); 

        setImgsArray(formattedImages);
    };

    useEffect(() => {
        getImages();
        const handleKeyDown = (event) => (event.key === 'Escape') && onClose();
        if (visible) document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [visible, onClose]);

    const itemTemplate = (item) => {
        if (typeof item !== 'string') return null;
        return (
            <div className="w-full flex justify-content-center">
                <img src={item} alt="Imagem da galeria" style={{ width: width < 769 ? '100%' : '80%', height: 'auto', maxHeight: width < 769 ? '300px' : '500px', objectFit: 'contain', borderRadius: '12px' }} />
            </div>
        );
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div className="backdrop overflow-hidden" variants={backdrop} initial="hidden" animate="visible" exit="hidden" onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, }}>
                    <Button icon={() => <FaX size={30} />} rounded text className={`absolute top-0 right-0 z-5 text-white p-2 ${width < 769 ? 'm-3' : 'm-5'}`} onClick={onClose} />
                    <motion.div className="modal flex justify-content-center align-items-center" variants={modal} initial="hidden" animate="visible" exit="exit" onClick={(e) => e.stopPropagation()} style={{ borderRadius: '8px', width: '90%', maxWidth: '850px', backgroundColor: 'transparent', }}>
                        {width < 769 ? (
                            <Galleria value={imgsArray} showThumbnails={false} showIndicators showItemNavigators circular item={itemTemplate} />
                        ) : (
                            <Carousel value={imgsArray} numVisible={1} numScroll={1} circular draggable autoplayInterval={4000} itemTemplate={itemTemplate} showNavigators showIndicators style={{ width: '100%' }} />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CarouselDialog;
