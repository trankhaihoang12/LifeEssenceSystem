import styled from "styled-components";

export const WrraperTriangle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #2EA5B6;
  border-radius: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: red; /* Thay đổi màu nền khi hover */
  }
`;