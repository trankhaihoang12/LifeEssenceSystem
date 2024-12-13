import React, { useEffect, useState } from 'react';
import { BlogSection, BlogSectionTitle, BlogPostsContainer, BlogPost, BlogPostImage, BlogPostContent, BlogPostTitle, BlogPostAuthor, BlogPostExcerpt, BlogPostLink, BannerContainer, BannerTitle, SearchSection, SearchField, BlogForm, BlogFormTitle, BlogInput, BlogButton } from './Style';
import * as BlogsService from '../../services/BlogsService';
import * as message from '../../components/MessageComponent/Message'


const DetailsBlogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author_id: '',
    image_url: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    formDataToSend.append('content', formData.content); // Kiểm tra xem formData.content có giá trị không
    formDataToSend.append('author_id', userId); // Đảm bảo author_id không phải là null
    formDataToSend.append('image_url', formData.image_url);
    formDataToSend.append('is_approved', false);
    try {
      const token = localStorage.getItem('token');
      await BlogsService.writeBlog(formDataToSend, token);

      message.success('Bài viết đã được gửi thành công và đang chờ admin duyệt.!');
      setShowForm(false);
      // Reset form
      setFormData({
        title: '',
        content: '',
        author_id: '',
        image_url: '',
      });
    } catch (error) {
      message.error('Bài viết gửi Thất bại!');
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
      <BannerContainer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <BannerTitle style={{ flex: '1' }}>Healthy living</BannerTitle>
        <SearchSection style={{ flex: '2', textAlign: 'center' }}>
          <SearchField>
            <select id="topic-select" style={{ width: '400px', borderRadius: '8px' }}>
              <option value="all" style={{ fontSize: '12px' }}>All topics</option>
              <option value="vitamins">Vitamins</option>
              <option value="health">Health</option>
            </select>
          </SearchField>
        </SearchSection>
        <div style={{ flex: '1', textAlign: 'right' }}>
          <BlogButton onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Create New Blog'}
          </BlogButton>
        </div>
      </BannerContainer>


      {/* Blog Creation Form */}
      {showForm && (
        <BlogForm onSubmit={handleFormSubmit}>
          <BlogFormTitle>Create New Blog</BlogFormTitle>
          <BlogInput
            type="text"
            name="title"
            value={formData.title}
            placeholder="Blog Title"
            onChange={handleInputChange}
            required
          />
          <BlogInput
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
            accept="image/*" // Chỉ cho phép chọn hình ảnh
            required
          />
          <BlogInput
            as="textarea"
            name="content"
            value={formData.content}
            placeholder="Content"
            onChange={handleInputChange}
            required
          />
          <BlogInput
            as="select"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="vitamins">Vitamins</option>
            <option value="health">Health</option>
          </BlogInput>
          <BlogButton type="submit" disabled={isSubmitting}>
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
                      {post.category === 'vitamins' ? 'Vitamin & Dinh dưỡng' : 'Sức khỏe & An toàn'}
                    </span>
                  </div>
                  <BlogPostTitle>{post.title}</BlogPostTitle>
                  <BlogPostAuthor>
                    Author: {post.author_id} • {post.date} • {post.estimatedReadTime}
                  </BlogPostAuthor>
                  <BlogPostExcerpt>
                    {post.content.length > 150
                      ? `${post.content.substring(0, 150)}...`
                      : post.content}
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