import {FilterValuesType, TasksStateType, TaskType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string,
    todoListID: string
}
type AddTaskActionType = {
    type: "ADD_TASK"
    title: string,
    todoListID: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS"
    taskID: string,
    isDone: boolean,
    todoListID: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE"
    taskID: string,
    title: string,
    todoListID: string
}
type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType;


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            let todolistTasks = state[action.todoListID];
            todolistTasks = todolistTasks.filter(t => t.id !== action.taskID)
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)
            }
        case "ADD_TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]]
            }
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD-TODOLIST":

            return {...state, [action.todolistId]: []}
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskID: taskID, todoListID: todoListID}
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: "ADD_TASK", title: title, todoListID: todoListID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE_TASK_STATUS", taskID: taskID, isDone: isDone, todoListID: todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE_TASK_TITLE", taskID: taskID, title: title, todoListID: todoListID}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title}
}

