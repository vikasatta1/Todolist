import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";


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

}

function Todolist(props: TodoListPropsType) {
    const {filter} = props

    const addTask = (title: string) => props.addTask(title, props.todoListID)

    const tasksJSXElements = props.tasks.map(t => {
        let taskClass = t.isDone === true ? "is-done" : " "
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        }
        return (
            <li key={t.id} className={taskClass}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const onClickSetAllFilter = () => props.changeTodolistFilter('all', props.todoListID);
    const onClickSetActiveFilter = () => props.changeTodolistFilter('active', props.todoListID);
    const onClickSetCompletedFilter = () => props.changeTodolistFilter('completed', props.todoListID);
    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodolist(props.todoListID)}>kill</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSXElements}
            </ul>

            <div>

                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onClickSetAllFilter}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onClickSetActiveFilter}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onClickSetCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;