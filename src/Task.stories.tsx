import React from 'react';
// @ts-ignore
import {ComponentStory, ComponentMeta} from '@storybook/react';
// @ts-ignore
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";


export default {
    title: 'TODOLIST/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args:any) => <Task {...args} />;

export const TaskSIsDoneStories = Template.bind({});
TaskSIsDoneStories.args = {
    changeTaskStatus: action(""),
    changeTaskTitle:action(""),
    removeTask: action(""),
    task: {id: "11", isDone:true, title: "JS"},
    todolistId: "11",
};

export const TaskSIsNotStories = Template.bind({});
TaskSIsNotStories.args = {
    changeTaskStatus: action(""),
    changeTaskTitle:action(""),
    removeTask: action(""),
    task: {id: "11", isDone:false, title: "JS"},
    todolistId: "11",
};

