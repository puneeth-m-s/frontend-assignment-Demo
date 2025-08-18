import React, { useState, useMemo } from "react";

export default function DataTable({ data = [], columns = [], loading, selectable, onRowSelect }) {
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (col) => {
    let direction = "asc";
    if (sortConfig?.key === col.key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col.key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleRowSelect = (row) => {
    let updated;
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter((r) => r !== row);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect && onRowSelect(updated);
  };

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (data.length === 0) return <p className="p-4 text-center">No data available</p>;

  return (
    <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          {selectable && <th className="p-2 border dark:border-gray-700">Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => col.sortable && handleSort(col)}
              className="p-2 border dark:border-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer"
            >
              {col.title}
              {sortConfig?.key === col.key ? (sortConfig.direction === "asc" ? " 🔼" : " 🔽") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800">
            {selectable && (
              <td className="p-2 border dark:border-gray-700">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => handleRowSelect(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td
                key={col.key}
                className="p-2 border dark:border-gray-700 text-gray-800 dark:text-gray-100"
              >
                {row[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
