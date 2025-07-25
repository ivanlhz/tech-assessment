import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../molecules/Table';
import { Badge } from '../../atoms/Badge';
import { User } from './UserTable.types';
import { mockUsers } from '../../../fixtures/users';

export const UserTable = () => {
  const [data] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      header: '',
      accessorKey: 'status',
      cell: ({ row }) => (
        <Badge variant={row.original.status}>
          {row.original.status === 'active' ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
    },

    {
      header: 'Nombre y apellidos',
      accessorKey: 'fullName',
      cell: ({ row }) => (
        <span>{row.original.fullName}</span>
      ),
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
    },
  ], []);

  return (
    <Table<User>
      data={data}
      columns={columns}
      totalItems={1237} // Mock total items from screenshot
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
    />
  );
};
