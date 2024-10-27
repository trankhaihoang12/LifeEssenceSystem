import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div style={{ height: 'auto', backgroundColor: '#ccc' }}>
            <div style={{padding: '20px'}}>
                <div style={{ padding: '10px',fontSize: '13px', fontWeight: 'bold', display: 'flex' }}>
                    Life Essence-
                    <span style={{ fontSize: '12px', fontWeight: '200'}}>My Account</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '50px' }} >
                    <div style={{ height: '450px', width: '1200px', backgroundColor: '#fff', borderRadius: '30px' }}>
                        <h1 style={{ padding: '30px 40px', fontSize: '23px', fontWeight: 'bold' }}>My Account</h1>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div style={{ width: '30%', }}>
                                <h1 style={{ fontWeight: 'bold' }}>Sign in</h1>
                                <form style={{ display: "flex", flexDirection: 'column' }}>
                                    <label style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                                        <span>Username or email address <span style={{ color: 'red' }}>*</span></span>
                                        <input type="text" required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', }} />
                                    </label>
                                    <label style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                                        <span>Password <span style={{ color: 'red' }}>*</span></span>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                                            />
                                            <span
                                                style={{ zIndex: '10', position: 'absolute', top: '50%', transform: 'translateY(-30%)', right: '8px' , cursor: 'pointer', fontSize: '20px' }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                                            </span>
                                        </div>
                                    </label>
                                    <label style={{ marginBottom: '10px' }}>
                                        <div style={{ padding: '10px', display: 'flex' }}>
                                            <input type="checkbox" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                            <h4 style={{ display: 'flex', margin: 'auto 10px' }}>Remember me</h4>
                                        </div>
                                    </label>
                                    <button type="submit" style={{ fontSize: '16px', marginTop: '10px', backgroundColor: '#1D2A38', color: 'white', borderRadius: '50px', cursor: 'pointer', width: '140px', height: '40px' }}>LOGIN</button>
                                    <p style={{ padding: '10px 0', color: '#1D2A38' }}>Lost your password?</p>
                                </form>
                            </div>

                            <div style={{ width: '30%', }}>
                                <h1 style={{ fontWeight: 'bold' }}>Sign up</h1>
                                <form style={{ display: "flex", flexDirection: 'column' }}>
                                    <label style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                                        <span>Username or email address <span style={{ color: 'red' }}>*</span></span>
                                        <input type="text" required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                    </label>
                                    <label style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                                        <span>Password <span style={{ color: 'red' }}>*</span></span>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type={showPasswordSignUp ? 'text' : 'password'}
                                                required
                                                style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                                            />
                                            <span
                                                style={{ zIndex: '10', position: 'absolute', top: '50%', transform: 'translateY(-30%)', right: '8px', cursor: 'pointer', fontSize: '20px' }}
                                                onClick={() => setShowPasswordSignUp(!showPasswordSignUp)}
                                            >
                                                {showPasswordSignUp ? <FaEye /> : <FaEyeSlash />}
                                            </span>
                                        </div>
                                    </label>
                                    <label style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                                        <span>Confirm Password <span style={{ color: 'red' }}>*</span></span>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                required
                                                style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                                            />
                                            <span
                                                style={{ zIndex: '10', position: 'absolute', top: '50%', transform: 'translateY(-30%)', right: '8px', cursor: 'pointer', fontSize: '20px' }}
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                            </span>
                                        </div>
                                    </label>
                                    <button style={{ fontSize: '16px', marginTop: '10px', backgroundColor: '#1D2A38', color: 'white', borderRadius: '50px', cursor: 'pointer', width: '140px', height: '40px' }}>REGISTER</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage