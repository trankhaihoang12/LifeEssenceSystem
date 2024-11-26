import React from 'react'
import { Footer, FooterBottom, FooterContent, FooterLink, FooterLinks, FooterSection, WrapperHeaderFooter, WrapperLogoFooter, WrapperLogoMini } from './Style';
import logo from '../../assets/images/Logo1.png';
import logoAddress from '../../assets/images/web-address-icon.png';
import logoCall from '../../assets/images/call-icon.png';
const FooterComponent = () => {
    return (
        <div style={{ height: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'rgb(239, 239, 239)' }}>
            <Footer className="footer" >
                <WrapperHeaderFooter>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <WrapperLogoMini src={logoAddress} alt="logoAddress" />
                        <div>
                            <div style={{
                                color: 'black', fontWeight: 'bold', textAlign: 'left'
                            }}>Address</div>
                            <h4 style={{ color: 'black', fontSize: '14px' }}>9066 Green Lake Drive Chevy Chase, MD 20815</h4>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <WrapperLogoMini src={logoCall} alt="logoCall" />
                        <div>
                            <div style={{
                                color: 'black', fontWeight: 'bold', textAlign: 'left'
                            }}>Nguyễn Tiến Mạnh</div>
                            <h4 style={{ color: 'black', fontSize: '14px' }}>(1800)-88-66-990</h4>
                        </div>


                    </div>
                </WrapperHeaderFooter>
                <FooterContent className="footer-content">
                    <div style={{ width: '240px' }}>
                        <WrapperLogoFooter src={logo} alt="Logo" />
                        <div style={{ width: '240px', color: '#7d879c', fontSize: '12px', fontWeight: 'bold' }}>Life Essence is proud of being a best Pharmacy Online shops in VietNam with high-quality medicines, supplements, healthcare product, …</div>
                    </div>
                    <FooterSection className="footer-links">
                        <span style={{ color: 'black', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '15px' }}>information</span>
                        <FooterLinks>
                            <FooterLink><a href="/">Newsroom</a></FooterLink>
                            <FooterLink><a href="/">Sell Your Pharmacy</a></FooterLink>
                            <FooterLink><a href="/">Affiliate Program</a></FooterLink>
                            <FooterLink><a href="/">Careers</a></FooterLink>
                            <FooterLink><a href="/">Investor Relations</a></FooterLink>
                        </FooterLinks>
                    </FooterSection>
                    <div className="footer-contact" style={{ margin: '10px' }}>
                        <span style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'black', fontSize: '15px' }}>Categories</span>
                        <FooterLinks>
                            <FooterLink><a href="/">Devices</a></FooterLink>
                            <FooterLink><a href="/">Family Care</a></FooterLink>
                            <FooterLink><a href="/">Fitness</a></FooterLink>
                            <FooterLink><a href="/">Lifestyle</a></FooterLink>
                            <FooterLink><a href="/">Personal care</a></FooterLink>
                        </FooterLinks>
                    </div>
                    <div className="footer-contact" style={{ margin: '10px' }}>
                        <span style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'black', fontSize: '15px' }}>Our services</span>
                        <FooterLinks>
                            <FooterLink><a href="/">Shipping</a></FooterLink>
                            <FooterLink><a href="/">Returns</a></FooterLink>
                            <FooterLink><a href="/">Product Recalls</a></FooterLink>
                            <FooterLink><a href="/">Contact Us</a></FooterLink>
                            <FooterLink><a href="/">Site Map</a></FooterLink>
                        </FooterLinks>
                    </div>
                    <div className="footer-social" style={{ margin: '10px' }}>
                        <span style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'black', fontSize: '15px' }}>Our services</span>
                        <FooterLinks>
                            <FooterLink><a href="/">254 Nguyen Van Linh, Da Nang, Viet Nam</a></FooterLink>
                            <FooterLink><a href="/">📞+351 910 331 000</a></FooterLink>
                            <FooterLink><a href="/">✉️ contact @example.com</a></FooterLink>
                        </FooterLinks>
                    </div>
                </FooterContent>
                <FooterBottom className="footer-bottom">
                    <p style={{ display: 'flex' }}>Copyright © 2024 {new Date().getFullYear()}  <span style={{ color: '#00ccff' }}>_Life Essense</span>. All Rights Reserved.</p>
                    <img src="https://demo2.themelexus.com/medilazar/wp-content/uploads/2022/11/Footer-Bitmap.png" alt="" />
                </FooterBottom>
            </Footer>
        </div>
    );
}

export default FooterComponent