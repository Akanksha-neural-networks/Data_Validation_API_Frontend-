import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface SchemaDropdownProps {
  schemas?: string[];
  onSelect: (schema: string) => void;
  currentSchema: string;
}

const SchemaDropdown: React.FC<SchemaDropdownProps> = ({schemas = [], onSelect, currentSchema}) => {
  const handleSchemaSelect = (event: React.ChangeEvent<{value: unknown}>) => {
    const selectedSchema = event.target.value as string;
    onSelect(selectedSchema);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '25ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-schema"
          select
          label="Select schema"
          value={currentSchema}
          onChange={handleSchemaSelect}
        >
          {schemas && schemas.length > 0 ? (
            schemas.map((schema, index) => (
              <MenuItem key={index} value={schema}>
                {schema}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              No schemas available
            </MenuItem>
          )}
        </TextField>
      </div>
    </Box>
  );
};

export default SchemaDropdown;
