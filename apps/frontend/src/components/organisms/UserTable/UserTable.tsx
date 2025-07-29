import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../molecules/Table';
import { User } from '../../../core/user/domain/user.entity';

interface UserTableProps {
  users: User[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

interface UserTableData {
  name: string;
  username: string;
  email: string;
  phone: string;
}
  

export const UserTable = ({ 
  users,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange 
}: UserTableProps) => {
  const columns = useMemo<ColumnDef<UserTableData>[]>(() => [
    {
      header: 'Nombre y Apellidos',
      accessorKey: 'name',
    },
    {
      header: 'Usuario',
      accessorKey: 'username',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Móvil',
      accessorKey: 'phone',
    }
  ], []);

  const usersData = useMemo<UserTableData[]>(() => users.map(user => ({
    name: `${user.name} ${user.lastName}`,
    username: user.username,
    email: user.email,
    phone: user.phone || ''
  })), [users]);

  return (
    <Table<UserTableData>
      data={usersData}
      columns={columns}
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      onPageChange={onPageChange}
      onItemsPerPageChange={onItemsPerPageChange}
    />
  );
};
