import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../../atoms/Modal';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms';
import { Form, ButtonWrapper, Title } from './CreateStudentModal.styled';
import { createStudentSchema, CreateStudentFormValues } from './CreateStudentModal.schema';

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStudentFormValues) => void;
  isSubmitting: boolean;
}

const CreateStudentModal: React.FC<CreateStudentModalProps> = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStudentFormValues>({
        resolver: zodResolver(createStudentSchema),

    defaultValues: {
      name: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>Crear Alumno</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nombre"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Apellidos"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
        <Input
          label="Nombre de usuario"
          {...register('username')}
          error={errors.username?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Móvil"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <ButtonWrapper>
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </Button>
        </ButtonWrapper>
      </Form>
    </Modal>
  );
};

export default CreateStudentModal;
