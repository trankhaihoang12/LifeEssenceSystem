import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  width: 23%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  h2 {
    font-size: 18px;
    margin: 0;
  }

  .amount {
    font-size: 24px;
    font-weight: bold;
    margin: 10px 0;
  }

  .details {
    font-size: 14px;
    color: #6c757d;
  }

  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 24px;
  }

  &.sent {
    background-color: #e0f7fa;
  }

  &.paid {
    background-color: #e0f7fa;
  }

  &.unpaid {
    background-color: #fff3e0;
  }

  &.cancelled {
    background-color: #ffebee;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  input {
    width: 60%;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 5px;
  }

  select {
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 5px;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    th, td {
      padding: 12px;  /* Tăng độ padding cho các ô */
      text-align: left;
      vertical-align: middle;
      font-size: 14px;  /* Kích thước chữ giống như ví dụ */
      color: #374151;   /* Màu chữ giống như ví dụ */
    }

    th {
      font-weight: 600;  /* Đậm chữ ở tiêu đề */
      background-color: #4DB6AC;  /* Màu nền giống thanh điều hướng */
      color: white;  /* Màu chữ trắng */
      font-size: 14px;  /* Kích thước chữ trong tiêu đề */
      border-bottom: 1px solid #e5e7eb;
      white-space: nowrap;
    }

    td {
      font-size: 14px;  /* Kích thước chữ giống trong ví dụ */
      color: #374151;   /* Màu chữ giống trong ví dụ */
      border-bottom: 1px solid #e5e7eb;
      text-align: left;
      white-space: nowrap;  /* Ngừng dòng trong ô */
    }

    tr:nth-child(even) {
      background-color: #f9fafb;  /* Màu nền xen kẽ giữa các dòng */
    }

    td:first-child, th:first-child {
      border-top-left-radius: 8px;
    }

    td:last-child, th:last-child {
      border-top-right-radius: 8px;
    }
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

export const Status = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;

  &.paid {
    background-color: #d4edda;
    color: #155724;
  }

  &.unpaid {
    background-color: #f8d7da;
    color: #721c24;
  }

  &.refund {
    background-color: #fff3cd;
    color: #856404;
  }

  &.cancel {
    background-color: #f5c6cb;
    color: #721c24;
  }
`;

export const TrashIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e74c3c; /* Màu đỏ đẹp mắt */
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Thêm bóng mờ cho icon */
  color: white;
  font-size: 24px;
  transition: transform 0.2s ease, background-color 0.3s ease; /* Thêm hiệu ứng hover */
  
  &:hover {
    background-color: #c0392b; /* Màu đỏ đậm khi hover */
    transform: scale(1.1); /* Phóng to icon khi hover */
  }

  i {
    font-size: 28px; /* Tăng kích thước icon */
  }
`;

// Dropdown menu for action items
export const DropdownMenu = styled.div`
  position: absolute;
  top: 25px; /* Điều chỉnh lại vị trí để menu xuất hiện ngay dưới nút ba chấm */
  right: 0;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 150px;
  z-index: 10;
  border: 1px solid #ced4da;
  padding: 5px 0;
`;


export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #ced4da;
  }
`;