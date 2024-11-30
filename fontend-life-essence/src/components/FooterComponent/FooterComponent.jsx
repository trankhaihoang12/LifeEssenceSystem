import React from 'react'
import { Footer, FooterBottom, FooterContent, FooterLink, FooterLinks, FooterSection, WrapperButton, WrapperHeaderFooter, WrapperInput, WrapperLogoFooter, WrapperLogoMini } from './Style';
import logo from '../../assets/images/Logo1.png';
import logoAddress from '../../assets/images/web-address-icon.png';
import logoCall from '../../assets/images/call-icon.png';
const FooterComponent = () => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#F4f4f4', }}>
                <div style={{ height: '200px', width: '800px', backgroundColor: '#F4f4f4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '100px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '600', fontStyle: 'normal' }}>Sign Up For Newsletter</span>
                    <div style={{ width: '200px', marginTop: '10px', textAlign: 'center', color: '#7d879c'}}>
                        <p>Join 60.000+ Subscribers and get a new discount coupon on every Saturday.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #fff', borderRadius: '20px', width: '500px', height: '35px', backgroundColor: '#fff' , marginTop: '20px'}}>
                        <WrapperInput
                            type="text"
                            placeholder="Your email address"

                        />
                        <WrapperButton onClick={''}>
                            <span style={{ fontSize: '10px', color: '#fff' ,fontWeight: 600}}>SUBSCRIBE .. </span>
                        </WrapperButton>
                    </div>
                </div>
            </div>
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
        </div>
    );
}

export default FooterComponent