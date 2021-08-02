import React, {useCallback} from 'react';
import './App.css';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListsAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {AddItemForm} from "./AddItemForm";
import {Todolist} from "./Todolist";

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

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType,TodolistType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const removeTask = useCallback((taskID: string, todoListID: string) => {
        const action = RemoveTaskAC(taskID,todoListID)
        dispatch(action)
    },[dispatch]);
    const addTask = useCallback((title: string, todoListID: string) => {
        const action = AddTaskAC(title,todoListID)
        dispatch(action)
    },[dispatch]);
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        const action = ChangeTaskStatusAC(taskID,isDone,todoListID)
        dispatch(action)
    },[dispatch]);
    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        const action = ChangeTaskTitleAC(taskID,title,todoListID)
        dispatch(action)
    },[dispatch]);

    const changeTodolistFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        const action = ChangeTodolistFilterAC(filter,todoListID)
        dispatch(action)
    },[dispatch]);
    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        const action = ChangeTodolistTitleAC(title,todoListID)
        dispatch(action)
    }, [dispatch] );
    const removeTodolist = useCallback((todoListID: string) => {
        const action = RemoveTodoListAC(todoListID)
        dispatch(action)
    },[dispatch]);
    const addTodoLists = useCallback((title: string) => {
        const action = AddTodoListsAC(title)
        dispatch(action)
    },[dispatch])

//UI

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={2} style={{padding: "20px"}}>
                    <Todolist
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
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

export default AppWithRedux;
