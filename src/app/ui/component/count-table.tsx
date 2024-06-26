import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {makeStyles} from '@mui/material';

interface ICountTable {
  columns: string[];
  rows: any[];
}

export default function CountTable({columns, rows}: ICountTable) {
  return (
    <TableContainer component={Paper} elevation={1} sx={{border: '1px solid #000'}}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell align="right" sx={{fontWeight: 'bold'}}>
                {column.toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow >
              {columns.map((col, index) => (
                <TableCell align="right">{row[col]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
