import { ReactNode } from 'react';
import { DefaultTheme } from 'styled-components';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  as?: keyof JSX.IntrinsicElements;
  color?: keyof DefaultTheme['colors'] | 'error';
  fontWeight?: keyof DefaultTheme['typography']['fontWeight'];
  className?: string;
}
