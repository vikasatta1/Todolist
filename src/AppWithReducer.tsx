import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListsAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function AppWithReducer() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()


    // @ts-ignore
    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer,[
        {id: todoListID_1, title: "What to learn ", filter: "all"},
        {id: todoListID_2, title: "What to buy ", filter: "all"},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todoListID_1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "HTML", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
        ],
    })

    function removeTask(taskID: string, todoListID: string) {
        const action = RemoveTaskAC(taskID,todoListID)
        dispatchTasks(action)
    }
    function addTask(title: string, todoListID: string) {
        const action = AddTaskAC(title,todoListID)
        dispatchTasks(action)
    }
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const action = ChangeTaskStatusAC(taskID,isDone,todoListID)
        dispatchTasks(action)
    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const action = ChangeTaskTitleAC(taskID,title,todoListID)
        dispatchTasks(action)
    }

    function changeTodolistFilter(filter: FilterValuesType, todoListID: string) {
       const action = ChangeTodolistFilterAC(filter,todoListID)
        dispatchTodoLists(action)
    }
    function changeTodolistTitle(title: string, todoListID: string) {
        const action = ChangeTodolistTitleAC(title,todoListID)
        dispatchTodoLists(action)
    }
    function removeTodolist(todoListID: string) {
        const action = RemoveTodoListAC(todoListID)
        dispatchTasks(action)
        dispatchTodoLists(action)
    }
    function addTodoLists(title: string) {
        const action = AddTodoListsAC(title)
        dispatchTasks(action)
        dispatchTodoLists(action)

    }

//UI
    function getFilteredTasks(tl: TodolistType) {
        switch (tl.filter) {
            case "active":
                return tasks[tl.id].filter(t => t.isDone === false)
            case "completed":
                return tasks[tl.id].filter(t => t.isDone === true)
            default:
                return tasks[tl.id]
        }
    }
    const todoListsComponents = todoLists.map((tl: { id: any; title: any; filter: any; }) => {
        const tasksForTodoLists = getFilteredTasks(tl)
        return (
            <Grid item key={tl.id}>
                <Paper elevation={2} style={{padding: "20px"}}>
                    <Todolist
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoLists}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistFilter={changeTodolistFilter}
                        changeTaskStatus={changeTaskStatus}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        TodoLists
                    </Typography>
                    <Button
                        color={"inherit"}
                        variant={"outlined"}
                    >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoLists}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
