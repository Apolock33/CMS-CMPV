import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";

const NewsBlock = ({ newsInfos }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-column align-items-center">
      <Card key={newsInfos[0].id} className="col-12 md:col-6 lg:col-4 p-0 border-round-xl mb-4" onClick={() => navigate("/noticias/" + newsInfos[0].id)}>
        <div className="relative border-round-xl overflow-hidden h-20rem">
          <img src={newsInfos[0].imageUrl} alt={newsInfos[0].title} className="w-full h-full object-cover" />
        </div>
      </Card>
      <div className="flex flex-column align-items-center text-center">
        <h2>{newsInfos[0].title}</h2>
        <p>Publicado em: {newsInfos[0].description}</p>
      </div>
      <div className="grid px-5 mt-5 justify-content-center">
        {newsInfos.map((news) => (
          <div key={news.id} className="col-12 md:col-6 lg:col-4">
            <Card className="p-0 border-round-xl" onClick={() => navigate("/noticias/" + news.id)}>
              <div className="relative border-round-xl overflow-hidden h-16rem">
                <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
              </div>
            </Card>
            <div className="flex flex-column align-items-center text-center mt-4">
              <h2>{news.title}</h2>
              <p>Publicado em: {news.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsBlock;
