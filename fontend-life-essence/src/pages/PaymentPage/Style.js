import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
  text-align: center;
  color: #24AEB1;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

export const ShippingInfoContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
`;

export const OrderDetailsContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const Select = styled.select`
  width: 32%;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-right: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const ProductList = styled.div`
  margin-top: 20px;
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  color:red;
  margin-right: 20px;
`;

export const ProductName = styled.span`
  flex: 1;
  font-size: 15px;
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
`;

export const QuantityText = styled.span`
  font-size: 16px;
  min-width: 20px;
  text-align: center;
`;

export const SummaryContainer = styled.div`
  padding-top: 20px;
  border-top: 1px solid #ddd;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 16px;
`;

export const PaymentMethodContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  width:700px;
`;

export const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 16px;
  cursor: pointer;
`;

export const RadioButton = styled.input`
  margin-right: 10px;
`;

export const PlaceOrderButton = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  background-color: #24AEB1;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  align-self: center;
  max-width: 200px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;
