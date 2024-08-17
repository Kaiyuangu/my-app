'use client'
import { useState } from "react";
import {SideBar} from "./components/SideBar";
import { Today } from "./components/Today";
import { All } from "./components/All";
import { Add } from "./components/Add";
import { Finished } from "./components/Finished";
import {Todo,useTodos} from "./Todo";
enum Page{
  TODAY,
  ALL,
  ADD,
  FINISH
}

export default function Home() {
  const[page,setPage]=useState<Page>(Page.TODAY)
  const[todos,setTodos]=useTodos();
  if(typeof window !=="undefined"){
    if(localStorage.getItem("todo/latestId")===null){
      localStorage.setItem("todo/latestId","0");
    }
    if(localStorage.getItem("todo/ids")===null){
      localStorage.setItem("todo/ids","[]");
    }
  }
    function setPageToAll(){
    setPage(Page.ALL);
  }
  function setPageToTaday(){
    setPage(Page.TODAY);
  }
  function setPageToAdd(){
    setPage(Page.ADD);
  }
  function setPageToFinished(){
    setPage(Page.FINISH);
  }
  return (
    <main className="flex flex-row h-screen bg-gray-100">
      <div className="flex h-screen">
         <SideBar setPageToAll={setPageToAll} setPageToToday={setPageToTaday} setPageToAdd={setPageToAdd} setPageToFinished={setPageToFinished}/>
      </div>
      {
        page===Page.TODAY&&
         <Today todos={todos}/>
      }
     {
        page===Page.ALL&&
         <All/>
      }
      {
        page===Page.ADD&&
         <Add todos={todos} setTodos={setTodos}/>
      }
      {
        page===Page.FINISH&&
         <Finished/>
      }
    </main>
  );
}
