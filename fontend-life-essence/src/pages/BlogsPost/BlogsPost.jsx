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
import { useParams } from 'react-router';
import * as BlogsService from '../../services/BlogsService'
import * as message from '../../components/MessageComponent/Message'


const BlogPost = () => {
  const { blogId } = useParams();  // Lấy ID sản phẩm từ URL
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const article = {
    // title: 'Vitamin A - Chìa Khóa Cho Đôi Mắt Sáng Khỏe',
    // author: 'Tiến Sĩ Nguyễn Văn Hùng',
    // date: '12 March, 2024',
    // time: '9:00 PM',
    // imageUrl: 'https://prod-cdn.pharmacity.io/blog/vitamin-a-2-1.jpg',
    // content: `
    //   Vitamin A là một vi chất dinh dưỡng quan trọng không thể thiếu cho sức khỏe đôi mắt. 
    //   Nó đóng vai trò quan trọng trong việc duy trì thị lực, bảo vệ giác mạc và ngăn ngừa các 
    //   vấn đề về mắt như quáng gà, khô mắt và suy giảm thị lực.Vitamin A được mệnh danh là "vitamin của đôi mắt", 
    //   đóng vai trò quan trọng trong việc duy trì thị lực và sức khỏe của mắt. Ngoài ra, loại vitamin này còn có nhiệm vụ tăng cường hệ miễn dịch,
    //   hỗ trợ quá trình sinh trưởng và phát triển của cơ thể.Nguồn vitamin A dồi dào có trong các loại thực phẩm như cà rốt, khoai lang, trứng, và gan động vật',
    // `,
    // highlightedContent: `
    //   Việc bổ sung Vitamin A đúng cách sẽ giúp bảo vệ đôi mắt của bạn một cách hiệu quả, 
    //   mang lại ánh mắt sáng khỏe và tinh anh.
    // `,
    comments: [
      {
        id: 1,
        author: 'Tien Manh Nguyen',
        date: '24 July, 2024',
        content: 'Bài viết rất bổ ích và chi tiết. Cảm ơn tác giả đã chia sẻ!',
      },
      {
        id: 2,
        author: 'Tran Hoang',
        date: '20 December, 2024',
        content: 'Thông tin rất hữu ích cho việc chăm sóc sức khỏe mắt.',
      },
    ],
  };
  const recentPosts = [
    {
      id: 1,
      title: 'Vitamin C - Tăng Cường Hệ Miễn Dịch',
      date: '10 Dec, 2024',
      thumbnail: 'https://prod-cdn.pharmacity.io/blog/Q0gx3s5T-cam-2.webp',
    },
    {
      id: 2,
      title: 'Tầm Quan Trọng Của Việc Uống Đủ Nước Để Ngăn Ngừa Sỏi Thận',
      date: '05 Dec, 2024',
      thumbnail: 'https://prod-cdn.pharmacity.io/blog/FFdM1nbV-soi-than-2.jpg',
    },
    {
      id: 3,
      title: 'Tháp dinh dưỡng cân đối cho người trưởng thành',
      date: '01 Dec, 2024',
      thumbnail: 'https://prod-cdn.pharmacity.io/blog/thap-dinh-duong-1024x576.jpg',
    },
  ];


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

    fetchBlogDetailsAndComments();
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
          <span>Tác giả: {article.author}</span>
          <span>{blog?.created_at}</span>
        </MetaInfo>

        {/* Article Content */}
        <Content>{blog?.content}</Content>

        {/* Highlighted Content */}
        <HighlightBox>{article.highlightedContent}</HighlightBox>

        <Content>{blog?.content}</Content>

        {/* Comments Section */}
        <CommentsSection>
          <h1>Comments ({comments.length})</h1>
          {comments.map((comment) => (
            <CommentWrapper key={comment.id}>
              <CommentHeader>
                <CommentAuthor>{comment?.User?.name || 'Nguyễn tiến Mạnh'}</CommentAuthor>
                <CommentDate>{comment.created_at}</CommentDate>
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
        {recentPosts.map((post) => (
          <RecentPostItem key={post.id}>
            <PostThumb src={post.thumbnail} alt={post.title} />
            <PostInfo>
              <PostTitle>{post.title}</PostTitle>
              <PostDate>{post.date}</PostDate>
            </PostInfo>
          </RecentPostItem>
        ))}
      </Sidebar>
    </PageWrapper>
  );
};

export default BlogPost;