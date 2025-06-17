const express = require("express");
const pool = require("./db");
const app = express();

// cors تُستخدم للسماح لتطبيقات الفرونتند (مثل React أو Angular) بالتواصل مع الـ API (الخلفية/Express) إذا كانت على نطاق (domain) مختلف.
// بدون cors، المتصفح يمنع الطلبات الخارجية لأسباب أمنية.
const cors = require("cors");

app.use(cors());

app.use(express.json());

//routers

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) returning *",
      // $1 == [description]
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos

app.get("/todos", async (req, res) => {
  try {
    const alltodo = await pool.query("select * from todo");
    res.json(alltodo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("select * from todo where todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todoUpdate = await pool.query(
      "update todo set description = $1 where todo_id = $2",
      [description, id]
    );
    res.json("updated");
  } catch (error) {
    console.error(error.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tododelete = await pool.query(
      "delete from todo where todo_id = $1  ",
      [id]
    );
    res.json("delete");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("first");
});
