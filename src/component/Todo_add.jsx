import { useState } from "react";

function Todo_add({ addTodo }) {
   const [taskName, setTaskName] = useState("");
   const [taskDetail, setTaskDetail] = useState("");

   function nameChange(e) {
      setTaskName(e.target.value);
   }
   function detailChange(e) {
      setTaskDetail(e.target.value);
   }

   const handleAdd = (e) => {
      e.preventDefault();
      if (!taskName.trim() || !taskDetail.trim()) return;
      // addTodo(taskName);
      addTodo({ newname: taskName, newdetail: taskDetail });
      // console.log(taskDetail);

      setTaskName("");
      setTaskDetail("");
   };

   return (
      <>
         <div>
            <form action="" onSubmit={handleAdd} className="input_wrap">
               <div className="form_group">
                  <label htmlFor="detail">Task Details</label>
                  <textarea value={taskDetail} onChange={detailChange} id="detail" placeholder="Type Your Task..." required></textarea>
               </div>
               <div style={{ display: "flex", alignItems: "end", gap: "0.75rem" }}>
                  <div className="form_group">
                     <label htmlFor="name">Task Name</label>
                     <input type="text" value={taskName} onChange={nameChange} placeholder="Your Task Name" required />
                  </div>
                  <button type="submit" className="submitbtn">
                     ADD TASK
                  </button>
               </div>
            </form>
         </div>
      </>
   );
}

export default Todo_add;
