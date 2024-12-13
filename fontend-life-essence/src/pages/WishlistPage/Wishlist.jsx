import React, { useEffect, useState } from 'react';
import { 
  WishlistContainer, 
  WishlistTitle, 
  Wishlist, 
  WishlistItem, 
  ItemName, 
  QuickViewButton, 
  RemoveButton, 
  SectionHeader
} from './Style'; // Ensure the path is correct based on your project structure
import * as FavoriteService from '../../services/FavoriteService'
import * as message from '../../components/MessageComponent/Message'
import { useNavigate } from 'react-router';


const WishlistComponent = () => {
  const [items, setItems] = useState([]);
  console.log('item', items)
  const navigate = useNavigate();

  const getToken = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData?.token;
  };
  const getUserId = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData?.user?.id;
  };
  const token = getToken();
  const userId = getUserId();
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await FavoriteService.getAllFavorites(userId, token);
        console.log('favorites', favorites); // Kiểm tra dữ liệu trả về
        if (Array.isArray(favorites.data)) {
          setItems(favorites.data);
        } else {
          console.error('Expected an array but got:', favorites);
          setItems([]); // Đặt items thành mảng rỗng nếu không phải là mảng
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (favoriteId) => {
    try {
      console.log('Removing favorite with ID:', favoriteId); // Debug ID
      await FavoriteService.removeFavorite(favoriteId, token); // Gọi API với favorite_id hợp lệ
      setItems(prevItems => prevItems.filter(item => item.favorite_id !== favoriteId)); // Cập nhật danh sách
      message.success("remove favorite successfully!!!")
    } catch (error) {
      message.error("Error removing favorite")
    }
  };

  const handleDetailsProduct = (productId) => {
    if (productId) navigate(`/details-product/${productId}`);
  };
  return (
    <div style={{ height: '650px', backgroundColor: '#F4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <SectionHeader>Home / Wishlist</SectionHeader>
      <WishlistContainer>
        <WishlistTitle>My Wishlist</WishlistTitle>
        <Wishlist>
          {items.length > 0 ? (
            items.map(item => (
              <WishlistItem key={item.id}>
                <img src={`/${item.images[0]}`} alt={item.prod_name} style={{ width: '50px', height: '50px', marginRight: '15px' }} />
                <ItemName>{item.prod_name}</ItemName>
                <div style={{ gap: '10px' }}>
                  <QuickViewButton onClick={() => handleDetailsProduct(item.product_id)}>Quick View</QuickViewButton>
                  <RemoveButton onClick={() => handleRemove(item.favorite_id)}>Remove</RemoveButton>
                </div>
              </WishlistItem>
            ))
          ) : (
            <div>No items in your wishlist.</div>
          )}
        </Wishlist>
      </WishlistContainer>
  </div>
  );
};

export default WishlistComponent;
