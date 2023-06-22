import mysql from 'mysql';

const host = 'p3plmcpnl499068.prod.phx3.secureserver.net'
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
  console.log('Conectado correctamente a la DB');
})

export default connection