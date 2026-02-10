import { useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { useState } from "react";
import { api } from "../../../services/api";
import useWindowSize from "../../../hooks/useWindowSize";
import { formatarDataHora } from "../../../utils/funcoes";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import Spinner from "../../designSystem/Spinner";

const EventosDisplay = () => {
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [eventsInfos, setEventsInfos] = useState([]);
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const responsiveOptions = [
    { breakpoint: "1400px", numVisible: 2, numScroll: 1 },
    { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
    { breakpoint: "767px", numVisible: 2, numScroll: 1 },
    { breakpoint: "575px", numVisible: 1, numScroll: 1 },
  ];

  const getEvents = async () => {
    try {
      const response = await api.get("/eventos?populate=*");
      console.log(response.data.data);
      const formattedData = response.data.data.map((item) => ({
        ...item,
        capa: item.capa?.url ? `${import.meta.env.VITE_URL}${item.capa.url}` : `${import.meta.env.PLACEHOLDER_URL}/400`,
        publicado_em: formatarDataHora(item.postado_em),
      }));
      setEventsInfos(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const enventosTemplate = (evento) => {
    return (
      <motion.div key={evento.id} className="w-full max-w-25rem cursor-pointer" style={{ height: width < 768 ? "100px" : "155px" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/eventos/" + evento.documentId)}>
        <div className="w-full overflow-hidden border-round-xl shadow-1 bg-white">
          <div className="flex h-full justify-content-start align-items-center">
            <img src={evento.capa} alt={evento.titulo} style={{ width: width < 768 ? "100px" : "150px", height: width < 768 ? "100px" : "150px", objectFit: "cover", flexShrink: 0 }} />
            <div className="flex flex-column justify-content-center px-3 w-70 h-full">
              <h2 className="text-lg font-semibold mb-1">{formatarDataHora(evento.data_inicio)}</h2>
              <p className={`text-color-secondary m-0 ${width < 768 ? "text-sm" : "text-xl"}`}>{evento.titulo}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const DetalhesEvento = () => {
    return (
      <div className="p-4 fadein animation-duration-300">
        <Card className="shadow-2 border-round-xl">
          <div className="grid gap-4">
            <div className="col-12 md:col">
              <img src={selectedEvento.capa} alt={selectedEvento.titulo} className="px-3 py-2 w-full h-8" style={{ maxHeight: "50rem", objectFit: "cover", borderRadius: "5%" }} />
            </div>
            <div className="col-12 md:col flex flex-column justify-content-between">
              <div>
                <div className="mb-4">
                  <h1 className="text-3xl mt-0">{selectedEvento.titulo}</h1>
                  <b className=" mb-1">Postado Em: {formatarDataHora(selectedEvento.publicado_em)}</b>
                  
                </div>
                <div className="mb-4">
                  <h3 className="mb-1">Descrição:</h3>
                  <b className="mb-1">Início do Evento: {formatarDataHora(selectedEvento.data_inicio)}</b>
                  <br />
                  <b className="mb-1">Fim do Evento: {formatarDataHora(selectedEvento.data_fim)}</b>
                  <br />
                  <br />
                  <p className="m-0">{selectedEvento.descricao || "Sem descrição disponível."}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (eventsInfos.length > 0 && !selectedEvento) {
      setSelectedEvento(eventsInfos[0]);
    }
  }, [eventsInfos, selectedEvento]);

  return (
    <div>
      {width < 1024 ? (
        <div>
          <Carousel value={eventsInfos} circular numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} itemTemplate={enventosTemplate} orientation="vertical" />
        </div>
      ) : (
        <Spinner carregando={!selectedEvento}>
          <div className="grid align-items-center">
            <div className="col-12 md:col-4 lg:col-3">
              <div className="p-4">
                <div className="border-1 border-round-xl overflow-y-scroll max-h-30rem" style={{ borderColor: "#c6c6c6ff" }}>
                  {eventsInfos.map((evento) => (
                    <div key={evento.id} className={`p-4 cursor-pointer transition-colors transition-duration-200 border-round-xl`} onClick={() => setSelectedEvento(evento)} style={{ background: `${selectedEvento?.id === evento.id ? "#c6c6c6ff" : ""}` }}>
                      <div className="flex flex-column">
                        <span className="font-medium text-900 block text-lg">{evento.titulo}</span>
                        <span className="text-600 text-sm">{formatarDataHora(evento.data_inicio)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 md:col-8 lg:col-9">{selectedEvento && <DetalhesEvento />}</div>
          </div>
        </Spinner>
      )}
    </div>
  );
};

export default EventosDisplay;
