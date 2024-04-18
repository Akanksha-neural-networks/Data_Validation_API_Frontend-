import axios from 'axios';

interface SchemaMetadata {
    schema: string;
    tables: string[];
  }
  

interface DatabaseMetadata {
    database: string;
    tables?: string[];
    schemas?: SchemaMetadata[];
  }

const fetchMetadata = async (engine: string): Promise<DatabaseMetadata[]> => {
    let metadata: DatabaseMetadata[] = [];
    
    try {
      const response = await axios.get(`http://localhost:3000/metadata?source=${engine}`);
      metadata = response.data.metadata;
    } catch (error) {
      console.error(`Error fetching metadata for ${engine}:`, error);
    }
  
    console.log(`Engine metadata for ${engine}:`, metadata);
    return metadata;
  };

export default fetchMetadata;