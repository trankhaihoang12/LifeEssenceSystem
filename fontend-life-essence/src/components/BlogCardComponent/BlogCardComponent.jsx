import React from 'react'
import { BlogImage, BlogTitle, Card, CardContent, ImageWrapper, ReadMoreButton, ReadMoreText, ReadMoreWrapper } from './Style'
import { IoMdAdd } from 'react-icons/io'
import blog_1_test from '../../assets/images/blog-1_test.jpg';

const BlogCardComponent = () => {
  return (
      <Card>
          <ImageWrapper>
              <BlogImage src={blog_1_test} alt='blog_1_test' />
          </ImageWrapper>
          <CardContent>
              <BlogTitle>Understanding Different Types of Bone and Joint Diseases</BlogTitle>
              <ReadMoreWrapper>
                  <ReadMoreButton>
                      <IoMdAdd style={{ fontSize: '20px', color: '#fff', margin: 'auto'  }} />
                  </ReadMoreButton>
                  <ReadMoreText>READ MORE</ReadMoreText>
              </ReadMoreWrapper>
          </CardContent>
      </Card>
  )
}

export default BlogCardComponent