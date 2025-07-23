import styled from 'styled-components';
import { SwitchTrackProps, SwitchSize } from './Switch.types';

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; // 16px spacing between switch and text
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:focus + label {
    outline: 0.125rem solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 0.125rem;
  }
`;

const switchSizes = {
  sm: {
    width: '2.25rem', // 36px
    height: '1.25rem', // 20px
    thumbSize: '1rem', // 16px
    thumbOffset: '0.125rem', // 2px
    thumbActiveLeft: '1.125rem', // 18px
  },
  md: {
    width: '3rem', // 48px
    height: '1.5rem', // 24px
    thumbSize: '1.25rem', // 20px
    thumbOffset: '0.125rem', // 2px
    thumbActiveLeft: '1.625rem', // 26px
  },
  lg: {
    width: '3.75rem', // 60px
    height: '1.875rem', // 30px
    thumbSize: '1.5rem', // 24px
    thumbOffset: '0.1875rem', // 3px
    thumbActiveLeft: '2.0625rem', // 33px
  },
};

export const SwitchTrack = styled.label<SwitchTrackProps>`
  position: relative;
  display: inline-block;
  width: ${({ $size }) => switchSizes[$size].width};
  height: ${({ $size }) => switchSizes[$size].height};
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.switch.active : theme.colors.switch.inactive};
  border-radius: ${({ $size }) => `calc(${switchSizes[$size].height} / 2)`};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: ${({ theme }) =>
    `background-color ${theme.transitions.duration.normal} ${theme.transitions.easing.easeInOut}`};

  // Thumb (indicador deslizable)
  &::before {
    content: '';
    position: absolute;
    top: ${({ $size }) => switchSizes[$size].thumbOffset};
    left: ${({ $checked, $size }) =>
      $checked ? switchSizes[$size].thumbActiveLeft : switchSizes[$size].thumbOffset};
    width: ${({ $size }) => switchSizes[$size].thumbSize};
    height: ${({ $size }) => switchSizes[$size].thumbSize};
    background-color: ${({ theme }) => theme.colors.neutral.white};
    border-radius: 50%;
    transition: ${({ theme }) =>
      `left ${theme.transitions.duration.normal} ${theme.transitions.easing.easeInOut}, box-shadow ${theme.transitions.duration.fast} ${theme.transitions.easing.easeInOut}`};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  // Estados de hover
  &:hover:not([aria-disabled='true']) {
    &::before {
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
  }

  // Estados de focus (viene del input oculto)
  &:focus-within {
    outline: 0.125rem solid ${({ theme }) => theme.colors.primary.light}40;
    outline-offset: 0.125rem;
  }

  // Estado activo (cuando se presiona)
  &:active:not([aria-disabled='true']) {
    &::before {
      transform: scale(0.95);
    }
  }
`;

export const SwitchLabel = styled.span<{ $size: SwitchSize }>`
  color: ${({ theme }) => theme.colors.switch.label};
  font-size: ${({ theme, $size }) => {
    const fontSizes = {
      sm: theme.typography.fontSize.sm,
      md: theme.typography.fontSize.base,
      lg: theme.typography.fontSize.lg,
    };
    return fontSizes[$size];
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  user-select: none;
`;
