import React, { type JSX } from 'react';

export type ColumnConfig<T, K extends keyof T = keyof T> = {
  key: K;
  label: string;
  render?: (value: T[K], row: T) => React.ReactNode;
};

export type DynamicTableProps<T> = {
  data: T[];
  columns: ColumnConfig<T>[];
  actions?: (row: T) => React.ReactNode;
};

function DynamicTable<T extends { id: number | string }>({ data, columns, actions }: DynamicTableProps<T>): JSX.Element {
  return (
    <div className='container__table'>
      <table className="table__table">
        <thead className="table__table-head">
          <tr className="table__table-row">
            {columns.map((col) => (
              <th key={String(col.key)} className="table__table-header">
                {col.label}
              </th>
            ))}
            {actions && <th className="table__table-header">Acciones</th>}
          </tr>
        </thead>

        <tbody className="table__table-body">
          {data.map((row) => (
            <tr key={row.id} className="table__table-row">
              {columns.map((col) => {
                const cellValue = row[col.key];
                return (
                  <td key={String(col.key)} className="table__table-cell">
                    {col.render ? col.render(cellValue, row) : String(cellValue)}
                  </td>
                );
              })}
              {actions && (
                <td className="table__table-cell table__actions-cell">
                  <div className='table__table-data'>
                    {actions(row)}
                  </div>
                </td>
              )}
            </tr>
          ))}

          {!data.length && (
            <tr className="table__table-row">
              <td colSpan={columns.length+1} className="table__table-cell"> No hay resultados </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;