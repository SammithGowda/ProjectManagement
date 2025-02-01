import React from 'react'
import ReusablePriorityPage from '../reuseablePriorityPage/page'
import { Priority } from 'src/state/api'

const Medium = () => {
  return (
    <ReusablePriorityPage  priority={Priority.Medium}/>
  )
}

export default Medium