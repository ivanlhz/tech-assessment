import React, { useState } from 'react';
import { Input } from '../../atoms/Input';
import { Form } from './UserForm.styled';
import { UserFormProps } from './UserForm.types';

export const UserForm: React.FC<UserFormProps> = ({ className }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  return (
    <Form className={className}>
      <Input
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Introduce tu nombre"
      />
      <Input
        label="Apellidos"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Introduce tus apellidos"
      />
      <Input
        label="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Introduce tu nombre de usuario"
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Introduce tu email"
      />
      <Input
        label="Móvil"
        type="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Introduce tu móvil"
      />
    </Form>
  );
};

export default UserForm;
