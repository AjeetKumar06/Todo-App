import * as Icons from "../utils/icons";
import { useState } from "react";

const { PencilLine, Trash, Check, X } = Icons;

function Todo_list({ todos, deleteTodo, completeTodo, editIndex, setEditIndex, editTodoFunc }) {
   // const [editName, setEditName] = useState("");
   // const [editDetail, setEditDetail] = useState("");

   const [editValues, setEditValues] = useState({ name: "", detail: "" });

   const startEditing = (index) => {
      setEditIndex(index);
      const t = todos[index] || { name: "", detail: "" };
      setEditValues({ name: t.name, detail: t.detail });
   };

   const saveEdit = () => {
      editTodoFunc(editIndex, { name: editValues.name, detail: editValues.detail });
      setEditValues({ name: "", detail: "" });
   };

   return (
      <div className="list_wrap">
         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Task Detail</th>
                  <th>Date</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {todos.length === 0 ? (
                  <tr>
                     <td colSpan="4" style={{ display: "table-cell", fontStyle: "italic" }}>
                        No tasks yet.
                     </td>
                  </tr>
               ) : (
                  todos.map((todo, index) => (
                     <tr key={index} className={todo.completed ? "completed" : ""}>
                        {editIndex === index ? (
                           <>
                              <td>
                                 <input type="text" value={editValues.name} onChange={(e) => setEditValues((p) => ({ ...p, name: e.target.value }))} required />
                              </td>
                              <td>
                                 <textarea value={editValues.detail} onChange={(e) => setEditValues((p) => ({ ...p, detail: e.target.value }))}></textarea>
                              </td>
                              <td>{/* <small>{todo.date}</small> */}</td>
                              <td>
                                 <button title="Save" onClick={() => saveEdit(index)}>
                                    <Check size={20} style={{ color: "green" }} />
                                 </button>
                                 &nbsp;
                                 <button title="Cancel" onClick={() => setEditIndex(null)}>
                                    <X size={20} />
                                 </button>
                              </td>
                           </>
                        ) : (
                           <>
                              <td onClick={() => completeTodo(index)}>
                                 {index + 1}. {todo.name}
                              </td>
                              <td>{todo.detail}</td>
                              <td>
                                 <small>{todo.date}</small>
                              </td>
                              <td>
                                 <button title="Edit" onClick={() => startEditing(index)}>
                                    <PencilLine size={18} />
                                 </button>
                                 &nbsp;
                                 <button title="Delete" onClick={() => deleteTodo(index)}>
                                    <Trash size={20} style={{ color: "tomato" }} />
                                 </button>
                              </td>
                           </>
                        )}
                     </tr>
                  ))
               )}
            </tbody>
         </table>
      </div>
   );
}

export default Todo_list;
