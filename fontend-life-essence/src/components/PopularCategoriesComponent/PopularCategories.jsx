import React from 'react'
import { CategoryCard, CategoryContainer, CategoryContent, CategoryImage, CategoryTitle, Header, ProductCount, Title, Wrapper } from './Style'
import Home_category1 from '../../assets/images/Home_category1.png';
import Home_category2 from '../../assets/images/Home_category2.png';
import Home_category3 from '../../assets/images/Home_category3.png';
import Home_category4 from '../../assets/images/Home_category4.png';
import Home_category5 from '../../assets/images/Home_category5.png';
import Home_category6 from '../../assets/images/Home_category6.png';
import Home_category7 from '../../assets/images/Home_category7.png';

const PopularCategories = () => {
  return (
      <Wrapper>
          <Header>
              <Title>Popular Categories</Title>
          </Header>
          <div style={{ height: '150px', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%' }}>
                  <CategoryContainer>
                      <CategoryCard>
                          <CategoryContent>
                              <CategoryTitle>Skin care</CategoryTitle>
                              <ProductCount>0 products</ProductCount>
                          </CategoryContent>
                          <CategoryImage src={Home_category1} alt="Home_category1" />
                      </CategoryCard>
                      <CategoryCard>
                          <CategoryContent>
                              <CategoryTitle>Healthcare devices</CategoryTitle>
                              <ProductCount>2 products</ProductCount>
                          </CategoryContent>
                          <CategoryImage src={Home_category2} alt="Home_category2" />
                      </CategoryCard>
                      <CategoryCard>
                          <CategoryContent>
                              <CategoryTitle>Covid essentials</CategoryTitle>
                              <ProductCount>4 products</ProductCount>
                          </CategoryContent>
                          <CategoryImage src={Home_category3} alt="Home_category3" />
                      </CategoryCard>
                      <CategoryCard>
                          <CategoryContent>
                              <CategoryTitle>Health condition</CategoryTitle>
                              <ProductCount>10 products</ProductCount>
                          </CategoryContent>
                          <CategoryImage src={Home_category4} alt="Home_category4" />
                      </CategoryCard>
                  </CategoryContainer>


                  <CategoryContainer gap="25px">
                      <CategoryCard width="420px">
                          <CategoryContent>
                              <CategoryTitle>Infrared Thermometer</CategoryTitle>
                              <ProductCount>11 products</ProductCount>
                          </CategoryContent>
                          <CategoryImage src={Home_category7} alt="Home_category7" />
                      </CategoryCard>
                      <CategoryCard width="420px">
                          <CategoryContent>
                              <CategoryTitle>Health food and drinks</CategoryTitle>
                              <ProductCount>5 products</ProductCount>
                          </CategoryContent>
                          <CategoryImage src={Home_category6} alt="Home_category6" />
                      </CategoryCard>
                      <CategoryCard width="420px">
                          <CategoryContent>
                              <CategoryTitle>Fitness supplements</CategoryTitle>
                              <ProductCount>3 products</ProductCount>
                          </CategoryContent>
                          <CategoryImage src={Home_category5} alt="Home_category5" />
                      </CategoryCard>
                  </CategoryContainer>
              </div>
          </div>
      </Wrapper>
  )
}

export default PopularCategories