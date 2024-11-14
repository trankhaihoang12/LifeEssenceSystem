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
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ status }) => (status === 'Active' ? '#27AE60' : '#EB5757')};
  background-color: ${({ status }) => (status === 'Active' ? '#e6f4ea' : '#fde2e2')};
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
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

