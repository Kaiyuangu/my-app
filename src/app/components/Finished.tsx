import { Todo } from "../Todo";

interface FinishedArgs {
    todos: Todo[],
    setTodo: (todo: Todo) => void
}

function Finished({todos, setTodo}: FinishedArgs) {
    return (
        <div>
            Finished
        </div>
    );
}

export {Finished};