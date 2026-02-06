import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/globalContext';
import { useParams } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import PageTitle from '../components/designSystem/pageTitle';

const EventsDetails = () => {
    const [eventsItem, setEventsItem] = useState(null);
    const { eventsInfos } = useContext(GlobalContext);
    const { width } = useWindowSize();
    const { id } = useParams();

    useEffect(() => {
        const item = eventsInfos.find(events => events.id === parseInt(id));
        setEventsItem(item);
    }, [eventsItem]);

    const path = [
        { label: 'Home', url: '/' },
        { label: 'Eventos', url: '/eventos' },
        { label: `${eventsItem?.title}`, url: `/eventos/${id}` }
    ];

    return (
        <section>
            <div className='px-5 mt-3'>
                <PageTitle titulo={eventsItem?.title} caminho={path} />
                <p>Data da Postagem: {eventsItem?.date}</p>

                <div className={`flex ${width < 769 ? 'flex-column' : 'justify-content-between'} gap-3 mt-4`}>
                    <div className="flex flex-column gap-3 w-full md:w-8 lg:w-6 xl:w-4">
                        <img src={eventsItem?.img} alt={eventsItem?.title} className="w-full h-auto" />
                    </div>
                    <div className="flex flex-column w-full md:w-8 lg:w-6 xl:w-8">
                        <h1 style={{ color: 'var(--primary-color)' }}>Informações:</h1>
                        <p style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>{eventsItem?.info}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventsDetails