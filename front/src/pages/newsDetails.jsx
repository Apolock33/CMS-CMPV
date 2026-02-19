import { useEffect, useState } from "react";
import { formatarData } from "../utils/funcoes";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import useWindowSize from "../hooks/useWindowSize";
import PageTitle from "../components/designSystem/pageTitle";
import Spinner from "../components/designSystem/Spinner";

const NewsDetails = () => {
  const { width } = useWindowSize();
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState({});
  const [carregando, setCarregando] = useState(true);

  const getNews = async () => {
    try {
      setCarregando(true);
      const response = await api.get(`/noticias/${id}?populate=*`);
      const resposta = response.data.data;
      const dadosFormatados = {
        id: resposta.documentId,
        titulo: resposta.titulo,
        subTitulo: resposta.subTitulo,
        capa: `${import.meta.env.VITE_URL}${resposta.capa.url}`,
        publicado_em: resposta.postado_em,
        conteudo: resposta.descricao,
      };
      setNewsItem(dadosFormatados);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const path = [
    { label: "Home", url: "/" },
    { label: "Notícias", url: "/noticias" },
    { label: newsItem?.titulo, url: `/noticias/${id}` },
  ];

  return (
    <section>
      <div className="px-5">
        <div>
          <PageTitle titulo={newsItem?.titulo} caminho={path} />
          <p className="mt-0">Data da Postagem: {formatarData(newsItem?.publicado_em)}</p>
        </div>
        <Spinner carregando={carregando}>
          <div className={`flex ${width < 769 ? "flex-column" : "justify-content-between"} gap-3 my-4`}>
            <div className="flex flex-column gap-3 w-full md:w-8 lg:w-6 xl:w-4">
              <img src={newsItem?.capa} alt={newsItem?.titulo} className="w-full h-auto" />
            </div>
            <div className="flex flex-column w-full md:w-8 lg:w-6 xl:w-8">
              <h1 style={{ color: "var(--primary-color)" }}>Informações:</h1>
              <p style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>{newsItem?.conteudo}</p>
            </div>
          </div>
        </Spinner>
      </div>
    </section>
  );
};

export default NewsDetails;
