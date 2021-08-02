import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from "./AddItemForm";
import {TodolistType} from "./AppWithRedux";
import {Task} from "./Task";



type  TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    removeTodolist: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTodolistFilter: (filterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle : (taskID: string, title: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}

export const Todolist = React.memo((props: TodoListPropsType) => {
    console.log('Todolist')

    const {filter} = props
    const addTask = useCallback((title: string) =>{ props.addTask(title, props.todoListID)},[props.addTask,props.todoListID])
    const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(title, props.todoListID),[props.changeTodolistTitle,props.todoListID]);
    const changeRemoveTodolist = useCallback(() => props.removeTodolist(props.todoListID),[props.removeTodolist,props.todoListID]);
    function getFilteredTasks() {
        switch (props.filter) {
            case "active":
                return props.tasks.filter(t => !t.isDone)
            case "completed":
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }
    let newTasks = getFilteredTasks()
    const tasksJSXElements = newTasks.map(t => {return
        <Task
            key={t.id}
            task={t}
            todoListID={props.todoListID}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
        />})
    const onClickSetAllFilter = useCallback(() => props.changeTodolistFilter('all', props.todoListID),[props.changeTodolistFilter]);
    const onClickSetActiveFilter = useCallback(() => props.changeTodolistFilter('active', props.todoListID),[props.changeTodolistFilter]);
    const onClickSetCompletedFilter = useCallback(() => props.changeTodolistFilter('completed', props.todoListID),[props.changeTodolistFilter]);
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={changeRemoveTodolist} color={"secondary"} size={"small"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", padding: "0px" }}>
                {tasksJSXElements}
            </ul>

            <div>
                <Button
                    size={"small"}
                    variant={filter === "all" ? "contained" : "outlined"}
                    color={"secondary"}
                    onClick={onClickSetAllFilter}>All</Button>
                <Button
                    style={{marginLeft: "3px"}}
                    size={"small"}
                    variant={filter === "active" ? "contained" : "outlined"}
                    color={"secondary"}
                    onClick={onClickSetActiveFilter}>Active</Button>
                <Button
                    style={{marginLeft: "3px"}}
                    size={"small"}
                    variant={filter === "completed" ? "contained" : "outlined"}
                    color={"secondary"}
                    onClick={onClickSetCompletedFilter}>Completed</Button>
            </div>
        </div>
    )
})

