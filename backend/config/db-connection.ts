import {MongoClient} from 'mongodb'

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase () {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }
  // set the connection options
  const opts: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient('mongodb://localhost:27017', opts);
  await client.connect();
  let db = client.db('next-auth');

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
      client: cachedClient,
      db: cachedDb,
  };
}