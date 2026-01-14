import React from 'react';
import { Button } from 'primereact/button';
import { FaWhatsapp } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const WppButton = () => {
    return (
        <div className="fixed bottom-0 right-0 m-3 z-5">
            <Button
                rounded
                icon={() => <FaWhatsapp size={35} />}
                aria-label="Fale conosco no WhatsApp"
                className='p-1 w-4rem h-4rem border-none'
                style={{ backgroundColor: 'var(--success-color)' }}
                onClick={()=> window.open('https://web.whatsapp.com/send?phone=5521968655554&text=Ol%C3%A1', '_blank')}
            />
        </div>
    );
};

export default WppButton;
