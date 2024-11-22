import styled from 'styled-components';
export const Container = styled.div`
  padding: 20px;
`;
export const WrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
export const WrapperInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 100%;
  height: 44px;
  padding: 0 15px;
  font-size: 1.2rem; /* Tăng kích thước font chữ cho input */
  outline: none;
  &::placeholder {
    color: #aaa; /* Màu sắc cho placeholder */
  }
`;
export const WrapperButton = styled.button`
  background-color: #28a745; /* Màu nền cho nút tìm kiếm */
  border: none;
  border-radius: 20px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #218838; /* Màu nền khi hover */
  }
`;
export const ExportButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 12px;
  background-color: #28a745; /* Màu nền nút xuất */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
      background-color: #218838; /* Màu khi hover */
  }
`;
export const AddButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 12px;
  background-color: #28a745; /* Màu nền nút xuất */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  gap: 10px;
  align-Items: center;
  &:hover {
      background-color: #218838; /* Màu khi hover */
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start; /* Căn nút về bên trái */
  margin-bottom: 20px; /* Thêm khoảng cách dưới các nút */
`;
export const WrapperTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;
export const WrapperTableHeader = styled.th`
  padding: 12px;
  font-weight: 600;
  color: white; /* Màu chữ trắng */
  text-align: left;
  background-color: #24AEB1;
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
`;
export const WrapperTableData = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  white-space: nowrap; /* Prevent stacking */
`;
export const WrapperTableRow = styled.tr`
  display: table-row;
  width: 100%;
  &:nth-child(even) {
    background-color: #f9fafb;
  }
  &:hover {
    background-color: #f1f5f9;
  }
`;
export const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ paymentStatus }) => (paymentStatus === 'Paid' ? '#27AE60' : '#EB5757')};
  background-color: ${({ paymentStatus }) => (paymentStatus === 'Paid' ? '#e6f4ea' : '#fde2e2')};
`;
export const WrapperPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  button {
    border: none;
    background: #e5e7eb;
    color: #374151;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
      background: #d1d5db;
    }
  }
  .page-number {
    display: flex;
    gap: 8px;
    span {
      padding: 8px 12px;
      background: #e5e7eb;
      color: #374151;
      border-radius: 8px;
      cursor: pointer;
      &.active {
        background: #6366f1;
        color: #ffffff;
      }
    }
  }
`;

export const WrapperDetailModal = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const WrapperModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 70%;
`

export const Title = styled.h2`
  margin-bottom: 15px;
  font-size: 24px;
  text-align: center;
`;

export const Text = styled.p`
  margin: 10px 0;
  font-size: 16px;

`;

export const Strong = styled.strong`
  font-weight: bold;
`;

export const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ProductItem = styled.li`
  margin: 5px 0;
`;

export const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto; /* Đẩy nút xuống dưới cùng */
`;
export const CloseButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
