import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors'
import * as CONSTANTS from '../lib/constants'

dotenv.config();

const app = express();

// TO-DO: Limit the scope of CORS permissions
app.use(cors({ credentials: true, origin: true, exposedHeaders: '*' }))

// Express setup
app.use(express.json());


// Listen on port 8080
app.listen(CONSTANTS.PORT, () => {
  console.log(`Server is running on port ${CONSTANTS.PORT}`);
});
