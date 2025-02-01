import React from 'react'
import ReusablePriorityPage from '../reuseablePriorityPage/page'
import { Priority } from 'src/state/api'

const Backlog = () => {
  return (
    <ReusablePriorityPage  priority={Priority.Backlog}/>
  )
}

export default Backlog