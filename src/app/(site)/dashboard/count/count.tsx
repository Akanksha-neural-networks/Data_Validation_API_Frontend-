'use client';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import CountTable from '../../../ui/component/count-table';

interface ApiResponse {
  engine: string;
  data: {
    [key: string]: number;
  }[];
}

interface CountProps {
  results: {
    engine: string;
    database: string;
    schema?: string;
    table: string;
  }[];
}

const Count: React.FC<CountProps> = ({ results })=> {

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
        
        const response = await axios.post('http://localhost:3000/count', body);
  
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
      {data &&
        data.map((values) => {
          const columns = Object.keys(values.data[0]);

          return (
            <>
              <h3 className="font-bold text-3xl mb-5">{values.engine}</h3>

              <div className="flex flex-row overflow-auto my-9">
                <CountTable columns={columns} rows={values.data}/>
                
              </div>
            </>
          );
        })}
    </div>
  );
};

export default Count;
