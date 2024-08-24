import { TodoStatus } from "../Todo";
import { Todo } from "../Todo";
import { Todo as TodoComponent } from "./Todo";
interface FinishedArgs {
    todos:Todo[],
    setTodo: (todo: Todo) => void
}

function Finished({ todos, setTodo }: FinishedArgs) {
  const FinishedTodos = todos.filter(todo=>todo.getStatus()===TodoStatus.FINISHED);
  return (
      <div className="flex-1 p-4">
          <h1 className="text-red-600 text-4xl font-bold mb-6"> 已完成 </h1>
          <div className="bg-white grid grid-cols-4 gap-4 h-5/6 rounded-xl shadow-md overflow-y-auto p-4">
              {
                  todos.map((todo) => {
                      return <TodoComponent key={todo.getId()} title={todo.getTitle()} expireDate={todo.getExpireDate()}
                          status={todo.getStatus()}
                          id={todo.getId()}
                          setTodo={setTodo}
                      />
                  })
              }
          </div>
      </div>
  );
}

export {Finished};