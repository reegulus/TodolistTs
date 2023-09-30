import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilteredValueType = 'all' | 'active' | 'completed'
function App() {
    const [tasks, setTasks] = useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])
const [filter, setFilter] = useState<FilteredValueType>('all')
function removeTask (taskId: number) {
        setTasks(tasks.filter((t) => t.id !== taskId))
}
let taskForTodolist = tasks
    if(filter === 'active') {
        taskForTodolist = tasks.filter(t => t.isDone===false)
    } if (filter === 'completed') {
        taskForTodolist = tasks.filter( t => t.isDone===true)
    }
    function changeFilter (value: FilteredValueType) {
        setFilter(value)
    }
    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
