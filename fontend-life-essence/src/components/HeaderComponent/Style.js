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
   cursor: pointer;
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

// Form nhỏ khi hover vào đăng ký

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 220px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
`;

export const SignInText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export const FormContainer = styled.form`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 10;
`;

export const FormTitle = styled.h3`
  margin: 0;
  margin-bottom: 10px;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Tab = styled.span`
  cursor: pointer;
  border-bottom: ${props => (props.active ? '2px solid teal' : 'none')};
  color: ${props => (props.active ? 'black' : 'teal')};
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const LoginButton = styled.button`
  width: 100%;
  background-color: teal;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

export const ForgotPasswordLink = styled.a`
  color: teal;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-top: 10px;
`;
export const WrapperContentPopup = styled.div`
  padding: 8px 12px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #24AEB1; /* Màu nền khi hover */
  }
`;