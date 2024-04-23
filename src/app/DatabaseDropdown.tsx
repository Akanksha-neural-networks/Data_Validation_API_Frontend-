import React, {useEffect, useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface DatabaseDropdownProps {
  databases: string[];
  onSelect: (database: string) => void;
  currentDatabase: string;
}

const DatabaseDropdown: React.FC<DatabaseDropdownProps> = ({databases, onSelect, currentDatabase}) => {
  const [database, setDatabase] = useState<string>(currentDatabase);

  useEffect(() => {
    setDatabase(currentDatabase);
  }, [currentDatabase]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDatabase = event.target.value;
    setDatabase(selectedDatabase);
    onSelect(selectedDatabase);
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
          id="outlined-select-currency"
          select
          label="Select database"
          value={database}
          onChange={handleChange}
        >
          {databases.map((db) => (
            <MenuItem key={db} value={db}>
              {db}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
};

export default DatabaseDropdown;
