import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../contexts/globalContext';
import { BreadCrumb } from 'primereact/breadcrumb';
import useWindowSize from '../hooks/useWindowSize';

const NewsDetails = () => {
    const { width } = useWindowSize();
    const { id } = useParams();
    const { newsInfos } = useContext(GlobalContext);
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        const item = newsInfos.find(news => news.id === parseInt(id));
        setNewsItem(item);
        console.log(newsItem);
    }, [newsItem]);

    const breadcrumbItems = [
        { label: 'Home', url: '/' },
        { label: `${newsItem?.title}`, url: `/novidades/${id}` }
    ];

    return (
        <section>
            <div className='p-6'>
                <div className={`flex ${width < 769 ? 'flex-column' : 'align-items-center justify-content-between'} gap-3`}>
                    {width < 769 ? (
                        <>
                            <BreadCrumb model={breadcrumbItems} className='border-none text-medium' />
                            <h1 className="text-3xl font-bold p-0" style={{ color: 'var(--primary-color)' }}>{newsItem?.title}</h1>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold p-0" style={{ color: 'var(--primary-color)' }}>{newsItem?.title}</h1>
                            <BreadCrumb model={breadcrumbItems} className='border-none text-medium' />

                        </>
                    )}
                </div>
                <p>Data da Postagem: {newsItem?.description}</p>

                <div className={`flex ${width < 769 ? 'flex-column' : 'justify-content-between'} gap-3 mt-4`}>
                    <div className="flex flex-column gap-3 w-full md:w-8 lg:w-6 xl:w-4">
                        <img src={newsItem?.imageUrl} alt={newsItem?.title} className="w-full h-auto" />
                    </div>
                    <div className="flex flex-column w-full md:w-8 lg:w-6 xl:w-8">
                        <h1 style={{ color: 'var(--primary-color)' }}>Informações:</h1>
                        <p style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>{newsItem?.info}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsDetails