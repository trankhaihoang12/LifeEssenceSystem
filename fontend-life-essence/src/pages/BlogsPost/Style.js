import styled from 'styled-components';

// Styled Components
// Layout Styled Components
export const PageWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 30px;
`;

export const MainContent = styled.div`
  flex: 3;
  min-width: 0;
`;

export const Sidebar = styled.div`
  flex: 1;
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 20px;
`;

export const SidebarTitle = styled.h3`
  border-bottom: 2px solid #3182ce;
  padding-bottom: 10px;
  margin-bottom: 15px;
  color: #2c3e50;
`;

export const RecentPostItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f4f8;
  }
`;

export const PostThumb = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
`;

export const PostInfo = styled.div`
  flex-grow: 1;
`;

export const PostTitle = styled.h4`
  margin: 0 0 5px 0;
  font-size: 0.9em;
  color: #2c3e50;
`;

export const PostDate = styled.span`
  font-size: 0.7em;
  color: #7f8c8d;
`;

export const HeroImage = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  padding: 20px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export const Title = styled.h1`
  color: white;
  font-size: 2.5em;
  margin: 0;
  line-height: 1.3;
`;

export const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  margin-bottom: 20px;
  font-size: 0.9em;
`;

export const Content = styled.div`
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
`;

export const HighlightBox = styled.div`
  background-color: #f0f8ff;
  border-left: 4px solid #3182ce;
  padding: 15px;
  margin: 20px 0;
  font-style: italic;
  color: #2c5282;
`;

export const CommentsSection = styled.div`
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const CommentWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CommentAuthor = styled.span`
  font-weight: bold;
  color: #2c3e50;
`;

export const CommentDate = styled.span`
  color: #7f8c8d;
  font-size: 0.8em;
`;

export const CommentForm = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: relative;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1em;
`;
export const CharCount = styled.p`
  position: absolute;
  top: -20px;  /* Khoảng cách từ trên */
  right: 10px; /* Khoảng cách từ phải */
  font-size: 14px;
  color: ${(props) => {
    if (props.count >= 200) {
      return 'green'; // Chuyển sang màu xanh khi đạt 200 ký tự
    }
    return props.count > 180 ? 'red' : 'gray'; // Màu đỏ nếu vượt quá 180
  }};  
  text-align: center;
  margin: 0;  /* Loại bỏ margin mặc định */
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1em;
  resize: vertical;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #24AEB1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2c5282;
  }
`;