import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { useState } from 'react';
import { UserTable } from '../../organisms/UserTable';
import { Header, PageWrapper } from './UsersPage.styled';
import CreateStudentModal from '../../organisms/CreateStudentModal';
import { useGetUsers } from '../../../hooks/useGetUsers';
import { useCreateUser } from '../../../hooks/useCreateUser';
import { useUpdateUser } from '../../../hooks/useUpdateUser';
import { CreateStudentFormValues } from '../../organisms/CreateStudentModal/CreateStudentModal.schema';
import { User } from '../../../core/user/domain/user.entity';
import { Row } from '@tanstack/react-table';

export const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [rowData, setRowData] = useState<User | null>(null);

  const { data: paginatedUsers, isLoading, isError } = useGetUsers(currentPage, itemsPerPage);
  const { mutateAsync: createUser, isPending: isCreating} = useCreateUser();
  const { mutateAsync: updateUser, isPending: isUpdating} = useUpdateUser();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRowData(null);
  };

  const handleSubmit = async (data: CreateStudentFormValues) => {
    try {
      if (rowData) {
        await updateUser({id: rowData.id, ...data, isActive: data.isActive ?? rowData.isActive});
      } else {
        await createUser({...data, isActive: true});
      }
      setIsModalOpen(false);
      setRowData(null);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  const handleRowClick = (row: Row<User>) => {
    setRowData(row.original);
    setIsModalOpen(true);
  };

  // TODO: Add loading and error states to the UI
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar los alumnos</div>;

  return (
    <PageWrapper>
      <CreateStudentModal data={rowData} isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} isSubmitting={isCreating || isUpdating} />
      <Header>
        <Typography variant="h1">
          Alumnos
        </Typography>
        <Button size="lg" leftIcon={<Icon name="circle-plus" size={20} />} onClick={handleOpenModal}>
          <b>Nuevo alumno</b>
        </Button>
      </Header>
      <main>
        <UserTable
          users={paginatedUsers?.data || []}
          totalItems={paginatedUsers?.total || 0}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          handleRowClick={handleRowClick}
        />
      </main>
    </PageWrapper>
  );
}
