import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookie from "cookie"
import jwt from 'jsonwebtoken';

const allowedOrigins = ['http://localhost:3000', 'https://votingsystemayathon.vercel.app'];
const app = express();
app.use(cors({
  origin: allowedOrigins,
  methods: ['POST', 'GET'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ip: process.env.DB_IP,
    });

    const { phone, OTP } = req.body;

    const query = 'SELECT * FROM ayathontable WHERE phone = ? AND OTP = ?';
    const values = [phone, OTP];

    const [data] = await connection.query(query, values);
    connection.end();

    if (data.length > 0) {
      const user = {
        phone: data[0].phone,
        OTP: data[0].OTP,
      };

          // Create a JWT token
          const token = jwt.sign(user, process.env.COOKIESECRETKEY);

          // Set the JWT token as a cookie using the 'cookie' package
          res.setHeader('Set-Cookie', cookie.serialize('thejwtcookie', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 1000, // 1 hour
            sameSite: 'strict',
            path: '/',
          }));
    
      
      res.status(200).json({ message: 'Data read successfully', user });
    } else {
      res.status(401).send('Data unavailable');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error reading from MySQL' });
  }
}
