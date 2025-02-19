"use client";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X,Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/app/redux";
import { setIsSidebarCollapsed } from "src/state";
import { useGetProjectsQuery } from "src/state/api";

const Sidebar = () => {
  const [showProject, setShowProject] = useState(true);
  const [priority, setPriority] = useState(true);
  const dispatch = useAppDispatch()
  const { data:projects } = useGetProjectsQuery()
  const isSidebarCollapsed = useAppSelector((state)=>state.global.isSidebarCollapsed);
  const sidebarClassname = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? 'w-0 hidden' : 'w-64'}`;
  return (
    <div className={sidebarClassname}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            {" "}
           <Building className="inline-block"/> Team
          </div>
          {isSidebarCollapsed ? null : (
            <button className="py-3" onClick={()=>dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white"/>
            </button>
          )}
        </div>
        {/* Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700 ">
          <Image src="/bosch.png" alt="logo" width={40} height={40} />
          <div className="text-md font-bold tracking-wide dark:text-gray-200">
            <h3>BOSCH TEAM</h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* NAVBBAR LINKS */}
        <nav className="z-10 w-full">
          <SideBarLink icon={Home} href="/" lable="Home"/>
          <SideBarLink icon={Briefcase} href="/timeline" lable="Timeline"/>
          <SideBarLink icon={Search} href="/search" lable="Search"/>
          <SideBarLink icon={Settings} href="/settings" lable="Settings"/>
          <SideBarLink icon={User} href="/users" lable="Users"/>
          <SideBarLink icon={Users} href="/teams" lable="Teams"/>
        </nav>
        {/* LIST OF PROJECTS */}
        <button onClick={()=>setShowProject((pre) => !pre)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500">
            <span className="">Projects</span>
            {showProject?(
              <ChevronUp className="h-5 w-5"/>
            ):(
              <ChevronDown className="h-5 w-5"/>
            )}
        </button>
          {/* LIST PROJECT HERE */}
          {showProject && projects?.map((project)=>(
            <SideBarLink key={project.id} icon={Briefcase} href={`/project/${project.id}`} lable={project.name}/>
          ))}
        {/* PRIORITIES */}
        <button onClick={()=>setPriority((pre) => !pre)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500">
            <span className="">Priorities</span>
            {priority?(
              <ChevronUp className="h-5 w-5"/>
            ):(
              <ChevronDown className="h-5 w-5"/>
            )}
            </button>
            {priority&&(
              <>
              <SideBarLink icon={AlertCircle} href="/priority/urgent" lable="Urgent"/>
              <SideBarLink icon={ShieldAlert} href="/priority/high" lable="High"/>
              <SideBarLink icon={AlertTriangle} href="/priority/medium" lable="Medium"/>
              <SideBarLink icon={AlertOctagon} href="/priority/low" lable="Low"/>
              <SideBarLink icon={Layers3} href="/priority/backlog" lable="backlog"/>
              </>
            )}
      </div>
    </div>
  );
};

interface SideBarLinkProps{
  href:string,
  icon:LucideIcon,
  lable:string,
  // isCollapsed:boolean
}
const SideBarLink = ({
  href,
  icon:Icon,
  lable,
  // isCollapsed
}:SideBarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === '/' && href === '/dashboard')
  return (
    <Link href={href} className="w-full">
      <div className={`relative flex cursor-pointer items-center gap-3 transition-colors
         hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-600 ${
          isActive?"bg-gray-100 text-white drak:bg-gray-600":""
         } justify-start px-8 py-3
        `}>
          {isActive && (
            <div className=" absolute left-0 right-0 h-[100%] w-[5px] bg-blue-200">
            </div>
            )}
            <Icon className="h-6' w-6 text-gray-800 dark:text-gray-100"/>
            <span className='font-medium text-gray-800 dark:text-gray-100'>{lable}</span>
      </div>
    </Link>
  )
}

export default Sidebar;
