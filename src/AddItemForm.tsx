import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeuPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }
    const onClickAddItem = () => {
        const validatedTitle = title.trim() // обрезает пробелы
        if (validatedTitle) {
            props.addItem(validatedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                size={"small"}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeuPressAddItem}
                error={!!error}
                label="Title"
                helperText={error && 'title is required'}

            />
            <Button variant={"contained"} color="primary" onClick={onClickAddItem} size={"medium"}>+</Button>
        </div>

    )
}

export default AddItemForm;