import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 800px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Card = styled.div`
    padding: 20px;
    width: 600px;
    display: flex;
    justify-content: center;
`;

export const WrapperInput = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
`;

export const WrapperLabel = styled.label`
    display: block;
    margin-bottom: 5px;
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #24AEB1;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #28a745;
    }
`;

