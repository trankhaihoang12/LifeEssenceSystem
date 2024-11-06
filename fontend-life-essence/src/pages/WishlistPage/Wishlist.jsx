import React from 'react';
import { 
  WishlistContainer, 
  WishlistTitle, 
  Wishlist, 
  WishlistItem, 
  ItemName, 
  QuickViewButton, 
  RemoveButton 
} from './Style'; // Ensure the path is correct based on your project structure

const WishlistComponent = () => {
  const items = [
    { id: 1, name: 'Nutrilite Memory Builder Dietary', image: 'https://picsum.photos/id/237/200/300' },
    { id: 2, name: 'Online Only Triple Oxygen', image: 'https://picsum.photos/id/237/200/300' },
    { id: 3, name: 'Nutrilite Memory Builder Dietary', image: 'https://picsum.photos/id/237/200/300' },
    { id: 4, name: 'Online Only Triple Oxygen', image: 'https://picsum.photos/id/237/200/300' },
    { id: 5, name: 'Nutrilite Memory Builder Dietary', image: 'https://picsum.photos/id/237/200/300' },
    
  ];

  return (
    <WishlistContainer>
      <WishlistTitle>My Wishlist</WishlistTitle>
      <Wishlist>
        {items.map(item => (
          <WishlistItem key={item.id}>
            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '15px' }} />
            <ItemName>{item.name}</ItemName>
            <div style={{gap:'10px'}}>
              <QuickViewButton >Quick View</QuickViewButton>
              <RemoveButton >Remove</RemoveButton>
            </div>
          </WishlistItem>
        ))}
      </Wishlist>
    </WishlistContainer>
  );
};

export default WishlistComponent;
