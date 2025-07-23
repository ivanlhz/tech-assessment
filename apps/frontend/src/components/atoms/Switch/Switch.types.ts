export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: SwitchSize;
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  'data-testid'?: string;
}

export interface SwitchTrackProps {
  $checked: boolean;
  $disabled: boolean;
  $size: SwitchSize;
}
