import React, { useEffect, useState } from 'react'
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { RiCameraFill, RiFacebookFill } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { TiShoppingCart } from 'react-icons/ti';
import Logo from '../../assets/images/Logo_Essence.png'
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordLink, FormContainer, FormTitle, HeaderContainer, IconsContainer, Input, LoginButton, SignInText, Tab, Tabs, WrapperButton, WrapperContentPopup, WrapperHeaderOn, WrapperHeaderUnder, WrapperInput, WrapperItem, WrapperLogo } from './Style';
import { Popover } from 'antd';


const HeaderComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    setIsOpenPopup(false);
  };
  const handleClose = () => {
    setIsOpenPopup(false); // Ẩn popover
  };

  const content = (
    <div style={{ width: '170px', padding: '5px', borderRadius: '8px', }}>
      <WrapperContentPopup onClick={() => { navigate('/profile-user');handleClose() }}>Information user</WrapperContentPopup>
      <WrapperContentPopup onClick={() => { navigate('/myOrders'); handleClose() } }>Order of me</WrapperContentPopup>
      <WrapperContentPopup onClick={handleSignOut} style={{ color: 'red', textAlign: 'center'}}>LOGOUT</WrapperContentPopup>
    </div>
  );



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
          {userData ? (
            <Popover content={content} trigger="click" open={isOpenPopup} >
              <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => setIsOpenPopup((prev) => !prev)}>
              <AiOutlineUser style={{ fontSize: '3rem', marginRight: '10px' }} />
              <SignInText >{userData.user.name}</SignInText>
            </div>
            </Popover>
          ) : (
            <>
            <SignInText >SIGN IN / SIGN UP</SignInText>
            {isHovered && (
              <FormContainer>
                <FormTitle>Sign in</FormTitle>
                <Tabs>
                  <Tab active>Sign in</Tab>
                  <Tab onClick={()=>navigate('/signUp')}>Create an Account</Tab>
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
            </>
          )}
            <IconsContainer>
            <FaRegHeart style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => navigate('/wishlist')} />
            <TiShoppingCart style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={()=> navigate('/order')} />
            </IconsContainer>
        </HeaderContainer>        
      </WrapperHeaderUnder>

    </div>


  )
}


export default HeaderComponent