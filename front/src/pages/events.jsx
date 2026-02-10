import EventosDisplay from "../components/sections/events/eventosDisplay";
import PageTitle from "../components/designSystem/pageTitle";

const Events = () => {
  const path = [
    { label: "Home", url: "/" },
    { label: "Eventos", url: "/eventos" },
  ];

  return (
    <div className="">
      <div className="mx-5">
        <PageTitle titulo="Eventos" caminho={path} />
      </div>
      <div className="mx-5 mb-3">
        <EventosDisplay />
      </div>
    </div>
  );
};

export default Events;
