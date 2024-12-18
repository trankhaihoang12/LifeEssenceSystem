import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  background-color: #f7f9fc;
  border-radius: 8px;
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

export const WrapperTableData = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  white-space: nowrap; /* Prevent stacking */
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

export const EditFormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const EditForm = styled.div`
   width: 900px;
    background: #fff;
    padding: 20px;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 15px;

    h2 {
        margin-bottom: 10px;
        font-size: 1.5rem;
        color: #333;
        text-align: center;
    }

    label {
        font-size: 1rem;
        font-weight: bold;
        color: #555;
    }
`;

export const EditFormTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;
export const EditFormButton = styled.button`
   padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #24AEB1;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #007bff;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const CancelButton = styled.button`
background-color: #ccc;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-left: 10px;

    &:hover {
        background-color: #ff7875;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 5px rgba(255, 77, 79, 0.5);
    }
`;
export const WarraperInput = styled.input`
 width: 100%;
 margin-top: 5px;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
        border-color: #24AEB1;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

// Wrapper chung cho hàng input
export const RowWrapper = styled.div`
    display: grid;
    grid-template-columns: ${(props) => props.columns || "1fr"}; /* Linh hoạt cột */
    gap: ${(props) => props.gap || "20px"}; /* Khoảng cách giữa các cột */
`;
export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;


export const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;