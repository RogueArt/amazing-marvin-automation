import express from 'express';
import axios from 'axios';
import { UNASSIGNED_PARENT_ID, MarvinEndpoint } from '../lib/constants';
import { getDateFormatted, getMarvinTimezoneOffset } from '../lib/utils';

const router = express.Router();

router.post('/habit-as-task', async (req, res) => {
  try {
    switch (req.query.type) {
      case 'record-habit': await addTaskOnHabitCompletion(req.body, res); break
      case 'mark-done': await markHabitOnTaskCompletion(req.body, res); break
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

async function markHabitOnTaskCompletion(completedTaskInfo, res) {
  const { title } = completedTaskInfo

  // List all the habits
  const { data: habitInfos } = await axios.get(MarvinEndpoint.LIST_HABITS_FULL);

  // Build a mapping of habit IDs and to which words to map to
  const habitIdToPatternMatchingMap = buildHabitToPatternsMapping(habitInfos)

  // TO-DO: Refactor this using a filter
  // Go through each pattern, check if any of the titles match
  const habitIdsToMarkComplete = []
  for (const [habitId, patterns] of Object.entries(habitIdToPatternMatchingMap)) {
    if (patterns.some(pattern => title.toLowerCase().includes(pattern))) habitIdsToMarkComplete.push(habitId)
  }

  // No tasks to mark complete
  if (habitIdsToMarkComplete.length === 0) {
    console.log(`No related habits to mark done for task ${title}`)
    return res.status(200).json({ message: `No related habits to mark done for task ${title}` });
  }

  // Otherwise, go through and mark all the matched habits as complete
  await Promise.all(habitIdsToMarkComplete.map(habitId => {
    return axios.post(MarvinEndpoint.UPDATE_HABIT, getRecordHabitData(habitId))
  }))

  console.log(`Successfully marked habits with IDs ${habitIdsToMarkComplete.join(', ')} complete for ${title}`)
  res.status(200).json({ message: `Successfully added done task for habit with name ${title}` });
}
function buildHabitToPatternsMapping(habitInfos) {
  const habitToPatternsMapping: Record<string, string[]> = {}
  for (const { _id, note } of habitInfos) {
    if (note.length === 0) continue

    const patterns = note.split(CSV_REGEX).map(s => s.toLowerCase())
    habitToPatternsMapping[_id] = patterns
  }
  return habitToPatternsMapping
}

function getRecordHabitData(habitId) {
  return {
    habitId,
    time: Date.now(),
    value: 1,
    updateDB: true,
  }
}

export default router;
