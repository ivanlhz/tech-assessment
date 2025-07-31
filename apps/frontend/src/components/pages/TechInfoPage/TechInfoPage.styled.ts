import styled from 'styled-components';

export const TechInfoPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing[6]};
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background.secondary};
`;