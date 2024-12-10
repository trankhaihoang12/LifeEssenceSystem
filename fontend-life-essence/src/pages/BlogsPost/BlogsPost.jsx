import React from 'react';
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
  Sidebar,SidebarTitle,RecentPostItem,PostThumb,
  PostInfo,PostTitle,PostDate,
} from './Style';

const BlogPost = () => {
  const article = {
    title: 'Vitamin A - Chìa Khóa Cho Đôi Mắt Sáng Khỏe',
    author: 'Tiến Sĩ Nguyễn Văn Hùng',
    date: '12 March, 2024',
    time: '9:00 PM',
    imageUrl: 'https://prod-cdn.pharmacity.io/blog/vitamin-a-2-1.jpg',
    content: `
      Vitamin A là một vi chất dinh dưỡng quan trọng không thể thiếu cho sức khỏe đôi mắt. 
      Nó đóng vai trò quan trọng trong việc duy trì thị lực, bảo vệ giác mạc và ngăn ngừa các 
      vấn đề về mắt như quáng gà, khô mắt và suy giảm thị lực.Vitamin A được mệnh danh là "vitamin của đôi mắt", 
      đóng vai trò quan trọng trong việc duy trì thị lực và sức khỏe của mắt. Ngoài ra, loại vitamin này còn có nhiệm vụ tăng cường hệ miễn dịch,
      hỗ trợ quá trình sinh trưởng và phát triển của cơ thể.Nguồn vitamin A dồi dào có trong các loại thực phẩm như cà rốt, khoai lang, trứng, và gan động vật',
    `,
    highlightedContent: `
      Việc bổ sung Vitamin A đúng cách sẽ giúp bảo vệ đôi mắt của bạn một cách hiệu quả, 
      mang lại ánh mắt sáng khỏe và tinh anh.
    `,
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

  return (
    <PageWrapper>
    <MainContent>
      {/* Hero Image */}
      <HeroImage>
        <img src={article.imageUrl} alt={article.title} />
        <ImageOverlay>
          <Title>{article.title}</Title>
        </ImageOverlay>
      </HeroImage>

      {/* Meta Information */}
      <MetaInfo>
        <span>Tác giả: {article.author}</span>
        <span>{article.date} | {article.time}</span>
      </MetaInfo>

      {/* Article Content */}
      <Content>{article.content}</Content>

      {/* Highlighted Content */}
      <HighlightBox>{article.highlightedContent}</HighlightBox>

      <Content>{article.content}</Content>

      {/* Comments Section */}
      <CommentsSection>
        <h1>Comment ({article.comments.length})</h1>
        {article.comments.map((comment) => (
          <CommentWrapper key={comment.id}>
            <CommentHeader>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentDate>{comment.date}</CommentDate>
            </CommentHeader>
            <div>{comment.content}</div>
          </CommentWrapper>
        ))}
      </CommentsSection>

      {/* Comment Form */}
      <CommentForm>
        <h1>Leave a Comment</h1>
        <h2>You must sign-in to make or comment a post.</h2>
        <form>
          <FormInput type="text" placeholder="Full name" />
          <FormInput type="email" placeholder="Email" />
          <FormTextarea placeholder="Comment..." rows="5" />
          <SubmitButton type="submit">Post a Comment</SubmitButton>
        </form>
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