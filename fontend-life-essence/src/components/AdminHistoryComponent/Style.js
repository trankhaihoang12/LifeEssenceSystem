import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #7367f0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  &:hover {
    background-color: #5a54d0;
  }
`;

export const ChartContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const ChartWrapper = styled.div`
  flex: 3;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SummaryCard = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h4 {
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;
  }

  p {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const TableContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 20px;
    font-size: 18px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      font-size: 14px;
    }

    th {
      background-color: #f5f5f5;
      color: #333;
    }

    tr:hover {
      background-color: #f1f1f1;
    }
  }
`;
