import styled from 'styled-components';
export const Container = styled.div`
  padding: 20px;
  background-color: #f7f9fc;
  border-radius: 8px;
`;
export const AddProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 2px dashed #007bff; /* Thay đổi màu viền */
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
      background-color: #e7f1ff; /* Màu nền khi hover */
  }
  i {
      font-size: 36px;
      color: #007bff; /* Màu icon */
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
  background-color: #4DB6AC; /* Màu nền giống với thanh điều hướng */
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