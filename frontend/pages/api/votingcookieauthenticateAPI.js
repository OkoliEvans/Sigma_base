import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookie from "cookie"
import jwt from 'jsonwebtoken';


const app = express();

app.use(express.json());
app.use(cookieParser());

export default async function handler(req, res) {
    const token = req.cookies.thejwtcookie;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.COOKIESECRETKEY);
      res.status(200).json({ user: decodedToken });
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
}
