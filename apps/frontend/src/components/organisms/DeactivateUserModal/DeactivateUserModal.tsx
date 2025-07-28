import React from 'react';
import { Modal } from '../../atoms';
import { Button } from '../../atoms';
import { ConfirmationContent, Title, Message, ButtonWrapper } from './DeactivateUserModal.styles';

interface DeactivateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeactivateUserModal: React.FC<DeactivateUserModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ConfirmationContent>
        <Title>AVISO</Title>
        <Message>
          ¿Seguro que quieres desactivar esta cuenta? El usuario dejará de tener acceso a la plataforma.
        </Message>
        <ButtonWrapper>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="danger" onClick={onConfirm}>Desactivar</Button>
        </ButtonWrapper>
      </ConfirmationContent>
    </Modal>
  );
};

export default DeactivateUserModal;
