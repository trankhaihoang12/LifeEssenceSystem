import React from 'react';
import { 
  BlogSection,
  BlogSectionTitle,
  BlogPostsContainer, 
  BlogPost,
  BlogPostImage,
  BlogPostContent,
  BlogPostTitle,
  BlogPostAuthor,
  BlogPostExcerpt,
  BlogPostLink,
  BannerContainer,
  BannerTitle,
  SearchSection,
  SearchField
} from './Style';

const DetailsBlogs = () => {
  const Categories = {
    vitamins: ['Vitamin A - Chìa Khóa Cho Đôi Mắt Sáng Khỏe', 'Vitamin B - Năng Lượng Cho Cơ Thể', 'Vitamin B3 (Niacin) - Đột Phá Trong Chăm Sóc Sức Khỏe'],
    health: ['Thực Phẩm Chức Năng Không Phải Là Thuốc Thay Thế', 'Lựa Chọn Thực Phẩm Chức Năng Phù Hợp - Không Phải Điều Dễ Dàng', 'Cảnh Báo Về Việc Sử Dụng Thực Phẩm Chức Năng Không Đúng Cách']
  };

  const blogPosts = [
    {
      id: 1,
      title: 'Vitamin A - Chìa Khóa Cho Đôi Mắt Sáng Khỏe',
      author: 'Tiến Sĩ Nguyễn Văn Hùng',
      date: '12 Dec, 2024',
      category: 'vitamins',
      imageUrl: '/images/blog/vitamin-a.jpg', // Recommend using local images
      content: 'Vitamin A được mệnh danh là "vitamin của đôi mắt", đóng vai trò quan trọng trong việc duy trì thị lực và sức khỏe của mắt. Ngoài ra, loại vitamin này còn có nhiệm vụ tăng cường hệ miễn dịch, hỗ trợ quá trình sinh trưởng và phát triển của cơ thể. Nguồn vitamin A dồi dào có trong các loại thực phẩm như cà rốt, khoai lang, trứng, và gan động vật',
      estimatedReadTime: '5 phút đọc'
    },
    {
      id: 2,
      title: 'Vitamin B - Năng Lượng Cho Cơ Thể',
      author: 'Đội ngũ Y Bác Sĩ Life Essence',
      date: '11/11/2024',
      category: 'vitamins',
      imageUrl: '/images/blog/vitamin-b.jpg',
      content: 'Vitamin B là một nhóm vitamin thuộc dạng phức hợp, bao gồm nhiều loại khác nhau như B1, B2, B3, B6, B12. Mỗi loại đều mang vai trò riêng biệt nhưng đều cùng chung mục tiêu là hỗ trợ chuyển hóa năng lượng, duy trì hệ thần kinh và sản xuất máu.',
      estimatedReadTime: '4 phút đọc'
    },
    {
      id: 3,
      title: 'Vitamin B3 (Niacin) - Đột Phá Trong Chăm Sóc Sức Khỏe',
      author: 'Thạc sĩ Tiến',
      date: '12/11/2024',
      category: 'vitamins',
      imageUrl: '/images/blog/vitamin-b3.jpg',
      content: 'Vitamin B3 hay còn gọi là Niacin, là một loại vitamin quan trọng với nhiều chức năng đặc biệt. Nó giúp cơ thể chuyển đổi thức ăn thành năng lượng, hỗ trợ hệ tiêu hóa và thần kinh hoạt động hiệu quả.',
      estimatedReadTime: '6 phút đọc'
    },
    {
      id: 4,
      title: 'Thực Phẩm Chức Năng Không Phải Là Thuốc Thay Thế',
      author: 'Life Essence',
      date: '14/11/2024',
      category: 'health',
      imageUrl: '/images/blog/supplements.jpg',
      content: 'Một điều quan trọng cần nhớ là thực phẩm chức năng không phải là thuốc và không thể thay thế hoàn toàn một chế độ ăn uống lành mạnh. Chúng chỉ là một sự bổ sung để hỗ trợ sức khỏe. Việc duy trì chế độ ăn uống cân bằng, tập thể dục thường xuyên và lối sống lành mạnh vẫn luôn là nền tảng quan trọng nhất cho sức khỏe của chúng ta.',
      estimatedReadTime: '7 phút đọc'
    },
    {
      id: 5,
      title: 'Lựa Chọn Thực Phẩm Chức Năng Phù Hợp - Không Phải Điều Dễ Dàng',
      author: 'Bác sĩ Hoàng Khải',
      date: '15/11/2024',
      category: 'health',
      imageUrl: '/images/blog/choosing-supplements.jpg',
      content: 'Với thị trường thực phẩm chức năng ngày càng phong phú, việc lựa chọn sản phẩm phù hợp với nhu cầu cá nhân đòi hỏi sự cẩn trọng và hiểu biết. Quan trọng nhất là phải xem xét kỹ thành phần, nguồn gốc, và có sự tư vấn từ chuyên gia y tế. Không phải sản phẩm nào cũng phù hợp với tất cả mọi người, do đó việc nghiên cứu và tham khảo ý kiến chuyên môn là vô cùng cần thiết.',
      estimatedReadTime: '5 phút đọc'
    },
    {
      id: 6,
      title: 'Tầm Quan Trọng Của Việc Uống Đủ Nước Để Ngăn Ngừa Sỏi Thận',
      author: 'Bác sĩ Gia Đình',
      date: '16/11/2024',
      category: 'health',
      imageUrl: '/images/blog/supplement-warning.jpg',
      content: ' Để duy trì sức khỏe thận tốt, điều quan trọng là uống đủ nước hàng ngày. Mức nước cần thiết có thể khác nhau tùy thuộc vào độ tuổi, giới tính, mức độ hoạt động và môi trường sống của mỗi người. Tuy nhiên, một nguyên tắc chung là uống ít nhất 8 ly nước mỗi ngày (khoảng 2 lít) hoặc hơn nếu cơ thể yêu cầu.',
      estimatedReadTime: '6 phút đọc'
    }
  ];

  // Fallback image in case the main image fails to load
  const handleImageError = (e) => {
    e.target.src = 'https://picsum.photos/200/200'; // Your fallback image
  };
  return (
    <div style={{backgroundColor: 'rgb(244, 244, 244)', width: '100%', height: '1000px'}}>
    {/* Banner Section */}
    <BannerContainer>
    <BannerTitle>Healthy living</BannerTitle>
    <SearchSection>
      <SearchField>
        <select id="topic-select" style={{width: '400px', borderRadius: '8px'}}>
          <option value="all" style={{fontSize: '12px'}}>All topics</option>
          <option value="vitamins">Vitamins</option>
          <option value="health">Health</option>
        </select>
      </SearchField>
    </SearchSection>
  </BannerContainer>

    <BlogSection>
      <BlogSectionTitle>Latest Articles & Blogs</BlogSectionTitle>
      <BlogPostsContainer>
        {blogPosts.map((post) => (
          <BlogPost key={post.id}>
            <BlogPostImage 
              src={post.imageUrl} 
              alt={post.title}
              onError={handleImageError}
              loading="lazy" // Optimize image loading
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
                Author: {post.author} • {post.date} • {post.estimatedReadTime}
              </BlogPostAuthor>
              <BlogPostExcerpt>
                {post.content.length > 150 
                  ? `${post.content.substring(0, 150)}...` 
                  : post.content}
              </BlogPostExcerpt>
              <BlogPostLink href={`/blog/${post.id}`}>Read more</BlogPostLink>
            </BlogPostContent>
          </BlogPost>
        ))}
      </BlogPostsContainer>
    </BlogSection>
    </div>
  );
};

export default DetailsBlogs;