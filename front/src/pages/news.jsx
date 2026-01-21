import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/globalContext";
import { api } from "../services/api";
import PageTitle from "../components/designSystem/pageTitle";
import NewsBlock from "../components/newsBlock";
import Spinner from "../components/designSystem/Spinner";

const News = () => {
  const [carregando, setCarregando] = useState(false);
  const [newsBlock, setNewsBlock] = useState([]);
  // const [newsInfos, setNewsInfos] = useState([]);
  const { newsInfos } = useContext(GlobalContext);

  const path = [
    { label: "Home", url: "/" },
    { label: "Notícias", url: "/noticias" },
  ];

  //   const getNews = async () => {
  //     try {
  //       setCarregando(true);
  //       const response = await api.get("http://localhost:3000/noticias");
  //       const data = await response.json();
  //       setNewsInfos(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setCarregando(false);
  //     }
  //   };

  //   useEffect(() => {
  //     getNews();
  //   }, []);

  return (
    <div className="">
      <div className="mx-5">
        <PageTitle titulo="Notícias" caminho={path} />
      </div>
      <Spinner carregando={carregando}>
        <NewsBlock newsInfos={newsInfos} />
      </Spinner>
    </div>
  );
};

export default News;
