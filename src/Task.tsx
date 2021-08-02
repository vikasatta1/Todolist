import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

type TaskPropsType = {
    task: TaskType
    todoListID:string
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle : (taskID: string, title: string, todoListID: string) => void
}
 export const Task = React.memo((props:TaskPropsType) => {

     const {task, todoListID} = props
     const removeTask = useCallback(() => props.removeTask(task.id, todoListID),[task,todoListID])
     const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
         props.changeTaskStatus(props.task.id, e.currentTarget.checked, todoListID)
     },[task,todoListID])
     const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(task.id,title,todoListID),[task,todoListID])
    return (
        <div>
            <div key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox
                    size={"small"}
                    color={"primary"}
                    checked={props.task.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                {/* <span>{t.title}</span>*/}
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </div>
            
        </div>
    );
});
