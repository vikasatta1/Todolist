import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
type AddItemFormPropsType = {
    addItem:(title:string)=> void
}
function AddItemForm(props:AddItemFormPropsType) {
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
    const onClickAddItem = () =>  {
        const validatedTitle = title.trim() // обрезает пробелы
        if (validatedTitle) {
            props.addItem(validatedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const errorMessage = error ? <div style={{color: "red"}}>Title is error</div> : null

    return (
        <div>
            <input
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeuPressAddItem}
                className={error ? "error" : " "}
            />
            <button onClick={onClickAddItem}>+</button>
            {errorMessage}
        </div>

    )
}

export default AddItemForm;