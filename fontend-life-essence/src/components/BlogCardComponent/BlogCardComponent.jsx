import React, { useEffect } from 'react'
import { BlogImage, BlogTitle, Card, CardContent, ImageWrapper, ReadMoreButton, ReadMoreText, ReadMoreWrapper } from './Style'
import { IoMdAdd } from 'react-icons/io'
import blog_1_test from '../../assets/images/blog-1_test.jpg';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import * as BlogsService from '../../services/BlogsService'

const BlogCardComponent = ({blog}) => {
    const [blogsData, setBlogsData] = useState([]); // Đổi tên state
    const [selectedImage, setSelectedImage] = useState(''); // Lưu trữ hình ảnh được chọn
    const [error, setError] = useState(null); // State để lưu lỗi
    const navigate = useNavigate();

    // Hàm để điều hướng đến trang chi tiết blog
    const handleDetailsBlogs = (blogId) => {
        navigate(`/blogs-post/${blogId}`);
    };

    // const getToken = () => {
    //     const storedUserData = localStorage.getItem('userData');
    //     const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    //     return parsedUserData?.token || null;
    // };
    
    // // Lấy danh sách blog từ API
    // useEffect(() => {
    //     const fetchBlogs = async () => {
    //         try {
    //             const blogs = await BlogsService.getAllBlog();
    //             console.log('manh', blogs)
    //             setBlogsData(blogs.data);

    //         } catch (err) {
    //             console.error('Không thể lấy danh sách blog:', err);
    //             setError('Không thể lấy danh sách blog');
    //         }
    //     };

    //     fetchBlogs();
    // }, []); 


  return (
    <>
         
              <Card key={blog?.id} onClick={() => handleDetailsBlogs(blog?.id)}>
          <ImageWrapper>
                      <BlogImage src={blog?.image_url || blog_1_test} alt={blog?.title} />
          </ImageWrapper>
          <CardContent>
                      <BlogTitle>{blog?.title}</BlogTitle>
              <ReadMoreWrapper>
                  <ReadMoreButton>
                      <IoMdAdd style={{ fontSize: '20px', color: '#fff', margin: 'auto'  }} />
                  </ReadMoreButton>
                  <ReadMoreText>READ MORE</ReadMoreText>
              </ReadMoreWrapper>
          </CardContent>
      </Card>
    </>
  )
}

export default BlogCardComponent