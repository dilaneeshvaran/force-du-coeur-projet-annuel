import mysql from 'mysql';

interface DBParams {
  host: string;
  user: string;
  password: string;
  database: string;
}

const dbParams : DBParams = {
  host: 'localhost',
  user: 'root',
  password: 'force',
  database: 'f-du-coeur'
}

const connection = mysql.createConnection ({
  host: dbParams.host,
  user: dbParams.user,
  password: dbParams.password,
  database: dbParams.database
})

export default dbParams;

