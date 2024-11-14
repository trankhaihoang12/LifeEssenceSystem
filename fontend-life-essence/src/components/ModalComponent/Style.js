import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
    .ant-modal-header {
        background-color: #4A90E2; /* Màu nền cho header */
        color: white; /* Màu chữ cho tiêu đề */
        border: none; /* Không có đường viền */
        font-weight: bold; /* Đậm chữ */
    }

    .ant-modal-title {
        font-size: 1.5rem; /* Kích thước chữ tiêu đề */
    }

    .ant-modal-body {
        padding: 30px; /* Padding cho body */
        background-color: #f9f9f9; /* Màu nền cho body */
    }

    .ant-modal-footer {
        display: flex;
        justify-content: flex-end; /* Căn chỉnh footer bên phải */
        background-color: #f0f2f5; /* Màu nền cho footer */
        border-top: 1px solid #e8e8e8; /* Đường viền trên footer */
    }

    button {
        background-color: #4A90E2; /* Màu nền cho nút */
        color: white; /* Màu chữ cho nút */
        border: none; /* Không viền */
        border-radius: 5px; /* Bo góc */
        padding: 10px 20px; /* Padding cho nút */
        cursor: pointer; /* Con trỏ chuột khi hover */
        transition: background-color 0.3s; /* Hiệu ứng chuyển màu */
        margin-left: 10px; /* Khoảng cách giữa các nút */
    }

    button:hover {
        background-color: #357ABD; /* Màu nền khi hover */
    }

    label {
        font-weight: bold; /* Đậm chữ cho label */
        display: block; /* Hiển thị label như block */
        margin-bottom: 8px; /* Khoảng cách dưới label */
    }

    input {
        width: 100%; /* Chiều rộng 100% */
        padding: 10px; /* Padding cho input */
        border: 1px solid #ccc; /* Đường viền cho input */
        border-radius: 4px; /* Bo góc cho input */
        margin-bottom: 20px; /* Khoảng cách dưới input */
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Đổ bóng cho input */
    }
`;