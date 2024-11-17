import { Modal, Button } from 'antd';
import styled from 'styled-components';

// StyledButton không thay đổi
const StyledButton = styled(Button)`
  background-color: #1890ff;
  border-color: #1890ff;

  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;


function ModalComponent({ title = 'Modal', isOpen = false, children, onCancel, onAdd, width, height, ...rests }) {
    return (
        <Modal
            title={title}
            open={isOpen}
            onCancel={onCancel} // Đảm bảo onCancel hoạt động để đóng modal
            width={width}  // Truyền vào width và height như props
            height={height} 
            footer={[
                <StyledButton key="cancel" onClick={onCancel}>
                    Cancel
                </StyledButton>,
                <StyledButton key="ok" type="primary" onClick={onAdd}>
                    OK
                </StyledButton>,
            ]}
            {...rests}
        >
            {children}
        </Modal>
    );
}

export default ModalComponent;
