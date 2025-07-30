import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../molecules/Table';
import { User } from '../../../core/user/domain/user.entity';
import { Badge } from '../../atoms';

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
  isActive: boolean;
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
      header: '',
      accessorKey: 'isActive',
      cell: ({ row }) => (
        <Badge variant={row.getValue('isActive') ? 'active' : 'inactive'}>
          {row.getValue('isActive') ? 'Activo' : 'Inactivo'}
        </Badge>
       ),
    },
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
    isActive: user.isActive,
    name: `${user.name} ${user.lastName}`,
    username: user.username,
    email: user.email,
    phone: user.phone || '',
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
