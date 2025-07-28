import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: ${({ theme }) => theme.spacing[6]}; // 1.5rem
  position: relative;
  width: 90%;
  max-width: 500px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]}; // 1rem
  right: ${({ theme }) => theme.spacing[4]}; // 1rem
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral.gray500};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral.gray700};
  }
`;

export const ModalContent = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]}; // 1rem
`;
