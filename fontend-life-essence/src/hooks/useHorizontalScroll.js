import { useRef } from 'react';

const useHorizontalScroll = (scrollAmount = 300) => {
    const scrollRef = useRef(null);

    const scrollPrevious = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= scrollAmount;
        }
    };

    const scrollNext = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += scrollAmount;
        }
    };

    return {
        scrollRef,
        scrollPrevious,
        scrollNext
    };
};

export default useHorizontalScroll;
