import styled, { css } from 'styled-components';
import { TypographyProps, TypographyVariant } from './Typography.types';

const variantStyles = {
  h1: css`
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  `,
  h2: css`
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  `,
  h3: css`
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  `,
  h4: css`
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  `,
  body: css`
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  `,
  caption: css`
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  `,
  label: css`
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
};

export const StyledTypography = styled.p<TypographyProps>`
  margin: 0;
  padding: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};

  ${({ variant = 'body' }) => variantStyles[variant as TypographyVariant]};

  color: ${({ theme, color }) => {
    if (color === 'error') {
      return theme.colors.status.error;
    }

    if (color && theme.colors[color] && typeof theme.colors[color] === 'object' && 'main' in theme.colors[color]) {
      return (theme.colors[color] as { main: string }).main;
    }
    return theme.colors.text.primary;
  }};

  ${({ theme, fontWeight }) =>
    fontWeight &&
    css`
      font-weight: ${theme.typography.fontWeight[fontWeight]};
    `};
`;
