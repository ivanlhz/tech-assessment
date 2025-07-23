import React, { Suspense } from 'react';
import styled from 'styled-components';
import { IconProps, IconName } from './types';

const SvgWrapper = styled.i<Omit<IconProps, 'name'>>`
  display: inline-block;
  width: ${({ size }) => size || 24}px;
  height: ${({ size }) => size || 24}px;

  svg {
    width: 100%;
    height: 100%;
    fill: ${({ color }) => color || 'currentColor'};
  }
`;

const loadIcon = (iconName: IconName) =>
  React.lazy(() => import(`../../../assets/${iconName}.svg?react`));

export const Icon: React.FC<IconProps> = ({ name, size, color, className }) => {
  const SvgIcon = loadIcon(name);

  return (
    <SvgWrapper size={size} color={color} className={className}>
      <Suspense fallback={<div style={{ width: size || 24, height: size || 24 }} />}>
        <SvgIcon />
      </Suspense>
    </SvgWrapper>
  );
};
