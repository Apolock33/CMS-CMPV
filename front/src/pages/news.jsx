import { useEffect, useState } from "react";
import { api } from "../services/api";
import PageTitle from "../components/designSystem/pageTitle";
import NewsBlock from "../components/sections/news/newsBlock";
import Spinner from "../components/designSystem/Spinner";

const News = () => {
  const [carregando, setCarregando] = useState(false);
  const [newsInfos, setNewsInfos] = useState([]);

  const path = [
    { label: "Home", url: "/" },
    { label: "Notícias", url: "/noticias" },
  ];

  const getNews = async () => {
    try {
      setCarregando(true);
      const response = await api.get("/noticias?populate=*");
      const dadosFormatados = response.data.data.map((item) => {
        return { ...item, id: item.id - 1, capa: `${import.meta.env.VITE_URL}${item.capa.url}`, publicado_em: item.postado_em };
      });
      setNewsInfos(dadosFormatados);
    } catch (error) {
      console.log(error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="">
      <div className="mx-5">
        <PageTitle titulo="Notícias" caminho={path} />
      </div>
      <Spinner carregando={carregando}>{newsInfos.length > 0 && <NewsBlock newsInfos={newsInfos} />}</Spinner>
    </div>
  );
};

export default News;
