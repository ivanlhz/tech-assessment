import React, { useState } from 'react';
import { Modal } from '../../atoms/Modal';
import { Button } from '../../atoms/Button';
import { Form, ButtonWrapper, Title } from './CreateStudentModal.styles';
import { Input } from '../../atoms';
import { FormValues } from './CreateStudentForm.types';

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues) => void;
}

const CreateStudentModal: React.FC<CreateStudentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    lastName: '',
    username: '',
    email: '',
    mobile: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>Crear Alumno</Title>
      <Form onSubmit={handleSubmit}>
        <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Apellidos" name="lastName" value={formData.lastName} onChange={handleChange} />
        <Input label="Nombre de usuario" name="username" value={formData.username} onChange={handleChange} />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <Input label="Móvil" name="mobile" value={formData.mobile} onChange={handleChange} />
        <ButtonWrapper>
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary">Guardar</Button>
        </ButtonWrapper>
      </Form>
    </Modal>
  );
};

export default CreateStudentModal;
