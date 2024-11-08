import styled from 'styled-components';

export const Container = styled.div`
    background-color: #f7fafc;
    padding: 16px;
    width: 100%;
    margin: auto;
`;

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 24px;
`;

export const Card = styled.div`
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
    width: 800px;
`;

export const Label = styled.label`
    display: block;
    font-weight: 500;
    margin-bottom: 8px;
`;

export const Input = styled.input`
    width: 90%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 16px;
`;

export const Button = styled.button`
    background-color: #38a169;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px 10px 10px 0px;
    &:hover {
        background-color: #2f855a;
    }
`;
