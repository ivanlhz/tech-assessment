import styled, { css } from 'styled-components';
import { BadgeProps } from './Badge.types';

const variants = {
  active: css`
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.table.text};
  `,
  inactive: css`
    background-color: ${({ theme }) => theme.colors.neutral.gray200};
    color: ${({ theme }) => theme.colors.table.text};
  `,
};

export const StyledBadge = styled.span<BadgeProps>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  text-transform: lowercase;

  ${({ variant }) => variants[variant] || variants.inactive}
`;
