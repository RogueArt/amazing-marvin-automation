import express from 'express';
import axios from 'axios';
import * as CONSTANTS from '../lib/constants';
import { getDateFormatted } from '../lib/utils';

const router = express.Router();

// 2. Endpoint to handle POST requests at /habit-as-task
router.post('/habit-as-task', async (req, res) => {
  try {
    // Extract values to create task from name
    const { parentId, timeEstimate, title, record } = req.body

    // Calculate the current day in Pacific Time Zone
    const today = getDateFormatted(record.time)

    // Calculate the time zone offset in minutes for Pacific Time
    const timeZoneOffset = new Date().getTimezoneOffset();

    // Data for the POST request
    const postData = {
      done: true,
      day: today,
      timeEstimate,
      title,
      parentId,
      // TO-DO: Handle case for when client and server aren't on same timezone
      timeZoneOffset: -timeZoneOffset // Inverting the sign because getTimezoneOffset returns the value in opposite sign
    };

    // 3. Axios POST request - Create a task
    const createTaskResponse = await axios.post(`${CONSTANTS.API_BASE_URL}/addTask`, postData);

    // 4. Axios POST request - Mark task as done
    const createdTask = createTaskResponse.data
    await axios.post(`${CONSTANTS.API_BASE_URL}/markDone`, { itemId: createdTask._id, timeZoneOffset: -timeZoneOffset })

    res.status(200).json({ message: `Successfully created and marked done for task for habit with name ${title}` });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

export default router;
