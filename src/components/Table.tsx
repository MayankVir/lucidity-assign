interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  onDelete?: (item: T) => void;
  className?: string;
  disabledRows?: Set<number>;
}

function Table<T extends { id: number }>({
  columns,
  data,
  onEdit,
  onView,
  onDelete,
  className = "",
  disabledRows = new Set(),
}: TableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full bg-custom-dark rounded-xl">
        <thead>
          <tr className="border-b border-custom-forest">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`p-4  text-left text-custom-lime text-xs font-normal ${
                  column.className || ""
                }`}
              >
                <span className="bg-black p-1.5 px-3 rounded-xl">
                  {column.header}
                </span>
              </th>
            ))}
            <th className="p-4 text-left text-custom-lime text-xs font-normal">
              <span className="bg-black p-1.5 px-3 rounded-xl">ACTION</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const isDisabled = disabledRows.has(row.id);
            return (
              <tr
                key={rowIndex}
                className={` border-b border-custom-forest hover:bg-custom-forest/30 transition-colors ${
                  isDisabled ? "opacity-50" : ""
                } ${rowIndex === data.length - 1 ? "border-b-0" : ""}`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`p-4 text-sm text-gray-300 ${
                      column.className || ""
                    }`}
                  >
                    {String(row[column.accessor])}
                  </td>
                ))}
                <td className="p-4">
                  <div className="flex gap-3">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        disabled={isDisabled}
                        className="text-custom-lime hover:text-custom-lime/80 disabled:cursor-not-allowed"
                      >
                        <EditIcon />
                      </button>
                    )}
                    {onView && (
                      <button
                        onClick={() => onView(row)}
                        className="text-custom-lime hover:text-custom-lime/80"
                      >
                        <ViewIcon />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        disabled={isDisabled}
                        className="text-red-500 hover:text-red-400 disabled:cursor-not-allowed"
                      >
                        <DeleteIcon />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667L2 11.5ZM13.8067 4.69333C14.0667 4.43333 14.0667 4.01333 13.8067 3.75333L12.2467 2.19333C11.9867 1.93333 11.5667 1.93333 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333Z"
      fill="currentColor"
    />
  </svg>
);

const ViewIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3C4.66667 3 1.82 5.07333 0.666667 8C1.82 10.9267 4.66667 13 8 13C11.3333 13 14.18 10.9267 15.3333 8C14.18 5.07333 11.3333 3 8 3ZM8 11.3333C6.16 11.3333 4.66667 9.84 4.66667 8C4.66667 6.16 6.16 4.66667 8 4.66667C9.84 4.66667 11.3333 6.16 11.3333 8C11.3333 9.84 9.84 11.3333 8 11.3333ZM8 6C6.89333 6 6 6.89333 6 8C6 9.10667 6.89333 10 8 10C9.10667 10 10 9.10667 10 8C10 6.89333 9.10667 6 8 6Z"
      fill="currentColor"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12.6667C4 13.4 4.6 14 5.33333 14H10.6667C11.4 14 12 13.4 12 12.6667V4.66667H4V12.6667ZM12.6667 2.66667H10.3333L9.66667 2H6.33333L5.66667 2.66667H3.33333V4H12.6667V2.66667Z"
      fill="currentColor"
    />
  </svg>
);

export default Table;
