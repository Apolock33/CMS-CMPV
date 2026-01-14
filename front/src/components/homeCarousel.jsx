import React, { useContext } from 'react'
import { Galleria } from 'primereact/galleria';
import Img1 from '../assets/imgs/general/bondinho.jpg'
import Img2 from '../assets/imgs/general/clube_cmpv.jpg'
import Img3 from '../assets/imgs/general/frente.jpg'
import Img4 from '../assets/imgs/general/slide10.jpg'
import Img5 from '../assets/imgs/general/SLIDE13.jpg'
import Img6 from '../assets/imgs/general/vista-praia-lateral.jpg'
import { GlobalContext } from '../contexts/globalContext';

const HomeCarousel = () => {
    const {
        isMobile
    } = useContext(GlobalContext);

    const images = [
        {
            itemImageSrc: Img1,
            alt: 'Description for Image 1',
            title: 'Title 1'
        },
        {
            itemImageSrc: Img2,
            alt: 'Description for Image 2',
            title: 'Title 2'
        },
        {
            itemImageSrc: Img3,
            alt: 'Description for Image 3',
            title: 'Title 3'
        },
        {
            itemImageSrc: Img4,
            alt: 'Description for Image 4',
            title: 'Title 4'
        },
        {
            itemImageSrc: Img5,
            alt: 'Description for Image 5',
            title: 'Title 5'
        },
        {
            itemImageSrc: Img6,
            alt: 'Description for Image 6',
            title: 'Title 6'
        }
    ];

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '425px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item) => {
        return (
            <img src={item.itemImageSrc} alt={item.alt} style={{
                minWidth: '100%',
                minHeight: isMobile ? '40vh' : '60vh',
                objectFit: 'cover',
                objectPosition: 'center'
            }} />
        )
    }

    return (
        <Galleria
            value={images}
            responsiveOptions={responsiveOptions}
            numVisible={5}
            circular
            showItemNavigators
            showItemNavigatorsOnHover={!isMobile}
            draggable
            showIndicators
            item={itemTemplate}
            showThumbnails={false}
            className='w-full'
            style={{ width: '100vw' }}
            showIndicatorsOnItem={true} />
    )
}

export default HomeCarousel