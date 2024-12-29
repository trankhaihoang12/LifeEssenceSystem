import React, { useEffect, useState } from 'react';
import { BlogSection, BlogSectionTitle, BlogPostsContainer, BlogPost, BlogPostImage, BlogPostContent, BlogPostTitle, BlogPostAuthor, BlogPostExcerpt, BlogPostLink, BannerContainer, BannerTitle, SearchSection, SearchField, BlogForm, BlogFormTitle, BlogInput, BlogButton } from './Style';
import * as BlogsService from '../../services/BlogsService';
import * as message from '../../components/MessageComponent/Message'


const DetailsBlogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [formData, setFormData] = useState({
    title: '',
    content1: '',
    content2: '',
    content3: '',
    author_id: '',
    image_url: '',
    highlightedContent: '', 
    category: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categories = ['Category 1', 'Category 2', 'Category 3'];
  // Fetch all blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await BlogsService.getAllBlog(); // Fetch all blogs
        setBlogPosts(blogs.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image_url: file, // Đảm bảo sử dụng image_url
    }));
  };


  const getUserId = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData?.user?.id;
  };
  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userId = getUserId(); // Kiểm tra xem userId có hợp lệ không
    if (!userId) {
      console.error('User ID is not available.');
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title); // Kiểm tra xem formData.title có giá trị không
    formDataToSend.append('content1', formData.content1);
    formDataToSend.append('content2', formData.content2);
    formDataToSend.append('content3', formData.content3);
    formDataToSend.append('author_id', userId); // Đảm bảo author_id không phải là null
    formDataToSend.append('image_url', formData.image_url);
    formDataToSend.append('highlightedContent', formData.highlightedContent);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('is_approved', false);

    try {
      const token = localStorage.getItem('token');
      await BlogsService.writeBlog(formDataToSend, token);

      message.success('The article has been sent successfully and is waiting for admin approval.!');
      setShowForm(false);
      // Reset form
      setFormData({
        title: '',
        content1: '',
        content2: '',
        content3: '',
        author_id: '',
        image_url: '',
        highlightedContent: '',
        category: '',
      });
    } catch (error) {
      message.error('Post sent Failed!');
      console.error('Error creating blog:', error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  // Fallback image for errors
  const handleImageError = (e) => {
    e.target.src = 'https://picsum.photos/200/200';
  };

  // Handle viewing blog details
  const viewBlogDetails = async (blogId) => {
    try {
      const blogDetails = await BlogsService.getDetailsBlog(blogId);
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };
  return (
    <div style={{ backgroundColor: 'rgb(244, 244, 244)', width: '100%', minHeight: '1000px' }}>
      {/* Banner Section */}
      <BannerContainer style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px',
        background: 'linear-gradient(to right, #28B463, #1E88E5)', // Gradient xanh lá và xanh dương
        color: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease-in-out',
      }}>
        <BannerTitle style={{
          flex: '1', fontSize: '32px', fontWeight: 'bold', textAlign: 'left', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.3s ease-in-out', cursor: 'pointer',
        }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} >
          Healthy Living
        </BannerTitle>
        <SearchSection style={{ flex: '2', textAlign: 'center' }}>
          <SearchField style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative',
            borderRadius: '50px', backgroundColor: '#ffffff', padding: '8px 16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease', width: '100%' // Chiều rộng của phần search field
          }}>
            {/* Icon tìm kiếm */}
            <i className="fa fa-search" style={{
              position: 'absolute', left: '12px', fontSize: '18px', color: '#888', transition: 'color 0.3s ease'
            }}></i>
            <select id="topic-select" style={{
              width: '90%', // Điều chỉnh lại độ rộng của select
              border: 'none',
              borderRadius: '50px',
              padding: '12px 40px', // Tăng padding để phần tìm kiếm dài ra và dễ sử dụng
              fontSize: '16px',
              backgroundColor: '#f7f7f7',
              color: '#333',
              appearance: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease, padding 0.3s ease',
              outline: 'none',
            }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </SearchField>
        </SearchSection>
        <div style={{ flex: '1', textAlign: 'right' }}>
          <BlogButton onClick={() => setShowForm(!showForm)} style={{
            backgroundColor: '#FF4081', color: 'white', padding: '12px 25px', borderRadius: '5px', cursor: 'pointer',
            fontSize: '16px', transition: 'background-color 0.3s ease-in-out', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            opacity: showForm ? '0.8' : '1',
          }}>
            {showForm ? 'Cancel' : 'Create New Blog'}
          </BlogButton>
        </div>
      </BannerContainer>



      {/* Blog Creation Form */}
      {showForm && (
        <BlogForm onSubmit={handleFormSubmit} style={{
          padding: '25px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.3s ease-in-out',
        }}>
          <BlogFormTitle>Create New Blog</BlogFormTitle>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            style={{
              padding: '12px', marginBottom: '15px', width: '100%', borderRadius: '8px', border: '1px solid #ccc',
              fontSize: '16px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease-in-out',
            }}
          >
            <option value="" disabled>Select a category</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
            <option value="finance">Finance</option>
          </select>
          <BlogInput
            type="text"
            name="title"
            value={formData.title}
            placeholder="Blog Title"
            onChange={handleInputChange}
            required
            style={{
              padding: '12px', marginBottom: '15px', width: '100%', borderRadius: '8px', border: '1px solid #ccc',
              fontSize: '16px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease-in-out',
            }}
          />
          <BlogInput
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
            accept="image/*" // Chỉ cho phép chọn hình ảnh
            required
            style={{
              padding: '12px', marginBottom: '15px', width: '100%', borderRadius: '8px', border: '1px solid #ccc',
              fontSize: '16px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease-in-out',
            }}
          />
          <BlogInput
            as="textarea"
            name="content1"
            value={formData.content1}
            placeholder="Content1"
            onChange={handleInputChange}
            required
            style={{
              padding: '12px', marginBottom: '15px', width: '100%', borderRadius: '8px', border: '1px solid #ccc',
              fontSize: '16px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease-in-out',
            }}
          />
          <BlogInput
            as="textarea"
            name="content2"
            value={formData.content2}
            placeholder="Content2"
            onChange={handleInputChange}
            required
            style={{
              padding: '12px', marginBottom: '15px', width: '100%', borderRadius: '8px', border: '1px solid #ccc',
              fontSize: '16px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease-in-out',
            }}
          />
          <BlogInput
            as="textarea"
            name="content3"
            value={formData.content3}
            placeholder="Content3"
            onChange={handleInputChange}
            required
            style={{
              padding: '12px', marginBottom: '15px', width: '100%', borderRadius: '8px', border: '1px solid #ccc',
              fontSize: '16px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease-in-out',
            }}
          />
          <BlogInput
            as="textarea"
            name="highlightedContent"
            value={formData.highlightedContent}
            placeholder="highlightedContent"
            onChange={handleInputChange}
            required
            style={{
              padding: '12px', marginBottom: '15px', width: '100%', borderRadius: '8px', border: '1px solid #ccc',
              fontSize: '16px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease-in-out',
            }}
          />
          <BlogButton type="submit" disabled={isSubmitting} style={{
            backgroundColor: '#4CAF50', color: 'white', padding: '12px 25px', borderRadius: '5px', cursor: 'pointer',
            fontSize: '16px', transition: 'background-color 0.3s ease-in-out', border: 'none',
          }}>
            {isSubmitting ? 'Submitting...' : 'Submit Blog'}
          </BlogButton>
        </BlogForm>
      )}

      {/* Blog List Section */}
      <BlogSection>
        <BlogSectionTitle>Latest Articles & Blogs</BlogSectionTitle>
        <BlogPostsContainer>
          {Array.isArray(blogPosts) ? (
            blogPosts.map((post) => (
              <BlogPost key={post.id}>
                <BlogPostImage
                  src={post.image_url}
                  alt={post.title}
                  onError={handleImageError}
                  loading="lazy"
                />
                <BlogPostContent>
                  <div>
                    <span style={{
                      backgroundColor: post.category === 'vitamins' ? '#e8f5e9' : '#fff3e0',
                      color: post.category === 'vitamins' ? '#2e7d32' : '#ef6c00',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      marginBottom: '0.75rem',
                      display: 'inline-block'
                    }}>
                      {post.category}
                    </span>
                  </div>
                  <BlogPostTitle>{post.title}</BlogPostTitle>
                  <BlogPostAuthor>
                    Author: {post.author_id} • {post.date} • {post.estimatedReadTime}
                  </BlogPostAuthor>
                  <BlogPostExcerpt>
                    {post.content1.length > 150
                      ? `${post.content1.substring(0, 150)}...`
                      : post.content1}
                  </BlogPostExcerpt>
                  <BlogPostLink href={`/blogs-post/${post.id}`} onClick={() => viewBlogDetails(post.id)}>Read more</BlogPostLink>
                </BlogPostContent>
              </BlogPost>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </BlogPostsContainer>
      </BlogSection>
    </div>
  );
};

export default DetailsBlogs;