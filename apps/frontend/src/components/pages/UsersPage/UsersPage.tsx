import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { UserTable } from '../../organisms/UserTable';
import { Header, PageWrapper } from './UsersPage.styled';
import CreateStudentModal from '../../organisms/CreateStudentModal';
import { useState } from 'react';

export const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PageWrapper>
      <CreateStudentModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={() => {}} />
      <Header>
        <Typography variant="h1">
          Alumnos
        </Typography>
        <Button size="lg" leftIcon={<Icon name="circle-plus" size={20} />} onClick={handleOpenModal}>
          <b>Nuevo alumno</b>
        </Button>
      </Header>
      <main>
        <UserTable />
      </main>
    </PageWrapper>
  );
};
