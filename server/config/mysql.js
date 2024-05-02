const mysql2 = require('mysql2')

  function  dbConnect() {

    let connectionConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'gastosapp', 
      port: process.env.DB_PORT || 3306,
      multipleStatements: true,
    
    };

    const connection =  mysql2.createConnection(connectionConfig);
    connection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
      } else {
        console.log('Conexión exitosa a la base de datos!');
      }
   
    });
    
    return connection;
  }
 

  
  module.exports = dbConnect;
