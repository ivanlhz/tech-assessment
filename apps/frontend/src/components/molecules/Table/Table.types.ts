import { ColumnDef, Row } from '@tanstack/react-table';

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  isLoading?: boolean;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  handleRowClick: (row: Row<T>) => void;
}
