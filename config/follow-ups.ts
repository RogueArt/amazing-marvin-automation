// Left-hand side should be a pattern
// Right-hand side is all the follow-up tasks scheduled afterwards

type FollowUpInfo = { pattern: RegExp; followUpTasks: String[] }
export const followUpsInfo: FollowUpInfo[] = [
  {
    pattern: /Watch Chapter (\d+) Lecture/g,
    followUpTasks: [
      'Review Chapter $1 Notes +Today',
      'Take Chapter $1 Quiz +Today',
    ],
  },
  {
    pattern: /Read Chapter (\d+) Lecture/g,
    followUpTasks: [
      'Review Chapter $1 Notes +3d',
      'Write Chapter $1 Summary +1d',
    ],
  },
]