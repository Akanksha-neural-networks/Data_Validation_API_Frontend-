/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, {useState, useEffect} from 'react';
import fetchMetadata from './fetchMetadata';
import EngineDropdown from './EngineDropdown';
import DatabaseDropdown from './DatabaseDropdown';
import SchemaDropdown from './SchemaDropdown';
import TableDropdown from './TableDropdown';
//import NextButtons from './nextButton';

import Link from 'next/link';

interface SchemaMetadata {
  schema: string;
  tables: string[];
}

interface DatabaseMetadata {
  engine: string;
  database: string;
  tables?: string[];
  schemas?: SchemaMetadata[];
}

const App: React.FC = () => {
  const [metadata, setMetadata] = useState<DatabaseMetadata[]>([]);
  const [selectedValues, setSelectedValues] = useState<Array<any>>([]);
  const [firstState, setFirstState] = useState({
    selectedEngine: '',
    selectedDatabase: '',
    selectedSchema: '',
    selectedTable: '',
    databases: [] as string[],
    schemas: [] as string[],
    tables: [] as string[],
  });

  const [secondState, setSecondState] = useState({
    selectedEngine: '',
    selectedDatabase: '',
    selectedSchema: '',
    selectedTable: '',
    databases: [] as string[],
    schemas: [] as string[],
    tables: [] as string[],
  });

  // const router = useRouter();

  useEffect(() => {
    // setRouter(useRouter());
    // const fetchInitialMetadata = async () => {
    //   try {
    //     const engines = ['snowflake', 'mysql', 'postgres'];
    //     const initialMetadata = await Promise.all(engines.map(async (engine) => {
    //       console.log(`Fetching metadata for engine: ${engine}`);
    //       const metadataForEngine = await fetchMetadata(engine);
    //       return metadataForEngine.map(metadataItem => ({ ...metadataItem, engine }));
    //     }));

    //     const combinedMetadata = [...initialMetadata[0], ...initialMetadata[1]];
    //     setMetadata(combinedMetadata);

    //     setFirstState(prevState => ({
    //       ...prevState,
    //       databases: initialMetadata[0].map(db => db.database),
    //     }));
    //     setSecondState(prevState => ({
    //       ...prevState,
    //       databases: initialMetadata[1].map(db => db.database),
    //     }));
    //   } catch (error) {
    //     console.error('Error fetching initial metadata:', error);
    //   }
    // };

    const fetchInitialMetadata = async () => {
      try {
        const engines = ['snowflake', 'mysql', 'postgres'];
        const initialMetadata = await Promise.all(
          engines.map(async (engine) => {
            console.log(`Fetching metadata for engine: ${engine}`);
            try {
              const metadataForEngine = await fetchMetadata(engine);
              return metadataForEngine.map((metadataItem) => ({...metadataItem, engine}));
            } catch (error) {
              console.error(`Error fetching metadata for engine ${engine}:`, error);
              return [];
            }
          }),
        );
        const combinedMetadata = initialMetadata.flat();

        if (initialMetadata[0]) {
          setFirstState((prevState) => ({
            ...prevState,
            databases: initialMetadata[0].map((db) => db.database),
          }));
        }
        if (initialMetadata[1]) {
          setSecondState((prevState) => ({
            ...prevState,
            databases: initialMetadata[1].map((db) => db.database),
          }));
        }

        setMetadata(combinedMetadata);
      } catch (error) {
        console.error('Error fetching initial metadata:', error);
      }
    };

    fetchInitialMetadata();
  }, []);

  const handleEngineSelect = (selectedEngine: string, isFirst: boolean) => {
    if (isFirst) {
      const selectedDatabases = metadata.filter((db) => db.engine === selectedEngine).map((db) => db.database);

      setFirstState((prevState) => ({
        ...prevState,
        selectedEngine,
        selectedDatabase: '',
        selectedSchema: '',
        selectedTable: '',
        databases: selectedDatabases,
        schemas: [],
        tables: [],
      }));
    } else {
      const selectedDatabases = metadata.filter((db) => db.engine === selectedEngine).map((db) => db.database);

      setSecondState((prevState) => ({
        ...prevState,
        selectedEngine,
        selectedDatabase: '',
        selectedSchema: '',
        selectedTable: '',
        databases: selectedDatabases,
        schemas: [],
        tables: [],
      }));
    }
  };

  const handleDatabaseSelect = (selectedDb: string, isFirst: boolean) => {
    const selectedEngine = isFirst ? firstState.selectedEngine : secondState.selectedEngine;
    const selectedMetadata = metadata.find((db) => db.engine === selectedEngine && db.database === selectedDb);

    let schemas: string[] = [];
    let tables: string[] = [];
    if (selectedEngine !== 'mysql') {
      schemas = selectedMetadata?.schemas?.map((schema) => schema.schema) || [];
    } else {
      console.log({selectedMetadata});
      tables = selectedMetadata?.tables || [];
    }

    if (isFirst) {
      setFirstState((prevState) => ({
        ...prevState,
        selectedDatabase: selectedDb,
        selectedSchema: '',
        selectedTable: '',
        schemas,
        tables,
      }));
    } else {
      setSecondState((prevState) => ({
        ...prevState,
        selectedDatabase: selectedDb,
        selectedSchema: '',
        selectedTable: '',
        schemas,
        tables,
      }));
    }
  };

  const handleSchemaSelect = (selectedSchema: string, isFirst: boolean) => {
    const selectedEngine = isFirst ? firstState.selectedEngine : secondState.selectedEngine;
    const selectedDatabase = isFirst ? firstState.selectedDatabase : secondState.selectedDatabase;
    const selectedMetadata = metadata.find((db) => db.engine === selectedEngine && db.database === selectedDatabase);
    const tables = selectedMetadata?.schemas?.find((schema) => schema.schema === selectedSchema)?.tables || [];

    if (isFirst) {
      setFirstState((prevState) => ({
        ...prevState,
        selectedSchema,
        selectedTable: '',
        tables,
      }));
    } else {
      setSecondState((prevState) => ({
        ...prevState,
        selectedSchema,
        selectedTable: '',
        tables,
      }));
    }
  };

  const handleTableSelect = (selectedTable: string, isFirst: boolean) => {
    const selectedEngine = isFirst ? firstState.selectedEngine : secondState.selectedEngine;
    const selectedDatabase = isFirst ? firstState.selectedDatabase : secondState.selectedDatabase;
    const selectedSchema = isFirst ? firstState.selectedSchema : secondState.selectedSchema;

    const newSelectedValue = {
      engine: selectedEngine,
      database: selectedDatabase,
      schema: selectedSchema,
      table: selectedTable,
    };

    console.log('Data -> ', newSelectedValue);

    setSelectedValues((prevValues) => [...prevValues, newSelectedValue]);

    if (isFirst) {
      setFirstState((prevState) => ({
        ...prevState,
        selectedTable,
      }));
    } else {
      setSecondState((prevState) => ({
        ...prevState,
        selectedTable,
      }));
    }
  };

  return (
    <div className="container">
      <h1 className="page-heading">Select Data Sources to Compare</h1>
  
      <div className="sections-container">
        <div className="section section-first">
          <h2 className="section-heading">Select first datasource</h2>
          <EngineDropdown
            currentEngine={firstState.selectedEngine}
            onSelect={(engine) => handleEngineSelect(engine, true)}
          />
  
          <DatabaseDropdown
            databases={firstState.databases}
            onSelect={(database) => handleDatabaseSelect(database, true)}
            currentDatabase={firstState.selectedDatabase}
          />
  
          {firstState.selectedEngine !== 'mysql' && (
            <SchemaDropdown
              schemas={firstState.schemas}
              onSelect={(schema) => handleSchemaSelect(schema, true)}
              currentSchema={firstState.selectedSchema}
            />
          )}
  
          <TableDropdown
            tables={firstState.tables}
            onSelect={(table, isFirst) => handleTableSelect(table, true)}
            currentTable={firstState.selectedTable}
            isFirst={true}
          />
        </div>
  
        <div className="section section-second">
          <h2 className="section-heading">Select second datasource</h2>
          <EngineDropdown
            currentEngine={secondState.selectedEngine}
            onSelect={(engine) => handleEngineSelect(engine, false)}
          />
  
          <DatabaseDropdown
            databases={secondState.databases}
            onSelect={(database) => handleDatabaseSelect(database, false)}
            currentDatabase={secondState.selectedDatabase}
          />
  
          {secondState.selectedEngine !== 'mysql' && (
            <SchemaDropdown
              schemas={secondState.schemas}
              onSelect={(schema) => handleSchemaSelect(schema, false)}
              currentSchema={secondState.selectedSchema}
            />
          )}
  
          <TableDropdown
            tables={secondState.tables}
            onSelect={(table, isFirst) => handleTableSelect(table, false)}
            currentTable={secondState.selectedTable}
            isFirst={false}
          />
        </div>
      </div>
  
      <Link href={{
          pathname: '/dashboard',
          query: { values: JSON.stringify(selectedValues) },
        }}
      >
        <button className="button">Next</button>
      </Link>
  
      <style jsx>{`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
  }

  .page-heading {
    font-weight: bold;
    font-size: 30px;
    font-family: 'Proxima Nova', Arial, sans-serif;
    margin-bottom: 50px;
    margin-left:150px;
  }

  .sections-container {
    display: flex;
    justify-content: space-between; 
    align-items: flex-start; 
    max-width: 1000px;
    width: 55%;
    margin-top: 20px;
  }

  .section {
    flex: 1;
    margin: 0 5px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f5f5f5; 
    border-radius: 8px; 
  }

  .section-first {
    margin-left:80px;
    margin-right: 10px;
  }

  .section-second {
    margin-left: 10px;
  }

  .section-heading {
    font-weight: bold;
    font-size: 20px;
    font-family: 'Proxima Nova', Arial, sans-serif;
  }

  .button {
    padding: 10px 60px 10px 28px;
    background-color: #00adb5;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: bold;
    font-size: 1.0em;
    margin-left:200px;
    margin-top: 50px;
    text-align: center;
  }

  .button:hover {
    background-color: #008489;
  }
`}</style>

    </div>
  );

  
};

export default App;
