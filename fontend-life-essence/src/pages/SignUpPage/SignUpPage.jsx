import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import login_logo from '../../assets/images/login-logo.png';
import { useNavigate } from 'react-router';
import { Wrapper, WrapperButton, WrapperContainer, WrapperContainerLeftItem, WrapperContainerRightItem, WrapperForm, WrapperIcon, WrapperInput, WrapperLabel, WrapperLeftContainer, WrapperLogo, WrapperRightContainer, WrapperTitle } from './Style';

const SignUpPage = () => {
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()

  return (
    <div style={{ height: '100vh', backgroundColor: '#EEEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ padding: '20px' }}>
        {/* <div style={{ padding: '5px', fontSize: '13px', fontWeight: 'bold', display: 'flex' }}>
          Life Essence-
          <span style={{ fontSize: '12px', fontWeight: '200' }}>My Account</span>
        </div> */}
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
                <WrapperForm>
                  <WrapperLabel>
                    <span>Username or email address <span style={{ color: 'red' }}>*</span></span>
                    <WrapperInput type="text" required  />
                  </WrapperLabel>
                  <WrapperLabel>
                    <span>Password <span style={{ color: 'red' }}>*</span></span>
                    <div style={{ position: 'relative' }}>
                      <WrapperInput type={showPasswordSignUp ? 'text' : 'password'} required/>
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
                      <WrapperInput type={showConfirmPassword ? 'text' : 'password'} required/>
                      <WrapperIcon
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                      </WrapperIcon>
                    </div>
                  </WrapperLabel>
                  <WrapperButton>REGISTER</WrapperButton>
                  <p style={{ padding: '10px 0', color: '#1D2A38' }}>Do you have an account? <span style={{ color: '#24AEB1', cursor: 'pointer'}} onClick={() => navigate('/signIn')}>Sign in</span> </p>
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