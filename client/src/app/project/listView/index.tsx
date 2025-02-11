import { PlusSquare } from 'lucide-react';
import React from 'react'
import Header from 'src/components/Header';
import TaskCard from 'src/components/TaskCard/indext';
import { useGetTasksQuery,Task } from 'src/state/api';
type ListViewProps = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
  };

const ListView = ({id}: ListViewProps) => {
    const {data:tasks,isLoading,error} = useGetTasksQuery({projectId:Number(id)})

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
        <div className="pt-5">
            <Header name='List'
            buttonComponent={
              <button
                className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
                // onClick={() => setOpenTask(true)}
              >
              <PlusSquare className="mr-2 h-5 w-5" /> Add Task
              </button>
            }
            />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  )
}

export default ListView