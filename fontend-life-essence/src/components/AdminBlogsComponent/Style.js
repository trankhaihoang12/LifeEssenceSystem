import styled from "styled-components";

export const WrapperInput = styled.input`
  border: none; 
  outline: none; 
  flex: 1; 
  padding: 10px; 
  border-radius: 20px;
  font-size: 16px;
`;

export const WrapperButton = styled.button`
  background-color: #24AEB1; 
  width: 70px; 
  height: 42px; 
  border: none; 
  border-radius: 20px; 
  padding: 10px; 
  cursor: pointer;
`;


export const WrapperContainer = styled.div`
  padding: 20px;
  background-color: #f7f9fc;
  border-radius: 8px;
`;

export const WrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
  }

  span {
    color: #6b7280;
    font-size: 16px;
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
  background-color: #24AEB1; 
  
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
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

export const WrapperTableData = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  white-space: nowrap; /* Prevent stacking */
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
  text-align: center;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Tạo hiệu ứng đổ bóng nhẹ */

  background-color: ${(props) =>
    props.status === 'approved' ? '#4CAF50' : // Xanh lá cây nhạt, dễ chịu
      props.status === 'pending' ? '#FFB74D' : // Vàng cam nhạt, dễ chịu
        '#E57373' // Đỏ nhạt, dịu nhẹ
  };

  /* Thêm hiệu ứng hover để tăng sự tương tác */
  &:hover {
    opacity: 0.85;
    cursor: pointer;
  }
`;
export const WrapperActionIcons = styled.div`
  display: flex;
  gap: 10px;

  svg {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
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
export const EditFormContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const EditForm = styled.div`
  width: 100%;
  max-width: 700px;
  background: linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%);
  border-radius: 16px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  padding: 25px 30px;
  box-sizing: border-box;

  h3 {
    font-size: 24px;
    font-weight: bold;
    color: #2d3748;
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 14px;
    font-size: 15px;
    background-color: #edf2f7;
    border-radius: 10px;
    border: 1px solid #cbd5e0;
    margin-bottom: 15px;
    transition: border 0.2s ease;

    &:focus {
      border: 1px solid #63b3ed;
      outline: none;
      background-color: #ffffff;
    }
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: #4a5568;
    background-color: #edf2f7;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 12px;
    margin-top: 10px;
    border: 1px solid #e2e8f0;
  }

  .status-container {
    display: flex;
    align-items: center;
    margin-top: 20px;

    .status-label {
      font-size: 18px;
      font-weight: 500;
      color: #718096;
      margin-right: 10px;
    }

    .status-badge {
      display: inline-block;
      padding: 6px 14px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 20px;
      color: #ffffff;
      background-color: ${(props) =>
    props.status === 'approved' ? '#38A169' :
      props.status === 'pending' ? '#ECC94B' : '#E53E3E'};
    }
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;

    button {
      padding: 12px 20px;
      font-size: 15px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s, background-color 0.3s;

      &:hover {
        transform: translateY(-2px);
      }
    }

    .cancel-btn {
      background-color: #e2e8f0;
      color: #4a5568;

      &:hover {
        background-color: #cbd5e0;
      }
    }

    .approve-btn {
      background-color: #48bb78;
      color: white;

      &:hover {
        background-color: #38a169;
      }
    }
  }
`;


export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
`;

export const EditFormButton = styled.button`
    padding: 10px 15px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
`;

export const CancelButton = styled.button`
    padding: 10px 15px;
    background: #FF5733;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

