import React from 'react'
import { Card, Container, ResetButton, WrapperInput, WrapperLabel } from './Style'

const ResetPassword = () => {
    return (
        <div style={{ height: '100vh', backgroundColor: '#EEEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: '20px' }}>
                
                <Container>
                    <Card>
                        <div style={{marginLeft: '40px',}}>
                            <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Lost password</h1>
                            <p style={{ fontSize: '16px' }}>Lost your password?</p>
                            <p style={{ fontSize: '16px' }}>Please enter your username or email address. You will receive a link to create a new password via email.</p>
                            <WrapperLabel>
                                <span style={{fontSize: '14px', fontWeight: 'bold'}}>Username or email address <span style={{ color: 'red' }}>*</span></span>
                                <WrapperInput type="text" required />
                            </WrapperLabel>
                            <ResetButton>
                                
                                    RESET PASSWORD

                            </ResetButton>
                        </div>
                    </Card>
                </Container>
            </div>
        </div>
    )
}

export default ResetPassword