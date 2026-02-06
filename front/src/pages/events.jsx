import PageTitle from "../components/designSystem/pageTitle";
import Calendar from "../components/designSystem/calendar";

const Events = () => {
  const path = [
    { label: "Home", url: "/" },
    { label: "Eventos", url: "/eventos" },
  ];

  const eventos = [
    {
      id: 1,
      title: "Evento 1",
      start: "2026-01-23",
      end: "2026-01-23",
    },
    {
      id: 2,
      title: "Evento 2",
      start: "2026-01-24",
      end: "2026-01-24",
    },
  ];

  return (
    <div className="">
      <div className="mx-5">
        <PageTitle titulo="Eventos" caminho={path} />
      </div>
      <div className="mx-5 mb-3">
        <Calendar events={eventos}/>
      </div>
    </div>
  );
};

export default Events;
