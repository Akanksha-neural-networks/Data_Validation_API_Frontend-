'use client';
import {Button, Grid, Paper, Typography} from '@mui/material';
import {useSearchParams} from 'next/navigation';
import React, {useEffect, useState} from 'react';

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const values = searchParams.get('values');
    if (values) {
      try {
        const parsedValues = JSON.parse(decodeURIComponent(values));
        setResults(parsedValues);
      } catch (error) {
        console.error('Error parsing values:', error);
      }
    }
  }, [searchParams]);

  return (
    <Grid container style={{height: '100vh'}}>
      <Grid item xs={2}>
        <Paper style={{height: '100%', padding: '20px'}}>
          <Typography variant="h4" gutterBottom>
            Data Source 
          </Typography>
          {results?.map((source: any, index: number) => (
            <div key={index} style={{marginBottom: '20px'}}>
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
          <Typography variant="h6" gutterBottom>
            Select data operation:
          </Typography>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button variant="contained" color="primary" style={{marginBottom: '10px',width: '200px'}}>
              Preview
            </Button>
            <Button variant="contained" color="primary" style={{marginBottom: '10px',width: '200px'}}>
              Common Columns
            </Button>
            <Button variant="contained" color="primary" style={{marginBottom: '10px',width: '200px'}}>
              Count
            </Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper style={{height: '100%', padding: '20px'}}>
          {/* Content for the second box */}
          <Typography variant="h6" gutterBottom>
            Second Box Content
          </Typography>
          {/* Add your content for the second box here */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;