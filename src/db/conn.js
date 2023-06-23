import mysql from 'mysql';

const host = 'localhost'
const password = 'cGNjJF8jc3VwZXJhZG0'
const user = 'cGNjJF8jc3VwZXJhZG0'
const database = 'cGNjX2Ri'

const dbOptions = {
  user,
  password,
  host,
  database
}

const connection = mysql.createConnection(dbOptions);

connection.connect(err => {
  if (err) throw err;
  console.log('Working DB');
})

export default connection