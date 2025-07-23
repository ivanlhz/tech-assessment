import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Icon } from './Icon';
import { IconProps } from './types';

// Mock the SVG assets to avoid errors during testing
vi.mock('../../../assets/circle-user.svg?react', () => ({
  default: (props: IconProps) => <svg data-testid="circle-user-icon" {...props} />,
}));

vi.mock('../../../assets/arrow-down.svg?react', () => ({
  default: (props: IconProps) => <svg data-testid="arrow-down-icon" {...props} />,
}));

describe('Icon Atom', () => {
  it('should render the correct icon based on the name prop', async () => {
    render(<Icon name="circle-user" />);
    const icon = await screen.findByTestId('circle-user-icon');
    expect(icon).toBeInTheDocument();
  });

  it('should apply default size and color styles', async () => {
    render(<Icon name="arrow-down" />);
    const icon = await screen.findByTestId('arrow-down-icon');
    const wrapper = icon.parentElement;

    expect(wrapper).toHaveStyle('width: 24px');
    expect(wrapper).toHaveStyle('height: 24px');
    expect(icon).toHaveStyle('fill: currentColor');
  });

  it('should apply custom size and color from props', async () => {
    render(<Icon name="circle-user" size={48} color="#ff0000" />);
    const icon = await screen.findByTestId('circle-user-icon');
    const wrapper = icon.parentElement;

    expect(wrapper).toHaveStyle('width: 48px');
    expect(wrapper).toHaveStyle('height: 48px');
    // The fill color is applied directly to the SVG element by styled-components
    expect(icon).toHaveStyle('fill: #ff0000');
  });

  it('should apply a custom className to the wrapper', async () => {
    const customClass = 'my-custom-icon-class';
    render(<Icon name="arrow-down" className={customClass} />);
    const icon = await screen.findByTestId('arrow-down-icon');
    const wrapper = icon.parentElement;

    expect(wrapper).toHaveClass(customClass);
  });
});
