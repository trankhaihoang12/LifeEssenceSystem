import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import login_logo from '../../assets/images/login-logo.png';
import { useNavigate } from 'react-router';
import { Wrapper, WrapperButton, WrapperCheckbox, WrapperContainer, WrapperContainerLeftItem, WrapperContainerRightItem, WrapperForm, WrapperIcon, WrapperInput, WrapperLabel, WrapperLeftContainer, WrapperLogo, WrapperRightContainer, WrapperTitle } from './Style';

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
   
    return (
        <div style={{ height: '100vh', backgroundColor: '#EEEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ }}>
                {/* <div style={{ padding: '5px', fontSize: '13px', fontWeight: 'bold', display: 'flex' }}>
                    Life Essence-
                    <span style={{ fontSize: '12px', fontWeight: '200' }}>My Account</span>
                </div> */}
                <Wrapper>
                   <WrapperContainer>
                        <WrapperLeftContainer>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <WrapperContainerRightItem>
                                    <WrapperLogo src={login_logo} alt="login_logo"/>
                                    <WrapperTitle>Shop at Life essence</WrapperTitle>
                                </WrapperContainerRightItem>
                            </div>
                        </WrapperLeftContainer>
                        <WrapperRightContainer>
                            <WrapperContainerLeftItem>
                                <h1 style={{ fontWeight: 'bold' }}>Sign in</h1>
                                <WrapperForm>
                                   <WrapperLabel>
                                        <span>Username or email address <span style={{ color: 'red' }}>*</span></span>
                                        <WrapperInput type="text" required />
                                    </WrapperLabel>
                                   <WrapperLabel>
                                        <span>Password <span style={{ color: 'red' }}>*</span></span>
                                        <div style={{ position: 'relative' }}>
                                            <WrapperInput type={showPassword ? 'text' : 'password'} required />
                                            <WrapperIcon
                                                
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                                            </WrapperIcon>
                                        </div>
                                    </WrapperLabel>
                                    <label style={{ marginBottom: '10px' }}>
                                        <div style={{ padding: '10px', display: 'flex' }}>
                                            <WrapperCheckbox type="checkbox"/>
                                            <h4 style={{ display: 'flex', margin: 'auto 10px' }}>Remember me</h4>
                                        </div>
                                    </label>
                                    <WrapperButton>LOGIN</WrapperButton>
                                    <p style={{ padding: '10px 0', color: '#1D2A38', cursor: 'pointer' }} onClick={() => navigate('/resetPassword')}>Lost your password?</p>
                                    <p style={{ padding: '10px 0', color: '#1D2A38' }}>Don't have an account? <span style={{ color: '#24AEB1', cursor: 'pointer' }} onClick={() => navigate('/signUp')}>Sign up</span> </p>
                                </WrapperForm>
                            </WrapperContainerLeftItem>
                        </WrapperRightContainer>
                    </WrapperContainer>
                </Wrapper>
            </div>
        </div>
    )
}

export default SignInPage
