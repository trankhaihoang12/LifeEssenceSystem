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
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, removeFromFavorites } from '../../redux/slides/favoriteSlice';
import { FaRegHeart } from 'react-icons/fa';


const WishlistComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  // Lấy danh sách sản phẩm yêu thích từ Redux store
  const items = useSelector((state) => state.favorites.items) || [];

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
    const fetchhFavorites = async () => {
      try {
        await dispatch(fetchFavorites({ userId, token })); // Gọi action fetchFavorites
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchhFavorites();
  }, [dispatch, userId, token]);

  const handleRemove = async (favoriteId) => {
    try {
      console.log('Removing favorite with ID:', favoriteId);
      await dispatch(removeFromFavorites({ id: favoriteId, token })); // Gọi action removeFromFavorites
      message.success("Remove favorite successfully!!!");
    } catch (error) {
      message.error("Error removing favorite");
    }
  };

  const handleDetailsProduct = (productId) => {
    if (productId) navigate(`/details-product/${productId}`);
  };

  return (
    <div style={{ height: '650px', backgroundColor: '#F4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <SectionHeader>Home / Wishlist</SectionHeader>
      <WishlistContainer>
        <Wishlist>
          {items.length > 0 ? (
            items.map(item => (
              <WishlistItem key={item.favorite_id}>
                <img
                  src={item.images && item.images.length > 0 ? `/${item.images[0]}` : '/default-image.jpg'}
                  alt={item.prod_name}
                  style={{ width: '50px', height: '50px', marginRight: '15px' }}
                />
                <ItemName>{item.prod_name}</ItemName>
                <div style={{ gap: '10px' }}>
                  <QuickViewButton onClick={() => handleDetailsProduct(item.product_id)}>Quick View</QuickViewButton>
                  <RemoveButton onClick={() => handleRemove(item.favorite_id)}>Remove</RemoveButton>
                </div>
              </WishlistItem>
            ))
          ) : (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <FaRegHeart size={50} color="#888" />
                <p style={{ color: '#888', fontSize: '18px' }}>Your wishlist is empty.</p>
              </div>
          )}
        </Wishlist>
      </WishlistContainer>
    </div>
  );
};


export default WishlistComponent;
