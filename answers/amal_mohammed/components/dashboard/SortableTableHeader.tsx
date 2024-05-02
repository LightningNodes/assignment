import React from 'react';

interface Header {
  text: string;
  key: string | null;
}

interface SortableHeaderProps {
  headers: Header[];
  sortBy: string;
  sortAscending: boolean;
  onSort: (sortKey: string) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ headers, sortBy, sortAscending, onSort }) => (
  <thead className="text-lg font-bold text-gray-200 bg-zinc-950 sticky top-0 z-50">
    <tr>
      {headers.map(({ text, key }) =>
        key ? (
          // Using key + text combination for unique key prop
          <th key={key} className="px-4 py-3 cursor-pointer" onClick={() => onSort(key)}>
            {text} {sortBy === key ? (sortAscending ? '▲' : '▼') : ''}
          </th>
        ) : (
          // Using text as a fallback key for headers without a sorting key
          <th key={text} className="px-4 py-3">{text}</th>
        )
      )}
    </tr>
  </thead>
);

export default SortableHeader;
