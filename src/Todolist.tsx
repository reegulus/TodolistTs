import React from "react";

type TodolistPropsType = {
    title?: string
    tasks: Array<TasksPropsType>
    removeTask: (taskId: number)=> void
}
type TasksPropsType = {
    id: number,
    title: string,
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((el) => {
                        const removeOnClickHandler = () => {props.removeTask(el.id)}
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
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}