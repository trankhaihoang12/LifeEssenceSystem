import styled from 'styled-components';

export const BannerContainer = styled.div`
  background-color: #d9d9d9; /* gray background */
  color: #fff;
  text-align: center;
  padding: 2rem 1rem;
`;

export const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

export const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
  flex-wrap: wrap;
`;

export const SearchField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  label {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  input, select {
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

export const BlogSection = styled.div`
  margin: 3rem auto;
  padding: 0 2rem;
  max-width: 1200px;
`;

export const BlogSectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

export const BlogPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BlogPost = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

export const BlogPostImage = styled.img`
  width: calc(100% - 2rem);
  height: 180px;
  object-fit: cover;
  border-radius: 0.75rem;
  margin: 1rem 1rem 0;
`;

export const BlogPostContent = styled.div`
  padding: 1.5rem;
`;

export const BlogPostTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.4;
  
  &:hover {
    color: #007bff;
  }
`;

export const BlogPostAuthor = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

export const BlogPostExcerpt = styled.p`
  color: #555;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const BlogPostLink = styled.a`
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0056b3;
  }
`;