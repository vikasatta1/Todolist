import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";


type  TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    removeTodolist:(todoListID: string)=> void
    addTask: (title: string,todoListID: string) => void
    changeTodolistFilter: (filterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus : (taskID:string, isDone:boolean, todoListID: string) => void

}

function Todolist(props: TodoListPropsType) {
    const {title: taskTitle, tasks, filter, removeTask, changeTodolistFilter} = props
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksJSXElements = props.tasks.map(t => {
        let taskClass = t.isDone === true ? "is-done" : " "
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>)=>{
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)}
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
    const onClickAddTask = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addTask(validatedTitle, props.todoListID)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeuPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }
    }
    const onClickSetAllFilter = () => props.changeTodolistFilter('all',props.todoListID);
    const onClickSetActiveFilter = () => props.changeTodolistFilter('active',props.todoListID);
    const onClickSetCompletedFilter = () => props.changeTodolistFilter('completed',props.todoListID);
    const allBtnClass = props.filter === "all" ? "active-filter" : "";
    const activeBtnClass = props.filter === "active" ? "active-filter" : "";
    const completedBtnClass = props.filter === "completed" ? "active-filter" : "";
    const errorMessage = error ? <div style={{color:"red"}}>Title is error</div> : null
    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodolist(props.todoListID)}>kill</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeuPressAddTask}
                    className={ error  ? "error" : " "}
                />
                <button onClick={onClickAddTask}>+</button>
                {errorMessage}
            </div>

            <ul>
                {tasksJSXElements}
            </ul>

            <div>

                <button className={allBtnClass}
                        onClick={onClickSetAllFilter}>All
                </button>
                <button className={activeBtnClass}
                        onClick={onClickSetActiveFilter}>Active
                </button>
                <button className={completedBtnClass}
                        onClick={onClickSetCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;