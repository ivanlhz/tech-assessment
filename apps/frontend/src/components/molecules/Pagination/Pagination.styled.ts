import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const PageButton = styled.button<{ isActive?: boolean }>`
  border: 1px solid ${({ theme, isActive }) => (isActive ? theme.colors.table.currentPageBorder : theme.colors.table.selectorBorder)};
  background-color: ${({ theme }) => theme.colors.neutral.gray50};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.table.currentPageText : theme.colors.table.selectorText)};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:first-child, &:last-child {
    border: 0px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.table.selectorBg};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ItemsPerPageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;
