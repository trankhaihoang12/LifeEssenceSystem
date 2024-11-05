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

export const ButtonCustom = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.5rem; /* Tăng kích thước font chữ */

  &:hover {
    background-color: #218838;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start; /* Căn nút về bên trái */
  margin-bottom: 20px; /* Thêm khoảng cách dưới các nút */
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background-color: #4DB6AC; /* Màu nền giống với thanh điều hướng */
    color: white; /* Màu chữ trắng */
    padding: 20px; /* Tăng padding để cải thiện tính thẩm mỹ */
    font-size: 2rem; /* Tăng kích thước font chữ */
  }

  td {
    padding: 20px; /* Tăng padding để cải thiện tính thẩm mỹ */
    font-size: 1.5rem; /* Tăng kích thước font chữ */
  }

  /* Thay đổi kích thước font chữ cho trạng thái đơn hàng */
  .badge-paid,
  .badge-processing,
  .badge-cod,
  .badge-shipped,
  .badge-delivered,
  .badge-refund {
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 1.2rem; /* Thay đổi kích thước font chữ cho các badge */
  }

  .badge-paid {
    background-color: #28a745; /* Màu sắc cho trạng thái Paid */
    color: white;
  }

  .badge-processing {
    background-color: #ffc107; /* Màu sắc cho trạng thái Processing */
    color: white;
  }

  .badge-cod {
    background-color: #007bff; /* Màu sắc cho trạng thái COD */
    color: white;
  }

  .badge-shipped {
    background-color: #dc3545; /* Màu sắc cho trạng thái Shipped */
    color: white;
  }

  .badge-delivered {
    background-color: #17a2b8; /* Màu sắc cho trạng thái Delivered */
    color: white;
  }

  .badge-refund {
    background-color: #dc3545; /* Màu sắc cho trạng thái Refund */
    color: white;
  }
`;

export const Pagination = styled.div`
  margin-top: 20px;

  .pagination {
    list-style: none;
    display: flex;
    justify-content: center; /* Căn giữa phân trang */
    padding: 0;
  }

  .page-item {
    margin: 0 5px;
  }

  .page-link {
    text-decoration: none;
    color: #007bff;
    padding: 10px 15px;
    border: 1px solid #007bff;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #007bff;
      color: white;
    }
  }
`;
