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
import { Badge, Popover } from 'antd';
import { useMutation } from '@tanstack/react-query';
import * as UserService from '../../services/UserService';
import * as message from '../../components/MessageComponent/Message';


const HeaderComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => UserService.loginUser(data), // Hàm thực hiện gọi API
    onSuccess: (response) => {
      if (response.message === 'Login successfully') {
        // Lưu dữ liệu vào localStorage
        const userData = {
          token: response.data.token,
          user: response.data.user
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        setUserData(userData); 
        message.success(response.message);
        navigate('/'); // Chuyển hướng sau khi đăng nhập thành công
      } else {
        message.error(response.message || 'Đã có lỗi xảy ra trong quá trình đăng nhập');
      }
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || 'Lỗi đăng nhập. Vui lòng kiểm tra lại.');
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password }); // Gọi API đăng nhập
  };

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
    navigate('/')
  };
  const handleClose = () => {
    setIsOpenPopup(false); // Ẩn popover
  };


  const content = (
    <div style={{ width: '180px', padding: '5px', borderRadius: '8px'}}>
      <WrapperContentPopup onClick={() => { navigate('/profile-user'); handleClose() }}>Information user</WrapperContentPopup>
      {userData?.user?.role === 'admin' && (
        <WrapperContentPopup onClick={() => { navigate('/admin'); handleClose() }}>Management system</WrapperContentPopup>
      )}
      {userData?.user?.role === 'manager' && (
        <WrapperContentPopup onClick={() => { navigate('/admin'); handleClose() }}>Management product</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => { navigate('/myOrders'); handleClose() }}>Order of me</WrapperContentPopup>
      <WrapperContentPopup onClick={handleSignOut} style={{ color: 'red', textAlign: 'center' }}>LOGOUT</WrapperContentPopup>
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
            <Popover content={content} trigger="click" open={isOpenPopup}>
              <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => setIsOpenPopup((prev) => !prev)}>
                <AiOutlineUser style={{ fontSize: '3rem', marginRight: '10px' }} />
                <SignInText >{userData.user.name}</SignInText>
              </div>
            </Popover>
          ) : (
            <>
              <SignInText >SIGN IN / SIGN UP</SignInText>
              {isHovered && (
                  <FormContainer onSubmit={handleLogin} >
                  <FormTitle>Sign in</FormTitle>
                  <Tabs>
                    <Tab active>Sign in</Tab>
                    <Tab onClick={() => navigate('/signUp')}>Create an Account</Tab>
                  </Tabs>
                    <div>
                    <label>Username or email *</label>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password *</label>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <LoginButton type='submit'>LOGIN</LoginButton>
                    <ForgotPasswordLink href="#">Lost your password?</ForgotPasswordLink>
                  </div>
                </FormContainer>
              )}
            </>
          )}
          <IconsContainer>
            <Badge size='small' count={1}>
            <FaRegHeart style={{ fontSize: '2.3rem', cursor: 'pointer' }} onClick={() => navigate('/wishlist')} />
            </Badge>
            <Badge size='small' count={1}>
            <TiShoppingCart style={{ fontSize: '2.7rem', cursor: 'pointer' }} onClick={() => navigate('/order')} />
            </Badge>
          </IconsContainer>
        </HeaderContainer>
      </WrapperHeaderUnder>

    </div>


  )
}


export default HeaderComponent