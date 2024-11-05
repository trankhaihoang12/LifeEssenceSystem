import styled from "styled-components";



export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  margin: 0 20px;

  input {
    width: 800px; /* Tăng chiều rộng để dài hơn một chút */
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 25px;
    font-size: 16px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin: 0 10px; /* Thêm margin để cách đều 2 bên */
  }

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 25px;
    background-color: #4DB6AC;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #3b9b98;
    }
  }
`;
export const StatsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const StatsBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  margin: 0 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-size: 20px; /* Kích thước chữ tiêu đề lớn hơn */
    margin-bottom: 10px; /* Khoảng cách dưới tiêu đề */
  }

  p {
    font-size: 24px; /* Kích thước chữ nội dung lớn hơn */
    font-weight: bold; /* Để chữ đậm hơn */
  }
`;

export const ChartSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ChartBox = styled.div`
  background-color: white;
  border-radius: 10px;
  flex: 1;
  margin: 0 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const TableSection = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 20px;
    font-size: 24px; /* Tăng kích thước chữ tiêu đề */
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      border: 1px solid #ccc;
      padding: 12px; /* Tăng padding để tạo không gian */
      text-align: left;
      font-size: 18px; /* Tăng kích thước chữ cho th và td */
    }

    th {
      background-color: #f5f5f5;
      font-weight: bold; /* Làm cho chữ đậm hơn */
    }

    tr:hover {
      background-color: #f0f0f0;
    }
  }
`;
