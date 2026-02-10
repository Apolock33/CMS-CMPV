import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import { formatarData } from "../../../utils/funcoes";

const NewsBlock = ({ newsInfos }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-column align-items-center px-5 mt-3">
      <Card key={newsInfos[0].id} className="col-12 md:col-6 lg:col-4 p-0 border-round-xl mb-4" onClick={() => navigate("/noticias/" + newsInfos[0].documentId)}>
        <div className="relative border-round-xl overflow-hidden h-20rem">
          <img src={newsInfos[0].capa} alt={newsInfos[0].titulo} className="w-full h-full object-cover" />
        </div>
      </Card>
      <div className="flex flex-column align-items-center text-center">
        <h2>{newsInfos[0].titulo}</h2>
        <p>Publicado em: {formatarData(newsInfos[0].publicado_em)}</p>
      </div>
      <div className="grid mt-5 justify-content-center">
        {newsInfos.map((news) => (
          <div key={news.id} className="col-12 md:col-6 lg:col">
            <Card className="p-0 border-round-xl" onClick={() => navigate("/noticias/" + news.documentId)}>
              <div className="relative border-round-xl overflow-hidden h-16rem">
                <img src={news.capa} alt={news.titulo} className="w-full h-full object-cover" />
              </div>
            </Card>
            <div className="flex flex-column align-items-center text-center mt-4">
              <h2>{news.titulo}</h2>
              <p>Publicado em: {formatarData(news.publicado_em)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsBlock;
