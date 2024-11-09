import styled from 'styled-components';

export const Container = styled.div`
    background-color: #f7f7f7;
    padding: 20px; /* Giảm padding */
    font-family: 'Arial', sans-serif;
`;

export const Row = styled.div`
    display: flex;
    gap: 20px; /* Giảm khoảng cách giữa các cột */
    flex-wrap: wrap;
`;

export const Col = styled.div`
    flex: ${(props) => (props.md === 3 ? '1' : '3')};
    padding: 10px;
    min-width: 250px;
`;

export const Sidebar = styled.div`
    background-color: #ffffff;
    border-right: 1px solid #e0e0e0;
    padding: 30px; /* Giảm padding */
    height: 85vh;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const NavLink = styled.a`
    color: ${(props) => (props.active ? '#00bcd4' : '#333')};
    font-weight: bold;
    font-size: 18px; /* Giảm kích thước chữ */
    margin-bottom: 15px; /* Giảm khoảng cách */
    padding: 12px 20px; /* Giảm padding */
    border-radius: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
    border: 2px solid ${(props) => (props.active ? '#00bcd4' : '#e0e0e0')};

    &:hover {
        color: #fff;
        background-color: #00bcd4;
        border-color: #00bcd4;
    }

    i {
        margin-right: 10px;
        font-size: 20px; /* Giảm kích thước icon */
    }
`;

export const Content = styled.div`
    padding: 30px; /* Giảm padding */
    display: flex;
    flex-direction: column;
    gap: 20px; /* Giảm khoảng cách */
    background-color: #ffffff;
    border-radius: 10px;
    height: 85vh;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const SectionContainer = styled.div`
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    padding: 30px; /* Giảm padding */
    border-radius: 10px;
    width: 100%;
    max-width: 800px; /* Giảm max-width */
    margin: 0 auto;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const ProfileCard = styled.div`
    text-align: center;
    margin-bottom: 20px; /* Giảm khoảng cách dưới */
    
    img {
        border-radius: 50%;
        width: 70px; /* Giảm kích thước ảnh */
        height: 70px;
        border: 4px solid #00bcd4;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    h5 {
        margin-top: 10px; /* Giảm khoảng cách */
        font-size: 24px; /* Giảm kích thước chữ */
        font-weight: bold;
        color: #333;
    }

    p {
        font-size: 16px; /* Giảm kích thước chữ */
        color: #00bcd4;
    }
`;

export const PersonalInfo = styled(SectionContainer)`
    h5 {
        font-size: 20px; /* Giảm kích thước chữ */
        font-weight: bold;
        color: #333;
        margin-bottom: 15px; /* Giảm khoảng cách */
    }

    p {
font-size: 16px; /* Giảm kích thước chữ */
        color: #555;
        margin-bottom: 10px;

        strong {
            font-weight: bold;
            color: #333;
        }
    }
`;

export const PaymentMethod = styled(SectionContainer)`
    h5 {
        font-size: 20px; /* Giảm kích thước chữ */
        font-weight: bold;
        color: #333;
        margin-bottom: 15px; /* Giảm khoảng cách */
    }
`;

export const PaymentButton = styled.button`
    font-size: 16px; /* Giảm kích thước chữ */
    padding: 12px 20px; /* Giảm padding */
    background-color: #00bcd4;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 15px; /* Giảm khoảng cách */
    width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #0097a7;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

export const Method = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px; /* Giảm padding */
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    margin-bottom: 15px; /* Giảm khoảng cách */
    background-color: #fafafa;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }

    span {
        display: flex;
        align-items: center;
        font-size: 16px; /* Giảm kích thước chữ */
        color: #333;
    }

    i {
        margin-right: 12px;
        font-size: 20px; /* Giảm kích thước icon */
    }
`;

export const ChangePasswordForm = styled(SectionContainer)`
    h5 {
        font-size: 20px; /* Giảm kích thước chữ */
        font-weight: bold;
        color: #333;
        margin-bottom: 15px; /* Giảm khoảng cách */
    }

    form {
        max-width: 450px; /* Giảm kích thước */
        margin: 0 auto;
    }
`;

export const Input = styled.input`
    display: block;
    width: 100%;
    padding: 12px; /* Giảm padding */
    font-size: 16px; /* Giảm kích thước chữ */
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 10px;
    margin-bottom: 15px; /* Giảm khoảng cách */
    transition: border-color 0.3s;

    &:focus {
        border-color: #00bcd4;
    }
`;

export const Button = styled.button`
    font-size: 16px; /* Giảm kích thước chữ */
    padding: 12px 20px; /* Giảm padding */
    color: #fff;
    background-color: #00bcd4;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
        background-color: #0097a7;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

export const ApplicationNotifications = styled.div`
    h5 {
        font-size: 20px; /* Giảm kích thước chữ */
        font-weight: bold;
        color: #333;
        margin-bottom: 15px; /* Giảm khoảng cách */
    }

    h6 {
font-size: 18px; /* Giảm kích thước chữ */
        color: #555;
        margin-bottom: 12px; /* Giảm khoảng cách */
    }

    label {
        font-size: 16px; /* Giảm kích thước chữ */
        display: flex;
        align-items: flex-start;
        gap: 10px; /* Giảm khoảng cách */
        margin-bottom: 12px; /* Giảm khoảng cách */
        color: #333;

        input {
            margin-right: 8px;
            transform: scale(1.1); /* Giảm kích thước checkbox */
        }

        p {
            font-size: 14px; /* Giảm kích thước chữ */
            color: #777;
            margin: 0;
        }
    }

    .notification-options {
        display: flex;
        flex-direction: column;
        gap: 10px; /* Giảm khoảng cách */
        margin-top: 15px; /* Giảm khoảng cách */
    }
`;

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 8px;
    padding: 20px; /* Giảm padding */
    width: 80%;
    max-width: 500px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const ModalContent = styled.div`
    padding: 15px; /* Giảm padding */
`;

export const ModalHeader = styled.div`
    font-size: 20px; /* Giảm kích thước chữ */
    font-weight: bold;
    color: #333;
    margin-bottom: 15px; /* Giảm khoảng cách */
`;

export const ModalBody = styled.div`
    font-size: 16px; /* Giảm kích thước chữ */
    color: #555;
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

export const ModalButton = styled.button`
    font-size: 16px; /* Giảm kích thước chữ */
    padding: 8px 15px; /* Giảm padding */
    background-color: #00bcd4;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0097a7;
    }
`;