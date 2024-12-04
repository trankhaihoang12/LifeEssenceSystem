// import styled, { keyframes } from "styled-components";

// const fade = keyframes`
//   0%, 100% {
//     opacity: 0.2;
//   }
//   50% {
//     opacity: 1;
//   }
// `;

// // Center the loading container on the screen
// export const LoadingContainer = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   display: grid;
//   grid-template-columns: repeat(2, 20px);
//   grid-template-rows: repeat(2, 20px);
//   gap: 5px;
//   width: max-content;
//   height: max-content;
// `;

// // Style each square with a fade effect
// export const Square = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: black;
//   opacity: 0;
//   animation: ${fade} 1s infinite;
//   animation-delay: ${props => props.delay};
// `;