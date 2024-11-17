import React, { useEffect, useState } from 'react'
import { FaBriefcaseMedical } from "react-icons/fa6";
import line from '../../assets/images/line.png';
import Slide1 from '../../assets/images/Slide1.png';
import Slide2 from '../../assets/images/Slide2.png';
import Slide3 from '../../assets/images/Slide3.png';
import Home_feedback from '../../assets/images/Home_feedback.png';
import Home_feedback1 from '../../assets/images/Home_feedback1.png';
import Home_feedback2 from '../../assets/images/Home_feedback2.png';
import Home_vector from '../../assets/images/Home_vector.png';
import Home_deal1 from '../../assets/images/Home_deal1.png';
import { FaHeartbeat, FaLongArrowAltRight } from 'react-icons/fa';
import { GiHeartPlus, GiNotebook } from 'react-icons/gi';
import { RiPsychotherapyLine } from 'react-icons/ri';
import { Button, Icon, IconWrapper, ProductsContainer, ProductsWrapper, Separator, Subtitle, TextWrapper, Title, WrraperItem } from './Style';
import { Rate } from 'antd';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import BlogCardComponent from '../../components/BlogCardComponent/BlogCardComponent';
import IntroductionComponent from '../../components/IntroductionComponent/IntroductionComponent';
import PopularCategories from '../../components/PopularCategoriesComponent/PopularCategories';
import useHorizontalScroll from '../../hooks/useHorizontalScroll';
import * as ProductsService from '../../services/ProductsService'





