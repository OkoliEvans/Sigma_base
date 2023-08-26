import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ip: process.env.DB_IP,
  });
 
  try {
    const { country, state, lga, first_name, last_name, phone, OTP } = req.body;
    
    // Check if the phone number already exists in the database
    const checkQuery = 'SELECT * FROM ayathontable WHERE phone = ?';
    const checkValues = [phone];
    const [existingData] = await connection.query(checkQuery, checkValues);

    if (existingData.length > 0) {
      res.status(400).json({ error: 'Phone number already exists' });
      return; // Stop further processing
    }

    // If phone number doesn't exist, insert the new data
    const insertQuery = 'INSERT INTO ayathontable (`country`, `state`, `lga`, `first_name`, `last_name`, `phone`, `OTP`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const insertValues = [country, state, lga, first_name, last_name, phone, OTP];
    const [insertData] = await connection.query(insertQuery, insertValues);
    
    res.status(200).json({ message: 'Data inserted successfully', results: insertData });
  } catch (error) {
    console.error('Error inserting data into MySQL:', error);
    res.status(500).json({ error: 'Error inserting data into MySQL' });
  } finally {
    // Close the connection after the try-catch block is done (success or error)
    if (connection) {
      connection.end();
    }
  }
}
