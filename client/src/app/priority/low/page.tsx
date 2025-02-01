import React from 'react'
import ReusablePriorityPage from '../reuseablePriorityPage/page'
import { Priority } from 'src/state/api'

const Low = () => {
  return (
    <ReusablePriorityPage  priority={Priority.Low}/>
  )
}

export default Low