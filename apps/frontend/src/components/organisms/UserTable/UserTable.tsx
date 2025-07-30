import { useMemo } from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';
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
  handleRowClick: (row: Row<User>) => void;
}

export const UserTable = ({ 
  users,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  handleRowClick 
}: UserTableProps) => {
  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      header: '',
      accessorKey: 'isActive',
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? 'active' : 'inactive'}>
          {row.original.isActive ? 'Activo' : 'Inactivo'}
        </Badge>
       ),
    },
    {
      header: 'Nombre y Apellidos',
      accessorFn: (row) => `${row.name} ${row.lastName}`,
      id: 'name',
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

  return (
    <Table<User>
      data={users}
      columns={columns}
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      onPageChange={onPageChange}
      onItemsPerPageChange={onItemsPerPageChange}
      handleRowClick={handleRowClick}
    />
  );
};
