import React, { useState } from 'react';
import { Card, Container, ResetButton, WrapperInput, WrapperLabel } from './Style';
import * as UserService from '../../services/UserService';
import * as messagess from '../../components/MessageComponent/Message';
import Loading from '../../components/LoadingComponent/Loading';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isPending, setIsPending] = useState(false);
    const handleResetPassword = async () => {
        if (!email) {
            setMessage('Vui lòng nhập email');
            return;
        }

        setIsPending(true); // Bắt đầu loading khi gửi yêu cầu API
        try {
            const data = await UserService.requestPasswordReset(email); // Gọi hàm resetPassword từ UserService
            messagess.success("Yêu cầu đã được gửi đến Mail của bạn.")
            setMessage(data.message || 'Đã gửi yêu cầu.');
        } catch (error) {
            messagess.error("không có người dùng này!!!")
        } finally {
            setIsPending(false); // Dừng loading khi có phản hồi từ API
        }
    };

    return (
        <div style={{ height: '100vh', backgroundColor: '#EEEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: '20px' }}>
                <Container>
                    <Card>
                        <div style={{ marginLeft: '40px' }}>
                            <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Lost password</h1>
                            <p style={{ fontSize: '16px' }}>Lost your password?</p>
                            <p style={{ fontSize: '16px' }}>Please enter your username or email address. You will receive a link to create a new password via email.</p>
                            <Loading isPending={isPending}>
                                <WrapperLabel>
                                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                        Username or email address <span style={{ color: 'red' }}>*</span>
                                    </span>
                                    <WrapperInput
                                        type="text"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị email
                                    />
                                </WrapperLabel>
                                <ResetButton onClick={handleResetPassword}>
                                    RESET PASSWORD
                                </ResetButton>

                            </Loading>
                            {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>} {/* Hiển thị thông báo */}
                        </div>
                    </Card>
                </Container>
            </div>
        </div>
    );
}

export default ResetPassword;
