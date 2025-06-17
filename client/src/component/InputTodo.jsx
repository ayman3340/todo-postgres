import { useState } from "react";

function InputTodo() {
  const [description, setDiscription] = useState("");

    // submitedata ######################################################################
  async function onsubmitedata(e) {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location ="/";
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <h1>InputTodo</h1>
      <form action="" onSubmit={onsubmitedata}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDiscription(e.target.value)}
        />
        <button>add</button>
      </form>
    </div>
  );
}

export default InputTodo;
