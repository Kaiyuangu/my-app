import {Todo} from"../Todo"
interface TodatArgs{
  todos:Todo[]
}
function Today({todos}:TodatArgs){
  return(
    <div className="flex-1 p-4" >
    <h1 className=" text-blue-600 text-4xl font-bold mb-6">
      今天
    </h1>
    <div className="border rounded-lg p-6 bg-white flex h-5/6 rounded-xl shadow-md divide-dashed divide-x">

     <div className="w-1/3 text-2xl">
      早上
      {
        todos.map((todo,index)=>{
          return(
            <div key={todo.getId()}>
              {todo.getTitle()}
              {todo.getExpireDate()}
            </div>
          );
        })
      }
     </div>
    <div className="w-1/3 text-2xl">下午</div>
    <div className="w-1/3 text-2xl">晚上</div> 
    </div>
  </div>
  );
}
export{Today}