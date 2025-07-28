import styled from 'styled-components';

export const ConfirmationContent = styled.div`
  text-align: center;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral.gray600};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral.gray700};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;
