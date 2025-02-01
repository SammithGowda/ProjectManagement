"use client"
import React, { useEffect } from 'react'
import Navbar from "src/components/Navbar"
import Sidebar from "src/components/Sidebar"
import StoreProvider, { useAppSelector } from './redux'

const DashboardLayer = ({children}:{children:React.ReactNode}) => {
  const isSidebarCollapsed = useAppSelector((state)=>state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state)=>state.global.isDarkMode);

    useEffect(()=>{
      if(isDarkMode){
        document.documentElement.classList.add("dark")
      }else{
        document.documentElement.classList.remove("dark")
      }
    })
  return (
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>
         <Sidebar/>
        <main className={`flex w-full flex-col bg-gray-50 dark:bg-black ${isSidebarCollapsed?"":"md:pl-64"}`}>
            {/* navbar */}
            <Navbar/>
            {children}
        </main>
    </div>
  )
}

const DashboardWraper = ({children}:{children:React.ReactNode})=>{
  return (
    <StoreProvider>
      <DashboardLayer>{children}</DashboardLayer>
    </StoreProvider>
  )
}
export default DashboardWraper