import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";


function ListTodos() {
  let [todoData, setTodoData] = useState([]);
  // getTodos ######################################################################
  async function getTodos() {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      console.log(jsonData);
      setTodoData(jsonData);
    } catch (error) {
      console.error(error.massage);
    }
  }
  // removeTodos ######################################################################
  async function removeTodos(todo_id) {
    try {
      const removeTodo = await fetch(`http://localhost:5000/todos/${todo_id}` , {
        method:"DELETE"
      });
      // const jsonData = await response.json();
       setTodoData(todoData.filter((e) => {
         return e.todo_id !== todo_id;
       }));
    } catch (error) {
      console.error(error.massage);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {todoData.map((todo) => {
            return (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td><EditTodo todo={todo}></EditTodo></td>
                <td>
                  <button onClick={()=>removeTodos(todo.todo_id)} className="btn btn-primary">delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ListTodos;
