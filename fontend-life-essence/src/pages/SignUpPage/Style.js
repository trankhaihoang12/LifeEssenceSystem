import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const WrapperContainer = styled.div`
  height: 450px;
  width: 900px;
  display: flex;
`;

export const WrapperLeftContainer = styled.div`
  height: 450px;
  width: 600px;
  background-color: #24AEB1;
  border-radius: 50px 0 0 0; 
`;

export const WrapperRightContainer = styled.div`
  height: 450px;
  width: 400px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 50px 0; 
`;

export const WrapperContainerRightItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const WrapperLogo = styled.img`
  width: 470px;
  height: 400px;
  margin: auto;
`;

export const WrapperTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export const WrapperContainerLeftItem = styled.div`
  width: 300px;
`;



export const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const WrapperLabel = styled.label`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

export const WrapperInput = styled.input`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
`;



export const WrapperIcon = styled.span`
  z-index: 10;
  position: absolute;
  top: 50%;
  transform: translateY(-30%);
  right: 8px;
  cursor: pointer;
  font-size: 20px;
`;



export const WrapperButton = styled.button`
  font-size: 16px;
  margin-top: 10px;
  background-color: #1d2a38;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  width: 140px;
  height: 40px;
`;
