import React, { useState } from 'react';
import { Carousel } from 'primereact/carousel';
import useWindowSize from '../hooks/useWindowSize';
import espaco1 from '../assets/imgs/general/belasartes.jpg';
import espaco2 from '../assets/imgs/general/belavsita.jpg';
import espaco3 from '../assets/imgs/general/terraco.jpg';
import espaco4 from '../assets/imgs/general/tamandare.jpg';
import espaco5 from '../assets/imgs/general/casablancaebelavista.jpg';
import CarouselDialog from '../components/carouselDialog';
import {
    BelasArtes1,
    BelasArtes2,
    BelasArtes3,
    BelasArtes4,
    BelasArtes5,
    BelaVista1,
    BelaVista2, 
    BelaVista3, 
    BelaVista4, 
    BelaVista5,
    Terraco1,
    Terraco2,
    Terraco3,
    Terraco4,
    Terraco5,
    ArcosETamandare1,
    ArcosETamandare2,
    ArcosETamandare3,
    ArcosETamandare4,
    ArcosETamandare5,
    CasablancaeBelaVista1,
    CasablancaeBelaVista2,
    CasablancaeBelaVista3,
    CasablancaeBelaVista4,
    CasablancaeBelaVista5,
} from '../imports/hallGallery';

const Rents = () => {
    const { width } = useWindowSize();
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const imgsSpaces = [
        {
            id: 1,
            itemImageSrc: espaco1,
            title: 'Belas Artes',
            gallery: [BelasArtes1, BelasArtes2, BelasArtes3, BelasArtes4, BelasArtes5]
        },
        {
            id: 2,
            itemImageSrc: espaco2,
            title: 'Bela Vista',
            gallery: [BelaVista1, BelaVista2, BelaVista3, BelaVista4, BelaVista5]
        },
        {
            id: 3,
            itemImageSrc: espaco3,
            title: 'Espaço Duque de Caxias',
            gallery: [Terraco1, Terraco2, Terraco3, Terraco4, Terraco5]
        },
        {
            id: 4,
            itemImageSrc: espaco4,
            title: 'Arcos e Tamandaré',
            gallery: [ArcosETamandare1, ArcosETamandare2, ArcosETamandare3, ArcosETamandare4, ArcosETamandare5]
        },
        {
            id: 5,
            itemImageSrc: espaco5,
            title: 'Casablanca e Bela Vista',
            gallery: [CasablancaeBelaVista1, CasablancaeBelaVista2, CasablancaeBelaVista3, CasablancaeBelaVista4, CasablancaeBelaVista5]
        }
    ];

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '426px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const itemTemplate = (item) => {
        return (
            <div
                className="cursor-pointer relative overflow-hidden border-round-xl mx-2"
                onClick={() => {
                    setSelectedImage(item);
                    setVisibleDialog(true);
                }}
            >
                <img
                    src={item.itemImageSrc}
                    alt={item.title}
                    className="w-full border-round-xl"
                />
                <div
                    className="absolute bottom-0 left-0 w-full text-white"
                    style={{
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(2px)',
                        padding: '0.1rem 1rem'
                    }}
                >
                    <h3 className="m-0 text-lg font-bold">{item.title}</h3>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="mb-4 px-6">
                <h1 className="text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>Aluguel de Espaços</h1>
            </div>
            <div className='px-6 font-medium' style={{ fontFamily: 'var(--font-family-suport)' }}>
                <p>POR QUE FAZER SEU EVENTO NO CÍRCULO MILITAR?</p>

                <p>Segurança, qualidade, excelente atendimento, amplos salões e parceiros ideais são os atributos que fazem do Círculo Militar o lugar ideal para a realização do seu evento.</p>

                <p>Com fácil acesso e uma localização privilegiada na Zona Sul do Rio de Janeiro, mais precisamente na Praia Vermelha, com vista para o Morro da Urca e para o Pão de Açúcar, o Círculo Militar oferece comodidade e praticidade aos seus convidados, além de contar com uma ótima infraestrutura, diversão, cultura e lazer.</p>

                <p>Entre em contato através do e-mail: eventos@cmpv.com.br ou se preferir, ligue para (21) 2295-3397 Ramal 22 ou Whatsapp (21) 99292-8614</p>
                <p>Horário de Atendimento: Segunda à Sexta: 9h às 18 h</p>
                <p className='text-lg'>Clique nos cards para mais informações</p>
            </div>
            <div className="px-3 md:px-6">
                <Carousel
                    value={imgsSpaces}
                    numVisible={width >= 1024 ? 3 : width >= 768 ? 2 : 1}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    style={{ width: '100%' }}
                    itemTemplate={itemTemplate}
                    showNavigators={width >= 768}
                    showIndicators
                    circular
                    draggable
                />
            </div>

            <CarouselDialog
                visible={visibleDialog}
                onClose={() => setVisibleDialog(false)}
                initialImage={selectedImage}
                images={selectedImage?.gallery}
            />
        </div >
    );
};

export default Rents;
