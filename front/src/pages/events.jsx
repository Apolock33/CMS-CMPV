import { useState } from "react";
import PageTitle from "../components/designSystem/pageTitle";
import Spinner from "../components/designSystem/Spinner";

const Events = () => {
  const [carregando, setCarregando] = useState(true);
  const [newsInfos, setNewsInfos] = useState([]);

  const path = [
    { label: "Home", url: "/" },
    { label: "Eventos", url: "/eventos" },
  ];

  return (
    <div className="">
      <div className="mx-5">
        <PageTitle titulo="Eventos" caminho={path} />
      </div>
      {/* <Spinner carregando={carregando}><NewsBlock newsInfos={newsInfos} /></Spinner> */}
    </div>
  );
};

export default Events;
