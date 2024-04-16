"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios";

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
  
    <div>
    <button onClick={fetchData} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline:none focus:border-gray-600'>Preview</button>
    {data &&
      data.map((item) => (
        <div key={item.engine}>
          <h3>{item.engine}</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(item.data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.data.map((rowData, index) => (
                <tr key={index}>
                  {Object.values(rowData).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
  </div>
  )
}

export default PreviewPage
