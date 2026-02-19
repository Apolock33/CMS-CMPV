import { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import { api } from "../../../services/api";
import CarouselDialog from "../../../components/carouselDialog";
import useWindowSize from "../../../hooks/useWindowSize";

const Rents = () => {
  const { width } = useWindowSize();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [spaces, setSpaces] = useState([]);

  const getImages = async () => {
    try {
      const response = await api.get("/recursos?populate=*");
      const rawData = response.data.data;
      const formattedData = rawData
        .filter((item) => item.imagem !== null)
        .map((item) => {
          const imageObj = item.imagem;
          const imageUrl = imageObj?.url ? `${import.meta.env.VITE_URL}${imageObj.url}` : "https://via.placeholder.com/400";
          return { id: item.id, itemImageSrc: imageUrl, title: item.nome, gallery: item.galeria };
        });
      setSpaces(formattedData);
    } catch (error) {
      console.log("Erro ao buscar recursos:", error);
    }
  };

  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 2, numScroll: 1 },
    { breakpoint: "768px", numVisible: 1, numScroll: 1 },
    { breakpoint: "426px", numVisible: 1, numScroll: 1 },
  ];

  useEffect(() => {
    getImages();
  }, []);

  const itemTemplate = (item) => {
    return (
      <div
        className="cursor-pointer relative overflow-hidden border-round-xl mx-2 w-full"
        style={{ aspectRatio: "4/3" }}
        onClick={() => {
          setSelectedImage(item);
          setVisibleDialog(true);
        }}
      >
        <img src={item.itemImageSrc} alt={item.title} className="w-full h-full border-round-xl object-cover" />
        <div className="absolute bottom-0 left-0 w-full text-white" style={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(2px)", padding: "0.5rem 1rem" }}>
          <h3 className="m-0 text-lg font-bold">{item.title}</h3>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-4 px-6">
        <h1 className="text-3xl font-bold" style={{ color: "var(--primary-color)" }}>
          Aluguel de Espaços
        </h1>
      </div>
      <div className="px-6 font-medium" style={{ fontFamily: "var(--font-family-suport)" }}>
        <p>POR QUE FAZER SEU EVENTO NO CÍRCULO MILITAR?</p>
        <p>Segurança, qualidade, excelente atendimento, amplos salões e parceiros ideais são os atributos que fazem do Círculo Militar o lugar ideal para a realização do seu evento.</p>
        <p>Com fácil acesso e uma localização privilegiada na Zona Sul do Rio de Janeiro, mais precisamente na Praia Vermelha, com vista para o Morro da Urca e para o Pão de Açúcar, o Círculo Militar oferece comodidade e praticidade aos seus convidados, além de contar com uma ótima infraestrutura, diversão, cultura e lazer.</p>
        <p>Entre em contato através do e-mail: eventos@cmpv.com.br ou se preferir, ligue para (21) 2295-3397 Ramal 22 ou Whatsapp (21) 99292-8614</p>
        <p>Horário de Atendimento: Segunda à Sexta: 9h às 18 h</p>
        <p className="text-lg">Clique nos cards para mais informações</p>
      </div>
      <div className="px-3 md:px-6">
        <Carousel value={spaces} numVisible={width >= 1024 ? 3 : width >= 768 ? 2 : 1} numScroll={1} responsiveOptions={responsiveOptions} style={{ width: "100%" }} itemTemplate={itemTemplate} showNavigators={width >= 768} showIndicators circular draggable />
      </div>
      <CarouselDialog visible={visibleDialog} onClose={() => setVisibleDialog(false)} initialImage={selectedImage} images={selectedImage?.gallery} />
    </div>
  );
};

export default Rents;
