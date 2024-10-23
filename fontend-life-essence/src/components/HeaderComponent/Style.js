import styled from "styled-components";

export const WrapperHeaderOn = styled.div`
    height: 40px;
    background: #24AEB1; 
    display: flex;
    justify-content: space-around; 
    align-items: center;
`;
export const WrapperHeaderUnder = styled.div`
   height: 100px; 
   background-color: #fff; 
   display: flex; 
   align-items: center; 
   width: 100%; 
   justify-content: space-around;
`;
export const WrapperLogo = styled.img`
   width: 190px; 
   height: 72px; 
   margin-right: 200px;
`;
export const WrapperInput = styled.input`
  border: none; 
  outline: none; 
  flex: 1; 
  padding: 10px; 
  border-radius: 20px;
`;
export const WrapperButton = styled.button`
  background-color: #24AEB1; 
  width: 70px; 
  height: 42px; 
  border: none; 
  border-radius: 20px; 
  padding: 10px; 
  cursor: pointer;
`;
export const WrapperItem = styled.div`
  display: flex; 
  justify-content: space-around; 
  font-size: 16px; 
  text-transform: uppercase; 
  font-weight: bold; 
  margin-top: 13px;
`;