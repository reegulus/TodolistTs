import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilteredValueType} from "./App";

type TodolistPropsType = {
    title?: string
    tasks: Array<TasksPropsType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    filter: FilteredValueType
    changeTaskStatus: (taskId: string, isDone: boolean)=> void
    changeFilter: (value: FilteredValueType) => void
}
type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null )
       if(e.key === 'Enter') {
           addTaskHandler()
           setTitle('')
       }
    }
    const addTaskHandler = () => {
        if(title.trim() !== '') {
        props.addTask(title.trim())
        setTitle('')
    }else {setError('Title is required')}

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
                           className={error ? 'error': ''}
                    />
                    <button onClick={addTaskHandler}>+</button>
                    {error &&  <div className={'error-message'}>{error}</div> }
                </div>
                <ul>
                    {props.tasks.map((el) => {
                        const removeOnClickHandler = () => {
                            props.removeTask(el.id)
                        }
                        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(el.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                                <input

                                    type="checkbox"
                                    onChange={onChangeCheckboxHandler}
                                    key={el.id}
                                    checked={el.isDone}
                                />
                                <span>{el.title}</span>
                                <button onClick={removeOnClickHandler}>✖️</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button className={props.filter === "all" ? 'active-filter' : ''} onClick={onClickAllHandler}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter'  : ''} onClick={onClickActiveHandler}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active-filter'   : ''} onClick={onClickCompletedHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}