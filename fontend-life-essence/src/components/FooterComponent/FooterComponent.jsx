import React, { useState } from 'react'
import { Footer, FooterBottom, FooterContent, FooterLink, FooterLinks, FooterSection, WrapperButton, WrapperHeaderFooter, WrapperInput, WrapperLogoFooter, WrapperLogoMini } from './Style';
import logo from '../../assets/images/Logo1.png';
import logoAddress from '../../assets/images/web-address-icon.png';
import logoCall from '../../assets/images/call-icon.png';
import emailjs from '@emailjs/browser';
const FooterComponent = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();

        // Config thông tin template từ EmailJS
        const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID1; 
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;


        const templateParams = {
            user_email: email, // Tham số từ email nhập vào
        };

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setMessage('You have successfully subscribed! 🎉');
                setEmail(''); // Reset trường input
            })
            .catch((error) => {
                console.error('FAILED...', error);
                setMessage('Oops! Something went wrong. Please try again.');
            });
    };
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#F4f4f4', }}>
                <div style={{ height: '200px', width: '800px', backgroundColor: '#F4f4f4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '100px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '600', fontStyle: 'normal' }}>Sign Up For Newsletter</span>
                    <div style={{ width: '200px', marginTop: '10px', textAlign: 'center', color: '#7d879c'}}>
                        <p>Join 60.000+ Subscribers and get a new discount coupon on every Saturday.</p>
                    </div>
                    <form onSubmit={handleSubscribe}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #fff', borderRadius: '20px', width: '500px', height: '35px', backgroundColor: '#fff', marginTop: '20px' }}>
                            <WrapperInput
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <WrapperButton type="submit">
                                <span style={{ fontSize: '10px', color: '#fff', fontWeight: 600 }}>SUBSCRIBE</span>
                            </WrapperButton>
                        </div>
                    </form>
                    {message && <p style={{ color: '#007bff', marginTop: '10px' }}>{message}</p>}
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
                                <h4 style={{ color: 'black', fontSize: '14px' }}>254 Nguyen Van Linh, Da Nang, Viet Nam</h4>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <WrapperLogoMini src={logoCall} alt="logoCall" />
                            <div>
                                <div style={{
                                    color: 'black', fontWeight: 'bold', textAlign: 'left'
                                }}>Nguyen Tien Manh</div>
                                <h4 style={{ color: 'black', fontSize: '14px' }}>+84 931 378 551</h4>
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
                                <FooterLink><a href="/page-contruction">Newsroom</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Sell Your Pharmacy</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Affiliate Program</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Careers</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Investor Relations</a></FooterLink>
                            </FooterLinks>
                        </FooterSection>
                        <div className="footer-contact" style={{ margin: '10px' }}>
                            <span style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'black', fontSize: '15px' }}>Categories</span>
                            <FooterLinks>
                                <FooterLink><a href="/page-contruction">Devices</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Family Care</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Fitness</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Lifestyle</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Personal care</a></FooterLink>
                            </FooterLinks>
                        </div>
                        <div className="footer-contact" style={{ margin: '10px' }}>
                            <span style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'black', fontSize: '15px' }}>Our services</span>
                            <FooterLinks>
                                <FooterLink><a href="/page-contruction">Shipping</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Returns</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Product Recalls</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Contact Us</a></FooterLink>
                                <FooterLink><a href="/page-contruction">Site Map</a></FooterLink>
                            </FooterLinks>
                        </div>
                        <div className="footer-social" style={{ margin: '10px' }}>
                            <span style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'black', fontSize: '15px' }}>Our services</span>
                            <FooterLinks>
                                <FooterLink><a href="/">254 Nguyen Van Linh, Da Nang, Viet Nam</a></FooterLink>
                                <FooterLink><a href="/">📞+84 931 378 551</a></FooterLink>
                                <FooterLink><a href="/">✉️ ngyenmanh002347@gmail.com</a></FooterLink>
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