'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [results, setResults] = useState(null);
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
    <div>
      <h1>Hello Dashboard!</h1>
      <div>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Dashboard;
