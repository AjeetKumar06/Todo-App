import React, { useState, useEffect } from "react";
import "./App.css";
import Todo_add from "./component/Todo_add";
import Todo_list from "./component/Todo_list";
import { CalendarCheck } from "./utils/icons";

function App() {
   const [todos, setTodos] = useState(() => {
      try {
         const raw = localStorage.getItem("todos");
         const parsed = raw ? JSON.parse(raw) : [];
         return Array.isArray(parsed) ? parsed : [];
      } catch {
         return [];
      }
   });
   const [editIndex, setEditIndex] = useState(null);

   useEffect(() => {
      try {
         localStorage.setItem("todos", JSON.stringify(todos));
      } catch (e) {
         console.warn("Failed to save todos Permanently", e);
      }
   }, [todos]);

   const addTodoFunc = ({ newname, newdetail }) => {
      const newTodo = {
         name: newname,
         detail: newdetail,
         date: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
         }),
         // completed: false,
      };
      // setTodos([...todos, newTodo]);
      setTodos((prev) => [...prev, newTodo]);
      console.log(newTodo);
   };

   const deleteTodo = (targetNo) => {
      if (!window.confirm("Are you sure to delete this task?")) return;
      setTodos((prev) => prev.filter((_, i) => i !== targetNo));

      // setTodos(todos.filter((filtertodo) => filtertodo.id !== id));
   };

   const completeTodo = (targetNo) => {
      const updatedTodos = (prev) => prev.map((todo, i) => (i === targetNo ? { ...todo, completed: !todo.completed } : todo));

      setTodos(updatedTodos);
   };

   const editTodoFunc = (index, updatedTodo) => {
      setTodos((prev) => prev.map((todo, i) => (i === index ? { ...todo, ...updatedTodo } : todo)));
      setEditIndex(null);
   };

   return (
      <>
         <div className="todo_card">
            <h2>
               <CalendarCheck size={28} weight="bold" /> &nbsp; ToDo List
            </h2>
            <Todo_add addTodo={addTodoFunc} />
            <Todo_list todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} editIndex={editIndex} setEditIndex={setEditIndex} editTodoFunc={editTodoFunc} />
         </div>
      </>
   );
}

export default App;
