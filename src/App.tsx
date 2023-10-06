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
    let todolist1 = v1()
    let todolist2 = v1()
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to buy', filter: 'completed'}
    ])
    const [tasks, setTasks] = useState({
        [todolist1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolist2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false}
        ]
    })
    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let task = tasks[todolistId]
        tasks[todolistId] = [newTask, ...task]
        setTasks({...tasks})
    }
    function removeTask(taskId: string, todolistId: string) {
        let task = tasks[todolistId]
        tasks[todolistId] = task.filter(t => t.id != taskId)
        setTasks({...tasks})
    }
    function changeStatus (taskId: string, isDone: boolean, todolistId: string) {
        let task = tasks[todolistId]
        let changeTask = task.find(t => t.id === taskId)
        if(changeTask) {
            changeTask.isDone = isDone
        setTasks({...tasks})
        }
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
                let taskForTodolist = tasks[tl.id]
                if (tl.filter === 'active') {
                    taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
                }
                if (tl.filter === 'completed') {
                    taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
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
