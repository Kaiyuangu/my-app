'use client';

import { useState } from "react";
import { SideBar } from "./components/SideBar";
import { Today } from "./components/Today";
import { All } from "./components/All";
import { Finished } from "./components/Finished";
import { Add } from "./components/Add";
import {Todo, useTodos} from "./Todo";
import { todo } from "node:test";
import { TodoStatus } from "./Todo";
import { Search } from "./components/search";
enum Page {
  TODAY,
  ALL,
  FINISHED,
  ADD
}

export default function Home() {
  const [page, setPage] = useState<Page>(Page.TODAY);
  const [todos, setTodos] = useTodos();
  const [searshedTodos,setSearchedTodos]=useState<Todo[]>([]);
  const [openModal,setOpenModal]= useState<boolean>(false);
  function setTodo(todo: Todo) {
    let filteredTodos = todos.filter((t) => t.getId() !== todo.getId());
    if(todo.getStatus()===TodoStatus.TO_BE_DELETED){
      todo.delete();
    }
    else{
        filteredTodos.push(todo);
    }
    setTodos(filteredTodos);
  }

  if (typeof window !== 'undefined') {
    if (localStorage.getItem("todo/latestId") === null) {
      localStorage.setItem("todo/latestId", "0");
    }
    if (localStorage.getItem("todo/ids") === null) {
      localStorage.setItem("todo/ids", "[]");
    }
  }

  function setPageToAll() {
    setPage(Page.ALL);
  }

  function setPageToToday() {
    setPage(Page.TODAY);
  }

  function setPageToFinished() {
    setPage(Page.FINISHED);
  }

  function setPageToAdd() {
    setPage(Page.ADD);
  }

  return (
    <main className="flex flex-row h-screen bg-gray-100">
      <div className="flex h-screen">
        <SideBar 
        todos={todos}
        setSearchedTodos={setSearchedTodos}
        setOpenModal={setOpenModal}
        setPageToAll={setPageToAll} 
        setPageToToday={setPageToToday} 
        setPageToFinished={setPageToFinished} 
        setPageToAdd={setPageToAdd}/>
      </div>
      {
        page === Page.TODAY && 
        <Today todos={todos} setTodo={setTodo}/>
      }
      {
        page === Page.ALL && 
        <All todos={todos} setTodo={setTodo}/>
      }
      {
        page === Page.FINISHED && 
        <Finished todos={todos} setTodo={setTodo}/>
      }
      {
        page === Page.ADD &&
        <Add todos={todos} setTodos={setTodos}/>
      }
      <Search  searshedTodos={searshedTodos} openModal={openModal} setOpenModal={setOpenModal}/>
    </main>
  );
}
