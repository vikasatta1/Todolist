import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': "18609265-abea-44e7-991b-d67c1c696dc2"
    }
})
const settings = {}
export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists',)
    },
    createTodo(title: string) {

        return instance.post<CreateTodoType>('todo-lists', {title},)
    },
    deleteTodo(todolistId: string) {

        return instance.delete(`todo-lists/${todolistId}`,)

    },
    updateTodo(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title},)

    }


}
type TodoType = {
    id: string,
    title: string
    addedDate: string,
    order: number
}

type CreateTodoType = {
    resultCode: number
    messages: Array<string>,
    fieldsErrors:Array<string>,
    data: {
        item: TodoType
    }
}
type DeleteTodo = {
    data: {}
    fieldsErrors:Array<string>,
    messages: Array<string>,
    resultCode: number
}