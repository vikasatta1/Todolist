import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionType = RemoveTodoListAT | AddTodoListsAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT
type RemoveTodoListAT = {
    type: "REMOVE_TODOLIST",
    todoListID: string
}
type AddTodoListsAT = {
    type: "ADD_TODOLIST",
    title: string
}
type ChangeTodolistFilterAT = {
    type: "CHANGE_TODOLIST_FILTER",
    filter: FilterValuesType,
    todoListID: string
}
type ChangeTodolistTitleAT = {
    type: "CHANGE_TODOLIST_TITLE",
    title: string,
    todoListID: string,
}


export const todoListsReducer = (todoLists: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD_TODOLIST":
            const newTodoListID = v1()
            const newTodoList: TodolistType = {
                id: newTodoListID,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList]
        case "CHANGE_TODOLIST_FILTER":
            return todoLists.map(tl => tl.id === action.todoListID
                ? {...tl, filter: action.filter} : tl)
        case "CHANGE_TODOLIST_TITLE":
            return todoLists.map(t => t.id === action.todoListID ? {...t, title: action.title} : t)
        default:
            return todoLists
    }
}


export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {
        type: "REMOVE_TODOLIST",
        todoListID
    }
}

export const AddTodoListsAC = (title: string): AddTodoListsAT => {
    return {
        type: "ADD_TODOLIST",
        title,
    }
}

export const ChangeTodolistFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodolistFilterAT => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        filter,
        todoListID,
    }
}

export const ChangeTodolistTitleAC = (title: string, todoListID: string): ChangeTodolistTitleAT => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        title,
        todoListID,
    }
}
