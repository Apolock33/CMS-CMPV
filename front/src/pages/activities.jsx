import { BreadCrumb } from "primereact/breadcrumb";
import { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import activity1 from "../assets/imgs/general/atividades/basquete.jpg";
import activity2 from "../assets/imgs/general/atividades/futebol.jpg";
import activity3 from "../assets/imgs/general/atividades/pilates.jpg";
import activity4 from "../assets/imgs/general/atividades/natacao.jpg";
import activity5 from "../assets/imgs/general/atividades/judo.jpg";
import ImgDialog from "../components/imgDialogActivities";
import PageTitle from "../components/designSystem/pageTitle";
import Spinner from "../components/designSystem/Spinner";
import { api } from "../services/api";

const Activities = () => {
  const { width } = useWindowSize();
  const [openImg, setOpenImg] = useState(false);
  const [selectedImg, setSelectedImg] = useState({});
  const [activities, setActivities] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const getActivities = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/atividades?populate=*");
      const dadosFormatados = response.data.data.map((item) => {
        return {
          id: item.id,
          capa: `${import.meta.env.VITE_URL}${item.capa[0].url}`,
          nome: item.nome,
          descricao: item.descricao,
          contato: item.contato,
        };
      });
      setActivities(dadosFormatados);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setCarregando(false);
    }
  };

  const path = [
    { label: "Home", url: "/" },
    { label: "Atividades", url: "/atividades" },
  ]

  const handleImageClick = (img) => {
    setSelectedImg(img);
    setOpenImg(true);
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <section>
      <div className="mx-5">
        <div className={`${width < 769 ? "flex flex-column" : "flex align-items-center justify-content-between"} px-1`}>
          <PageTitle titulo="Atividades" caminho={path} />
        </div>
          <div className="text-start max-w-full mx-1 ">
            <p style={{ fontFamily: "var(--font-family-suport)" }}>
              A prática esportiva promove inúmeros benefícios, como redução dos riscos de doenças, melhora na formação do corpo, diminuição do estresse e do nível de ansiedade, melhora da coordenação motora, proteção dos ossos e das articulações, e manutenção de uma vida saudável.
              <br />
              <br />
              É fundamental a prática de atividade física da infância até o envelhecimento. Não existe exercício ideal, é preciso respeitar a individualidade, o desejo, prazer e a aptidão física.
              <br />
              <br />
              AS INFORMAÇÕES SOBRE AS ATIVIDADES DO CÍRCULO MILITAR NÃO SÃO DE RESPONSABILIDADE DA SECRETARIA E DEVEM TRATADAS DIRETAMENTE COM CADA PROFESSOR(A).
              <br />
              <br />
              ESCOLHA A MODALIDADE ESPORTIVA ABAIXO PARA VISUALIZAR O CONTATO DO PROFESSOR(A) E OS HORÁRIOS DE AULAS DISPONÍVEIS.
            </p>
          </div>
        <Spinner carregando={carregando}>
          <div className="grid gap-4 justify-content-center my-6" style={{ display: "grid", gridTemplateColumns: width > 1024 ? "repeat(3, 1fr)" : width > 768 ? "repeat(2, 1fr)" : "repeat(1, 1fr)", justifyItems: "center" }}>
            {activities.map((item) => (
              <div key={item.id} className="relative cursor-pointer overflow-hidden border-round-xl" style={{ width: width >= 1024 ? "350px" : "300px", height: width >= 1024 ? "400px" : "350px" }} onClick={() => handleImageClick(item)}>
                <img src={item.capa} alt={item.nome} className="w-full h-full object-cover border-round-xl" />
                <div className="absolute bottom-0 left-0 w-full text-white" style={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(2px)", padding: "0.5rem 1rem" }}>
                  <h3 className="m-0 text-lg font-bold">{item.nome}</h3>
                </div>
              </div>
            ))}
          </div>
        </Spinner>
      </div>
      <ImgDialog visible={openImg} onclose={() => setOpenImg(false)} imgSelected={selectedImg} />
    </section>
  );
};

export default Activities;
