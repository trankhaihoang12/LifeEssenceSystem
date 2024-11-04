import styled from "styled-components";

export const WrapperInput = styled.input`
  border: none; 
  outline: none; 
  flex: 1; 
  padding: 10px; 
  border-radius: 20px;
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
  color: #4b5563;
  text-align: left;
  background-color: #f3f4f6;
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
