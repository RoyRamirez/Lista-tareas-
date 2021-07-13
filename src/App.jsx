import React, { Fragment, useState, useRef, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import {TodoList} from './components/TodoList';
import './App.css'

const KEY = "todoApp.todos";

export function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: 'Tarea', completed: false },
    ]);
    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY))
        if(storedTodos){
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos)
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if(task === '') return;

        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4(), task, completed: false }];
        });
        todoTaskRef.current.value = null;
    }

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    return (
        <Fragment>
            <h1 className="titulo">Lista de tareas</h1>
            <input className="entrada" ref={todoTaskRef} type="text" placeholder="Nueva Tarea" id=""/>
            <button className="btn" onClick={handleTodoAdd}>➕</button>
            <button className="btn" onClick={handleClearAll}>🗑</button>
            <div className="cuenta">Te quedan {todos.filter((todo) => !todo.completed).length} tareas por completar</div>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
        </Fragment>
            
    );
}