"use client"

import React,{ useState } from 'react'
import ProjectHeader from "./ProjectHeader"
import Board from '../boardView'
import ListView from '../listView'
import TimeLine from '../timeLine'
import TableView from '../TableView'
import ModalNewTask from 'src/components/ModalNewTask'
type Props = {
    params:Promise<{id:string}>
}

const page = ({params}: Props) => {
  const { id } = React.use(params);
  const [activeTab, setActiveTab] = useState("");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={()=>setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab==="Board"&&(
        <Board  id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
      )}
      {activeTab==="List"&&(
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
      )}
      {activeTab==="Timeline"&&(
        <TimeLine id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
      )}
      {activeTab==="Table"&&(
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
      )}
    </div>
  )
}

export default page