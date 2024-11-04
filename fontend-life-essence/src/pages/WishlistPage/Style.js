import styled from "styled-components";

export const WishlistContainer = styled.div`
    padding: 20px;
    background-color: #ffffff; /* Background color */
    border-radius: 8px;
    max-width: 1000px;
    margin: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

export const WishlistTitle = styled.h1`
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px; /* Increased space below the title */
    font-weight: bold; /* Bold title */
`;

export const Wishlist = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0; /* Reset margin */
`;

export const WishlistItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px; /* Padding for better touch target */
    border-bottom: 1px solid #eaeaea; /* Lighter border for separation */
    margin-bottom: 10px; /* Space between each item */
`;

export const ItemImage = styled.img`
    width: 50px; /* Fixed width */
    height: 50px; /* Fixed height */
    margin-right: 15px; /* Space between image and item name */
`;

export const ItemName = styled.div`
    font-size: 18px;
    flex: 1; /* Allow name to take available space */
`;

export const ButtonContainer = styled.div`
    display: flex; /* Flex container for buttons */
    gap: 10px; /* Space between buttons */
`;

export const QuickViewButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px; /* Padding for better aesthetics */
    cursor: pointer;
   
    &:hover {
        background-color: #0056b3; /* Darker shade on hover */
    }
`;

export const RemoveButton = styled.button`
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px; /* Padding for better aesthetics */
    cursor: pointer;
 margin-left:10px;
    &:hover {
        background-color: #c82333; /* Darker shade on hover */
    }
`;
