import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/globalContext";
import { BreadCrumb } from "primereact/breadcrumb";
import { useParams } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import PageTitle from "../components/designSystem/pageTitle";

const NewsDetails = () => {
  const { width } = useWindowSize();
  const { id } = useParams();
  const { newsInfos } = useContext(GlobalContext);
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    const item = newsInfos.find((news) => news.id === parseInt(id));
    setNewsItem(item);
  }, [newsItem]);

  const path = [
    { label: "Home", url: "/" },
    { label: "Sobre Nós", url: "/sobrenos" },
  ];

  return (
    <section>
      <div className="px-5">
        <div>
          <PageTitle titulo={newsItem?.title} caminho={path} />
          <p className="mt-0">Data da Postagem: {newsItem?.postado_em}</p>
        </div>

        <div className={`flex ${width < 769 ? "flex-column" : "justify-content-between"} gap-3 mt-4`}>
          <div className="flex flex-column gap-3 w-full md:w-8 lg:w-6 xl:w-4">
            <img src={newsItem?.imageUrl} alt={newsItem?.title} className="w-full h-auto" />
          </div>
          <div className="flex flex-column w-full md:w-8 lg:w-6 xl:w-8">
            <h1 style={{ color: "var(--primary-color)" }}>Informações:</h1>
            <p style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>{newsItem?.info}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetails;
