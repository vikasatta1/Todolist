import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";



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

function Todolist(props: TodoListPropsType) {
    const {filter} = props
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todoListID)
    const changeRemoveTodolist = () => props.removeTodolist(props.todoListID)
    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        }
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id,title,props.todoListID)
        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox
                    size={"small"}
                    color={"primary"}
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
               {/* <span>{t.title}</span>*/}
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })
    const onClickSetAllFilter = () => props.changeTodolistFilter('all', props.todoListID);
    const onClickSetActiveFilter = () => props.changeTodolistFilter('active', props.todoListID);
    const onClickSetCompletedFilter = () => props.changeTodolistFilter('completed', props.todoListID);
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
}

export default Todolist;