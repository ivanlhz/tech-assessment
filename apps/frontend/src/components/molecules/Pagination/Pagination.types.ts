import { Table as TanstackTable } from '@tanstack/react-table';

export interface PaginationProps<T> {
    table: TanstackTable<T>;
    totalItems: number;
}
 