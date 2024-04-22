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
    <div>
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

      <Link
        href={{
          pathname: '/dashboard',
          query: {values: JSON.stringify(selectedValues)},
        }}
      >
        Next
      </Link>

      {/* <NextButtons selectedValues={selectedValues} /> */}
    </div>
  );
};

export default App;
