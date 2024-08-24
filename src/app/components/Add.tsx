import { ChangeEvent } from "react";
import { Todo } from "../Todo"
import { Button } from "./Button"
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface AddArgs{
      todos:Todo[]
      setTodos:(todos:Todo[])=>void
}
function Add({todos,setTodos}:AddArgs) {
    const[title,setTitle] = useState("");
    const[date,setDate] = useState(0);
    function setTitleOnChange(e:ChangeEvent<HTMLInputElement>){
      console.log(e.target.value);
      setTitle(e.target.value)
    }
    function setDateOnChange(e:ChangeEvent<HTMLInputElement>){
      console.log(e.target.value);
      const d= new Date(e.target.value);
      setDate(d.getTime())
    }
    function addTodo(){
      const nextTodoId = Todo.getNextId();
      const todo =new Todo(nextTodoId,title,date);
      todos.push(todo);
      setTodos(todos);
      toast.success("添加成功");
    }
    return (
      <div className="flex p-4 flex-1">
        <div className="flex  flex-col m-auto w-2/3 h-1/2 space-y-2 border rounded-lg shadow-md justify-center items-center bg-white">
          <input type="text" placeholder="请输入代办内容" className="p-2 border rounded-lgw-1/3"onChange={setTitleOnChange}></input>
          <input type="date"className="p-2 border rounded-lgw-1/3"onChange={setDateOnChange}></input>
          <Button icon="✓" bgColor="bg-green-500" label="添加" onClick={addTodo}/>
          <ToastContainer/>
        </div>
      </div>
    )
}
export{Add}