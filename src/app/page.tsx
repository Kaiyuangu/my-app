'use client'
import { useState } from "react";
import {SideBar} from "./SideBar";
import { Today } from "./Today";
import { All } from "./All";
import { Add } from "./Add";
import { Finished } from "./Finished";
enum Page{
  TODAY,
  ALL,
  ADD,
  FINISH
}

export default function Home() {
  const[page,setPage]=useState<Page>(Page.TODAY)
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
         <Today/>
      }
     {
        page===Page.ALL&&
         <All/>
      }
      {
        page===Page.ADD&&
         <Add/>
      }
      {
        page===Page.FINISH&&
         <Finished/>
      }
    </main>
  );
}
