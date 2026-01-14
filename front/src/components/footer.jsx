import React from 'react';
import '../assets/css/footer.css';
import sponsor1 from '../assets/imgs/logos/logoPOUPEX.png';
import sponsor2 from '../assets/imgs/logos/logotipoFHE.png';
import useWindowSize from '../hooks/useWindowSize';
import { FaF, FaFacebook } from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';

const Footer = () => {
    const { width } = useWindowSize();

    const socialMedia = [
        {
            id: 1,
            name: 'Facebook',
            link: 'https://www.facebook.com/praiaverm/',
            icon: FaFacebook,
            iconSize: 30,
            color: '#09294B'
        },
        {
            id: 2,
            name: 'Instagram',
            link: 'https://www.instagram.com/circulomilitardapraiavermelha/#',
            icon: AiFillInstagram,
            iconSize: 30,
            color: '#09294B'
        },
    ]

    return (
        <>
            <div className={`container ${width < 768 ? 'flex flex-column' : ''}`}>
                <div id='contacts'>
                    <h4 className='font-bold text-xl uppercase'>Contatos</h4>
                    <p className='flex flex-column'>
                        <span className='material-symbols-outlined font-bold text-lg uppercase'>Endereço: </span>
                        <span className='max-w-15rem'>
                            Praça General Tibúrcio, s/nº, Praia Vermelha – Urca / Rio de Janeiro – RJ
                        </span>
                        <span className='material-symbols-outlined uppercase'>                    CEP: 22290-270
                        </span><br />
                        <span className='material-symbols-outlined font-bold text-lg uppercase'>Atendimento na Secretaria: </span>
                        <span className='max-w-15rem'>
                            Segunda à Sexta: 8h às 18h<br />
                            Sábado: 9h às 13h<br />
                            Fechado aos Domingos e Feriados
                        </span>
                    </p>
                </div>
                <div id='infos'>
                    <h4 className='font-bold text-xl uppercase'>Informações de Funcionamento</h4>
                    <p className='flex flex-column'>
                        <span className='material-symbols-outlined font-bold text-lg uppercase'>PARQUE AQUÁTICO: </span>
                        <span className='max-w-15rem'>
                            Segunda-Feira:
                            13h às 20h<br />
                            Terça-feira a sexta-feira:
                            06h às 20h<br />
                            Sábado, Domingo e Feriados:
                            08h às 20h
                        </span><br />
                        <span className='material-symbols-outlined font-bold text-lg uppercase'>Sauna: </span>
                        <span className='max-w-15rem'>
                            Segunda-Feira:
                            15h às 20h<br />
                            Sábado, Domingo e Feriados:
                            08h às 20h
                        </span>
                    </p>
                </div>
                <div id='sponsors'>
                    <h4 className='font-bold text-xl uppercase'>Patrocinadores:</h4>
                    <p className='flex flex-column'>
                        <span className='mb-4'>
                            <img src={sponsor1} alt='Poupex' className='max-w-15rem' />
                        </span>
                        <span>
                            <img src={sponsor2} alt='FHE' className='max-w-15rem' />
                        </span>
                    </p>
                </div>
            </div>
            <div className={`flex align-items-center ${width < 768 ? ' flex-column justify-content-center py-3' : 'flex-row justify-content-between px-7 py-3'}`}>
                <h2 className='font-medium'>© 2023 - Todos os direitos reservados</h2>
                <div className='flex gap-3'>
                    {socialMedia.map((media) => (
                        <div key={media.id} className='flex align-items-center justify-content-center cursor-pointer' onClick={() => window.open(media.link, '_blank')}>
                            <media.icon size={media.iconSize} color={media.color} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Footer