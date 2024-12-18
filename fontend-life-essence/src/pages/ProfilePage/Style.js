import styled from 'styled-components';

// Main container
export const Container = styled.div`
  background-color: #F4f4f4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
`;

// Header (breadcrumb style)
export const SectionHeader = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 100px;
  font-size: 18px;
  font-weight: 500;
  color: #6c757d;

  @media (max-width: 768px) {
    padding: 0 20px;
    font-size: 14px;
  }
`;

// Profile container
export const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-top: 30px;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Sidebar
export const Sidebar = styled.div`
  width: 30%;
  background: linear-gradient(135deg, #24AEB1, #0056b3);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 30px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

// Sidebar header
export const SidebarHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
`;

// Sidebar item
export const SidebarItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin: 15px 0;
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 6px;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;

  span {
    margin-right: 10px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  ${(props) => props.active && `
    background: rgba(255, 255, 255, 0.4);
    font-weight: bold;
    border-left: 4px solid white;
    padding-left: 11px;
  `}
`;

// Content section
export const ContentSection = styled.div`
  width: 70%;
  padding: 40px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;

  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

// Content title
export const ContentTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-transform: capitalize;
`;

// Content body
export const ContentBody = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  max-width: 900px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Order Table
export const OrderTable = styled.table`
  width: 700px;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 14px;
  color: #555;

  thead {
    background-color: #24AEB1;
    color: white;
    th {
      padding: 5px;
      text-align: left;
      border: 1px solid #dee2e6;

    }
  }

  tbody {
    tr {
      &:nth-child(odd) {
        background-color: #f8f9fa;
      }

      &:hover {
        background-color: #e9ecef;
      }
    }

    td {
      padding: 12px;
      border: 1px solid #dee2e6;
      text-align: left;
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;

    thead {
      th {
        padding: 10px;
      }
    }

    tbody {
      td {
        padding: 10px;
      }
    }
  }
`;
export const EditButton = styled.div`
  width: 70px;
  height: 35px;
  background-color: #24AEB1;
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Hover effects */
  &:hover {
    background-color: #1B8D8F;
    transform: scale(1.05);
  }
`;

export const StyledPasswordInput = styled.input`
  width: 100%;
  padding: 6px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;

  /* Optional: Customize focus styles for better UX */
  &:focus {
    outline: none; /* Remove default outline */
    border-color: #24AEB1; /* Example: Change border color on focus */
  }
`;

export const StyledButtonUpdatePass = styled.button`
  padding: 10px 2px;
  background-color: #24AEB1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
`;

export const EditAddressButton = styled.button`
  padding: 3px;
  background-color: #FFA500; /* Orange color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
    width: 50px;
`;
export const DeleteAddressButton = styled.button`
  padding: 3px;
  background-color: #FF0000; /* Orange color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
  width: 50px;

`;
