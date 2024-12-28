import { Steps } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledSteps = styled(Steps)`
  background-color: #f9fafc; /* Nền sáng hơn */
  padding: 20px; /* Khoảng cách bên trong lớn hơn */
  border-radius: 12px; /* Bo tròn nhẹ */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ hơn */
  border: 1px solid #dcdcdc; /* Đường viền mềm mại */

  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #24AEB1 !important; /* Màu nền bước hiện tại */
    border-color: #24AEB1 !important; /* Màu viền bước hiện tại */
  }
`;

const CustomStep = styled(Steps.Step)`
  .ant-steps-item-title {
    font-weight: 600; /* Chữ đậm trung bình */
    font-size: 16px; /* Kích thước chữ vừa phải */
    color: #333; /* Màu chữ cơ bản */
    transition: color 0.3s ease, transform 0.3s ease; /* Hiệu ứng mượt mà */
  }

  .ant-steps-item-title:hover {
    color: #24AEB1; /* Màu chữ khi hover */
    transform: scale(1.1); /* Phóng to khi hover */
  }

  .ant-steps-item-description {
    color: #555; /* Màu chữ mô tả nhẹ hơn */
    font-size: 14px; /* Kích thước chữ nhỏ hơn */
    margin-top: 8px; /* Khoảng cách trên mô tả */
  }

  &.ant-steps-item-process .ant-steps-item-title {
    color: #24AEB1; /* Màu chữ bước hiện tại */
    text-decoration: underline; /* Gạch chân bước hiện tại */
  }

  &.ant-steps-item-finish .ant-steps-item-title {
    color: #28a745; /* Màu chữ bước hoàn thành */
  }

  .ant-steps-item-icon {
    background-color: #ddd; /* Màu nền biểu tượng mặc định */
    border-radius: 50%; /* Bo tròn biểu tượng */
    color: #fff; /* Màu chữ trong biểu tượng */
    font-size: 14px; /* Kích thước chữ biểu tượng */
  }

  &.ant-steps-item-process .ant-steps-item-icon {
    background-color: #24AEB1; /* Màu nền bước hiện tại */
  }

  &.ant-steps-item-finish .ant-steps-item-icon {
    background-color: #28a745; /* Màu nền bước hoàn thành */
  }
`;

const StepComponent = ({ current = 0, items = [] }) => {
    return (
        <StyledSteps current={current}>
            {items.map((item) => (
                <CustomStep
                    key={item.title}
                    title={item.title}
                    description={item.description}
                />
            ))}
        </StyledSteps>
    );
};

export default StepComponent;
