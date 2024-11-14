import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import login_logo from '../../assets/images/login-logo.png';
import { useNavigate } from 'react-router';
import { Wrapper, WrapperButton, WrapperContainer, WrapperContainerLeftItem, WrapperContainerRightItem, WrapperForm, WrapperIcon, WrapperInput, WrapperLabel, WrapperLeftContainer, WrapperLogo, WrapperRightContainer, WrapperTitle } from './Style';
import { registerUser } from '../../services/UserService';
import * as message from '../../components/MessageComponent/Message'
import { useMutation } from '@tanstack/react-query';

const SignUpPage = () => {
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()


  const mutation = useMutation({
    mutationFn: registerUser, // Hàm thực hiện gọi API
    onSuccess: (response) => {
      if (response.message === 'User registered successfully') {
        message.success(response.message);
        navigate('/signIn'); 
      } else {
        message.error(response.message || 'Đã có lỗi xảy ra trong quá trình đăng kí');
      }
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || 'Lỗi đăng kí. Vui lòng kiểm tra lại.');
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    mutation.mutate({ email,name, password,confirmPassword });
  };

 

  return (
    <div style={{ height: '100vh', backgroundColor: '#EEEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ padding: '20px' }}>
        <Wrapper>
          <WrapperContainer>
            <WrapperLeftContainer>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <WrapperContainerRightItem>
                  <WrapperLogo src={login_logo} alt="login_logo" />
                  <WrapperTitle>Shop at Life essence</WrapperTitle>
                </WrapperContainerRightItem>
              </div>
            </WrapperLeftContainer>
            <WrapperRightContainer>
              <WrapperContainerLeftItem>
                <h1 style={{ fontWeight: 'bold' }}>Sign up</h1>
                <WrapperForm onSubmit={handleRegister}>
                  <WrapperLabel>
                    <span>Name <span style={{ color: 'red' }}>*</span></span>
                    <WrapperInput
                      type="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required />
                  </WrapperLabel>
                  <WrapperLabel>
                    <span>Username or email address <span style={{ color: 'red' }}>*</span></span>
                    <WrapperInput
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required />
                  </WrapperLabel>
                  <WrapperLabel>
                    <span>Password <span style={{ color: 'red' }}>*</span></span>
                    <div style={{ position: 'relative' }}>
                      <WrapperInput
                        type={showPasswordSignUp ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                      <span
                        style={{ zIndex: '10', position: 'absolute', top: '50%', transform: 'translateY(-30%)', right: '8px', cursor: 'pointer', fontSize: '20px' }}
                        onClick={() => setShowPasswordSignUp(!showPasswordSignUp)}
                      >
                        {showPasswordSignUp ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </WrapperLabel>
                  <WrapperLabel>
                    <span>Confirm Password <span style={{ color: 'red' }}>*</span></span>
                    <div style={{ position: 'relative' }}>
                      <WrapperInput
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                      <WrapperIcon
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                      </WrapperIcon>
                    </div>
                  </WrapperLabel>
                  <WrapperButton type="submit">REGISTER</WrapperButton>
                  <p style={{ padding: '10px 0', color: '#1D2A38' }}>Do you have an account? <span style={{ color: '#24AEB1', cursor: 'pointer' }} onClick={() => navigate('/signIn')}>Sign in</span> </p>
                </WrapperForm>
              </WrapperContainerLeftItem>
            </WrapperRightContainer>
          </WrapperContainer>
        </Wrapper>
      </div>
    </div>
  )
}

export default SignUpPage