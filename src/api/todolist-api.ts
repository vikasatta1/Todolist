import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': "18609265-abea-44e7-991b-d67c1c696dc2"
    }
})


export const todolistAPI = {
    getTodolists(){
        const promise = instance.get('https://social-network.samuraijs.com/api/1.1/todo-lists')
        return promise
    },
    createTodo(title:string){
        const promise = instance.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title})
        return promise
    },
    deleteTodo(){
        const todolistId = 'd08853e2-47aa-440a-a4a9-31a91b2daa59';
        const promise = instance.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}` )
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title})
        return promise
    }
}

