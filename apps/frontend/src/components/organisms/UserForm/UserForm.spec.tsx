import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';
import { UserForm } from './UserForm';

describe('UserForm', () => {
  const setup = () => {
    return render(
      <ThemeProvider theme={theme}>
        <UserForm />
      </ThemeProvider>
    );
  };

  it('should render all form fields', () => {
    setup();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellidos')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre de usuario')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Móvil')).toBeInTheDocument();
  });

  it('should update input value on change', () => {
    setup();
    const nameInput = screen.getByLabelText('Nombre');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput).toHaveValue('John');
  });
});
