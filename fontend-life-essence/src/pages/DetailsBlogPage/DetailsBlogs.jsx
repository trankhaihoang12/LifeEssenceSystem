import React from 'react';
import { 
  BlogSection,BlogSectionTitle,BlogPostsContainer, BlogPost,BlogPostImage,BlogPostContent,BlogPostTitle,
  BlogPostAuthor,BlogPostExcerpt,BlogPostLink
} from './Style';

const DetailsBlogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Vitamin A - Chìa Khóa Cho Đôi Mắt Sáng Khỏe',
      author: 'Tiến Sĩ Nguyễn Văn Hùng',
      date: '10/11/2024',
      imageUrl: 'https://picsum.photos/200/200',
      content: 'Vitamin A được mệnh danh là "vitamin của đôi mắt", đóng vai trò quan trọng trong việc duy trì thị lực và sức khỏe của mắt. Ngoài ra, loại vitamin này còn có nhiệm vụ tăng cường hệ miễn dịch, hỗ trợ quá trình sinh trưởng và phát triển của cơ thể. Nguồn vitamin A dồi dào có trong các loại thực phẩm như cà rốt, khoai lang, trứng, và gan động vật'
    },
    {
      id: 2,
      title: 'Vitamin B - Năng Lượng Cho Cơ Thể',
      author: 'Đội ngũ Y Bác Sĩ Life Essence',
      date: '11/11/2024',
      imageUrl: 'https://picsum.photos/200/200',
      content: 'Vitamin B là một nhóm vitamin thuộc dạng phức hợp, bao gồm nhiều loại khác nhau như B1, B2, B3, B6, B12. Mỗi loại đều mang vai trò riêng biệt nhưng đều cùng chung mục tiêu là hỗ trợ chuyển hóa năng lượng, duy trì hệ thần kinh và sản xuất máu.'
    },
    {
      id: 3,
      title: 'Vitamin B3 (Niacin) - Đột Phá Trong Chăm Sóc Sức Khỏe',
      author: 'Thạc sĩ Tiến ',
      date: '12/11/2024',
      imageUrl: 'https://picsum.photos/200/200',
      content: 'Vitamin B3 hay còn gọi là Niacin, là một loại vitamin quan trọng với nhiều chức năng đặc biệt. Nó giúp cơ thể chuyển đổi thức ăn thành năng lượng, hỗ trợ hệ tiêu hóa và thần kinh hoạt động hiệu quả.'
    },
    {
      id: 4,
      title: ' Thực Phẩm Chức Năng Không Phải Là Thuốc Thay Thế',
      author: 'Life Essence ',
      date: '14/11/2024',
      imageUrl: 'https://picsum.photos/200/200',
      content: 'Một điều quan trọng cần nhớ là thực phẩm chức năng không phải là thuốc và không thể thay thế hoàn toàn một chế độ ăn uống lành mạnh.Chúng chỉ là một sự bổ sung để hỗ trợ sức khỏe. Việc duy trì chế độ ăn uống cân bằng, tập thể dục thường xuyên và lối sống lành mạnh vẫn luôn là nền tảng quan trọng nhất cho sức khỏe của chúng ta.'
    },
    {
      id: 5,
      title: 'Lựa Chọn Thực Phẩm Chức Năng Phù Hợp - Không Phải Điều Dễ Dàng',
      author: 'Bác sĩ Hoàng Khải ',
      date: '15/11/2024',
      imageUrl: 'https://picsum.photos/200/200',
      content: 'Với thị trường thực phẩm chức năng ngày càng phong phú, việc lựa chọn sản phẩm phù hợp với nhu cầu cá nhân đòi hỏi sự cẩn trọng và hiểu biết. Quan trọng nhất là phải xem xét kỹ thành phần, nguồn gốc, và có sự tư vấn từ chuyên gia y tế. Không phải sản phẩm nào cũng phù hợp với tất cả mọi người, do đó việc nghiên cứu và tham khảo ý kiến chuyên môn là vô cùng cần thiết..'
    },
    {
      id: 6,
      title: 'Cảnh Báo Về Việc Sử Dụng Thực Phẩm Chức Năng Không Đúng Cách',
      author: 'Bác sĩ Gia Đình ',
      date: '16/11/2024',
      imageUrl: 'https://picsum.photos/200/200',
      content: 'Việc sử dụng thực phẩm chức năng quá liều hoặc không đúng cách có thể gây ra các tác dụng phụ không mong muốn. Một số trường hợp có thể dẫn đến rối loạn chức năng gan, thận hoặc các vấn đề sức khỏe khác. Do đó, luôn tuân thủ hướng dẫn sử dụng và tham khảo ý kiến chuyên gia y tế là điều vô cùng quan trọng.'
    }
  ];

  return (
    
      <BlogSection>
        <BlogSectionTitle>Latest Articles & Blogs</BlogSectionTitle>
        <BlogPostsContainer>
          {blogPosts.map((post) => (
            <BlogPost key={post.id}>
              <BlogPostImage src={post.imageUrl} alt={post.title} />
              <BlogPostContent>
                <BlogPostTitle>{post.title}</BlogPostTitle>
                <BlogPostAuthor>By {post.author} - {post.date}</BlogPostAuthor>
                <BlogPostExcerpt>{post.content.slice(0, 100)}...</BlogPostExcerpt>
                <BlogPostLink href="#">Read More</BlogPostLink>
              </BlogPostContent>
            </BlogPost>
          ))}
        </BlogPostsContainer>
      </BlogSection>
    
  );
};

export default DetailsBlogs;