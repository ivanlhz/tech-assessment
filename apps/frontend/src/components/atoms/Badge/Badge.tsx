import { StyledBadge } from './Badge.styled';
import { BadgeProps } from './Badge.types';

export const Badge = ({ children, variant }: BadgeProps) => {
  return <StyledBadge variant={variant}>{children}</StyledBadge>;
};
