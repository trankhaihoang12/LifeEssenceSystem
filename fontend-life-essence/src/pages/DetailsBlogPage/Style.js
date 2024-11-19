import styled from 'styled-components';

export const BlogSection = styled.div`
  margin-bottom: 3rem;
`;

export const BlogSectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const BlogPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
`;

export const BlogPost = styled.div`
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const BlogPostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
`;

export const BlogPostContent = styled.div`
  padding: 3rem;
  flex-grow: 1;
`;

export const BlogPostTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

export const BlogPostAuthor = styled.p`
  color: #555;
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
`;

export const BlogPostExcerpt = styled.p`
  color: #555;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const BlogPostLink = styled.a`
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;