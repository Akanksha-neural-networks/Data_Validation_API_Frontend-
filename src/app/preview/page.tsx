"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios";
import PreviewTable from '../ui/component/preview-table';

interface ApiResponse {
    engine: string;
    data: {
      [key: string]: any; 
    }[];
  }


const PreviewPage = () => {
    const body = [
        {
            engine: 'snowflake',
            database: 'garden',
            schema: 'veggies',
            table: 'root_depth',
        },
        {
            engine: 'mysql',
            database: 'college',
            table: 'students',
        },
        {
            engine: 'postgres',
            database: 'users',
            table: 'usersdata',
        },
    ];

    const [data, setData] = useState<ApiResponse[] | null>(null);


    const fetchData=async()=>{
        try {
            const response=await axios.post("http://localhost:3000/preview",body);

            setData(response.data);
            console.log("fetch data -> ",response.data);
            
        } catch (error) {
            console.log("Error Fetching data",error)
            
        }
    }

    


  return (
  
    <div className="flex flex-col items-center">
    <button onClick={fetchData} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline:none focus:border-gray-600'>Preview</button>

      {data && data.map((values)=>{
        const columns=Object.keys(values.data[0])

        return (
          <>

          <h3 className="font-bold text-3xl mb-5">{values.engine}</h3>

          <div className="overflow-auto my-9">
          <PreviewTable columns={columns} rows={values.data} />
          </div>  

          
          
          </>


        ) 
        

      })
      
      }


  </div>
  )
}

export default PreviewPage
