import React, { useState } from 'react'
import { BreadCrumb } from 'primereact/breadcrumb';
import { TabView, TabPanel } from 'primereact/tabview';
import { FaBuilding, FaPhotoFilm, FaUser } from 'react-icons/fa6';
import useWindowSize from '../hooks/useWindowSize';
import { Carousel } from 'primereact/carousel';
import ImgDialog from '../components/imgDialog';
import { 
    Facility1,
    Facility2,
    Facility3,
    Facility4,
    Facility5,
    Facility6,
    Facility7,
    Facility8,
    Facility9,
    Facility10,
    Facility11,
    Facility12,
    Facility13,
    Facility14,
    Facility15,
    Facility16,
    Facility17,
    Facility18,
    Facility19,
    Facility20,
    Facility21,
    Facility22,
    Facility23,
    Facility24,
    Facility25,
    Facility26,
    Facility27
 } from '../imports/facilitiesGallery';

const About = () => {
    const { width } = useWindowSize();
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: 'Sobre Nós', url: '/sobrenos' }
    ];

    const imgsFacilities = [
        {
            id: 1,
            src: Facility1,
            alt: 'Imagem 1',
            gallery: [Facility1, Facility2, Facility3]
        },
        {
            id: 2,
            src: Facility2,
            alt: 'Imagem 2',
            gallery: []
        },
        {
            id: 3,
            src: Facility3,
            alt: 'Imagem 3',
            gallery: []
        },
        {
            id: 4,
            src: Facility4,
            alt: 'Imagem 4',
            gallery: []
        },
        {
            id: 5,
            src: Facility5,
            alt: 'Imagem 5',
            gallery: []
        },
        {
            id: 6,
            src: Facility6,
            alt: 'Imagem 6',
            gallery: []
        },
        {
            id: 7,
            src: Facility7,
            alt: 'Imagem 7',
            gallery: []
        },
        {
            id: 8,
            src: Facility8,
            alt: 'Imagem 8',
            gallery: []
        },
        {
            id: 9,
            src: Facility9,
            alt: 'Imagem 9',
            gallery: []
        },
        {
            id: 10,
            src: Facility10,
            alt: 'Imagem 10',
            gallery: []
        },
        {
            id: 11,
            src: Facility11,
            alt: 'Imagem 11',
            gallery: []
        },
        {
            id: 12,
            src: Facility12,
            alt: 'Imagem 12',
            gallery: []
        },
        {
            id: 13,
            src: Facility13,
            alt: 'Imagem 13',
            gallery: []
        },
        {
            id: 14,
            src: Facility14,
            alt: 'Imagem 14',
            gallery: []
        },
        {
            id: 15,
            src: Facility15,
            alt: 'Imagem 15',
            gallery: []
        },
        {
            id: 16,
            src: Facility16,
            alt: 'Imagem 16',
            gallery: []
        },
        {
            id: 17,
            src: Facility17,
            alt: 'Imagem 17',
            gallery: []
        },
        {
            id: 18,
            src: Facility18,
            alt: 'Imagem 18',
            gallery: []
        },
        {
            id: 19,
            src: Facility19,
            alt: 'Imagem 19',
            gallery: []
        },
        {
            id: 20,
            src: Facility20,
            alt: 'Imagem 20',
            gallery: []
        },
        {
            id: 21,
            src: Facility21,
            alt: 'Imagem 21',
            gallery: []
        },
        {
            id: 22,
            src: Facility22,
            alt: 'Imagem 22',
            gallery: []
        },
        {
            id: 23,
            src: Facility23,
            alt: 'Imagem 23',
            gallery: []
        },
        {
            id: 24,
            src: Facility24,
            alt: 'Imagem 24',
            gallery: []
        },
        {
            id: 25,
            src: Facility25,
            alt: 'Imagem 25',
            gallery: []
        },
        {
            id: 26,
            src: Facility26,
            alt: 'Imagem 26',
            gallery: []
        }
    ]

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 1,
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
                    setSelectedImage(item)
                    setVisibleDialog(true);
                }}
            >
                <img
                    src={item.src}
                    alt={item.title}
                    className="border-round-xl h-full w-full"
                />
            </div>
        );
    };

    return (
        <section>
            <div className='p-6'>
                <div className={`${width < 769 ? 'flex flex-column' : 'flex align-items-center justify-content-between'} px-1`}>
                    {width < 769 ? (
                        <>
                            <BreadCrumb model={breadcrumbItems} className='border-none text-medium' />
                            <h1 className="text-3xl font-bold p-0" style={{ color: 'var(--primary-color)' }}>Sobre Nós</h1>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold p-0" style={{ color: 'var(--primary-color)' }}>Sobre Nós</h1>
                            <BreadCrumb model={breadcrumbItems} className='border-none text-medium' />
                        </>)}
                </div>
                <TabView>
                    <TabPanel
                        header="Quem Somos"
                        leftIcon={() => <div className='mt-1 pr-2'><FaUser /></div>}
                    >
                        <div className={`grid align-items-start pr-3`} >
                            <div className={`${width < 769 ? 'col-12' : 'col-6'}`}>
                                <h3 style={{ color: 'var(--primary-color)' }}>Bem-vindo ao Círculo Militar da Praia Vermelha</h3>
                                <p style={{ fontFamily: 'var(--font-family-suport)' }}>O Circulo Militar da Praia Vermelha, ou simplesmente O CÍRCULO, como é carinhosamente conhecido, foi fundado em 8 de março de 1957, por iniciativa dos alunos da Escola de Comando e Estado-Maior do Exército (ECEME).</p>

                                <p style={{ fontFamily: 'var(--font-family-suport)' }}>O major de Intendência Carlos Vanário, oficial-aluno à época, teve destacada atuação para a concretização deste ato. O curso de Comando e Estado-Maior era realizado em 3 (três) anos e a primeira diretoria do clube foi composta por alunos do 2° ano, dentre eles, os tenentes coronéis Rocca Diegues e Lauro Pie, além dos majores Otto Pio Fonseca, Ítalo Mandarino e Sylvio Torraca.</p>

                                <p style={{ fontFamily: 'var(--font-family-suport)' }}>A ECEME colaborou ativamente com a implantação do Círculo, criando sólidos laços que, cultivados permanentemente, fazem do clube uma extensão natural da Escola de mais alto nível de nosso Exército. Quando de sua criação, o clube foi instalado no 14° andar do Edifício da Praia Vermelha (EPV), transferindo-se para sua sede atual no período de 1965/ 1966, após negociações com a Prefeitura do Rio de Janeiro.</p>

                                <p style={{ fontFamily: 'var(--font-family-suport)' }}>O local da nossa sede abrigava, inicialmente, o Salão Casa Blanca, uma das mais famosas casas noturnas da capital fluminense. Posteriormente, sediou a Escola de Belas Artes do Rio de Janeiro. Tais registros históricos se fazem presentes até os dias atuais pela designação dos salões Casa Blanca e Belas Artes, como forma de homenagear nossa história.</p>

                                <p style={{ fontFamily: 'var(--font-family-suport)' }}>Assim, emoldurado pelo mais belo cartão postal da cidade, o Círculo destaca-se como a melhor opção de lazer e cultura para as famílias do entorno da Urca.</p>
                            </div>
                            <div className={`mt-1 ${width < 769 ? 'col-12' : 'col-6'} max-w-30`}>
                                <div className=''>
                                    <h3 style={{ color: 'var(--primary-color)' }}>Missão</h3>
                                    <p style={{ fontFamily: 'var(--font-family-suport)' }}>Proporcionar bem-estar aos associados do CMPV nas atividades esportivas, sociais e culturais, oferecendo uma estrutura com qualidade e segurança.</p>
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--primary-color)' }}>Visão</h3>
                                    <p style={{ fontFamily: 'var(--font-family-suport)' }}>Ser referencia como clube, procurando inovar, no intuito de apresentar uma eficiente e eficaz opção de lazer aos seus associados.</p>
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--primary-color)' }}>Valores</h3>
                                    <p style={{ fontFamily: 'var(--font-family-suport)' }}>Responsabilidade, Probidade, Camaradagem, Zelo, Disciplina, Lealdade</p>
                                </div>
                                <div>
                                    <h3 className='mb-3' style={{ color: 'var(--primary-color)' }}>Localização</h3>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.869173844103!2d-43.16804672504368!3d-22.955044739596886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99801a67b5eb6b%3A0xeddf40c5d68ff46f!2sPra%C3%A7a%20General%20Tib%C3%BArcio!5e0!3m2!1spt-BR!2sbr!4v1745093990652!5m2!1spt-BR!2sbr"
                                        width={width < 427 ? "210" : "600"}
                                        height="150"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        aria-hidden="false"
                                        tabIndex="0"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Ex-Presidentes do Círculo</h3>
                            <div
                                className='grid align-items-center'
                                style={{ fontFamily: 'var(--font-family-suport)' }}>
                                <ul className={`${(width < 426) ? 'col-12' : (width < 769) ? 'col-6' : 'col-2'} list-none`}>
                                    <li>1986 – Cel Ayres</li>
                                    <li>1987 – Cel Henrique</li>
                                    <li>1988 – Cel Praciano</li>
                                    <li>1989 – TC Avena</li>
                                    <li>1990 – TC Kihara</li>
                                    <li>1991 – TC Higino</li>
                                    <li>1992 – TC Boson</li>
                                </ul>
                                <ul className={`${(width < 426) ? 'col-12' : (width < 769) ? 'col-6' : 'col-2'} list-none`}>
                                    <li>1994 – TC Macedo / TC Rachevsky</li>
                                    <li>1995 – Cel Peres</li>
                                    <li>1998 – Cel Macedo</li>
                                    <li>2000 – Cel Henrique</li>
                                    <li>2002 – Cel Melo</li>
                                    <li>2004 – Cel Pastori</li>
                                </ul>
                                <ul className={`${(width < 426) ? 'col-12' : (width < 769) ? 'col-6' : 'col-2'} list-none`}>
                                    <li>2007 – Cel Sampaio</li>
                                    <li>2008 – Cel Elias</li>
                                    <li>2009 – Cel Marco Antônio</li>
                                    <li>2010 – Cel Burke</li>
                                    <li>2011 – Cel Lício</li>
                                    <li>2012 – Cel Frazão</li>
                                    <li>2013 – Cel Paulo Sérgio</li>
                                </ul>
                                <ul className={`${(width < 426) ? 'col-12' : (width < 769) ? 'col-6' : 'col-2'} list-none`}>
                                    <li>2014 – Cel Melo</li>
                                    <li>2015 – Cel Narcizo</li>
                                    <li>2016 – Cel Bessa</li>
                                    <li>2017 – Cel Morgado</li>
                                    <li>2018 – Cel Nelson</li>
                                    <li>2019 – Cel Moussallem</li>
                                    <li>2020 – Cel Sassone</li>
                                </ul>
                                <ul className={`${(width < 426) ? 'col-12' : (width < 769) ? 'col-6' : 'col-2'} list-none`}>
                                    <li>2021 – Cel Corrêa Netto</li>
                                    <li>2022 – Cel José Euclides</li>
                                    <li>2023 – Cel Ivan Christie</li>
                                    <li>2024 – Cel Ruiz</li>
                                    <li>2025 – Cel Gustavo Martins</li>
                                </ul>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel
                        header="Nossas Instalações"
                        leftIcon={() => <div className='mt-1 pr-2'><FaBuilding /></div>}>
                        <div>

                            <Carousel
                                value={imgsFacilities}
                                numVisible={3}
                                numScroll={3}
                                responsiveOptions={responsiveOptions}
                                style={{ width: width > 1024 ? '97%' : '100%' }}
                                itemTemplate={itemTemplate}
                                showNavigators={width >= 1024}
                                showIndicators={false}
                                circular
                                draggable
                            />
                        </div>
                    </TabPanel>
                </TabView>
            </div>
            <ImgDialog
                visible={visibleDialog}
                onclose={() => setVisibleDialog(false)}
                imgSelected={selectedImage}
            />
        </section>
    )
}

export default About