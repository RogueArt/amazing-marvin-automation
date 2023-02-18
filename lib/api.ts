import axios from 'axios'
import dotenv from 'dotenv'
import { Task } from './types'
dotenv.config()

const API_BASE_URL = 'https://serv.amazingmarvin.com/api'

// 1. Authenticate the axios client
axios.defaults.headers.common['X-API-Token'] = process.env.MARVIN_API_TOKEN

/**
 * 
 */
export async function getTodaysTasks(): Promise<Task[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/todayItems?date=2023-01-31`)
    return res.data
  } catch (e) {
    console.error(e)
  }
  return null
}
