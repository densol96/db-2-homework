import React from "react";
import styled from "styled-components";
import useTable from "./useTable";
import Pagination from "@/ui/Pagination";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";
import useDeleteRow from "./useDeleteRow";

type Props = {
  pagination: React.ReactNode;
  data: Record<string, any>[];
  tableName: string;
};
//

const StyledTable = styled.table<{ hasFooter: boolean }>`
  font-size: 1.4rem;
  border-collapse: collapse;

  td,
  th {
    padding: 1rem;
    border: 1px solid var(--color-table-border);
    text-align: center;
  }

  thead tr {
    background-color: var(--color-table-light) !important;
  }

  tr:nth-child(even) {
    background-color: var(--color-table-light);
  }
  tr:nth-child(odd) {
    background-color: var(--color-table-dark);
  }

  tfoot {
    tr {
      td {
        padding: 0;
        ${(props) => !props.hasFooter && `border: none`}
      }
    }
  }

  .delete-btn {
    color: var(--color-active);
  }
`;

const StyledEmptyMessage = styled.div`
  width: 100%;
  padding: 3rem;
  text-align: center;
  border: 1px solid var(--color-table-border);
  font-size: 1.4rem;

  p:first-child {
    margin-bottom: 0.5rem;
  }
`;

export const Table: React.FC<Props> = ({ data, tableName, pagination }) => {
  const { isDeleting, deleteRow } = useDeleteRow(tableName);

  if (data.length === 0) {
    return (
      <StyledEmptyMessage>
        <p>
          Šī tabula ir tukša <TbMoodEmptyFilled />
        </p>
        <p>Mēģiniet ievietot jaunu ierakstu.</p>
      </StyledEmptyMessage>
    );
  }

  const columns = Object.keys(data[0]);
  return (
    <StyledTable hasFooter={pagination !== null}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th>{col}</th>
          ))}
          <th>Dzēst</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr>
              {columns.map((colName) => (
                <td>{row[colName]}</td>
              ))}
              <th>
                <button
                  disabled={isDeleting}
                  onClick={() => deleteRow([tableName, row.id])}
                  className="delete-btn"
                >
                  <FaTrash />
                </button>
              </th>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td className="footer-pagination" colSpan={columns.length + 1}>
            {pagination}
          </td>
        </tr>
      </tfoot>
    </StyledTable>
  );
};
