import { TodoStatus } from "../Todo";
import { Todo as TodoType } from "../Todo";
interface TodoArgs {
  id: number,
  title: string,
  expireDate: number,
  status: TodoStatus,
  setTodo?: (todo: TodoType) => void
}

function convertTimestampToDateString(expireDate: number) {
  let date = new Date(expireDate);
  console.log(expireDate);
  // return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  return date.toDateString();
}

function Todo({ id, title, expireDate, status, setTodo}: TodoArgs) {

  const handleDoubleClick = () => {
    console.log("double click");
    if (status === TodoStatus.ONGO) {
      const todo = new TodoType(id, title, expireDate, );
      todo.setStatus(TodoStatus.FINISHED);
      setTodo?.(todo);
    }
    else if (status === TodoStatus.FINISHED || status === TodoStatus.EXPIRED) {
      const todo = new TodoType(id, title, expireDate);
      todo.setStatus(TodoStatus.TO_BE_DELETED);
      setTodo?.(todo);
    }
  }
  const ONGO_COLOR="from-indigo-500 via-purple-500 to-pink-500"
  const EXPIRED="from-indigo-500 via-skyt-500 to-emerald-500"
  const FINISHED_COLOR="from-red-500 to-orange-500"
  let color="";
  if(status===TodoStatus.ONGO){
    color=ONGO_COLOR;
  }
  else if(status===TodoStatus.EXPIRED){
          color=EXPIRED;
       }
  else  if(status===TodoStatus.FINISHED){
           color=FINISHED_COLOR;
        }
  return (
    <div className="border rounded-md shadow-md 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold p-3 hover:opacity-80 h-24"
          onDoubleClick={handleDoubleClick}
          >
      <div>
        {title}
      </div>
      <div className="text-sm font-light">
        {convertTimestampToDateString(expireDate)}
      </div>
    </div>
  );
}

export { Todo };