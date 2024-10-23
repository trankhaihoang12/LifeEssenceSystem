import React from 'react'
import { Footer, FooterBottom, FooterContent, FooterLink, FooterLinks, FooterSection, WrapperHeaderFooter, WrapperLogoFooter, WrapperLogoMini } from './Style';
import logo from '../../assets/images/Logo1.png';
import logoAddress from '../../assets/images/web-address-icon.png';
import logoCall from '../../assets/images/call-icon.png';
const FooterComponent = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'rgb(239, 239, 239)' }}>
            <Footer className="footer" >
                <WrapperHeaderFooter>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <WrapperLogoMini src={logoAddress} alt="logoAddress" />
                        <div>
                            <div style={{
                                color: 'black', fontWeight: 'bold', textAlign: 'left'
                            }}>Address</div>
                            <h4>9066 Green Lake Drive Chevy Chase, MD 20815</h4>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <WrapperLogoMini src={logoCall} alt="logoCall" />
                        <div>
                            <div style={{
                                color: 'black', fontWeight: 'bold', textAlign: 'left'
                            }}>Nguyễn Tiến Mạnh</div>
                            <h4>(1800)-88-66-990</h4>
                        </div>


                    </div>
                </WrapperHeaderFooter>
                <FooterContent className="footer-content">
                    <div style={{width: '240px'}}>
                        <WrapperLogoFooter src={logo} alt="Logo" />
                        <div style={{width: '240px',color: 'black', fontSize: '12px', fontWeight: 'bold'}}>Life Essence is proud of being a best Pharmacy Online shops in VietNam with high-quality medicines, supplements, healthcare product, …</div>
                    </div>
                    <FooterSection className="footer-links">
                        <h4 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Liên Kết</h4>
                        <FooterLinks>
                            <FooterLink><a href="/">Trang Chủ</a></FooterLink>
                            <FooterLink><a href="/about">Giới Thiệu</a></FooterLink>
                            <FooterLink><a href="/contact">Liên Hệ</a></FooterLink>
                            <FooterLink><a href="/privacy-policy">Chính Sách Bảo Mật</a></FooterLink>
                        </FooterLinks>
                    </FooterSection>
                    <div className="footer-contact" style={{margin: '10px'}}>
                        <h4 style={{ fontWeight: 'bold', textTransform: 'uppercase' }} >Thông Tin Liên Hệ</h4>
                        <h5 style={{fontWeight: 'bold'}}>Email: contact@yourcompany.com</h5>
                        <h5 style={{ fontWeight: 'bold' }}>Số điện thoại: +84 123 456 789</h5>
                    </div>
                    <div className="footer-social" style={{ margin: '10px' }}>
                        <h4 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Mạng Xã Hội</h4>
                        <ul>
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        </ul>
                    </div>
                </FooterContent>
                <FooterBottom className="footer-bottom">
                    <p style={{ display: 'flex' }}>Copyright © 2024 {new Date().getFullYear() }  <span style={{ color: '#00ccff'}}>_Life Essense</span>. All Rights Reserved.</p>
                </FooterBottom>
            </Footer>
        </div>
    );
}

export default FooterComponent