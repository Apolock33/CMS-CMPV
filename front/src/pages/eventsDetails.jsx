import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/globalContext';
import { useParams } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import PageTitle from '../components/designSystem/pageTitle';
import { api } from '../services/api';
import Spinner from '../components/designSystem/Spinner';
import { formatarData, formatarDataHora } from '../utils/funcoes';

const EventsDetails = () => {
    const [eventsItem, setEventsItem] = useState(null);
    const { width } = useWindowSize();
    const { id } = useParams();
    const [carregando, setCarregando] = useState(false);

    const getEvent = async () => {
        try {
            setCarregando(true);
            const response = await api.get(`/eventos/${id}?populate=*`);
            const resposta = response.data.data;
            const dadosFormatados = {
                ...resposta,
                publicado_em: formatarDataHora(resposta.postado_em),
                capa: `${import.meta.env.VITE_URL}${resposta.capa.url}`,
            };
            setEventsItem(dadosFormatados);
        } catch (error) {
            console.error("Error fetching event:", error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        getEvent();
    }, []);

    const path = [
        { label: 'Home', url: '/' },
        { label: 'Eventos', url: '/eventos' },
        { label: `${eventsItem?.titulo}`, url: `/eventos/${id}` }
    ];

    return (
        <section>
            <div className='px-5 mt-3'>
                <PageTitle titulo={eventsItem?.titulo} caminho={path} />
                <p className='my-0'>Data da Postagem: {eventsItem?.publicado_em}</p>
                <Spinner carregando={carregando}>
                <div className={`flex ${width < 769 ? 'flex-column' : 'justify-content-between'} gap-3 my-4`}>
                    <div className="flex flex-column gap-3 w-full md:w-8 lg:w-6 xl:w-4">
                        <img src={eventsItem?.capa} alt={eventsItem?.titulo} className="w-full h-auto" />
                    </div>
                    <div className="flex flex-column w-full md:w-8 lg:w-6 xl:w-8">
                        <h1 style={{ color: 'var(--primary-color)' }}>Informações:</h1>
                        <p style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>{eventsItem?.descricao}</p>
                    </div>
                </div>
                </Spinner>
            </div>
        </section>
    )
}

export default EventsDetails