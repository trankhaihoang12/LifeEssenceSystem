import React, { useEffect, useState } from 'react';
import {
  Container,
  HeroImage,
  ImageOverlay,
  Title,
  MetaInfo,
  Content,
  HighlightBox,
  CommentsSection,
  CommentWrapper,
  CommentAuthor,
  CommentDate,
  CommentHeader,
  CommentForm,
  FormInput,
  FormTextarea,
  SubmitButton,
  MainContent,
  PageWrapper,
  Sidebar, SidebarTitle, RecentPostItem, PostThumb,
  PostInfo, PostTitle, PostDate,
  CharCount,
} from './Style';
import { useNavigate, useParams } from 'react-router';
import * as BlogsService from '../../services/BlogsService'
import * as message from '../../components/MessageComponent/Message'


const BlogPost = () => {
  const { blogId } = useParams();  // Lấy ID sản phẩm từ URL
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate = useNavigate();



  const getToken = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData ? parsedUserData.token : null;
  };
  const token = getToken();
  const getUserId = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData && parsedUserData.user ? parsedUserData.user.id : null; // Lấy user_id từ userData
  };
  const UserId = getUserId()
  useEffect(() => {
    // Fetch blog details and comments
    const fetchBlogDetailsAndComments = async () => {
      try {
        const blogResponse = await BlogsService.getDetailsBlog(blogId);
        setBlog(blogResponse.data);

        const commentsResponse = await BlogsService.getAllComments(blogId);
        console.log('commentsResponse', commentsResponse)
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching blog or comments:', error);
      }
    };
    const fetchRecentPosts = async () => {
      try {
        const recentPostsResponse = await BlogsService.getRecentPosts();
        setRecentPosts(recentPostsResponse.data); // Cập nhật state với dữ liệu recentPosts
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };

    fetchBlogDetailsAndComments();
    fetchRecentPosts(); 
  }, [blogId]); // Khi ID thay đổi, sẽ gọi lại API


  const getFullImageUrl = (imagePath) => {
    return `http://localhost:4000/${imagePath.replace(/\\/g, '/')}`;
  };

  // Handle creating a comment
  const handleCreateComment = async () => {
    const token = getToken();
    const maxCommentLength = 200;
    if (!newComment) {
      message.error('Please write a comment!');

      return;
    }
    if (newComment.length > maxCommentLength) {
      message.error(`Your comment is too long! Please limit your comment to ${maxCommentLength} characters.`);
      return;
    }
    try {
      const response = await BlogsService.createComment(blogId, newComment, token);
      setComments([...comments, response.data]);  // Add the new comment to the list
      setNewComment('');  // Clear the input
      message.success('Comment successfully!');

    } catch (error) {
      message.error('Error comment!');

    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      const token = getToken(); // Retrieve token
      if (!token) {
        alert('You must be logged in to delete comments.');
        return;
      }

      const confirmed = window.confirm('Are you sure you want to delete this comment?');
      if (!confirmed) return;

      await BlogsService.deleteComment(commentId, token); // Call the API to delete the comment
      setComments((prevComments) => prevComments.filter((c) => c.id !== commentId)); // Update state
      message.success('Delete comment successfully!');

    } catch (error) {
      message.error('Failed to delete comment. Please try again.!');

    }
  };


  return (
    <PageWrapper>
      <MainContent>
        {/* Hero Image */}
        <HeroImage>
          {blog && blog.image_url ? (
            <img src={getFullImageUrl(blog.image_url)} alt={blog.title || 'Blog Title'} />
          ) : (
            <div>Loading Image...</div>
          )}
          <ImageOverlay>
            <Title>{blog?.title || 'Loading...'}</Title>
          </ImageOverlay>
        </HeroImage>

        {/* Meta Information */}
        <MetaInfo>
          <span>Author: {blog?.author_id}</span>
          <span>
            {new Date(blog?.created_at).toLocaleString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false, // Không sử dụng định dạng 12 giờ
            })}
          </span>
        </MetaInfo>

        {/* Article Content */}
        <Content>{blog?.content1}</Content>

        {/* Highlighted Content */}
        <HighlightBox>{blog?.highlightedContent}</HighlightBox>

        <Content>{blog?.content2}</Content>
        <Content>{blog?.content3}</Content>

        {/* Comments Section */}
        <CommentsSection>
          <h1>Comments ({comments.length})</h1>
          {comments.map((comment) => (
            <CommentWrapper key={comment.id}>
              <CommentHeader>
                <CommentAuthor>{comment?.User?.name}</CommentAuthor>
                <CommentDate>{new Date(comment.created_at).toLocaleDateString()}</CommentDate>
                {UserId === comment.author_id && (
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                )}
              </CommentHeader>
              <div>{comment.content}</div>
            </CommentWrapper>
          ))}
        </CommentsSection>

      
        {/* Comment Form */}
        <CommentForm>
          <h1>Leave a Comment</h1>
          <h2>You must sign-in to make or comment a post.</h2>
          <div>
            <CharCount count={newComment.length}>
              {newComment.length}/200 characters
            </CharCount>
            <FormTextarea
              value={newComment}
              onChange={(e) => {
                if (e.target.value.length <= 200) {  // Kiểm tra số ký tự trước khi cập nhật
                  setNewComment(e.target.value);   // Cập nhật nếu chưa vượt quá 200 ký tự
                }
              }}
              placeholder="Write your comment here..."
              rows="5"
            />
            <SubmitButton type="button" onClick={handleCreateComment}>Post a Comment</SubmitButton>
          </div>
        </CommentForm>
      </MainContent>
      {/* Sidebar */}
      <Sidebar>
        <SidebarTitle>Recently Posts </SidebarTitle>
        {recentPosts.slice(0, 5).map((post) => (
          <RecentPostItem key={post.id} onClick={() => navigate(`/blogs-post/${post.id}`)}>
            <PostThumb src={getFullImageUrl(post.image_url)} alt={post.title || 'Blog Title'} />
            <PostInfo>
              <PostTitle>{post.title}</PostTitle>
              <PostDate>{new Date(post.created_at).toLocaleDateString()}</PostDate>
            </PostInfo>
          </RecentPostItem>
        ))}
      </Sidebar>
    </PageWrapper>
  );
};

export default BlogPost;