import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[8]};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;
