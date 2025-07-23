import React, { Suspense } from 'react';
import { IconProps, IconName } from './types';
import { SvgWrapper } from './Icon.styled';

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
