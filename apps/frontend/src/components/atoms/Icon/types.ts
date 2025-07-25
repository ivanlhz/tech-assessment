export const iconNames = [
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'circle-exclamation',
  'circle-plus',
  'circle-user',
  'dots',
  'envelope',
  'graduation-cap',
  'logo',
  'mobile',
] as const;

export type IconName = (typeof iconNames)[number];

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}
