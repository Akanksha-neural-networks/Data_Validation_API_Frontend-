/* eslint-disable max-lines-per-function */
'use client';
import {Button, Grid, Paper, Typography} from '@mui/material';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import Preview from './preview/preview';
import CommonColumns from './common-columns/common-columns';
import Count from './count/count';

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const searchParams = useSearchParams();

  const [operation, setOperation] = useState('');
  

  useEffect(() => {
    const values = searchParams.get('values');
    if (values) {
      try {
        const parsedValues = JSON.parse(decodeURIComponent(values));
        setResults(parsedValues);
        console.log('printing result-> ', parsedValues);
      } catch (error) {
        console.error('Error parsing values:', error);
      }
    }
  }, [searchParams]);

  const handlePreviewClick = () => {
    console.log('clicked preview btn-> ', results);
    setOperation('preview');
  };

  const handleCommonColumnClick = () => {
    console.log('clicked Common Column btn-> ', results);
    setOperation('common-columns');
  };

  const handleCountClick = () => {
    console.log('clicked Common Column btn-> ', results);
    setOperation('count');
  };

  return (
    <Grid container style={{height: '100vh'}}>
      <Grid item xs={2}>
        <Paper style={{height: '100%', padding: '20px'}}>
          <Typography sx={{marginBottom:'30px'}} variant="h4" gutterBottom>
            Data Source
          </Typography>
          {results?.map((source: any, index: number) => (
            <div key={index} style={{marginBottom: '30px'}}>
              <Typography variant="h5" gutterBottom>
                {source.engine === 'snowflake' ? 'Snowflake' : 'MySQL'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Database: {source.database}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Schema: {source.schema || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Table: {source.table}
              </Typography>
            </div>
          ))}
          <Typography sx={{marginTop:'100px', marginBottom:'20px'}} variant="h5" gutterBottom>
            Select data operation:
          </Typography>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button
              variant="contained"
              color="primary"
              sx={{marginBottom: '20px', width: '200px'}}
              onClick={handlePreviewClick}
            >
              Preview
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{marginBottom: '20px', width: '200px'}}
              onClick={handleCommonColumnClick}
            >
              Common Columns
            </Button>
            <Button variant="contained" 
            color="primary" sx={{marginBottom: '20px', width: '200px'}}  onClick={handleCountClick}>
              Count
            </Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper style={{height: '100%', padding: '20px'}}>
          {/* Content for the second box */}

          {operation==='preview' && (
            <>
              <h1 className="font-bold text-3xl text-blue-1">Preview</h1>
              <Preview results={results} />
            </>
          )}

          {operation==='common-columns' && (
            <>
              <h1 className="font-bold text-3xl text-blue-1">Common Columns</h1>
              <CommonColumns  results={results} />
            </>
          )}

          {operation==='count' && (
            <>
              <h1 className="font-bold text-3xl text-blue-1">Count</h1>
              <Count  results={results} />
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
