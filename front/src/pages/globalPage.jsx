import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api.js";
import useWindowSize from "../hooks/useWindowSize.jsx";
import DynamicZone from "../components/DynamicZone";
import PageTitle from "../components/designSystem/pageTitle.jsx";
import Spinner from "../components/designSystem/Spinner.jsx";

const PageWrapper = () => {
  const [carregando, setCarregando] = useState(true);
  const [pageData, setPageData] = useState(null);
  const { width } = useWindowSize();
  const { slug } = useParams();

  const path = [
    { label: "Home", url: "/" },
    { label: pageData?.titulo, url: pageData?.slug }
  ];
  
  const fetchPage = async () => {
    try {
      setCarregando(true);
      const response = await api.get(`/paginas?slug=${slug}&populate[conteudo][populate]=*`);
      setPageData(response.data.data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [slug]);

  return (
    <Spinner carregando={carregando}>
      <div className="mx-5">
        <div className={`${width < 769 ? "flex flex-column" : "flex align-items-center justify-content-between"} px-1`}>
          <PageTitle titulo={pageData?.titulo} caminho={path} />
        </div>
        {pageData?.descricao && (
          <div className="text-start max-w-full mx-1 ">
            <p style={{ fontFamily: "var(--font-family-suport)" }}>
              {pageData?.descricao}
            </p>
          </div>
        )}
        <DynamicZone blocos={pageData?.conteudo} />
      </div>
      {/* {pageData && (
        <section className="page-hero">
          <h1>{pageData.Hero.Title}</h1>
          <p>{pageData.Hero.Description}</p>
        </section>
      )}
      <div className="page-content">
        <DynamicZone blocks={pageData.ContentArea} />
      </div> */}
    </Spinner>
  );
};

export default PageWrapper;
