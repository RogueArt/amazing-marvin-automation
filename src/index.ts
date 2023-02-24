import express from 'express'
import cors from 'cors'
import { followUpsInfo } from '../config/follow-ups'
import { triggerFollowUps } from '../lib/api'
const app = express()
const port = 3000

app.use(cors({ credentials: true, origin: true, exposedHeaders: '*' }))

export function getMatchingFollowUpTaskTitles(title: string): String[] {
  return followUpsInfo
    .filter(({ pattern }) => pattern.test(title))
    .map(({ followUpTasks }) => followUpTasks)
    .flat()
}

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/markDoneTask', (req, res) => {
  console.log('get works!')
  return res.json({ hi: 'hi'})
})

app.post('/markDoneTask', (req, res) => {
  let t: any = { title: 'hi' }
  triggerFollowUps(t)

  res.json({ status: 'Hello webhook!' })
})

app.post('/webhook', (req, res) => {
  console.log('req, res :>> ', req, res);

  // Get the type

  // recordHabit
  // editHabit
  return res.json({ status: 'Good!' })
})

// app.head('/test', (req, res) => {
  
// }) 

app.listen(port, () => {
  console.log('Example app listening on: ' + port)
})

/*
;(async () => {
  const clientToken = 'kII8su+v7C1UvMsgh3ojWJ7pHwQ='
  axios.defaults.headers.common['X-API-Token'] = 'kII8su+v7C1UvMsgh3ojWJ7pHwQ='

  // Add a new task
  console.log('clientToken :>> ', clientToken)
  const res = await axios.post('https://serv.amazingmarvin.com/api/addTask', {
    // params: {
    done: false,
    title: 'TEST TASK - PLEASE DELETE #Health ~30m', // supports some autocompletion (parent, day, dueDate, plannedWeek, plannedMonth, timeEstimate, labels, isStarred)
    // parentId: '29e2702d-87b6-44da-a67d-80965b465759',
    // },
    // headers: {
    //   'X-API-Token': clientToken,
    //   'content-type': 'application/json',
    // },
  })
  console.log('res.status :>> ', res.status)
  console.log('res.data :>> ', res.data)
})()
*/