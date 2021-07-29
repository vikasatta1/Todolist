import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionType = RemoveTodoListAT | AddTodoListsAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT
export type RemoveTodoListAT = {
    type: "REMOVE_TODOLIST",
    todoListID: string
}
export type AddTodoListsAT = {
    type: "ADD_TODOLIST";
    title: string;
    todoListID:string;
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

const initialState: Array<TodolistType> = []


export const todoListsReducer = (state=initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD_TODOLIST":
            return [...state,{id:action.todoListID, title:action.title, filter:"all"}]
        case "CHANGE_TODOLIST_FILTER":
            return state.map(tl => tl.id === action.todoListID
                ? {...tl, filter: action.filter} : tl)
        case "CHANGE_TODOLIST_TITLE":
            return state.map(t => t.id === action.todoListID ? {...t, title: action.title} : t)
        default:
            return state
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
        todoListID:v1(),
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
