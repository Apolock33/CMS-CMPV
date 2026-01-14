import React, { useState } from 'react'
import useWindowSize from '../hooks/useWindowSize';
import { BreadCrumb } from 'primereact/breadcrumb';
import activity1 from '../assets/imgs/general/atividades/basquete.jpg';
import activity2 from '../assets/imgs/general/atividades/futebol.jpg';
import activity3 from '../assets/imgs/general/atividades/pilates.jpg';
import activity4 from '../assets/imgs/general/atividades/natacao.jpg';
import activity5 from '../assets/imgs/general/atividades/judo.jpg';
import ImgDialog from '../components/imgDialogActivities';

const Activities = () => {
    const { width } = useWindowSize();
    const [openImg, setOpenImg] = useState(false);
    const [selectedImg, setSelectedImg] = useState({});

    const breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: 'Atividades', url: '/atividades' }
    ];

    const imgsActivities = [
        {
            id: 1,
            itemImageSrc: activity1,
            title: 'Basquete',
            infos: 'Terças e quintas: 17:00h às 18:00h sub-17 (de 13 a 17 anos) | de 18:00h às 19:00h sub-12 de 8 a 12 anos) | de 19:00h às 20:00h adultos (de 18 a 55 anos) \n\nContato: (21)96988-8789 – Arlema \n\nInstagram: olimpiaclube'

        },
        {
            id: 2,
            itemImageSrc: activity2,
            title: 'Futebol',
            infos: 'Horários: \n\nSegundas e quartas: de 17:00h às 18:00h – de 13 até 16 anos | de 18:00h às 19:00h – crianças de 9 até 12 anos | de 19:00h às 20:00h – de 5 até 8 anos \n\nContato: (21) 99858-5921 – Alex Dardengo'

        },
        {
            id: 3,
            itemImageSrc: activity3,
            title: 'Pilates',
            infos: 'CONTATO\n\n*Fale Contato diretamente com a academia *Descontos para Plano Família (somente nos planos mensais) – 2 membros: 5% | 3 ou mais membros: 8% | somente no DCC \n\nContatos: (21) 99530-0345 - (21) 2541-3250'

        },
        {
            id: 4,
            itemImageSrc: activity4,
            title: 'Natação',
            infos: 'CONTATO \n\nContato diretamente com a academia \n*Desconto para Plano Família (somente nos planos mensais) \n\nCOntatos: (21) 99530-0345 - (21) 2541-3250'

        },
        {
            id: 5,
            itemImageSrc: activity5,
            title: 'Judô',
            infos: 'CONTATO \n\nTerças e quintas: 18:00h (até 7 anos) \n18:35 ( até 12 anos) \n19:20 ( a partir de 13 anos) \n\nContato: (21) 99226-9254 – Fred Damiano'
        },
    ];

    const handleImageClick = (img) => {
        setSelectedImg(img);
        setOpenImg(true);
    };

    return (
        <section>
            <div className='p-6'>
                <div className={`${width < 769 ? 'flex flex-column' : 'flex align-items-center justify-content-between'} px-1`}>
                    {width < 769 ? (
                        <>
                            <BreadCrumb model={breadcrumbItems} className='border-none text-medium' />
                            <h1 className="text-3xl font-bold p-0" style={{ color: 'var(--primary-color)' }}>Atividades</h1>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold p-0" style={{ color: 'var(--primary-color)' }}>Atividades</h1>
                            <BreadCrumb model={breadcrumbItems} className='border-none text-medium' />
                        </>
                    )}
                </div>

                <div className='text-start max-w-full'>
                    <p style={{ fontFamily: 'var(--font-family-suport)' }}>
                        A prática esportiva promove inúmeros benefícios, como redução dos riscos de doenças, melhora na formação do corpo, diminuição do estresse e do nível de ansiedade, melhora da coordenação motora, proteção dos ossos e das articulações, e manutenção de uma vida saudável.<br /><br />
                        É fundamental a prática de atividade física da infância até o envelhecimento. Não existe exercício ideal, é preciso respeitar a individualidade, o desejo, prazer e a aptidão física.<br /><br />
                        AS INFORMAÇÕES SOBRE AS ATIVIDADES DO CÍRCULO MILITAR NÃO SÃO DE RESPONSABILIDADE DA SECRETARIA E DEVEM TRATADAS DIRETAMENTE COM CADA PROFESSOR(A).<br /><br />
                        ESCOLHA A MODALIDADE ESPORTIVA ABAIXO PARA VISUALIZAR O CONTATO DO PROFESSOR(A) E OS HORÁRIOS DE AULAS DISPONÍVEIS.
                    </p>
                </div>

                <div
                    className="grid gap-4 justify-content-center mt-6"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: width > 1024 ? 'repeat(3, 1fr)' : width > 768 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
                        justifyItems: 'center'
                    }}
                >
                    {imgsActivities.map((item) => (
                        <div
                            key={item.id}
                            className="relative cursor-pointer overflow-hidden border-round-xl"
                            style={{
                                width: width >= 1024 ? '350px' : '300px',
                                height: width >= 1024 ? '400px' : '350px'
                            }}
                            onClick={() => handleImageClick(item)}
                        >
                            <img
                                src={item.itemImageSrc}
                                alt={item.title}
                                className="w-full h-full object-cover border-round-xl"
                            />
                            <div
                                className="absolute bottom-0 left-0 w-full text-white"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    backdropFilter: 'blur(2px)',
                                    padding: '0.5rem 1rem'
                                }}
                            >
                                <h3 className="m-0 text-lg font-bold">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ImgDialog
                visible={openImg}
                onclose={() => setOpenImg(false)}
                imgSelected={selectedImg}
            />
        </section>
    )
}

export default Activities;
