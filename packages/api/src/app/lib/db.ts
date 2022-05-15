import { Pool } from 'pg';
const { DEV_MODE } = process.env;

class Database {
  pool: Pool;
  constructor() {
    this.connect();
  }
  connect() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: DEV_MODE ? false : { rejectUnauthorized: false },
    });

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client "DATABASE" class: ', err);
      process.exit(-1);
    });
  }
  async query(queryString) {
    const client = await this.pool.connect();
    const data = await client.query(queryString);
    client.release();
    return data;
  }
  async addNewOrCheckGithubUser(username: string) {
    const client = await this.pool.connect();
  }
}

module.exports = new Database();
