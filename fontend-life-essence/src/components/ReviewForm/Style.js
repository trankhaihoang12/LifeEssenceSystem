import styled from 'styled-components';

export const FormContainer = styled.div`
    max-width: 900px;
    padding: 20px;
    border-radius: 8px;
    
`;

export const FormTitle = styled.h2`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 50px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const SubmitButton = styled.button`
margin-top: 10px;
    background-color: #38b2ac;
    font-size: 12px;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    
    &:hover {
        background-color: #319795;
    }
`;

export const CheckboxLabel = styled.label`
    margin-left: 8px;
`;