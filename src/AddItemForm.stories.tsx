
import React from 'react';
// @ts-ignore
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
// @ts-ignore
import {action} from "@storybook/addon-actions";

export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args:any) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
  addItem: action("Button clicked")
};

