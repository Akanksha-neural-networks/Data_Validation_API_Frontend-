'use client';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PreviewTable from '@/app/ui/component/preview-table';
import { useSearchParams } from 'next/navigation';
import Grid from '@mui/material/Grid';

interface ApiResponse {
  engine: string;
  data: {
    [key: string]: any;
  }[];
}

interface PreviewProps {
  results: {
    engine: string;
    database: string;
    schema?: string;
    table: string;
  }[];
}

const Preview: React.FC<PreviewProps> = ({ results })=> {

  const [data, setData] = useState<ApiResponse[] | null>(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const body=results.map((item)=>({
          engine: item.engine,
          database:item.database,
          schema:item.schema||undefined,
          table:item.table
        }));
        
        const response = await axios.post('http://localhost:3000/preview', body);
  
        setData(response.data);
        console.log('fetch data -> ', response.data);
      } catch (error) {
        console.log('Error Fetching data', error);
      }
    };

    fetchData();

  },[results]);

  return (
    <div className="flex flex-col items-center">
      <Grid container spacing={2}>
      {data &&
        data.map((values) => {
          const columns = values.data[0] ? Object.keys(values.data[0]) : ['No Data'];

          return (
            <Grid item xs={6}>
              <h3 className="font-bold text-3xl mb-5">{values.engine.toUpperCase()}</h3>

              <div className="flex flex-row overflow-auto my-9">
                <PreviewTable columns={columns} rows={values.data} />
              </div>
            </Grid>
          );
        })}
        </Grid>
    </div>
  );
};

export default Preview;
