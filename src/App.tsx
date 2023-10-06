import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilteredValueType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string,
    title: string
    filter: FilteredValueType
}

function App() {
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to buy', filter: 'completed'}
    ])
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    function removeTask(taskId: string) {
        setTasks(tasks.filter((t) => t.id !== taskId))
    }
    function changeStatus (taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if(task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }



    function changeFilter(value: FilteredValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if(todolist) {
            todolist.filter = value
        setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            {todolists.map((tl) => {
                let taskForTodolist = tasks
                if (tl.filter === 'active') {
                    taskForTodolist = tasks.filter(t => t.isDone === false)
                }
                if (tl.filter === 'completed') {
                    taskForTodolist = tasks.filter(t => t.isDone === true)
                }
                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        filter={tl.filter}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeStatus}
                    />
                )
            })}

        </div>
    );
}
export default App;