const HomePage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const healthyScroll = useHorizontalScroll(300);
  const trendingScroll = useHorizontalScroll(300);
  const blogScroll = useHorizontalScroll(300);


  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductsService.fetchAllProducts({ page, limit: 4 }); // Không cần token
      console.log('Dữ liệu sản phẩm nhận được:', data.products); 
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  return (
    <div style={{ height: 'auto', backgroundColor: '#f0f9fb' }}>
      <div style={{ height: '80px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ height: '40px', width: '75%', alignItems: 'center', display: 'flex', margin: 'auto', justifyContent: 'space-between', }}>

          <WrraperItem>
            <IconWrapper style={{ backgroundColor: '#24AEB1' }}>
              <Icon>
                <FaBriefcaseMedical />
              </Icon>
            </IconWrapper>
            <TextWrapper>
              <Title>Medicine</Title>
              <Subtitle>Over 25000 products</Subtitle>
            </TextWrapper>
            <Separator src={line} alt="line" />
          </WrraperItem>

          <WrraperItem>
            <IconWrapper style={{ backgroundColor: '#F54F9A' }}>
              <Icon><GiHeartPlus /></Icon>
            </IconWrapper>
            <TextWrapper>
              <Title>Wellness</Title>
              <Subtitle>Health products </Subtitle>
            </TextWrapper>
            <Separator src={line} alt="line" />
          </WrraperItem>

          <WrraperItem>
            <IconWrapper style={{ backgroundColor: '#83C847' }}>
              <Icon><GiNotebook /></Icon>
            </IconWrapper>
            <TextWrapper>
              <Title>Diagnostic</Title>
              <Subtitle>Book tests & checkups</Subtitle>
            </TextWrapper>
            <Separator src={line} alt="line" />
          </WrraperItem>

          <WrraperItem>
            <IconWrapper style={{ backgroundColor: '#51ACF6' }}>
              <Icon><FaHeartbeat /></Icon>
            </IconWrapper>
            <TextWrapper>
              <Title>Health Corner</Title>
              <Subtitle>Trending from health experts</Subtitle>
            </TextWrapper>
            <Separator src={line} alt="line" />
          </WrraperItem>

          <WrraperItem>
            <IconWrapper style={{ backgroundColor: '#FFB61B' }}>
              <Icon><RiPsychotherapyLine /></Icon>
            </IconWrapper>
            <TextWrapper>
              <Title>Others</Title>
              <Subtitle>More info</Subtitle>
            </TextWrapper>
          </WrraperItem>

        </div>
      </div>

      {/* Slide */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <SliderComponent arrImages={[Slide1, Slide2, Slide3]} />
      </div>

      {/* Giới thiệu */}
      <IntroductionComponent />

      {/* Giới thiệu số lượng sản phẩm */}
      <PopularCategories />
      {/* Sản phẩm healthy */}

      <div style={{ height: '460px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontSize: '30px', fontWeight: 'bold', marginTop: '10px' }}>Health Products</span>
        </div>
        <ProductsContainer ref={healthyScroll.scrollRef}>
          <ProductsWrapper>
            {products.map((product) => (
              <CardComponent key={product.id} product={product} /> // Truyền dữ liệu vào CardComponent
            ))}
          </ProductsWrapper>
        </ProductsContainer>
        <Button position="left" onClick={healthyScroll.scrollPrevious}>Previous</Button>
        <Button position="right" onClick={healthyScroll.scrollNext}>Next</Button>
      </div>
      {/* Giới thiệu 2 */}

      <div style={{ position: 'relative', height: '350px', width: '100%', backgroundColor: '#E8F3FF' }}>
        <img src={Home_feedback} alt="Home_feedback" style={{ height: '350px', objectFit: 'cover' }} />
        <div style={{ display: 'flex', width: '100%', height: '350px', position: 'absolute', top: 0, left: 0 }}>
          <div style={{ display: 'flex', width: '50%', justifyContent: 'center' }}>
            <div style={{ color: '#FFFFFF', display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'center' }}>
              <span style={{ fontSize: '13px', color: '#2EA5B6', fontWeight: 'bold' }}>DEALS OF THE DAY</span>
              <span style={{ fontSize: '35px', color: '#1D2A38', fontWeight: 'bold' }}>Natural Promotes Focus and Memory</span>
              <span style={{ fontSize: '13px', color: '#000000', fontWeight: 'bold' }}>Hot Price: <span style={{ fontSize: '24px', color: '#F34770' }}>$349.0</span></span>

              <div style={{ display: 'flex', width: '130px', marginTop: '20px' }}>
                <div style={{ height: '40px', width: '40px', borderRadius: '100%', backgroundColor: '#24AEB1', display: 'flex' }}>
                  <FaLongArrowAltRight style={{ margin: 'auto', fontSize: '30px' }} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: 'bold', textDecoration: 'underline', color: '#000', display: 'flex', margin: 'auto' }}>SHOP NOW</span>
              </div>
            </div>
          </div>
          <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={Home_deal1} alt="Home_deal1" style={{ width: '480px', height: '284px' }} />
          </div>
        </div>
      </div>

      {/* sản phẩm trending */}

      <div style={{ height: '460px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontSize: '30px', fontWeight: 'bold', marginTop: '10px' }}>Trending Products</span>
        </div>
        <Button position="left" onClick={trendingScroll.scrollPrevious}>Previous</Button>
        <ProductsContainer ref={trendingScroll.scrollRef}>
          <ProductsWrapper>
            {/* Các sản phẩm  */}
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </ProductsWrapper>
        </ProductsContainer>

        <Button position="right" onClick={trendingScroll.scrollNext}>Next</Button>
      </div>

      {/* Giới thiệu 3 */}

      <div style={{ position: 'relative', height: '400px', width: '100%', backgroundColor: '#E8F3FF' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '400px' }}>
          <img src={Home_feedback2} alt="Home_feedback2" style={{ objectFit: 'cover', display: 'flex', justifyContent: 'left' }} />

        </div>
        <div style={{ display: 'flex', width: '100%', height: '400px', position: 'absolute', top: 0, left: 0 }}>

          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', height: '400%' }}>
            <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
              <img src={Home_feedback1} alt="Home_feedback1" style={{ width: '420px', height: '304px' }} />
            </div>

            <div style={{ width: '40%', display: 'flex', justifyContent: 'center', height: '400px' }}>
              <div style={{ color: '#FFFFFF', display: 'flex', flexDirection: 'column', width: '70%', marginTop: '30px' }}>
                <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#000' }}> Trusted by 10 Lakh Customers across 3600+ Cities</span>
                <div style={{ marginTop: '20px' }}>
                  <img src={Home_vector} alt="Home_vector" style={{ fontSize: '20px', }} />
                  <Rate allowHalf defaultValue={5} style={{ fontSize: '10px', marginLeft: '10px' }} />
                  <div >
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}> Medilazar pharmacy is the best one. Staffs are so supportive and behaved. Medicine price is genuine. Thanks</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <img src={Home_feedback1} alt="Home_feedback1" style={{ width: '50px', height: '50px', borderRadius: '100%', marginTop: '20px' }} />
                      <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Nguyên tiến Mạnh</span>
                      <span style={{ fontSize: '14px', color: '#ccc' }}>August  28, 2020</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bài viết và blog */}

      <div style={{ height: '460px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontSize: '30px', fontWeight: 'bold', marginTop: '10px' }}>Latest Articles & Blogs</span>
        </div>
        <ProductsContainer ref={blogScroll.scrollRef}>
          <ProductsWrapper>
            <BlogCardComponent />
            <BlogCardComponent />
            <BlogCardComponent />
            <BlogCardComponent />
            <BlogCardComponent />
            <BlogCardComponent />
            <BlogCardComponent />
            <BlogCardComponent />
            <BlogCardComponent />
            <BlogCardComponent />
            <BlogCardComponent />
            <BlogCardComponent />
          </ProductsWrapper>
        </ProductsContainer> 
        <Button position="left" onClick={blogScroll.scrollPrevious}>
          Previous
        </Button>
        <Button position="right" onClick={blogScroll.scrollNext}>
          Next
        </Button>
      </div>


    </div>


  )
}

export default HomePage