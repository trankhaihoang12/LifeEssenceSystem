import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  font-size: 18px;
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
  font-size: 18px;
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

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  font-size: 18px;

  th, td {
      vertical-align: middle;
      padding: 20px;
      text-align: center;
      border: 1px solid #ddd;
  }

  th {
      background-color: #4DB6AC; /* Màu nền giống với thanh điều hướng */
      color: white; /* Màu chữ trắng */
      font-weight: bold;
  }

  td {
      background-color: #fff; /* Màu nền ô dữ liệu */
  }

  .table-row:hover {
      background-color: #f2f2f2; /* Màu nền khi hover hàng */
  }

  .action-icons {
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .action-icons i {
      margin: 0 10px;
      cursor: pointer;
      font-size: 20px;
  }

  .action-icons i.text-warning {
      color: #ffc107; /* Màu vàng cho icon chỉnh sửa */
  }

  .action-icons i.text-danger {
      color: #dc3545; /* Màu đỏ cho icon xóa */
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
      font-size: 18px;
      padding: 10px 20px;
      margin: 0 10px;
      border-radius: 5px;
      transition: background-color 0.3s;

      &:hover {
          background-color: #0056b3; /* Màu khi hover nút */
      }

      &:disabled {
          background-color: #ccc;
          cursor: not-allowed;
      }
  }

  .page-number {
      display: flex;
      align-items: center;
      font-size: 18px;

      span {
          margin: 0 8px;
          cursor: pointer;

          &.active {
              font-weight: bold;
              text-decoration: underline;
              color: #007bff; /* Màu cho trang hiện tại */
          }
      }
  }
`;
