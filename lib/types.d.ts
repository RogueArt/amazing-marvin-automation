/**
 * @interface Task
 * @property {String} _id - The task's unique ID.  For tasks generated from recurring tasks, this is of the form `${date}-${id}` where date is YYYY-MM-DD and id is the recurring task's id.
 * @property {Number} createdAt - Date.now() when the task was created.
 * @property {Number} updatedAt - Date.now() when the task was last updated.
 * @property {Number} workedOnAt - Date.now() when the task was last worked on (e.g. a subtask was completed).
 * @property {String} title - The task's title, like "Go to market".
 * @property {String} parentId - ID of parent project or category, or "unassigned".
 * @property {String} dueDate - When this project should be completed, formatted as "YYYY-MM-DD". Or null if no dueDate.
 * @property {String} startDate - When this task can be started, formatted as "YYYY-MM-DD". Or null if no start date.
 * @property {String} endDate - When this task should be completed (soft deadline), formatted as "YYYY-MM-DD". Or null if no end date.
 * @property {String} day - Which day the task is scheduled, in the format "YYYY-MM-DD", or "unassigned".  Guaranteed to be "YYYY-MM-DD" if the task is done.
 * @property {String} firstScheduled - Which day the task was first assigned to, formatted as "YYYY-MM-DD" or "unassigned" if it was never scheduled yet. Used to calculate how many !!! in procrastination strategy.
 * @property {String} plannedWeek - Which week the task is planned for. Date of the Monday of the ISO week (Mon-Sun) formatted as "YYYY-MM-DD"
 * @property {String} plannedMonth - Which month the task is planned for. "YYYY-MM"
 * @property {String} sprintId - The task's sprint, null if nothing
 * @property {Number} rank - The task's sort order in the day view.
 * @property {Number} masterRank - The task's sort order within the master list.  Having two ranks is necessary since scheduled tasks are shown in the master list, just grayed out.  And completed tasks within a project are shown crossed out.
 * @property {Boolean} done - True if this task has been completed.
 * @property {Number|null} completedAt - Date.now() when this task was completed.
 * @property {Number} duration - How long the user worked on this task (in ms). As of 1.18.0, only set when the task is done.
 * @property {Number[]} times - Array of Date.now() when time tracking started (odd indexes) and stopped (even indexes).  Updated when time tracking stops and when the task is marked done (or when manually edited by user).
 * @property {Number} firstTracked - When this task was first tracked (Date.now()).
 * @property {Number} doneAt - When this task was completed (Date.now()).
 * @property {Boolean} isReward - True if this task is a reward task.
 * @property {Boolean} isStarred - Used for priorities strategy. 3=red, 2=orange, 1=yellow (or true from old version).
 * @property {Boolean} isFrogged - True if this task has been frogged for eatThatFrog. 1=normal, 2=baby, 3=monster.
 * @property {Boolean} isPinned - Whether this task has been pinned to the master list.  In other words, scheduling it will just schedule a copy, and this task will remain in the master list.
 * @property {String} pinId - The pinned task that this task was copied from.
 * @property {Boolean} recurring - True if this task was generated via a recurring task.
 * @property {String} recurringTaskId - The recurring task that generated this task.
 * @property {Boolean} echo - True if this is an "echo" task (from RecurringTask type="echo").
 * @property {String} echoId - ID of task used to create this task (from RecurringTask type="echo").
 * @property {String} link - System-created tasks can have links, i.e. to "/braindump".  This is in the link target.
 * @property {Object.<String,Subtask>} subtasks - ID => Subtask.
 * @property {String} colorBar - One of null, "red", "yellow", "green" or "blue". No longer used.
 * @property {String[]} labelIds - The IDs of labels assigned to the task.  Any labelId that doesn't correspond to an existing label in strategySettings.labels should be ignored.
 * @property {Number} timeEstimate - How long the user thinks the task will take, in ms.
 * @property {String} note - Task note for "notes" strategy.
 * @property {String} email - Email HTML used to create note via "email" strategy.
 * @property {String} dailySection - Section used in dailyStructure, one of "Morning", "Afternoon", or "Evening".
 * @property {String} bonusSection - Section used in bonusStructure, either "Bonus" or "Essential".
 * @property {String} customSection - Section used in customStructure (ID of a custom section stored in strategySettings.customStructure).
 * @property {String} timeBlockSection - Section used in plannerStructure (ID of a time block).
 * @property {Object.<String,Boolean>} dependsOn - ID => true. Task and project IDs of items that have to be completed before this item can be worked on.
 * @property {Boolean} backburner - Tasks created in the backburner are given this property if they don't get the backburner status from their parent. Tasks can also be in the backburner due to a label, dependency, start date, or inheritance without having backburner=true.
 * @property {String} reviewDate - Date when user wants to review a task, formatted as "YYYY-MM-DD".
 * @property {Number} itemSnoozeTime - Date.now() until when task is snoozed.  While snoozed the task is hidden everywhere except the master list.
 * @property {String} permaSnoozeTime - Time (HH:mm) until when task is snoozed (NOT cleared on reschedule).
 * @property {String} calId - ID (from Marvin) of calendar this task has been created from / assigned to.
 * @property {String} calURL - Unique URL of this task in the calendar.
 * @property {String} etag - Calendar etag to determine when an update is needed.
 * @property {String} calData - Calendar data.  This string is modified and sent to server to update when tasks in Marvin change.
 * @property {Number} generatedAt - Date.now() when this task was created as a recurring task instance.
 * @property {Number} echoedAt - Date.now() when this task was created by the completion/deletion of a "repeat after X days" recurring task instance.
 * @property {Number} deletedAt - Date.now() when this task was added to the trash.
 * @property {Number} restoredAt - Date.now() when this task was restored from the trash.
 * @property {Boolean} onboard - Set to true if this task is an onboarding task (i.e. one that Marvin created when the account was created).
 * @property {Boolean} imported - Set to true if this task was imported in the Importer.
 *
 * Gamification
 * @property {Number} marvinPoints - How many kudos you got for this task.
 * @property {String[]} mpNotes - Notes on how Marvin awarded you kudos when you completed the task.
 * @property {Number} rewardPoints - How many reward points this task awards.
 * @property {Number} rewardId - ID of attached reward. Earned on completion.
 *
 * Goals
 * @property {Boolean} g_in_GOALID - If true, then a task is in a goal. It can also be in a goal from inheritance (i.e. if parent project is in goal).
 * @property {String} g_sec_GOALID - The ID of the section/phase of the goal this task lives in. If not given, then the task goes in the first section.
 * @property {Number} g_rank_GOALID - The rank of the task within its goal section.
 *
 * NEW REMINDER FORMAT
 * @property {String} taskTime - "HH:mm" time extracted from title
 * @property {Number} reminderOffset - Reminder offset, either manually set or taken from default at reminder creation.
 * @property {String} reminderTime - The unix timestamp (seconds) of the first reminder (i.e. before any snoozes), computed with taskTime and reminderOffset (or defaultOffset)
 * @property {Number} snooze - Snooze duration, either manually set or taken from default at reminder creation.
 * @property {Number} autoSnooze - Whether to autoSnooze, either manually set or taken from default at reminder creation.
 *
 * OLD REMINDER FORMAT
 * @property {String} remindAt - Time when user should be reminded, "YYYY-MM-DD HH:mm".
 * @property {Object} reminder - How remindAt was chosen, so that if the task is renamed, the reminder can be updated.
 * @property {String} reminder.time - Event time that was used to create the event.
 * @property {Number} reminder.diff - Number of ms before reminder.time when remindAt is scheduled.
 */
