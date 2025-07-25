import styled from 'styled-components';

export const TableWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.text.primary};

  th,
  td {
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
    text-align: left;
  }

  thead {
    background-color: ${({ theme }) => theme.colors.table.background};
    th {
      color: ${({ theme }) => theme.colors.table.text};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      text-transform: capitalize;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      font-size: ${({ theme }) => theme.typography.fontSize.base};
    }
  }
`;

