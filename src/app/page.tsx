'use client';

import { useState } from "react";
import { SideBar } from "./components/SideBar";
import { Today } from "./components/Today";
import { All } from "./components/All";
import { Finished } from "./components/Finished";
import { Add } from "./components/Add";
import {Todo, useTodos} from "./Todo";
import { todo } from "node:test";

enum Page {
  TODAY,
  ALL,
  FINISHED,
  ADD
}

export default function Home() {
  const [page, setPage] = useState<Page>(Page.TODAY);
  const [todos, setTodos] = useTodos();

  function setTodo(todo: Todo) {
    let filteredTodos = todos.filter((t) => t.getId() !== todo.getId());
    filteredTodos.push(todo);
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
        <SideBar setPageToAll={setPageToAll} setPageToToday={setPageToToday} 
                 setPageToFinished={setPageToFinished} setPageToAdd={setPageToAdd}/>
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
    </main>
  );
}
