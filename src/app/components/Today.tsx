import {Todo, TodoStatus} from "../Todo";
import {Todo as TodoComponent} from "../components/Todo";

interface TodayArgs {
    todos: Todo[],
    setTodo: (todo: Todo) => void
}


function buildPredidate(daysLater: number) {
    return (todo: Todo) => {
        const dateTodo = new Date(todo.getExpireDate());
        const dateToday = new Date(Date.now());
        dateToday.setDate(dateToday.getDate() + daysLater);
        return dateTodo.toDateString() === dateToday.toDateString() && todo.getStatus() === TodoStatus.ONGO;
    }
}

function Today({todos, setTodo} : TodayArgs) {
    
    const todosToday = todos.filter(buildPredidate(0));

    const todosTomorrow = todos.filter(buildPredidate(1))

    const todosLater = todos.filter(buildPredidate(2));

    return (
        <div className="flex-1 p-4">
            <h1 className="text-blue-600 text-4xl font-bold mb-6"> 最近 </h1>

            <div className="bg-white flex h-5/6 rounded-xl shadow-md divide-dashed divide-x">
            <div className="w-1/3 text-2xl p-4 space-y-2"> 
                今天
                {
                    todosToday.map((todo, index) => {
                        return (
                            <TodoComponent key={todo.getId()} title={todo.getTitle()} expireDate={todo.getExpireDate()}
                                id={todo.getId()}
                                status={todo.getStatus()}
                                setTodo={setTodo}
                             />
                        );
                    })
                }
            </div>
            <div className="w-1/3 text-2xl p-4 space-y-2"> 
                明天 
                {
                    todosTomorrow.map((todo, index) => {
                        return (
                            <TodoComponent key={todo.getId()} title={todo.getTitle()} expireDate={todo.getExpireDate()}
                                status={todo.getStatus()}
                                id={todo.getId()}
                                setTodo={setTodo}
                             />
                        );
                    })
                }
            </div>
            <div className="w-1/3 text-2xl p-4 space-y-2">
                后天
                {
                    todosLater.map((todo, index) => {
                        return (
                            <TodoComponent key={todo.getId()} title={todo.getTitle()} expireDate={todo.getExpireDate()}
                                status={todo.getStatus()}
                                id={todo.getId()}
                                setTodo={setTodo}
                             />
                        );
                    })
                }
            </div>
            </div>
        </div>
    );
}

export {Today};