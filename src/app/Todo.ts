import { useEffect, useState } from "react";
enum TodoStatus{
    ONGO,
    EXPIRED
}
class Todo {
    private id: number
    private title: string
    private expireDate: number
    private status : TodoStatus

    constructor(id: number, title: string, expireDate: number) {
        this.id = id;
        this.title = title;
        this.expireDate = expireDate;
        this.status = TodoStatus.ONGO;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }

    getExpireDate() {
        return this.expireDate;
    }

    setTitle(title: string) {
        this.title = title;
        this.save();
    }

    setExpireDate(expireDate: number) {
        this.expireDate = expireDate;
        this.save();
    }
    getStatus(){
        return this.status;
    }
    setStatus(newStatus:TodoStatus){
        this.status=newStatus;
    }
    save() {
        Todo.addExistingId(this.id);
        typeof window !== 'undefined' ? window.localStorage.setItem(`todo/${this.id}`, JSON.stringify(this)) : null;
    }

    delete() {
        Todo.deleteExistingId(this.id);
        typeof window !== 'undefined' ? window.localStorage.removeItem(`todo/${this.id}`) : null;
    }

    static getById(id: number) {
        const todo = typeof window !== 'undefined' ? window.localStorage.getItem(`todo/${id}`) : null;
        if (todo === null) {
            return null;
        }
        const parsedTodo = JSON.parse(todo) as Todo;
        return new Todo(parsedTodo.id, parsedTodo.title, parsedTodo.expireDate);
    }
    static getNextId() {
        let latestId = typeof window !== 'undefined' ? window.localStorage.getItem("todo/latestId") : null;
        if (latestId === null) {
            typeof window !== 'undefined' ? window.localStorage.setItem("todo/latestId", "0") : null;
            return 0;
        }
        else {
            const nextId = Number.parseInt(latestId) + 1;
            typeof window !== 'undefined' ? window.localStorage.setItem("todo/latestId", JSON.stringify(nextId)) : null;
            return nextId;
        }
    }

    static getExistingIds(): number[] {
        const existingIds = typeof window !== 'undefined' ? window.localStorage.getItem("todo/ids") : null;
        if (existingIds === null) {
            return [];
        }
        return JSON.parse(existingIds);
    }

    static addExistingId(id: number) {
        const existingIds = typeof window !== 'undefined' ? window.localStorage.getItem("todo/ids") : null;
        if (existingIds === null) {
            typeof window !== 'undefined' ? window.localStorage.setItem("todo/ids", JSON.stringify([id])) : null;
            return;
        }
        const existingIdsArray = JSON.parse(existingIds);
        if (existingIdsArray.includes(id)) {
            return;
        }
        existingIdsArray.push(id);
        typeof window !== 'undefined' ? window.localStorage.setItem("todo/ids", JSON.stringify(existingIdsArray as number[])) : null;
    }

    static deleteExistingId(idToDelete: number) {
        const existingIds = typeof window !== 'undefined' ? window.localStorage.getItem("todo/ids") : null;
        if (existingIds === null) {
            return;
        }
        let existingIdsArray = JSON.parse(existingIds) as number[];
        existingIdsArray = existingIdsArray.filter((id, index) => id !== idToDelete);
        typeof window !== 'undefined' ? window.localStorage.setItem("todo/ids", JSON.stringify(existingIdsArray)) : null;
    }

}

function useTodos(): [Todo[], (todos: Todo[]) => void] {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const existingIds = Todo.getExistingIds();
        const initialTodos = existingIds.map(id => Todo.getById(id)).filter((todo): todo is Todo => todo !== null);
        setTodos(initialTodos);
    }, []);

    const updateTodos = (newTodos: Todo[]) => {
        setTodos(newTodos);
        newTodos.forEach(todo => todo.save());
    };

    // console.log(JSON.stringify(todos));
    return [todos, updateTodos];
}


export { Todo, useTodos,TodoStatus};