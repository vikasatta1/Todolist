import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: "What to learn ", filter: "all"},
        {id: todoListID_2, title: "What to buy ", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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


    function changeTodolistFilter(filter: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }

    function changeTodolistTitle(title: string, todoListID: string) {
        setTodoLists(todoLists.map(t => t.id === todoListID ? {...t, title} : t))
    }

    function removeTask(taskID: string, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks(copyTasks)
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(copyTasks)
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks(copyTasks)
    }

    function removeTodolist(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoLists(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodolistType = {
            id: newTodoListID,
            title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

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

    const todoListsComponents = todoLists.map(tl => {
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

export default App;
