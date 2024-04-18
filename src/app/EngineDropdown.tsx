// import React, { useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { fetchEngineNames } from './api';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';

// interface EngineDropdownProps {
//     onSelect: (engine: string) => void;
//     currentEngine : string;
//   }

// const EngineDropdown: React.FC<EngineDropdownProps> = ({onSelect,currentEngine}) => { 
//   // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const [engines, setEngines] = useState<string[]>([]);
//   const [engine, setCurrentEngine ] = useState<string>(currentEngine)
//   const onMenuItemClick = (event:any) => {
//     setCurrentEngine(event.currentTarget.dataset.engine)
//     onSelect(event.currentTarget.dataset.engine)
    
//   }

//   useEffect(() => {

//     const getEngines = async () => {
//       const data = await fetchEngineNames();
//       setEngines(data);
//     };

//     getEngines();
//   }, []);
//   console.log({currentEngine})
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >

//     <div>
//       <TextField
//           id="outlined-select-currency"
//           select
//           label="Select engine"
//           defaultValue=""
//           value={engine}
//         >
//         {engines.map((engine, index) => (
//             <MenuItem value={engine} data-engine={engine}  onClick={onMenuItemClick} key={engine}>{engine}</MenuItem>
//       ))}
//       </TextField>
//     </div>
//     </Box>
//   );
// }

// export default EngineDropdown;

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { fetchEngineNames } from './api';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface EngineDropdownProps {
  onSelect: (engine: string) => void;
  currentEngine: string;
}

const EngineDropdown: React.FC<EngineDropdownProps> = ({ onSelect, currentEngine }) => {
  const [engines, setEngines] = useState<string[]>([]);
  const [engine, setCurrentEngine] = useState<string>(currentEngine);

  const onMenuItemClick = (event: any) => {
    setCurrentEngine(event.currentTarget.dataset.engine);
    onSelect(event.currentTarget.dataset.engine);
  };

  useEffect(() => {
    const getEngines = async () => {
      const data = await fetchEngineNames();
      setEngines(data);
    };

    getEngines();
  }, []);

  useEffect(() => {
    setCurrentEngine(currentEngine);
  }, [currentEngine]);

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select engine"
          defaultValue=""
          value={engine}
        >
          {engines.map((engine, index) => (
            <MenuItem value={engine} data-engine={engine} onClick={onMenuItemClick} key={engine}>
              {engine}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
};

export default EngineDropdown;
