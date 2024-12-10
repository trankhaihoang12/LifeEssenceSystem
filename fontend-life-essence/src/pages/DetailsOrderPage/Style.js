import styled from 'styled-components';

export const Container = styled.div`
    width: 1100px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
`;

export const PaymentMethod = styled.div`
    width: 400px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
`;

export const Button = styled.button`
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

export const DeliveryAddress = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 1.5;
    width: 400px;
`;

export const UpdateLink = styled.span`
    float: right;
    font-size: 12px;
    color: #007bff;
    cursor: pointer;
`;

export const CombinedItemsSummary = styled.div`
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const ItemsTable = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 10px;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
    }

    th {
        text-align: left;
        font-weight: 500;
    }

    th:last-child {
        text-align: right;
    }
`;

export const ProductImage = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 5px;
`;

export const OrderSummary = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 10px;
        font-size: 16px;
    }

    th {
        text-align: left;
        font-weight: 500;
    }

    td {
        text-align: right;
    }

    tr {
        border-bottom: 1px solid #ccc;
    }

    th:nth-child(2), th:nth-child(3) {
        font-size: 16px;
        font-weight: normal;
    }
`;

export const OrderCode = styled.div`
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 5px;

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 10px;
        font-size: 16px;
    }

    th {
        text-align: left;
    }

    td {
        text-align: right;
    }

    h1 {
        font-size: 26px;
        font-weight: bold;
    }

    h2 {
        font-size: 16px;
        font-weight: normal;
    }
`;

export const TotalSection = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    border-top: 2px solid #ccc;
`;

export const TotalText = styled.div`
    flex: 1;
    text-align: left;
`;

export const TotalAmount = styled.div`
    text-align: right;
    flex: 1;
`;

export const PriceColumn = styled.td`
    text-align: right;
    padding-right: 15px;
    min-width: 100px;
`;

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