import React, { useEffect, useState } from 'react'
import { FaBriefcaseMedical } from "react-icons/fa6";
import line from '../../assets/images/line.png';
import Slide1 from '../../assets/images/Slide1.png';
import Slide2 from '../../assets/images/Slide2.png';
import Slide3 from '../../assets/images/Slide3.png';
import Image_Introduction from '../../assets/images/Image_Introduction.png';
import Home_category1 from '../../assets/images/Home_category1.png';
import Home_category2 from '../../assets/images/Home_category2.png';
import Home_category3 from '../../assets/images/Home_category3.png';
import Home_category4 from '../../assets/images/Home_category4.png';
import Home_category5 from '../../assets/images/Home_category5.png';
import Home_category6 from '../../assets/images/Home_category6.png';
import Home_category7 from '../../assets/images/Home_category7.png';
import product_test from '../../assets/images/product-test.jpg';
import { FaHeartbeat } from 'react-icons/fa';
import { GiHeartPlus, GiNotebook } from 'react-icons/gi';
import { RiPsychotherapyLine } from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { RxTriangleRight } from 'react-icons/rx';
import { WrraperTriangle } from './Style';
import { Rate } from 'antd';
import { BsCart4 } from 'react-icons/bs';

const slides = [Slide1, Slide2, Slide3];
const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Thay đổi slide mỗi 3 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);
  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };
  return (
    <div style={{ height: '500vh', backgroundColor: '#fff' }}>
      <div style={{ height: '200vh', backgroundColor: '#f0f9fb' }}>
        <div style={{ height: '80px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ height: '40px', width: '75%', alignItems: 'center', display: 'flex', margin: 'auto', justifyContent: 'space-between', }}>

            <div style={{ height: '40px', width: '260px', display: 'flex' }}>
              <div style={{ height: '40px', width: '40px', borderRadius: '100%', backgroundColor: '#24AEB1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '20px', color: '#fff', margin: 'auto', justifyContent: 'center', display: 'flex' }}><FaBriefcaseMedical /></span>
              </div>
              <div style={{ width: '170px', margin: 'auto', flexDirection: 'column', display: 'flex' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'black', }}>Medicine</span>
                <span style={{ fontSize: '13px', color: 'black' }}>Over 25000 products</span>
              </div>
              <img src={line} alt="line" style={{ fontSize: '0px', height: '30px', width: '10px', margin: 'auto 0' }} />
            </div>

            <div style={{ height: '40px', width: '260px', display: 'flex' }}>
              <div style={{ height: '40px', width: '40px', borderRadius: '100%', backgroundColor: '#F54F9A', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '20px', color: '#fff', margin: 'auto', justifyContent: 'center', display: 'flex' }}><GiHeartPlus /></span>
              </div>
              <div style={{ width: '170px', margin: 'auto', flexDirection: 'column', display: 'flex' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'black', }}>Wellness</span>
                <span style={{ fontSize: '13px', color: 'black' }}>Health products</span>
              </div>
              <img src={line} alt="line" style={{ fontSize: '0px', height: '30px', width: '10px', margin: 'auto 0' }} />
            </div>

            <div style={{ height: '40px', width: '260px', display: 'flex' }}>
              <div style={{ height: '40px', width: '40px', borderRadius: '100%', backgroundColor: '#83C847', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '20px', color: '#fff', margin: 'auto', justifyContent: 'center', display: 'flex' }}><GiNotebook /></span>
              </div>
              <div style={{ width: '170px', margin: 'auto', flexDirection: 'column', display: 'flex' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'black', }}>Diagnostic</span>
                <span style={{ fontSize: '13px', color: 'black' }}>Book tests & checkups</span>
              </div>
              <img src={line} alt="line" style={{ fontSize: '0px', height: '30px', width: '10px', margin: 'auto 0' }} />
            </div>

            <div style={{ height: '40px', width: '260px', display: 'flex' }}>
              <div style={{ height: '40px', width: '40px', borderRadius: '100%', backgroundColor: '#51ACF6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '20px', color: '#fff', margin: 'auto', justifyContent: 'center', display: 'flex' }}><FaHeartbeat /></span>
              </div>
              <div style={{ width: '170px', margin: 'auto', flexDirection: 'column', display: 'flex' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'black', }}>Health Corner</span>
                <span style={{ fontSize: '13px', color: 'black' }}>Trending from health experts</span>
              </div>
              <img src={line} alt="line" style={{ fontSize: '0px', height: '30px', width: '10px', margin: 'auto 0' }} />
            </div>


            <div style={{ height: '40px', width: '260px', display: 'flex' }}>
              <div style={{ height: '40px', width: '40px', borderRadius: '100%', backgroundColor: '#FFB61B', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '20px', color: '#fff', margin: 'auto', justifyContent: 'center', display: 'flex' }}><RiPsychotherapyLine /></span>
              </div>
              <div style={{ width: '170px', margin: 'auto', flexDirection: 'column', display: 'flex' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'black', }}>Others</span>
                <span style={{ fontSize: '13px', color: 'black' }}>More info</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <img src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} style={{ objectFit: 'cover' }} />

          {/* Nút bên trái */}
          <div style={{ position: 'absolute', top: '50%', left: '50px', cursor: 'pointer', transform: 'translateY(-50%)' }} onClick={handlePrev}>
            <FontAwesomeIcon icon={faChevronLeft} size="3x" />
          </div>

          {/* Nút bên phải */}
          <div style={{ position: 'absolute', top: '50%', right: '50px', cursor: 'pointer', transform: 'translateY(-50%)' }} onClick={handleNext}>
            <FontAwesomeIcon icon={faChevronRight} size="3x" />
          </div>

          <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            {slides.map((_, index) => (
              <span key={index} style={{ fontSize: '20px', cursor: 'pointer', margin: '0 5px', color: currentSlide === index ? 'black' : 'lightgray' }} onClick={() => setCurrentSlide(index)}>
                ●
              </span>
            ))}
          </div>
        </div>

        {/* Giới thiệu */}

        <div style={{ height: '439px', justifyContent: 'center', display: 'flex', gap: '100px' }}>
          <div>
            <img src={Image_Introduction} alt="Image_Introduction" style={{ width: '439px', height: '445px' }} />
          </div>
          <div style={{ width: '510px', display: 'flex', flexDirection: "column", margin: 'auto 0' }}>
            <span style={{ fontSize: '16px', color: '#2EA5B6', fontWeight: 'bold' }}>WELCOME TO LIFE  ESSENCE</span>
            <span style={{ fontSize: '40px', fontWeight: 'bold' }}>We make healthcar Understandable, Accessible and Affordable.</span>
            <span style={{ fontSize: '16px', color: '#7D879C' }}>Medilazar brings to you an online platform, which can be accessed for all your health needs. We are trying to make healthcare a hassle-free experience for you. Get your allopathic, ayurvedic, homeopathic medicines, vitamins & nutrition supplements and other health-related products delivered at home.</span>
            <a href="https://www.youtube.com/watch?v=yDUbXnRdZh8" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', width: '190px', justifyContent: 'space-between', marginTop: '20px' }}>
                <WrraperTriangle>
                  <RxTriangleRight style={{ fontSize: '40px', color: '#fff' }} className="triangle" />
                </WrraperTriangle>

                <span style={{ margin: 'auto', fontSize: '15px', color: 'black', textDecoration: 'underline' }}>Watch Our Video</span>
              </div>
            </a>
          </div>
        </div>

        {/* Giới thiệu số lượng sản phẩm */}
        <div style={{ height: '449px', backgroundColor: '#E8F3FF' }}>
          <div style={{ padding: '10px', width: '700px', display: 'flex', justifyContent: 'center' }}>
            <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Popular Categories</span>
          </div>
          <div style={{ height: '150px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%' }}>

              {/* Trên */}
              <div style={{ height: '150px', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '46px' }}>
                <div style={{ height: '150px', width: '300px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto 10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Skin care</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#ABB8C3' }}>0 products</span>
                  </div>
                  <div style={{ margin: 'auto 10px' }} >
                    <img src={Home_category1} alt="Home_category1" style={{ width: '100px', height: '100px' }} />
                  </div>
                </div>
                <div style={{ height: '150px', width: '300px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto 10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Healthcare devices</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#ABB8C3' }}>2  products</span>
                  </div>
                  <div style={{ margin: 'auto 10px' }} >
                    <img src={Home_category2} alt="Home_category2" style={{ width: '100px', height: '100px' }} />
                  </div>
                </div>
                <div style={{ height: '150px', width: '300px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto 10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Covid essentials</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#ABB8C3' }}>4 products</span>
                  </div>
                  <div style={{ margin: 'auto 10px' }} >
                    <img src={Home_category3} alt="Home_category3" style={{ width: '100px', height: '100px' }} />
                  </div>
                </div>
                <div style={{ height: '150px', width: '300px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto 10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Health condition</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#ABB8C3' }}>10 products</span>
                  </div>
                  <div style={{ margin: 'auto 10px' }} >
                    <img src={Home_category4} alt="Home_category4" style={{ width: '100px', height: '100px' }} />
                  </div>
                </div>
              </div>

              {/* Dưới */}
              <div style={{ height: '150px', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '25px' }}>
                <div style={{ height: '150px', width: '420px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto 10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Infrared Thermometer</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#ABB8C3' }}>11 products</span>
                  </div>
                  <div style={{ margin: 'auto 10px' }} >
                    <img src={Home_category7} alt="Home_category7" style={{ width: '100px', height: '100px' }} />
                  </div>
                </div>
                <div style={{ height: '150px', width: '420px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto 10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Health food and drinks</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#ABB8C3' }}>5 products</span>
                  </div>
                  <div style={{ margin: 'auto 10px' }} >
                    <img src={Home_category6} alt="Home_category6" style={{ width: '100px', height: '100px' }} />
                  </div>
                </div>
                <div style={{ height: '150px', width: '420px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto 10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Fitness supplementss</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#ABB8C3' }}>3 products</span>
                  </div>
                  <div style={{ margin: 'auto 10px' }} >
                    <img src={Home_category5} alt="Home_category5" style={{ width: '100px', height: '100px' }} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Sản phẩm */}

        <div style={{ height: '460px'}}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{ fontSize: '30px', fontWeight: 'bold', marginTop: '10px' }}>Health Products</span>
          </div>


          <div style={{display: 'flex', justifyContent: 'center' , marginTop: '20px', gap: '20px'}}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '231px', height: '342px', backgroundColor: '#ccc' }}>
                <div style={{ width: '231px', display: "flex", justifyContent: 'center', marginTop: '10px' }}>
                  <img src={product_test} alt="product_test" style={{ width: '164px', height: '199px', margin: 'auto' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', height: '140px', padding: '10px' }}>
                  <span style={{ color: '#7D879C', fontSize: '8px' }}>Covid Essentials,Devices,Health Conditions</span>
                  <span style={{ color: '#000', fontSize: '12px', fontWeight: 'bold', marginTop: '6px' }}>Waterpik WP-100 - Dental Care</span>
                  <span style={{ marginTop: '8px' }}>
                    <Rate allowHalf defaultValue={2.5} style={{ fontSize: '10px' }} />
                  </span>
                  <span style={{ color: '#7D879C', fontSize: '10px', marginTop: '8px' }}>$ 165.54</span>
                  <div style={{ display: 'flex', gap: '20px', height: '40px', marginTop: '10px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#2EA5B6', borderRadius: '100%', display: 'flex' }}>
                      <BsCart4 style={{ fontSize: '20px', color: '#fff', margin: 'auto' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', margin: 'auto' }}>ADD TO CART</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '231px', height: '342px', backgroundColor: '#ccc' }}>
                <div style={{ width: '231px', display: "flex", justifyContent: 'center', marginTop: '10px' }}>
                  <img src={product_test} alt="product_test" style={{ width: '164px', height: '199px', margin: 'auto' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', height: '140px', padding: '10px' }}>
                  <span style={{ color: '#7D879C', fontSize: '8px' }}>Covid Essentials,Devices,Health Conditions</span>
                  <span style={{ color: '#000', fontSize: '12px', fontWeight: 'bold', marginTop: '6px' }}>Waterpik WP-100 - Dental Care</span>
                  <span style={{ marginTop: '8px' }}>
                    <Rate allowHalf defaultValue={2.5} style={{ fontSize: '10px' }} />
                  </span>
                  <span style={{ color: '#7D879C', fontSize: '10px', marginTop: '8px' }}>$ 165.54</span>
                  <div style={{ display: 'flex', gap: '20px', height: '40px', marginTop: '10px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#2EA5B6', borderRadius: '100%', display: 'flex' }}>
                      <BsCart4 style={{ fontSize: '20px', color: '#fff', margin: 'auto' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', margin: 'auto' }}>ADD TO CART</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '231px', height: '342px', backgroundColor: '#ccc' }}>
                <div style={{ width: '231px', display: "flex", justifyContent: 'center', marginTop: '10px' }}>
                  <img src={product_test} alt="product_test" style={{ width: '164px', height: '199px', margin: 'auto' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', height: '140px', padding: '10px' }}>
                  <span style={{ color: '#7D879C', fontSize: '8px' }}>Covid Essentials,Devices,Health Conditions</span>
                  <span style={{ color: '#000', fontSize: '12px', fontWeight: 'bold', marginTop: '6px' }}>Waterpik WP-100 - Dental Care</span>
                  <span style={{ marginTop: '8px' }}>
                    <Rate allowHalf defaultValue={2.5} style={{ fontSize: '10px' }} />
                  </span>
                  <span style={{ color: '#7D879C', fontSize: '10px', marginTop: '8px' }}>$ 165.54</span>
                  <div style={{ display: 'flex', gap: '20px', height: '40px', marginTop: '10px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#2EA5B6', borderRadius: '100%', display: 'flex' }}>
                      <BsCart4 style={{ fontSize: '20px', color: '#fff', margin: 'auto' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', margin: 'auto' }}>ADD TO CART</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '231px', height: '342px', backgroundColor: '#ccc' }}>
                <div style={{ width: '231px', display: "flex", justifyContent: 'center', marginTop: '10px' }}>
                  <img src={product_test} alt="product_test" style={{ width: '164px', height: '199px', margin: 'auto' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', height: '140px', padding: '10px' }}>
                  <span style={{ color: '#7D879C', fontSize: '8px' }}>Covid Essentials,Devices,Health Conditions</span>
                  <span style={{ color: '#000', fontSize: '12px', fontWeight: 'bold', marginTop: '6px' }}>Waterpik WP-100 - Dental Care</span>
                  <span style={{ marginTop: '8px' }}>
                    <Rate allowHalf defaultValue={2.5} style={{ fontSize: '10px' }} />
                  </span>
                  <span style={{ color: '#7D879C', fontSize: '10px', marginTop: '8px' }}>$ 165.54</span>
                  <div style={{ display: 'flex', gap: '20px', height: '40px', marginTop: '10px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#2EA5B6', borderRadius: '100%', display: 'flex' }}>
                      <BsCart4 style={{ fontSize: '20px', color: '#fff', margin: 'auto' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', margin: 'auto' }}>ADD TO CART</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '231px', height: '342px', backgroundColor: '#ccc' }}>
                <div style={{ width: '231px', display: "flex", justifyContent: 'center', marginTop: '10px' }}>
                  <img src={product_test} alt="product_test" style={{ width: '164px', height: '199px', margin: 'auto' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', height: '140px', padding: '10px' }}>
                  <span style={{ color: '#7D879C', fontSize: '8px' }}>Covid Essentials,Devices,Health Conditions</span>
                  <span style={{ color: '#000', fontSize: '12px', fontWeight: 'bold', marginTop: '6px' }}>Waterpik WP-100 - Dental Care</span>
                  <span style={{ marginTop: '8px' }}>
                    <Rate allowHalf defaultValue={2.5} style={{ fontSize: '10px' }} />
                  </span>
                  <span style={{ color: '#7D879C', fontSize: '10px', marginTop: '8px' }}>$ 165.54</span>
                  <div style={{ display: 'flex', gap: '20px', height: '40px', marginTop: '10px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#2EA5B6', borderRadius: '100%', display: 'flex' }}>
                      <BsCart4 style={{ fontSize: '20px', color: '#fff', margin: 'auto' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', margin: 'auto' }}>ADD TO CART</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

  )
}

export default HomePage