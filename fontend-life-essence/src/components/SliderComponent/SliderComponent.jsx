import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Dot, DotWrapper, NavigationButton, SlideImage, SliderWrapper } from './Style';


const SliderComponent = ({ arrImages }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % arrImages.length);
        }, 5000); // Thay đổi slide mỗi 5 giây

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, [arrImages.length]);

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + arrImages.length) % arrImages.length);
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % arrImages.length);
    };

    return (
        <SliderWrapper>
            <SlideImage src={arrImages[currentSlide]} alt={`Slide ${currentSlide + 1}`} />

            <NavigationButton direction="left" onClick={handlePrev}>
                <FontAwesomeIcon icon={faChevronLeft} size="3x" />
            </NavigationButton>

            <NavigationButton direction="right" onClick={handleNext}>
                <FontAwesomeIcon icon={faChevronRight} size="3x" />
            </NavigationButton>

            <DotWrapper>
                {arrImages.map((_, index) => (
                    <Dot
                        key={index}
                        isActive={currentSlide === index}
                        onClick={() => setCurrentSlide(index)}
                    >
                        ●
                    </Dot>
                ))}
            </DotWrapper>
        </SliderWrapper>
    );
};

export default SliderComponent;
