import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilteredValueType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilteredValueType>('all')

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

    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: FilteredValueType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={taskForTodolist}
                removeTask={removeTask}
                addTask={addTask}
                filter={filter}
                changeFilter={changeFilter}
                changeTaskStatus={changeStatus}
            />
        </div>
    );
}

export default App;
