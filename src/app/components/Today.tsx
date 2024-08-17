import {Todo} from"../Todo"
import {Todo as TodoComponent} from "../components/Todo"
interface TodatArgs{
  todos:Todo[]
}

function Today({todos}:TodatArgs){
  return(
    <div className="flex-1 p-4" >
    <h1 className=" text-blue-600 text-4xl font-bold mb-6">最近</h1>
    <div className="border rounded-lg p-6 bg-white flex h-5/6 rounded-xl shadow-md divide-dashed divide-x">
     <div className="w-1/3 text-2xl">
      今天
      {
        todos.map((todo,index)=>{
          return(
            <TodoComponent key={todo.getId()}title={todo.getTitle()}expireDate={todo.getExpireDate()} 
            status={todo.getStatus()}
            />
          );
        })
      }
      <div>
        <div className="w-1/3 text-2xl">明天</div>
        <div className="w-1/3 text-2xl">后天·</div>
      </div>
     </div>
    </div>
  </div>
  );
}
export{Today}