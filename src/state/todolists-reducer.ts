import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}
type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}
type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListID: string
}
type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListID: string
}
export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT


export const todoListReducer = (todoLists: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoListID = v1()
            const newTodoList: TodolistType = {
                id: newTodoListID,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter:action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(t => t.id === action.todoListID ? {...t, title:action.title} : t)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListID:string):RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        todoListID:todoListID
    }
}
export const AddTodoListAC = (title: string):AddTodoListAT => {
    return {
    type: "ADD-TODOLIST",
    title: title
}
}

export const ChangeTodoListFilterAC = ( filter: FilterValuesType, todoListID: string):ChangeTodolistFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter,
        todoListID
    }
}

export const ChangeTodoListTitleAC = (  title: string, todoListID: string):ChangeTodolistTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title,
        todoListID
    }
}