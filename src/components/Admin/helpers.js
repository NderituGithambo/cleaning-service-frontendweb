// For color-coding job by their status derived from db columns
export function getJobStatusFromJobData(jobData) {
  const {
    time_work_started: workStarted,
    time_work_completed: workCompleted,
    bill_sent: billSent,
    is_paid: isPaid,
  } = jobData

  if (!workStarted && !workCompleted && !billSent && !isPaid) return 'NEW'
  if (workStarted && !workCompleted && !billSent && !isPaid) return 'IN_PROGRESS'
  if (workStarted && workCompleted && !billSent && !isPaid) return 'NEEDS_BILLING'
  if (workStarted && workCompleted && billSent && !isPaid) return 'BILL_SENT'
  if (workStarted && workCompleted && billSent && isPaid) return 'ALL_COMPLETE'
}

export function getEventColorClassFromStatus(JobData, isText) {
  const status = getJobStatusFromJobData(JobData)
  let classToReturn
  switch (status) {
    case 'NEW':
      classToReturn = 'color-new'
      break
    case 'IN_PROGRESS':
      classToReturn = 'color-in-progress'
      break
    case 'NEEDS_BILLING':
      classToReturn = 'color-needs-billing'
      break
    case 'BILL_SENT':
      classToReturn = 'color-bill-sent'
      break
    case 'ALL_COMPLETE':
      classToReturn = 'color-all-complete'
      break
    default: break
  }
  return classToReturn + (isText ? '-text' : '')
}