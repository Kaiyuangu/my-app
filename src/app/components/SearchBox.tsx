import { useState } from "react";
import { Todo } from "../Todo"
interface SearchBoxArgs{
  todos:Todo[],
  setOpenModal:(openModal:boolean)=>void,
  setSearchedTodos:(searchedTodos:Todo[])=>void
}
function SearchBox({todos,setOpenModal,setSearchedTodos}:SearchBoxArgs) {
  const[searchedText,setSearchedText]=useState<string>("");
    return (
      <div className="flex items-center">
        <input placeholder="搜索" type="password" className="w-full rounded-lg px-3 py-2"
                onChange ={(e)=>{
                    setSearchedText(e.target.value);
                  }
                }
                onKeyDown={(e)=>{
                    const filteredTodos=todos.filter((todo)=>{
                      return todo.getTitle().includes(searchedText);
                    });
                    setSearchedTodos(filteredTodos);
                    setOpenModal(true);
                  }
                }
          >
        </input>
      </div>
    )
}
export{SearchBox}