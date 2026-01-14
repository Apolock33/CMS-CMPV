import { useEffect, useState } from 'react'

const getScrollValue = () => {
    const { scrollX, scrollY } = window;

    return { scrollX, scrollY };
}

const useScrollDown = () => {
    const [scrollValue, setScrollValue] = useState(getScrollValue());

    useEffect(() => {
        const handleScroll = () => {
            setScrollValue(getScrollValue());
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }
        , []);

    return scrollValue
}

export default useScrollDown