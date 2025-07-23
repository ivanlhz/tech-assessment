import styled from 'styled-components';
import { IconProps } from './types';

export const SvgWrapper = styled.i<Omit<IconProps, 'name'>>`
  display: inline-block;
  width: ${({ size }) => size || 24}px;
  height: ${({ size }) => size || 24}px;

  svg {
    width: 100%;
    height: 100%;
    fill: ${({ color }) => color || 'currentColor'};
  }
`;
