import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import '../../assets/css/calendar.css';

const Calendar = ({ events }) => {
  const [height, setHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const OFFSET_DESKTOP = 180;
  const OFFSET_MOBILE = 120;

  const calcularLayout = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setHeight(window.innerHeight - (mobile ? OFFSET_MOBILE : OFFSET_DESKTOP));
  };

  useEffect(() => {
    calcularLayout();
    window.addEventListener("resize", calcularLayout);
    return () => window.removeEventListener("resize", calcularLayout);
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      eventClick={(info) => navigate(`/eventos/${info.event.id}`)}
      events={events}
      locale="pt-br"
      height={height}
      dayMaxEvents
      headerToolbar={{
        left: "prev next today",
        center: "title",
        right: isMobile ? "" : "dayGridMonth,timeGridWeek,timeGridDay",
      }}
    />
  );
};

export default Calendar;
