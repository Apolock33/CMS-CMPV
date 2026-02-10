import { FaBuilding, FaUser } from "react-icons/fa6";
import { TabView, TabPanel } from "primereact/tabview";
import { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import useWindowSize from "../hooks/useWindowSize";
import ImgDialog from "../components/imgDialog";
import PageTitle from "../components/designSystem/pageTitle";
import { api } from "../services/api";

const About = () => {
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [imagens, setImagens] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { width } = useWindowSize();

  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 1, numScroll: 1 },
    { breakpoint: "768px", numVisible: 1, numScroll: 1 },
    { breakpoint: "426px", numVisible: 1, numScroll: 1 },
  ];

  const path = [
    { label: "Home", url: "/" },
    { label: "Sobre Nós", url: "/sobrenos" },
  ];

  const getImagens = async () => {
    try {
      const response = await api.get("/galerias?populate=*&pagination[limit]=6");
      console.log(response.data.data[0].imagens);
      const formattedData = response.data.data[0].imagens.map((item) => (item?.url ? `${import.meta.env.VITE_URL}${item.url}` : `${import.meta.env.PLACEHOLDER_URL}/400`));
      console.log(formattedData);
      setImagens(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

    const itemTemplate = (item) => {
    return (
      <div 
        className="cursor-pointer border-round-xl mx-2 overflow-hidden" 
        style={{ height: '300px', width: '100%' }} // ALTURA FIXA É ESSENCIAL AQUI
        onClick={() => {
          setSelectedImage(item);
          setVisibleDialog(true);
        }}
      >
        <img 
          src={item} 
          alt="Instalação" 
          className="w-full h-full block" 
          style={{ objectFit: 'cover' }} // Garante que a imagem encha o espaço sem distorcer
        />
      </div>
    );
  };

  useEffect(() => {
    getImagens();
  }, []);

  return (
    <section>
      <div className="px-5">
        <PageTitle titulo="Sobre Nós" caminho={path} />
        <TabView>
          <TabPanel
            header="Quem Somos"
            leftIcon={() => (
              <div className="mt-1 pr-2">
                <FaUser />
              </div>
            )}
          >
            <div className={`grid align-items-start pr-3`}>
              <div className={`${width < 769 ? "col-12" : "col-6"}`}>
                <h3 style={{ color: "var(--primary-color)" }}>Bem-vindo ao Círculo Militar da Praia Vermelha</h3>
                <p style={{ fontFamily: "var(--font-family-suport)" }}>O Circulo Militar da Praia Vermelha, ou simplesmente O CÍRCULO, como é carinhosamente conhecido, foi fundado em 8 de março de 1957, por iniciativa dos alunos da Escola de Comando e Estado-Maior do Exército (ECEME).</p>

                <p style={{ fontFamily: "var(--font-family-suport)" }}>O major de Intendência Carlos Vanário, oficial-aluno à época, teve destacada atuação para a concretização deste ato. O curso de Comando e Estado-Maior era realizado em 3 (três) anos e a primeira diretoria do clube foi composta por alunos do 2° ano, dentre eles, os tenentes coronéis Rocca Diegues e Lauro Pie, além dos majores Otto Pio Fonseca, Ítalo Mandarino e Sylvio Torraca.</p>

                <p style={{ fontFamily: "var(--font-family-suport)" }}>A ECEME colaborou ativamente com a implantação do Círculo, criando sólidos laços que, cultivados permanentemente, fazem do clube uma extensão natural da Escola de mais alto nível de nosso Exército. Quando de sua criação, o clube foi instalado no 14° andar do Edifício da Praia Vermelha (EPV), transferindo-se para sua sede atual no período de 1965/ 1966, após negociações com a Prefeitura do Rio de Janeiro.</p>

                <p style={{ fontFamily: "var(--font-family-suport)" }}>O local da nossa sede abrigava, inicialmente, o Salão Casa Blanca, uma das mais famosas casas noturnas da capital fluminense. Posteriormente, sediou a Escola de Belas Artes do Rio de Janeiro. Tais registros históricos se fazem presentes até os dias atuais pela designação dos salões Casa Blanca e Belas Artes, como forma de homenagear nossa história.</p>

                <p style={{ fontFamily: "var(--font-family-suport)" }}>Assim, emoldurado pelo mais belo cartão postal da cidade, o Círculo destaca-se como a melhor opção de lazer e cultura para as famílias do entorno da Urca.</p>
              </div>
              <div className={`mt-1 ${width < 769 ? "col-12" : "col-6"} max-w-30`}>
                <div className="">
                  <h3 style={{ color: "var(--primary-color)" }}>Missão</h3>
                  <p style={{ fontFamily: "var(--font-family-suport)" }}>Proporcionar bem-estar aos associados do CMPV nas atividades esportivas, sociais e culturais, oferecendo uma estrutura com qualidade e segurança.</p>
                </div>
                <div>
                  <h3 style={{ color: "var(--primary-color)" }}>Visão</h3>
                  <p style={{ fontFamily: "var(--font-family-suport)" }}>Ser referencia como clube, procurando inovar, no intuito de apresentar uma eficiente e eficaz opção de lazer aos seus associados.</p>
                </div>
                <div>
                  <h3 style={{ color: "var(--primary-color)" }}>Valores</h3>
                  <p style={{ fontFamily: "var(--font-family-suport)" }}>Responsabilidade, Probidade, Camaradagem, Zelo, Disciplina, Lealdade</p>
                </div>
                <div>
                  <h3 className="mb-3" style={{ color: "var(--primary-color)" }}>
                    Localização
                  </h3>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.869173844103!2d-43.16804672504368!3d-22.955044739596886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99801a67b5eb6b%3A0xeddf40c5d68ff46f!2sPra%C3%A7a%20General%20Tib%C3%BArcio!5e0!3m2!1spt-BR!2sbr!4v1745093990652!5m2!1spt-BR!2sbr" width={width < 427 ? "210" : "600"} height="150" style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex="0" loading="lazy" />
                </div>
              </div>
            </div>
            <div>
              <h3>Ex-Presidentes do Círculo</h3>
              <div className="grid align-items-center" style={{ fontFamily: "var(--font-family-suport)" }}>
                <ul className={`${width < 426 ? "col-12" : width < 769 ? "col-6" : "col-2"} list-none`}>
                  <li>1986 – Cel Ayres</li>
                  <li>1987 – Cel Henrique</li>
                  <li>1988 – Cel Praciano</li>
                  <li>1989 – TC Avena</li>
                  <li>1990 – TC Kihara</li>
                  <li>1991 – TC Higino</li>
                  <li>1992 – TC Boson</li>
                </ul>
                <ul className={`${width < 426 ? "col-12" : width < 769 ? "col-6" : "col-2"} list-none`}>
                  <li>1994 – TC Macedo / TC Rachevsky</li>
                  <li>1995 – Cel Peres</li>
                  <li>1998 – Cel Macedo</li>
                  <li>2000 – Cel Henrique</li>
                  <li>2002 – Cel Melo</li>
                  <li>2004 – Cel Pastori</li>
                </ul>
                <ul className={`${width < 426 ? "col-12" : width < 769 ? "col-6" : "col-2"} list-none`}>
                  <li>2007 – Cel Sampaio</li>
                  <li>2008 – Cel Elias</li>
                  <li>2009 – Cel Marco Antônio</li>
                  <li>2010 – Cel Burke</li>
                  <li>2011 – Cel Lício</li>
                  <li>2012 – Cel Frazão</li>
                  <li>2013 – Cel Paulo Sérgio</li>
                </ul>
                <ul className={`${width < 426 ? "col-12" : width < 769 ? "col-6" : "col-2"} list-none`}>
                  <li>2014 – Cel Melo</li>
                  <li>2015 – Cel Narcizo</li>
                  <li>2016 – Cel Bessa</li>
                  <li>2017 – Cel Morgado</li>
                  <li>2018 – Cel Nelson</li>
                  <li>2019 – Cel Moussallem</li>
                  <li>2020 – Cel Sassone</li>
                </ul>
                <ul className={`${width < 426 ? "col-12" : width < 769 ? "col-6" : "col-2"} list-none`}>
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
            leftIcon={() => (
              <div className="mt-1 pr-2">
                <FaBuilding />
              </div>
            )}
          >
            <div>
              <Carousel
                value={imagens}
                numVisible={3}
                numScroll={3}
                responsiveOptions={responsiveOptions}
                style={{ width: width >= 1024 ? "97%" : "90%" }}
                itemTemplate={itemTemplate}
                showNavigators={width >= 768}
                showIndicators={false}
                circular
                autoplayInterval={3000}
                draggable
              />
            </div>
          </TabPanel>
        </TabView>
      </div>
      <ImgDialog visible={visibleDialog} onclose={() => setVisibleDialog(false)} imgSelected={selectedImage} />
    </section>
  );
};

export default About;
