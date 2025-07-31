import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel
} from '@tanstack/react-table';
import { TableProps } from './Table.types';
import {
  TableWrapper,
  StyledTable,
  SectionWrapper,
} from './Table.styled';
import { Pagination } from '../Pagination';


export const Table = <T extends object>({
  data,
  columns,
  isLoading,
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  handleRowClick
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalItems / itemsPerPage),
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: itemsPerPage
      }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newPaginationState = updater(table.getState().pagination);
        onPageChange(newPaginationState.pageIndex + 1);
        onItemsPerPageChange(newPaginationState.pageSize);
      } else {
        onPageChange(updater.pageIndex + 1);
        onItemsPerPageChange(updater.pageSize);
      }
    }
  });

  return (
    <SectionWrapper>
      <TableWrapper>
        <StyledTable>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length}>Cargando...</td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} onClick={() => handleRowClick(row)}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>
      <Pagination table={table} totalItems={totalItems} />
    </SectionWrapper>
  );
};
