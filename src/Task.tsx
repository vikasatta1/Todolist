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

     const {task, todoListID,removeTask,changeTaskTitle,changeTaskStatus} = props
     const removeTasks = useCallback(() => removeTask(task.id, todoListID),[task,todoListID])
     const changeTasksStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
         changeTaskStatus(task.id, e.currentTarget.checked, todoListID)
     },[task,todoListID])
     const changeTaskTitles = useCallback((title: string) => changeTaskTitle(task.id,title,todoListID),[task,todoListID])
    return (
        <div>
            <div key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox
                    size={"small"}
                    color={"primary"}
                    checked={task.isDone}
                    onChange={changeTasksStatus}
                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitles}/>
                {/* <span>{t.title}</span>*/}
                <IconButton onClick={removeTasks}>
                    <Delete/>
                </IconButton>
            </div>
            
        </div>
    );
});
