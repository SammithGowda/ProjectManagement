import React from 'react'
import ReusablePriorityPage from '../reuseablePriorityPage/page'
import { Priority } from 'src/state/api'

const High = () => {
  return (
    <ReusablePriorityPage  priority={Priority.High}/>
  )
}

export default High