/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid} from '@mui/material';
import axios from 'axios';

interface Columns {
  engine: string;
  data: {
    column: string;
    dataType: string;
  };
}
interface CommonColumns {
  allColumns: Columns[];
  commonColumns: {
    column: string;
    [key: string]: string;
  }[];
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
    <TableContainer component={Paper} elevation={1} sx={{border: '1px solid #000'}}>
      <Table aria-label="simple table">
        <TableHead>
            <TableRow>
              {(columns && columns.length !== 0) ? 
                <>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {title}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {'Data Type'}
                  </TableCell>
                </>
               : 
               <TableCell align="right" sx={{fontWeight: 'bold'}}>
                No Data
               </TableCell>
              }
            </TableRow>
        </TableHead>
        <TableBody>
        {columns?.map(({column, dataType}) => (
              <TableRow>
              <TableCell align="right" key={column}>{column}</TableCell>
              <TableCell align="right" key={dataType}>{dataType}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function CommonColumnsTable({commonColumns}){
  console.log({commonColumns});

  if (!commonColumns || commonColumns?.length===0)
    return (
      <TableContainer component={Paper} elevation={1} sx={{border: '1px solid #000'}}>
      <Table aria-label="simple table">
        <TableHead>
            <TableRow>
               <TableCell align="right" sx={{fontWeight: 'bold'}}>
                No Data
               </TableCell>
            </TableRow>
        </TableHead>
      </Table>
    </TableContainer>);
  const {column, ...sources} = commonColumns[0];
  const colsDTypes = 
    Object.keys(sources).map((v) => v.replaceAll('source_one_', ' ')
      .replaceAll('source_two_', '').replaceAll('_', ' ').toUpperCase().trim())
  return (
    <TableContainer component={Paper} elevation={1} sx={{border: '1px solid #000'}}>
      <Table aria-label="simple table">
        <TableHead>
            <TableRow>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    COMMON COLUMNS
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {colsDTypes[0]}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {colsDTypes[1]}
                  </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {commonColumns?.map((col: any, index) => (
              <TableRow key={index}>
                <TableCell align="right" key={col.column}>
                  {col.column}
                </TableCell>
                <TableCell align="right" key={col[`${colsDTypes[0].replaceAll(' ', '_').toLowerCase()}`]}>
                  {col[`source_one_${colsDTypes[0].replaceAll(' ', '_').toLowerCase()}`]}
                </TableCell>
                <TableCell align="right" key={col[`source_one_${colsDTypes[0].replaceAll(' ', '_').toLowerCase()}`]}>
                {col[`source_two_${colsDTypes[1].replaceAll(' ', '_').toLowerCase()}`]}
                </TableCell>
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
      {data?.allColumns?.map((table, index) => (
        // eslint-disable-next-line react/jsx-key
        <Grid item xs={6}>
          <div key={index}>
            <br />
            <h3 className="font-bold text-3xl mb-5">{table.engine.toUpperCase()}</h3>
            <EngineTable columns={table.data} title={'Columns'} />
          </div>
        </Grid>
      ))}
      </Grid>
      <div>
        
      <br />
        <h3 className="font-bold text-3xl mb-5">COMMON COLUMNS</h3>
        <CommonColumnsTable commonColumns={data?.commonColumns}/>
      </div>
    </div>
  );
}

export default CommonColumns;
