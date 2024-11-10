import express from 'express';
import axios from 'axios';
import { UNASSIGNED_PARENT_ID, MarvinEndpoint } from '../lib/constants';
import { getDateFormatted, getMarvinTimezoneOffset } from '../lib/utils';

const router = express.Router();

router.post('/habit-as-task', async (req, res) => {
  try {
    switch (req.query.type) {
      case 'record-habit': await addTaskOnHabitCompletion(req.body, res); break
    }
  } catch (error) { 
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

async function addTaskOnHabitCompletion(recordedHabitInfo, res) {
  const { parentId, timeEstimate, title, record } = recordedHabitInfo
    if (parentId === UNASSIGNED_PARENT_ID) {
      return res.status(200).json({ message: `Skipping creating a task for habit with name ${title}` })
    }

    // Convert Unix timestamp to YYYY-MM-DD format
    const recordedDate = getDateFormatted(record.time)
    const timeZoneOffset = getMarvinTimezoneOffset()

    const createTaskData = {
      done: true,
      day: recordedDate,
      timeEstimate,
      title,
      parentId,
      timeZoneOffset
    };

    await axios.post(MarvinEndpoint.ADD_TASK, createTaskData);

    console.log(`Successfully added done task for habit with name ${title}`)
    res.status(200).json({ message: `Successfully added done task for habit with name ${title}` });
}
  }
});

export default router;
