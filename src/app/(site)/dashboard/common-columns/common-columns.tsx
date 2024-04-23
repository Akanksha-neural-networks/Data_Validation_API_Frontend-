import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import axios from 'axios';

interface Columns {
  engine: string;
  data: string[];
}
interface CommonColumns {
  all_columns: Columns[];
  common_columns: string[];
}

interface CommonColumnsProps {
  results: {
    engine: string;
    database: string;
    schema?: string;
    table: string;
  }[];
}
function EngineTable({columns,title}){
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell align="center" sx={{fontWeight: 'bold'}}>
               {title}
              </TableCell>
            </TableRow>

        </TableHead>
        <TableBody>
        {columns?.map((column) => (
              <TableRow>
              <TableCell align="center" key={column}>{column}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function CommonColumns({ results }:CommonColumnsProps)  {
const [data, setData] = useState<CommonColumns | null>({} as CommonColumns);
  useEffect(() => {
    console.log("Hello World")
    const fetchData = async () => {
      try {
        const body = results.map((item) => ({
          engine: item.engine,
          database: item.database,
          schema: item.schema || undefined,
          table: item.table,
        }));
        console.log("Calling API")
        const response = await axios.post('http://localhost:3000/common-columns', body);

        console.log('fetch data -> ', response.data);
        setData(response.data);
       
      } catch (error) {
        console.log('Error Fetching data', error);
      }
    };

    fetchData();
  }, [results]);
  

  return (
    <div>
      <h1>Tables</h1>
      {data?.all_columns?.map((table, index) => (
        <div key={index}>
          <br />
          <h2>Engine: {table.engine}</h2>
          <EngineTable columns={table.data} title={'All Columns'} />
        </div>
      ))}
      <div>
      <br />
        <h2>Common Columns</h2>
        <EngineTable columns={data?.common_columns} title={'Common Columns'} />
      </div>
    </div>
  );
}

export default CommonColumns;
