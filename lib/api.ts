import axios from 'axios'
import dotenv from 'dotenv'
import { getMatchingFollowUpTaskTitles } from '../src/index'
import { Task } from './types'
dotenv.config()

const API_BASE_URL = 'https://serv.amazingmarvin.com/api'

// 1. Authenticate the axios client
axios.defaults.headers.common['X-API-Token'] = process.env.MARVIN_API_TOKEN
axios.defaults.baseURL = API_BASE_URL

/**
 * 
 */
export async function getTodaysTasks(): Promise<Task[]> {
  try {
    const res = await axios.get(`/todayItems?date=2023-02-18`)
    return res.data
  } catch (e) {
    console.error(e)
  }
  return null
}

export async function createNewTask(task: Task): Promise<Task[]> {
  try {
    const res = await axios.post(`/addTask`, task)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function triggerFollowUps(task: Task): Promise<void> {
  // Get follow up tasks
  const followUps = getMatchingFollowUpTaskTitles(task.title)
  console.log('followups', followUps)

  // When a task is completed, create several follow up tasks


}

(async () => {
  // console.log(await getTodaysTasks())
  // console.log(await triggerFollowUps())
})()
