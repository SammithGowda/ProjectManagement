"use client"

import React,{ useEffect, useState } from 'react'
import ProjectHeader from "./ProjectHeader"
import Board from '../boardView'
import ListView from '../listView'
import TimeLine from '../timeLine'
import TableView from '../TableView'
import ModalNewTask from 'src/components/ModalNewTask'
type Props = {
    params:Promise<{id:string}>
}

const Page = ({params}: Props) => {
  const [id, setId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    fetchData();
  }, [params])

  if (id === null) {
    return <div>Loading...</div>;  // Loading state while the ID is being fetched
  }
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

export default Page