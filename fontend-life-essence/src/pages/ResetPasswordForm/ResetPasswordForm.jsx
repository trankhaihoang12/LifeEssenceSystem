import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { Card, Container, SubmitButton, WrapperInput, WrapperLabel } from './Style';
import * as messagess from '../../components/MessageComponent/Message'
import Loading from '../../components/LoadingComponent/Loading';
const ResetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [isPending, setIsPending] = useState(false); // Trạng thái loading

    const navigate = useNavigate();

    useEffect(() => {
        // Lấy token từ URL
        const urlToken = window.location.pathname.split('/')[2]; // Token ở trong URL (http://localhost:3000/reset-password/{token})
        setToken(urlToken);
    }, []);

    const handleResetPassword = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        if (password !== confirmPassword) {
            messagess.error('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }
        setIsPending(true);

        try {
            const data = await UserService.resetPassword(token, password, confirmPassword);
            messagess.success("Mật khẩu đã được đặt lại thành công.")
            navigate('/signIn'); // Chuyển hướng người dùng đến trang login sau khi reset mật khẩu thành công
        } catch (error) {
            messagess.error("Có lỗi xảy ra. Vui lòng thử lại.")
            // setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setIsPending(false); // Dừng loading khi có phản hồi từ API
        }
    };

    return (
        <div style={{ height: '100vh', backgroundColor: '#EEEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: '20px' }}>
                <Container>
                    <Card>
                        <div style={{width: '500px'}}>
                            <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Reset Password</h1>
                            <Loading isPending={isPending}>

                                <form onSubmit={handleResetPassword}>
                                    <WrapperLabel>
                                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                            New Password <span style={{ color: 'red' }}>*</span>
                                        </span>
                                        <WrapperInput
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} // Cập nhật giá trị mật khẩu
                                        />
                                    </WrapperLabel>
                                    <WrapperLabel>
                                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                            Confirm Password <span style={{ color: 'red' }}>*</span>
                                        </span>
                                        <WrapperInput
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)} // Cập nhật giá trị xác nhận mật khẩu
                                        />
                                    </WrapperLabel>
                                    <SubmitButton type="submit">
                                        RESET PASSWORD
                                    </SubmitButton>
                                </form>
                                {message && <p style={{ marginTop: '10px', color: message.startsWith('Mật khẩu') ? 'green' : 'red' }}>{message}</p>}
                            </Loading>
                        </div>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
