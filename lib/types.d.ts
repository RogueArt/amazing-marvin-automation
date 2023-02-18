export interface Task {
  // Internally used information
  _id: string
  _rev: string
  createdAt: number
  db: string
  parentId: string // ID of parent category/project
  masterRank: number
  fieldUpdates: object
  
  // User-facing data
  title: string // supports some autocompletion (parent, day, dueDate, plannedWeek, plannedMonth, timeEstimate, labels, isStarred). Use header X-Auto-Complete=false to disable autocompletion.
  done: boolean
  day: string
  labelIds: string[] // IDs of labels
  firstScheduled: string
  rank: number
  dailySection: string
  bonusSection: string // "Essential" or "Bonus"
  customSection: string // ID of custom section (from profile.strategySettings.customStructure)
  timeBlockSection: string // ID of time block
  note: string
  dueDate: string | null,
  timeEstimate: number // ms
  isReward: boolean
  isStarred: number
  isFrogged: number
  plannedWeek: string
  plannedMonth: string
  rewardPoints: number
  rewardId: string // Unique ID of attached Reward
  backburner: boolean // Manually put in backburner (can also be backburner from label, start date, etc.)
  reviewDate: string
  itemSnoozeTime: number
  permaSnoozeTime: string
  // Time offset in minutes
  //
  // Added to time to fix time zone issues.  So if the user is in Pacific time,
  // this would be -8*60.  If the user added a task with +today at 22:00 local
  // time 2019-12-05, then we want to create the task on 2019-12-05 and not
  // 2019-12-06 (which is the server date).
  timeZoneOffset: number
}