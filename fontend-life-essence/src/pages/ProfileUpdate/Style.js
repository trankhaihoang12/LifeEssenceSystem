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
    padding: 24px;
    width: 1200px;
`;

export const Label = styled.label`
    display: block;
    font-size: 12px;
    font-weight: 540;
    margin-bottom: 8px;
    width: 500px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 8px;
    height: 35px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 16px;
`;

export const Button = styled.button`
    background-color: #00AB94;
    color: white;
    width: 135px;
    height: 40px;
    font-size: 12px;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin: 10px 10px 10px 0px;
    &:hover {
        background-color: #2f855a;
    }
`;
