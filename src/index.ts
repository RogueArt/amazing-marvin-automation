import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors'
import habitTaskRouter from './habitsToTaskRouter'
import * as CONSTANTS from '../lib/constants'

dotenv.config();

// Send API token each time to Marvin
axios.defaults.headers.common['X-API-Token'] = process.env.MARVIN_API_TOKEN;

const app = express();
// TO-DO: Limit the scope of CORS permissions
app.use(cors({ credentials: true, origin: true, exposedHeaders: '*' }))
app.use(express.json());

// Set up a general CORS policy
const corsOptions = {
  credentials: true,
  allowedHeaders: 'content-type',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  origin: 'https://app.amazingmarvin.com',
};
app.use(cors(corsOptions))


app.use(habitTaskRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
