import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useWindowSize from "../../../hooks/useWindowSize";
import { api } from "../../../services/api";

const HomeNews = () => {
  const [newsInfos, setNewsInfos] = useState([]);
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const getNews = async () => {
    try {
      const limit = width < 768 ? 4 : 6;
      const response = await api.get("/noticias?populate=*&pagination[limit]=" + limit);
      const formattedData = response.data.data.map((item) => ({
        ...item,
        capa: item.capa?.url ? `${import.meta.env.VITE_URL}${item.capa.url}` : `${import.meta.env.PLACEHOLDER_URL}/400`,
      }));
      setNewsInfos(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="p-4">
      <div className="flex gap-3 align-items-center justify-content-between mb-4">
        <h1 className="text-3xl font-bold" style={{ color: "var(--primary-color)" }}>
          Noticias
        </h1>
        <Link to="/noticias" className="flex align-items-center no-underline gap-2 font-medium" style={{ color: "var(--primary-color)", fontFamily: "var(--font-family-suport)" }}>
          Veja Mais
          <FaArrowRight />
        </Link>
      </div>

      <div className={`${width < 768 ? "flex flex-column" : "grid"}`}>
        {newsInfos.map((card) => (
          <motion.div key={card.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: card.id * 0.1 }} className={`col-12 md:col-6 xl:col-4 mb-3 cursor-pointer`} style={{ height: width < 769 ? "350px" : "400px" }} onClick={() => navigate("/noticias/" + card.documentId)}>
            <div className="relative overflow-hidden w-full h-full border-round-xl" style={{ borderRadius: "12px" }}>
              <motion.img src={card.capa} alt={card.titulo} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} />
              <div className="absolute bottom-0 left-0 w-full text-white px-4 py-3" style={{ background: "rgba(0, 0, 0, 0.6)", display: "flex", flexDirection: "column", justifyContent: "center", backdropFilter: "blur(2px)" }}>
                <h2 className="m-0 text-base font-bold mb-1">{card.titulo}</h2>
                <p className="m-0 text-sm">{card.subtitulo}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeNews;
