import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../molecules/Table';
import { User } from '../../../core/domain/entities/user.entity';

interface UserTableProps {
  users: User[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export const UserTable = ({ 
  users,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange 
}: UserTableProps) => {
  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      header: 'Nombre',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
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
    />
  );
};
