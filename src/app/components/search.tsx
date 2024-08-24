import Module from "react-modal";
import { Todo } from "../Todo";
import {Todo as TodoComponent} from"./Todo"
interface SearchArgs{
    searshedTodos:Todo[],
    openModal:boolean,
    setOpenModal:(OpenMode:boolean)=>void
}
function Search ({searshedTodos,openModal,setOpenModal}:SearchArgs){
    return(
        <div onClick={()=>{
            setOpenModal(false);
        }}>
            <Module isOpen={openModal}>
            <div className="flex-1 p-4">
            <h1 className="text-gray-600 text-4xl font-bold mb-6"> 搜索结果 </h1>
            <div className="bg-white grid grid-cols-4 gap-4 h-5/6 rounded-xl shadow-md overflow-y-auto p-4">
                {
                    searshedTodos.map((todo) => {
                        return <TodoComponent key={todo.getId()} title={todo.getTitle()} expireDate={todo.getExpireDate()}
                            status={todo.getStatus()}
                            id={todo.getId()}
                        />
                    })
                }
            </div>
        </div>
            </Module>
        </div>
    )
}

export{Search}