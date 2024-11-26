import styled from "styled-components";

export const Card = styled.div`
  width: 321px;
  height: 312px;
  background-color: #fcfcfc;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const ImageWrapper = styled.div`
  width: 321px;
  display: flex;
  justify-content: center;
`;

export const BlogImage = styled.img`
  width: 321px;
  height: 196px;
  object-fit: cover;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const BlogTitle = styled.span`
  color: #000;
  font-size: 12px;
`;

export const ReadMoreWrapper = styled.div`
  display: flex;
  padding: 10px;
  margin-top: 15px;
  height: 60px;
`;

export const ReadMoreButton = styled.div`
  width: 40px;
  height: 40px;
  background-color: #2EA5B6;
  border-radius: 100%;
  display: flex;
  cursor: pointer;
`;

export const ReadMoreText = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin: auto;
  cursor: pointer;
`;