import React, { useState } from 'react'
import { CloseButton, Container, Description, HighlightText, ImageWrapper, TextWrapper, Title, VideoContainer, VideoModal, WatchButton, WrapperTriangle } from './Style';
import { RxTriangleRight } from 'react-icons/rx';
import Image_Introduction from '../../assets/images/Image_Introduction.png';

const IntroductionComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
        <Container>
            <ImageWrapper>
                <img src={Image_Introduction} alt="Image_Introduction" />
            </ImageWrapper>
            <TextWrapper>
                <HighlightText>WELCOME TO LIFE ESSENCE</HighlightText>
                <Title>We make healthcare Understandable, Accessible and Affordable.</Title>
                <Description>
                    Life Essence brings to you an online platform, which can be accessed for all your health needs.
                    We are trying to make healthcare a hassle-free experience for you. Get your allopathic, ayurvedic,
                    homeopathic medicines, vitamins & nutrition supplements and other health-related products delivered at home.

                </Description>
                <div style={{color: 'Highlight', fontSize: '17px', marginTop: '10px', fontWeight: 'bold'}}>
                    📌 Caution: Functional foods are not medicine and cannot replace medicine.
                </div>
                <WatchButton onClick={handleOpenModal}>
                    <WrapperTriangle>
                        <RxTriangleRight style={{ fontSize: '40px', color: '#fff' }} />
                    </WrapperTriangle>
                    <span style={{ margin: 'auto', fontSize: '15px', color: 'black', textDecoration: 'underline' }}>Watch Our Video</span>
                </WatchButton>
            </TextWrapper>

            <VideoModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                ariaHideApp={false}
            >
                <VideoContainer>
                    <CloseButton onClick={handleCloseModal}>Close</CloseButton>
                    <iframe
                        width="760"
                        height="400"
                        src="https://www.youtube.com/watch?v=lArYKMbR4DI"
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </VideoContainer>
            </VideoModal>
        </Container>
    )
}

export default IntroductionComponent