import React, { useEffect, useState } from 'react'
import { CategoryCard, CategoryContainer, CategoryContent, CategoryImage, CategoryTitle, Header, ProductCount, Title, Wrapper } from './Style'
import Home_category1 from '../../assets/images/Home_category1.png';
import Home_category2 from '../../assets/images/Home_category2.png';
import Home_category3 from '../../assets/images/Home_category3.png';
import Home_category4 from '../../assets/images/Home_category4.png';
import Home_category5 from '../../assets/images/Home_category5.png';
import Home_category6 from '../../assets/images/Home_category6.png';
import Home_category7 from '../../assets/images/Home_category7.png';
import * as ProductsService from '../../services/ProductsService'
import { useNavigate } from 'react-router';

const PopularCategories = () => {
    const [categories, setCategories] = useState([]); 
    const navigate = useNavigate();
    const loadCategories = async () => {
        try {
            const data = await ProductsService.getAllCategories();
            const categoryData = data; // Truy cập vào mảng danh mục
            console.log('categoryData22', categoryData);
            setCategories(categoryData); // Set fetched categories
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    // Danh sách các danh mục cứng
    const hardcodedCategories = [
        { image: Home_category1 },
        { image: Home_category2 },
        { image: Home_category3 },
        { image: Home_category4 },
        {image: Home_category7 },
        {image: Home_category6 },
        { image: Home_category5 },
    ];

    useEffect(() => {
        loadCategories()
    }, []); // Khi `page` thay đổi, load lại sản phẩm

    const handleCategoryClick = (categoryId) => {
        navigate(`/products/${categoryId}`); // Navigate to the category detail page
    };
  return (
      <Wrapper>
          <Header>
              <Title>Popular Categories</Title>
          </Header>
          <div style={{ height: '150px', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%' }}>
                  <CategoryContainer>
                      {categories.slice(0, 4).map((category, index) => (
                          <CategoryCard key={index} onClick={() => handleCategoryClick(category.category_id)}>
                              <CategoryContent>
                                  <CategoryTitle>{category.name}</CategoryTitle>
                                  <ProductCount>{category.productCount} products</ProductCount>
                              </CategoryContent>
                              <CategoryImage src={hardcodedCategories[index].image} alt={category.name} />
                          </CategoryCard>
                      ))}
                  </CategoryContainer>

                  <CategoryContainer gap="25px">
                      {categories.slice(4).map((category, index) => (
                          <CategoryCard key={index + 4} width="420px" onClick={() => handleCategoryClick(category.id)}>
                              <CategoryContent>
                                  <CategoryTitle>{category.name}</CategoryTitle>
                                  <ProductCount>{category.productCount} products</ProductCount>
                              </CategoryContent>
                              <CategoryImage src={hardcodedCategories[index + 4]?.image} alt={category?.name} />
                          </CategoryCard>
                      ))}
                  </CategoryContainer>
              </div>
          </div>
      </Wrapper>
  )
}

export default PopularCategories