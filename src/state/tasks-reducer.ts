import {TasksStateType, TaskType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodoListsAT} from "./todolists-reducer";

export type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListsAT
type RemoveTaskAT = {
    type: "REMOVE_TASK";
    taskID: string;
    todoListID: string;
}
type AddTaskAT = {
    type: "ADD_TASK";
    title: string;
    todoListID: string;
}
type ChangeTaskStatusAT = {
    type: "CHANGE_TASK_STATUS",
    taskID: string;
    isDone: boolean;
    todoListID: string;
}

type ChangeTaskTitleAT = {
    type: "CHANGE_TASK_TITLE",
    taskID: string;
    title: string;
    todoListID: string;
}


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let copyState = {...state}
            copyState[action.todoListID] = state[action.todoListID].filter(t => t.id !== action.taskID)
            return copyState
        }
        case "ADD_TASK": {
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state, [action.todoListID]: [newTask, ...state[action.todoListID]]
            }
        }
        case "CHANGE_TASK_STATUS": {
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(t => {
                    if (t.id === action.taskID) {
                        return {...t, isDone: action.isDone}
                    } else {
                        return t
                    }
                })
            }
        }
        case "CHANGE_TASK_TITLE":{
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(task => task.id === action.taskID
                ? {...task, title: action.title} : task)
            }
        }
        case "ADD_TODOLIST": {
            return {...state,[action.todoListID]: []}
        }


        default:
            throw new Error("I don't understand this type")

    }
}


export const RemoveTaskAC = (taskID: string, todoListID: string): RemoveTaskAT => {
    return {type: "REMOVE_TASK", taskID, todoListID,}
}

export const AddTaskAC = (title: string, todoListID: string): AddTaskAT => {
    return {type: "ADD_TASK", title, todoListID,}
}

export const ChangeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return {type: "CHANGE_TASK_STATUS", taskID, isDone, todoListID,}
}

export const ChangeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleAT => {
    return {type: "CHANGE_TASK_TITLE", taskID, title, todoListID,}
}
