import styled from 'styled-components';

export const FormFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[3]} 0;
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;
