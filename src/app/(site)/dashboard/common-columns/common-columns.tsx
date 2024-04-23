import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid} from '@mui/material';
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
  
  console.log({columns})
  return (
    <TableContainer component={Paper} elevation={1} sx={{border: '1px solid #000'}}>
      <Table aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell align="right" sx={{fontWeight: 'bold'}}>
               {columns && columns.length !== 0 ? title : 'No Data'}
              </TableCell>
            </TableRow>

        </TableHead>
        <TableBody>
        {columns?.map((column) => (
              <TableRow>
              <TableCell align="right" key={column}>{column}</TableCell>
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
      <Grid container spacing={2}>

      {data['all-columns']?.map((table, index) => (
        <Grid item xs={6}>
        <div key={index}>
          <br />
          <h3 className="font-bold text-3xl mb-5">{table.engine.toUpperCase()}</h3>
          <EngineTable columns={table.data} title={'All Columns'} />
        </div>
        </Grid>
      ))}
      </Grid>
      <div>
        
      <br />
        <h3 className="font-bold text-3xl mb-5">COMMON COLUMNS</h3>
        <EngineTable columns={data?.common_columns} title={'Columns'} />
      </div>
    </div>
  );
}

export default CommonColumns;