export interface Task {
  _id: string
  createdAt: number
  updatedAt: number
  workedOnAt: number
  title: string
  parentId: string
  dueDate: string
  startDate: string
  endDate: string
  day: string
  firstScheduled: string
  plannedWeek: string
  plannedMonth: string
  sprintId?: string
  rank: number
  masterRank: number
  done: boolean
  completedAt: number | null
  duration: number
  times: number[]
  firstTracked: number
  doneAt: number
  isReward: boolean
  isStarred: boolean
  isFrogged: boolean
  isPinned: boolean
  pinId: string
  recurring: boolean
  recurringTaskId: string
  echo: boolean
  echoId: string
  link: string
  subtasks: { [id: string]: object }
  colorBar: null | string
  labelIds: string[]
  timeEstimate: number
  note: string
  email: string
  dailySection: string
  bonusSection: string
  customSection: string
  timeBlockSection: string
  dependsOn: { [id: string]: boolean }
  backburner: boolean
  reviewDate: string
  itemSnoozeTime: number
  permaSnoozeTime: string
  calId: string
  calURL: string
  etag: string
  calData: string
  generatedAt: number
  echoedAt: number
  deletedAt: number
  restoredAt: number
  onboard: boolean
  imported: boolean
  
  // Gamification
  marvinPoints: number
  mpNotes: string[]
  rewardPoints: number
  rewardId: string

  // Goals
  g_in_GOALID: boolean
  g_sec_GOALID: string
  g_rank_GOALID: number

  // New reminder format
  taskTime: string
  reminderOffset: number
  reminderTime: string
  snooze: number
  autoSnooze: number

  // Old reminder format
  remindAt: string
  reminder: {
    time: string
    diff: number
  }
}
