import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
  0% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-20px) rotate(45deg); }
  100% { transform: translateY(0) rotate(45deg); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #EBF5FF, #FFFFFF);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Content = styled.div`
  max-width: 42rem;
  width: 100%;
  text-align: center;
`;

const PillsContainer = styled.div`
  position: relative;
  height: 12rem;
  margin-bottom: 2rem;
`;

const Pill = styled.div`
  position: absolute;
  left: ${props => props.left || '50%'};
  transform: translateX(-50%) ${props => props.bounce ? 'translateY(0.5rem)' : 'translateY(-0.5rem)'};
  transition: transform 1s ease-in-out;
  transition-delay: ${props => props.delay || '0s'};
`;

const PillShape = styled.div`
  width: 6rem;
  height: 12rem;
  background-color: ${props => props.color || '#3B82F6'};
  border-radius: 9999px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.3);
    height: 50%;
    border-top-left-radius: 9999px;
    border-top-right-radius: 9999px;
  }
`;

const Title = styled.h1`
  font-size: 3.75rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: #4B5563;
  margin-bottom: 2rem;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #3B82F6;
  color: white;
  border-radius: 9999px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

const FloatingPillsContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingPill = styled.div`
  position: absolute;
  width: 2rem;
  height: 4rem;
  border-radius: 9999px;
  transform: rotate(45deg);
  animation: ${floatAnimation} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  background-color: ${props => props.color};
  left: ${props => props.left}%;
  top: ${props => props.top}%;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.3);
    height: 50%;
    border-top-left-radius: 9999px;
    border-top-right-radius: 9999px;
  }
`;

const NotFoundPage = () => {
  const [bounce, setBounce] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Content>
        <PillsContainer>
          <Pill left="25%" bounce={bounce}>
            <PillShape color="#3B82F6" />
          </Pill>
          
          <Pill bounce={!bounce} delay="0.1s">
            <PillShape color="#14B8A6" />
          </Pill>
          
          <Pill left="75%" bounce={bounce} delay="0.2s">
            <PillShape color="#3B82F6" />
          </Pill>
        </PillsContainer>

        <Title>Oops!</Title>
        <Subtitle>Page Not Found</Subtitle>
        <Description>
          The page you're looking for seems to have been misplaced. 
          Don't worry, our medical team is on the case!
        </Description>

        <BackButton onClick={() => window.history.back()}>
          <ArrowLeft size={20} style={{ marginRight: '1rem' }} />
          Go Back
        </BackButton>

        <FloatingPillsContainer>
          {[...Array(6)].map((_, i) => (
            <FloatingPill
              key={i}
              color={i % 2 === 0 ? 'rgba(45, 212, 191, 0.2)' : 'rgba(59, 130, 246, 0.2)'}
              duration={8 + i}
              delay={i * 0.5}
              left={Math.random() * 100}
              top={Math.random() * 100}
            />
          ))}
        </FloatingPillsContainer>
      </Content>
    </Container>
  );
};

export default NotFoundPage;