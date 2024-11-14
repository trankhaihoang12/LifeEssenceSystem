import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import login_logo from '../../assets/images/login-logo.png';
import { useNavigate } from 'react-router';
import { Wrapper, WrapperButton, WrapperCheckbox, WrapperContainer, WrapperContainerLeftItem, WrapperContainerRightItem, WrapperForm, WrapperIcon, WrapperInput, WrapperLabel, WrapperLeftContainer, WrapperLogo, WrapperRightContainer, WrapperTitle } from './Style';
import * as message from '../../components/MessageComponent/Message'
import { useMutation } from '@tanstack/react-query';
import * as UserService from '../../services/UserService'



const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    return (
        <div style={{ height: '100vh', backgroundColor: '#EEEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
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
                                <h1 style={{ fontWeight: 'bold' }}>Sign in</h1>
                                <WrapperForm onSubmit={handleLogin}>
                                    <WrapperLabel>
                                        <span>Username or email address <span style={{ color: 'red' }}>*</span></span>
                                        <WrapperInput
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required />
                                    </WrapperLabel>
                                    <WrapperLabel>
                                        <span>Password <span style={{ color: 'red' }}>*</span></span>
                                        <div style={{ position: 'relative' }}>
                                            <WrapperInput
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required />
                                            <WrapperIcon

                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                                            </WrapperIcon>
                                        </div>
                                    </WrapperLabel>
                                    <label style={{ marginBottom: '10px' }}>
                                        <div style={{ padding: '10px', display: 'flex' }}>
                                            <WrapperCheckbox type="checkbox" />
                                            <h4 style={{ display: 'flex', margin: 'auto 10px' }}>Remember me</h4>
                                        </div>
                                    </label>
                                    <WrapperButton type="submit">LOGIN</WrapperButton>
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
