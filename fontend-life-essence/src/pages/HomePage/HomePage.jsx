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
import { FaBahai, FaCannabis, FaHeartbeat, FaLongArrowAltRight } from 'react-icons/fa';
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
import { useNavigate } from 'react-router';





const HomePage = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]); // State for categories
  const healthyScroll = useHorizontalScroll(900);
  const trendingScroll = useHorizontalScroll(300);
  const blogScroll = useHorizontalScroll(300);

 
  const loadCategories = async () => {
    try {
      const data = await ProductsService.getAllCategories();
      const categoryData = data; // Truy cập vào mảng danh mục
      setCategories(categoryData); // Set fetched categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      console.log('Bắt đầu gọi API...');

      if (products.length > 0) {
        console.log('Dùng cache sản phẩm');
        return;
      }

      setLoading(true);
      const data = await ProductsService.fetchAllProducts({
        page: 1,
        limit: 10,
      });
      

      if (data.products.length > 0) {
        setProducts(data.products);
        localStorage.setItem('products', JSON.stringify(data.products));
        setTotalPages(data.totalPages);
      } else {
        console.log('Không tìm thấy sản phẩm nào.');
      }
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadProducts();
    loadCategories()
  }, []); // Khi `page` thay đổi, load lại sản phẩm

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`); // Navigate to the category detail page
  };
  return (
    <div style={{ height: 'auto', backgroundColor: '#f0f9fb' }}>
      <div style={{ height: '80px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ height: '40px', width: '90%', alignItems: 'center', display: 'flex', margin: 'auto', justifyContent: 'space-between', }}>

          {categories.map((category, index) => (
            <WrraperItem key={category.category_id} onClick={() => handleCategoryClick(category.category_id)}>
              <IconWrapper style={{ backgroundColor: getCategoryColor(index) }}>
                <Icon>
                  {getCategoryIcon(index)}
                </Icon>
              </IconWrapper>
              <TextWrapper>
                <Title>{category.name}</Title>
                <Subtitle>{category.description}</Subtitle>
              </TextWrapper>
              <Separator src={line} alt="line" />
            </WrraperItem>
          ))}

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
            {products.map((product) => {
              // Kiểm tra rating
              if (product?.ratings === 5) {
                return <CardComponent key={product.id} product={product} />;
              }

              return null; // Bỏ qua nếu không đúng điều kiện
            })}
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

          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', height: '100%' }}>
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

      <div style={{ height: '500px', position: 'relative' }}>
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
// Utility to get colors based on index
const getCategoryColor = (index) => {
  const colors = ['#24AEB1', '#ffa366', '#F54F9A', '#83C847', '#51ACF6', '#ff9999', '#FFB61B'];
  return colors[index % colors.length];
};

// Utility to get icons based on index
const getCategoryIcon = (index) => {
  const icons = [
    <FaBriefcaseMedical />,
    <FaCannabis />,
    <GiHeartPlus />,
    <GiNotebook />,
    <FaHeartbeat />,
    <FaBahai />,
    <RiPsychotherapyLine />
  ];
  return icons[index % icons.length];
};

export default HomePage