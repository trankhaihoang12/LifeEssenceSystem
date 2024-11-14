import { message } from "antd";
import styled from "styled-components";

const StyledMessage = styled.div`
  .ant-message-success {
    background-color: #e6fffb;
    border: 1px solid #87e8de;
    color: #0c5460;
  }
  
  .ant-message-error {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
  }
  
  .ant-message-warning {
    background-color: #fff3cd;
    border: 1px solid #ffeeba;
    color: #856404;
  }
`;

const success = (mes = 'Success') => {
    message.success(<StyledMessage>{mes}</StyledMessage>);
};

const error = (mes = 'Error') => {
    message.error(<StyledMessage>{mes}</StyledMessage>);
};

const warning = (mes = 'Warning') => {
    message.warning(<StyledMessage>{mes}</StyledMessage>);
};

export { success, error, warning };
