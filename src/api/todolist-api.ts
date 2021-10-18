import axios from 'axios'
import {CreateTodolist, DeleteTodolist, UpdateTodolistTitle} from "../stories/todolists-api.stories";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': "18609265-abea-44e7-991b-d67c1c696dc2"
    }
}
export const todolistAPI = {
    getTodos() {
        let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodo(title:string){

        let promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title}, settings)
        return promise
    },
    deleteTodo(){
        const todolistId = '42fc5ec6-3a00-489f-a4ce-7590d0ea8edc';
        let promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    },
    updateTodo(title:string,todolistId:string){
        let promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {title}, settings)
        return promise
    }


}
