import styled from "styled-components";
import Modal from 'react-modal';

export const Container = styled.div`
  height: 439px;
  justify-content: center;
  display: flex;
  gap: 100px;
`;

export const ImageWrapper = styled.div`
  img {
    width: 439px;
    height: 445px;
    object-fit: cover;
  }
`;

export const TextWrapper = styled.div`
  width: 510px;
  display: flex;
  flex-direction: column;
  margin: auto 0;
`;

export const HighlightText = styled.span`
  font-size: 16px;
  color: #2EA5B6;
  font-weight: bold;
`;

export const Title = styled.span`
  font-size: 40px;
  font-weight: bold;
  margin: 10px 0;
`;

export const Description = styled.span`
  font-size: 16px;
  color: #7D879C;
`;

export const WatchButton = styled.div`
  display: flex;
  width: 190px;
  justify-content: space-between;
  margin-top: 20px;
  cursor: pointer;
`;

export const WrapperTriangle = styled.div`
  background-color: #2EA5B6;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: red; /* Thay đổi màu nền khi hover */
  }
`;


export const VideoModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VideoContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  max-height: 450px;
`;

export const CloseButton = styled.button`
  background: #2EA5B6;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  float: right;
`;
