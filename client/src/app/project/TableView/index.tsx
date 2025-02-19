import React from 'react'
import { useAppSelector } from 'src/app/redux';
import Header from 'src/components/Header';
import { useGetTasksQuery } from 'src/state/api';
import {DataGrid,GridColDef} from "@mui/x-data-grid"
import { dataGridClassNames, dataGridSxStyles } from 'src/lib/utils';
import { PlusSquare } from 'lucide-react';
type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
  };

const columns : GridColDef[]=[
    {
        field: "title",
        headerName: "Title",
        width: 100,
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => (
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
            {params.value}
          </span>
        ),
      },
      {
        field: "priority",
        headerName: "Priority",
        width: 75,
      },
      {
        field: "tags",
        headerName: "Tags",
        width: 130,
      },
      {
        field: "startDate",
        headerName: "Start Date",
        width: 130,
      },
      {
        field: "dueDate",
        headerName: "Due Date",
        width: 130,
      },
      {
        field: "author",
        headerName: "Author",
        width: 150,
        renderCell: (params) => params.value?.author || "Unknown",
      },
      {
        field: "assignee",
        headerName: "Assignee",
        width: 150,
        renderCell: (params) => params.value?.assignee || "Unassigned",
      },
]


const TableView = ({id}: Props) => {
const {data:tasks,isLoading,error} = useGetTasksQuery({projectId:Number(id)})
const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

if (isLoading) return <div>Loading...</div>;
if (error) return <div>An error occurred while fetching tasks</div>;
  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
        <div className="pt-5">
            <Header 
            name='Table'
            buttonComponent={
              <button
                className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
                // onClick={() => setIsModalNewProjectOpen(true)}
              >
              <PlusSquare className="mr-2 h-5 w-5" /> Add Task
              </button>
            }
            isSmallText/>
        </div>
        <DataGrid 
          rows={tasks || []}
          columns={columns}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
         />
    </div>
  )
}

export default TableView