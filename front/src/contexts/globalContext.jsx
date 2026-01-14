import React, { createContext, useEffect, useState } from 'react'
import useWindowSize from '../hooks/useWindowSize';
import useScrollDown from '../hooks/useScrollDown';
import news1 from '../assets/imgs/general/noticias/bailecmpv.jpg';
import news2 from '../assets/imgs/general/noticias/Comunicado-aos-socios.png';
import event1 from '../assets/imgs/general/torneiojudo.jpg';
import event2 from '../assets/imgs/general/bailefantasia.jpg';
import event3 from '../assets/imgs/general/premiacao.jpg';
import event4 from '../assets/imgs/general/domingodepascoa.jpg';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastScrollYValue, setLastScrollYValue] = useState(0);
    const [showSecondaryHeader, setShowSecondaryHeader] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(1);
    const { width } = useWindowSize();
    const { scrollY } = useScrollDown();

    useEffect(() => {
        if (width <= 1024) {
            setIsMobile(true);
        }

        if (width > 1024) {
            setIsMobile(false);
        }

        setTimeout(() => {
            setLastScrollYValue(scrollY);
        }, 1000);

        if (scrollY === 0) {
            setShowSecondaryHeader(true);
        }

        if (scrollY > 0 && scrollY >= 100) {
            setShowSecondaryHeader(false);
        }

        if (scrollY > 0 && scrollY >= 200) {
            setIsScrollingDown(true);
        }

        if (lastScrollYValue > scrollY) {
            setIsScrollingDown(false);
        }
    });

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location.pathname]);

    const newsInfos = [
        {
            id: 1,
            title: 'BAILE DE BOAS VINDAS ECEME E 68 ANOS DO CMPV',
            description: '03/04/2025',
            imageUrl: news1,
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at efficitur urna. Quisque iaculis lectus ex. Aenean fringilla porttitor nisl sit amet ornare. Pellentesque rhoncus cursus metus ac congue. Morbi efficitur semper orci, vel rutrum odio vehicula sed. Suspendisse varius ultricies justo a mattis. Nam eu ex ac quam laoreet vulputate. Fusce est justo, molestie a tempus at, finibus quis sem. Ut ullamcorper dolor augue, nec faucibus neque pellentesque nec. Vestibulum vestibulum mi sapien, ac posuere dolor commodo quis. In hac habitasse platea dictumst. Donec magna ligula, placerat quis tortor id, feugiat pulvinar felis.\n\nSuspendisse potenti. Quisque blandit augue ut urna dictum aliquam. Sed sit amet lorem facilisis orci tristique efficitur. Vestibulum euismod enim eu elit vestibulum, quis pretium leo fermentum. Sed faucibus ullamcorper gravida. Pellentesque sapien augue, scelerisque vitae lobortis eu, eleifend at nibh. Fusce ultrices sit amet nunc sed faucibus.\n\nSed et dictum nisl, a luctus augue. Cras ac ligula auctor, volutpat dui id, scelerisque massa. Nam congue mauris ut nisl congue lacinia. Nunc nisl velit, rhoncus nec turpis vitae, ornare finibus justo. Nulla facilisi. Quisque facilisis lectus nec placerat suscipit. Cras dictum orci eget erat mattis, sed efficitur massa posuere. Vestibulum ut velit nulla. Sed vehicula est nibh, vel maximus elit pellentesque et. Aenean ac vestibulum sem. Aliquam quis velit sagittis, ultrices augue vitae, cursus purus. Integer lobortis, dolor id ultrices molestie, turpis neque congue eros, at volutpat purus turpis a nulla.'
        },
        {
            id: 2,
            title: 'Aviso sobre o feriado da semana santa',
            description: '03/04/2025',
            imageUrl: news2,
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at efficitur urna. Quisque iaculis lectus ex. Aenean fringilla porttitor nisl sit amet ornare. Pellentesque rhoncus cursus metus ac congue. Morbi efficitur semper orci, vel rutrum odio vehicula sed. Suspendisse varius ultricies justo a mattis. Nam eu ex ac quam laoreet vulputate. Fusce est justo, molestie a tempus at, finibus quis sem. Ut ullamcorper dolor augue, nec faucibus neque pellentesque nec. Vestibulum vestibulum mi sapien, ac posuere dolor commodo quis. In hac habitasse platea dictumst. Donec magna ligula, placerat quis tortor id, feugiat pulvinar felis.\n\nSuspendisse potenti. Quisque blandit augue ut urna dictum aliquam. Sed sit amet lorem facilisis orci tristique efficitur. Vestibulum euismod enim eu elit vestibulum, quis pretium leo fermentum. Sed faucibus ullamcorper gravida. Pellentesque sapien augue, scelerisque vitae lobortis eu, eleifend at nibh. Fusce ultrices sit amet nunc sed faucibus.\n\nSed et dictum nisl, a luctus augue. Cras ac ligula auctor, volutpat dui id, scelerisque massa. Nam congue mauris ut nisl congue lacinia. Nunc nisl velit, rhoncus nec turpis vitae, ornare finibus justo. Nulla facilisi. Quisque facilisis lectus nec placerat suscipit. Cras dictum orci eget erat mattis, sed efficitur massa posuere. Vestibulum ut velit nulla. Sed vehicula est nibh, vel maximus elit pellentesque et. Aenean ac vestibulum sem. Aliquam quis velit sagittis, ultrices augue vitae, cursus purus. Integer lobortis, dolor id ultrices molestie, turpis neque congue eros, at volutpat purus turpis a nulla.'
        },
        {
            id: 3,
            title: 'Aviso sobre o feriado da semana santa',
            description: '03/04/2025',
            imageUrl: news2,
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at efficitur urna. Quisque iaculis lectus ex. Aenean fringilla porttitor nisl sit amet ornare. Pellentesque rhoncus cursus metus ac congue. Morbi efficitur semper orci, vel rutrum odio vehicula sed. Suspendisse varius ultricies justo a mattis. Nam eu ex ac quam laoreet vulputate. Fusce est justo, molestie a tempus at, finibus quis sem. Ut ullamcorper dolor augue, nec faucibus neque pellentesque nec. Vestibulum vestibulum mi sapien, ac posuere dolor commodo quis. In hac habitasse platea dictumst. Donec magna ligula, placerat quis tortor id, feugiat pulvinar felis.\n\nSuspendisse potenti. Quisque blandit augue ut urna dictum aliquam. Sed sit amet lorem facilisis orci tristique efficitur. Vestibulum euismod enim eu elit vestibulum, quis pretium leo fermentum. Sed faucibus ullamcorper gravida. Pellentesque sapien augue, scelerisque vitae lobortis eu, eleifend at nibh. Fusce ultrices sit amet nunc sed faucibus.\n\nSed et dictum nisl, a luctus augue. Cras ac ligula auctor, volutpat dui id, scelerisque massa. Nam congue mauris ut nisl congue lacinia. Nunc nisl velit, rhoncus nec turpis vitae, ornare finibus justo. Nulla facilisi. Quisque facilisis lectus nec placerat suscipit. Cras dictum orci eget erat mattis, sed efficitur massa posuere. Vestibulum ut velit nulla. Sed vehicula est nibh, vel maximus elit pellentesque et. Aenean ac vestibulum sem. Aliquam quis velit sagittis, ultrices augue vitae, cursus purus. Integer lobortis, dolor id ultrices molestie, turpis neque congue eros, at volutpat purus turpis a nulla.'
        },
        {
            id: 4,
            title: 'Aviso sobre o feriado da semana santa',
            description: '03/04/2025',
            imageUrl: news1,
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at efficitur urna. Quisque iaculis lectus ex. Aenean fringilla porttitor nisl sit amet ornare. Pellentesque rhoncus cursus metus ac congue. Morbi efficitur semper orci, vel rutrum odio vehicula sed. Suspendisse varius ultricies justo a mattis. Nam eu ex ac quam laoreet vulputate. Fusce est justo, molestie a tempus at, finibus quis sem. Ut ullamcorper dolor augue, nec faucibus neque pellentesque nec. Vestibulum vestibulum mi sapien, ac posuere dolor commodo quis. In hac habitasse platea dictumst. Donec magna ligula, placerat quis tortor id, feugiat pulvinar felis.\n\nSuspendisse potenti. Quisque blandit augue ut urna dictum aliquam. Sed sit amet lorem facilisis orci tristique efficitur. Vestibulum euismod enim eu elit vestibulum, quis pretium leo fermentum. Sed faucibus ullamcorper gravida. Pellentesque sapien augue, scelerisque vitae lobortis eu, eleifend at nibh. Fusce ultrices sit amet nunc sed faucibus.\n\nSed et dictum nisl, a luctus augue. Cras ac ligula auctor, volutpat dui id, scelerisque massa. Nam congue mauris ut nisl congue lacinia. Nunc nisl velit, rhoncus nec turpis vitae, ornare finibus justo. Nulla facilisi. Quisque facilisis lectus nec placerat suscipit. Cras dictum orci eget erat mattis, sed efficitur massa posuere. Vestibulum ut velit nulla. Sed vehicula est nibh, vel maximus elit pellentesque et. Aenean ac vestibulum sem. Aliquam quis velit sagittis, ultrices augue vitae, cursus purus. Integer lobortis, dolor id ultrices molestie, turpis neque congue eros, at volutpat purus turpis a nulla.'
        },
    ];

    const eventsInfos = [
        {
            id: 1,
            img: event1,
            title: 'Torneio de Judô',
            date: '20/06/2025',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at efficitur urna. Quisque iaculis lectus ex. Aenean fringilla porttitor nisl sit amet ornare. Pellentesque rhoncus cursus metus ac congue. Morbi efficitur semper orci, vel rutrum odio vehicula sed. Suspendisse varius ultricies justo a mattis. Nam eu ex ac quam laoreet vulputate. Fusce est justo, molestie a tempus at, finibus quis sem. Ut ullamcorper dolor augue, nec faucibus neque pellentesque nec. Vestibulum vestibulum mi sapien, ac posuere dolor commodo quis. In hac habitasse platea dictumst. Donec magna ligula, placerat quis tortor id, feugiat pulvinar felis.\n\nSuspendisse potenti. Quisque blandit augue ut urna dictum aliquam. Sed sit amet lorem facilisis orci tristique efficitur. Vestibulum euismod enim eu elit vestibulum, quis pretium leo fermentum. Sed faucibus ullamcorper gravida. Pellentesque sapien augue, scelerisque vitae lobortis eu, eleifend at nibh. Fusce ultrices sit amet nunc sed faucibus.'
        },
        {
            id: 2,
            img: event2,
            title: 'Baile Fantasia Para Sócios',
            date: '15/05/2025',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at efficitur urna. Quisque iaculis lectus ex. Aenean fringilla porttitor nisl sit amet ornare. Pellentesque rhoncus cursus metus ac congue. Morbi efficitur semper orci, vel rutrum odio vehicula sed. Suspendisse varius ultricies justo a mattis. Nam eu ex ac quam laoreet vulputate. Fusce est justo, molestie a tempus at, finibus quis sem. Ut ullamcorper dolor augue, nec faucibus neque pellentesque nec. Vestibulum vestibulum mi sapien, ac posuere dolor commodo quis. In hac habitasse platea dictumst. Donec magna ligula, placerat quis tortor id, feugiat pulvinar felis.\n\nSuspendisse potenti. Quisque blandit augue ut urna dictum aliquam. Sed sit amet lorem facilisis orci tristique efficitur. Vestibulum euismod enim eu elit vestibulum, quis pretium leo fermentum. Sed faucibus ullamcorper gravida. Pellentesque sapien augue, scelerisque vitae lobortis eu, eleifend at nibh. Fusce ultrices sit amet nunc sed faucibus.'
        },
        {
            id: 3,
            img: event3,
            title: 'Premiação de Sócios',
            date: '22/04/2025',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at efficitur urna. Quisque iaculis lectus ex. Aenean fringilla porttitor nisl sit amet ornare. Pellentesque rhoncus cursus metus ac congue. Morbi efficitur semper orci, vel rutrum odio vehicula sed. Suspendisse varius ultricies justo a mattis. Nam eu ex ac quam laoreet vulputate. Fusce est justo, molestie a tempus at, finibus quis sem. Ut ullamcorper dolor augue, nec faucibus neque pellentesque nec. Vestibulum vestibulum mi sapien, ac posuere dolor commodo quis. In hac habitasse platea dictumst. Donec magna ligula, placerat quis tortor id, feugiat pulvinar felis.\n\nSuspendisse potenti. Quisque blandit augue ut urna dictum aliquam. Sed sit amet lorem facilisis orci tristique efficitur. Vestibulum euismod enim eu elit vestibulum, quis pretium leo fermentum. Sed faucibus ullamcorper gravida. Pellentesque sapien augue, scelerisque vitae lobortis eu, eleifend at nibh. Fusce ultrices sit amet nunc sed faucibus.'
        },
        {
            id: 4,
            img: event4,
            title: 'Domingo de Páscoa da Garotada',
            date: '17/03/2025',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at efficitur urna. Quisque iaculis lectus ex. Aenean fringilla porttitor nisl sit amet ornare. Pellentesque rhoncus cursus metus ac congue. Morbi efficitur semper orci, vel rutrum odio vehicula sed. Suspendisse varius ultricies justo a mattis. Nam eu ex ac quam laoreet vulputate. Fusce est justo, molestie a tempus at, finibus quis sem. Ut ullamcorper dolor augue, nec faucibus neque pellentesque nec. Vestibulum vestibulum mi sapien, ac posuere dolor commodo quis. In hac habitasse platea dictumst. Donec magna ligula, placerat quis tortor id, feugiat pulvinar felis.\n\nSuspendisse potenti. Quisque blandit augue ut urna dictum aliquam. Sed sit amet lorem facilisis orci tristique efficitur. Vestibulum euismod enim eu elit vestibulum, quis pretium leo fermentum. Sed faucibus ullamcorper gravida. Pellentesque sapien augue, scelerisque vitae lobortis eu, eleifend at nibh. Fusce ultrices sit amet nunc sed faucibus.'
        },
    ];

    return (
        <GlobalContext.Provider value={{
            isMobile,
            isScrollingDown,
            showSecondaryHeader,
            zoomLevel,
            setZoomLevel,
            newsInfos,
            eventsInfos
        }}>
            {children}
        </GlobalContext.Provider>
    )
}