import React from 'react';
import styles from './styles.module.css';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const Table = ({ data, columns, onEdit, onDelete, onView, customActions }) => {
  return (
    <>
      <table className={`table table-striped table-hover ${styles.table}`}>
        <thead className="table-dark">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete || onView || customActions) && (
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) =>
                col.component ? (
                  <td key={col.key} style={col?.styles}>
                    {col.component(item)}
                  </td>
                ) : (
                  <td key={col.key} style={col?.styles}>
                    {item[col.key]}
                  </td>
                )
              )}
              {(onEdit || onDelete || onView || customActions) && (
                <td className={styles.tableActions}>
                  {customActions && customActions(item)}
                  {onView && (
                    <FaEye
                      className={styles.actionIcon}
                      onClick={() => onView(item)}
                    />
                  )}
                  {onEdit && (
                    <FaEdit
                      className={styles.actionIcon}
                      onClick={() => onEdit(item)}
                    />
                  )}
                  {onDelete && (
                    <FaTrash
                      className={`${styles.actionIcon} ${styles.deleteIcon}`}
                      onClick={() => onDelete(item)}
                    />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
