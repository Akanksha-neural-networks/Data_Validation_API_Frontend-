import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface TableDropdownProps {
  tables?: string[];
  onSelect: (table: string, isFirst: boolean) => void;
  currentTable: string;
  isFirst: boolean;
}

const TableDropdown: React.FC<TableDropdownProps> = ({tables = [], onSelect, currentTable, isFirst}) => {
  const handleTableSelect = (event: React.ChangeEvent<{value: unknown}>) => {
    const selectedTable = event.target.value as string;
    onSelect(selectedTable, isFirst);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '35ch',paddingBottom:'15px'},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id={`outlined-select-table-${isFirst ? 'first' : 'second'}`}
          select
          label={`Select ${isFirst ? 'First' : 'Second'} table`}
          value={currentTable}
          onChange={handleTableSelect}
        >
          {tables && tables.length > 0 ? (
            tables.map((table, index) => (
              <MenuItem key={index} value={table}>
                {table}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              No tables available
            </MenuItem>
          )}
        </TextField>
      </div>
    </Box>
  );
};

export default TableDropdown;
