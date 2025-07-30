import React, { useEffect } from 'react';

import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../../atoms/Modal';
import { Button } from '../../atoms/Button';
import { Input, Switch } from '../../atoms';
import { Form, ButtonWrapper, Title } from './CreateStudentModal.styled';
import { createStudentSchema, CreateStudentFormValues } from './CreateStudentModal.schema';
import { User } from '../../../core/user/domain/user.entity';

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStudentFormValues) => void;
  isSubmitting: boolean;
  data: User | null;
}

const CreateStudentModal: React.FC<CreateStudentModalProps> = ({ isOpen, onClose, onSubmit, isSubmitting, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateStudentFormValues>({
        resolver: zodResolver(createStudentSchema),

    defaultValues: {
      name: data?.name || '',
      lastName: data?.lastName || '',
      username: data?.username || '',
      email: data?.email || '',
      phone: data?.phone || '',
      isActive: data?.isActive ?? true,
    },
  });

  const { field: isActiveField } = useController({
    name: 'isActive',
    control,
    defaultValue: data?.isActive ?? true,
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: data?.name || '',
        lastName: data?.lastName || '',
        username: data?.username || '',
        email: data?.email || '',
        phone: data?.phone || '',
        isActive: data?.isActive ?? true,
      });
    } else {
        reset();
    }
  }, [isOpen, data, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>{data ? 'Editar Alumno' : 'Crear Alumno'}</Title>
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
        {data && (
          <Switch
            label="Usuario activo"
            checked={isActiveField.value ?? true}
            onChange={isActiveField.onChange}
          />
        )}
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
