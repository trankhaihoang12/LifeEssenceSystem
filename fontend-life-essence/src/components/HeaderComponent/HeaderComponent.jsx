import React, { useState } from 'react'
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { RiCameraFill, RiFacebookFill } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { TiShoppingCart } from 'react-icons/ti';
import Logo from '../../assets/images/Logo_Essence.png'
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordLink, FormContainer, FormTitle, HeaderContainer, IconsContainer, Input, LoginButton, SignInText, Tab, Tabs, WrapperButton, WrapperHeaderOn, WrapperHeaderUnder, WrapperInput, WrapperItem, WrapperLogo } from './Style';


const HeaderComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <WrapperHeaderOn>
        <div style={{ alignItems: 'center', fontSize: '13px', color: '#fff' }}>
          Free Shipping for all Order of $99
        </div>
        <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between' }}>
          <RiFacebookFill style={{ color: 'white', width: '25px', height: '25px' }} />
          <FaGoogle style={{ color: 'white', width: '23px', height: '23px' }} />
          <FaTwitter style={{ color: 'white', width: '23px', height: '23px' }} />
          <RiCameraFill style={{ color: 'white', width: '25px', height: '25px' }} />
        </div>
      </WrapperHeaderOn>

      <WrapperHeaderUnder>

        <div style={{ display: 'flex', width: '70%' }}>
          <WrapperLogo src={Logo} alt="Logo" onClick={() => navigate('/')} />
          <div style={{ height: '75px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '20px', width: '750px', height: '44px' }}>
              <WrapperInput type="text" placeholder="Tìm kiếm..." />
              <WrapperButton>
                <span style={{ fontSize: '20px', color: '#fff' }}><LuSearch /></span>
              </WrapperButton>
            </div>
            <WrapperItem>
              <span>Home +</span>
              <span>Shop +</span>
              <span>Blog +</span>
              <span>On Sale +</span>
              <span>Contract +</span>
            </WrapperItem>
          </div>
        </div>
        <HeaderContainer
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <SignInText >SIGN IN / SIGN UP</SignInText>
          <IconsContainer>
            <FaRegHeart style={{ fontSize: '2rem' }} />
            <TiShoppingCart style={{ fontSize: '2rem' }} />
          </IconsContainer>

          {isHovered && (
            <FormContainer>
              <FormTitle>Sign in</FormTitle>
              <Tabs>
                <Tab active>Sign in</Tab>
                <Tab onClick={()=>navigate('/signIn')}>Create an Account</Tab>
              </Tabs>
              <div>
                <label>Username or email *</label>
                <Input type="text" placeholder="Username" />
                <label>Password *</label>
                <Input type="password" placeholder="Password" />
                <LoginButton>LOGIN</LoginButton>
                <ForgotPasswordLink href="#">Lost your password?</ForgotPasswordLink>
              </div>
            </FormContainer>
          )}
        </HeaderContainer>


        
      </WrapperHeaderUnder>

    </div>


  )
}


export default HeaderComponent