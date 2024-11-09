import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 48px auto;
  padding: 32px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
    font-weight: bold;
  }

  button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

export const AddressSection = styled(InfoSection)`
  margin-top: 48px;
`;

export const AddressCard = styled.div`
  h3 {
    font-size: 18px;
    font-weight: bold;

  }

  button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;