import express from 'express';
import axios from 'axios';
import { UNASSIGNED_PARENT_ID, MarvinEndpoint } from '../lib/constants';
import { getDateFormatted } from '../lib/utils';

const router = express.Router();

router.post('/habit-as-task', async (req, res) => {
  try {
    const { parentId, timeEstimate, title, record } = req.body
    if (parentId === UNASSIGNED_PARENT_ID) {
      return res.status(200).json({ message: `Skipping creating a task for habit with name ${title}` })
    }

    // Convert Unix timestamp to YYYY-MM-DD format
    const recordedDate = getDateFormatted(record.time)
    // Need timezone offset for accurate recording
    const timeZoneOffset = new Date().getTimezoneOffset();

    const createTaskData = {
      // TO-DO: Known issue - "done: true" doesn't mark the task as done
      done: true,
      day: recordedDate,
      timeEstimate,
      title,
      parentId,
      // TO-DO: Handle case for when client and server aren't on same timezone
      timeZoneOffset: -timeZoneOffset // Inverting the sign because getTimezoneOffset returns the value in opposite sign
    };

    // (1) Create a task for the habit
    const createTaskResponse = await axios.post(MarvinEndpoint.ADD_TASK, createTaskData);

    // (2) Mark created task as done
    const createdTask = createTaskResponse.data
    await axios.post(MarvinEndpoint.MARK_DONE, { itemId: createdTask._id, timeZoneOffset: -timeZoneOffset })

    console.log(`Successfully created and marked done for task for habit with name ${title}`)
    res.status(200).json({ message: `Successfully created and marked done for task for habit with name ${title}` });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

export default router;
