import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilteredValueType} from "./App";

type TodolistPropsType = {
    title?: string
    tasks: Array<TasksPropsType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilteredValueType) => void
}
type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
       if(e.key === 'Enter') {
           addTaskHandler()
           setTitle('')
       }
    }
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onClickAllHandler = () => {
        props.changeFilter('all')
    }
    const onClickActiveHandler = () => {
        props.changeFilter('active')
    }
    const onClickCompletedHandler = () => {
        props.changeFilter('completed')
    }
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           value={title}
                    />
                    <button onClick={addTaskHandler}>+</button>
                </div>
                <ul>
                    {props.tasks.map((el) => {
                        const removeOnClickHandler = () => {
                            props.removeTask(el.id)
                        }
                        return (
                            <li>
                                <input type="checkbox" key={el.id} checked={el.isDone}/>
                                <span>{el.title}</span>
                                <button onClick={removeOnClickHandler}>✖️</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={onClickAllHandler}>All
                    </button>
                    <button onClick={onClickActiveHandler}>Active
                    </button>
                    <button onClick={onClickCompletedHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}