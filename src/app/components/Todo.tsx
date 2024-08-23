import { TodoStatus } from "../Todo";
import { Todo as TodoType } from "../Todo";
interface TodoArgs {
  id: number,
  title: string,
  expireDate: number,
  status: TodoStatus,
  setTodo: (todo: TodoType) => void
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
      setTodo(todo);
    }
    else if (status === TodoStatus.FINISHED || status === TodoStatus.EXPIRED) {
      const todo = new TodoType(id, title, expireDate);
      todo.setStatus(TodoStatus.TO_BE_DELETED);
      setTodo(todo);
    }
  }

  return (
    <div className="border rounded-md shadow-md 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold p-3 hover:opacity-80"
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