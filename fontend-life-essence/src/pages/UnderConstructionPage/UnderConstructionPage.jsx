import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Để xử lý điều hướng nếu dùng React Router

// Animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  font-family: 'Arial', sans-serif;
  color: #fff;
  text-align: center;
  overflow: hidden;
`;

const Content = styled.div`
  animation: ${fadeIn} 1.5s ease-out;
  text-align: center;
  max-width: 600px;
  padding: 20px;
`;

const Icon = styled.img`
  width: 150px;
  margin-bottom: 20px;
  animation: ${pulse} 2s infinite;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 15px;
  letter-spacing: 2px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #6e8efb;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    background-color: #6e8efb;
    color: #fff;
    transform: scale(1.05);
  }
`;

const UnderConstruction = () => {
    const navigate = useNavigate(); // Hook điều hướng từ React Router

    return (
        <Wrapper>
            <Content>
                <Icon
                    src="https://cdn-icons-png.flaticon.com/512/6195/6195696.png"
                    alt="Under Construction"
                />
                <Title>We're Building Something Awesome!</Title>
                <Message>
                    Our site is currently under construction. We’re working hard to bring you an amazing experience.
                    Please check back soon!
                </Message>
                <ButtonGroup>
                    <Button onClick={() => alert('Cảm ơn bạn đã ghé thăm!')}>Notify Me</Button>
                    <Button onClick={() => navigate('/')}>Go to Home</Button>
                </ButtonGroup>
            </Content>
        </Wrapper>
    );
};

export default UnderConstruction;
