import React from 'react'
import './styles/TodoItem.css'

export function TodoItem( {todo, toggleTodo }) {
    const { id, task, completed } = todo;

    const handleTodoClick = () => {
        toggleTodo(id);
    }

    return (
        <a href="#" className="tarea"><li className={"item " + completed} onClick={handleTodoClick}>
            {task}
        </li></a>
    )
}
