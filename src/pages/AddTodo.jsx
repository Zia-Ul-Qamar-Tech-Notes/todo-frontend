import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function AddTodo() {
  const [task, settask] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState(false);
  const userId = window.localStorage.getItem("userId");
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      return navigate("/login");
    }
  }, []);

  const addTodo = async () => {
    const todo = {
      task: task,
      description: description,
      status: status,
      userId: userId,
    };

    console.log(todo);
    try {
      const response = await axios.post("http://localhost:5000/todo/", todo, {
        headers: { authorize: cookies.access_token },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col justify-center items-center bg-green-200 rounded-lg gap-3 w-80 p-4">
      <div>
        <h1>ToDO</h1>
      </div>
      <div>
        <label className=" mx-2" htmlFor="task">
          Task:
        </label>
        <input
          className=" border border-green-400"
          type="text"
          name="task"
          id="task"
          value={task}
          onChange={(e) => settask(e.target.value)}
        />
      </div>
      <div>
        <label className=" mx-2" htmlFor="description">
          Description
        </label>
        <input
          className=" border border-green-400"
          type="description"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
      <div className=" flex gap-2 justify-center items-center">
        <label htmlFor="status">Status: </label>
        <p className="text-xs">Completed</p>
        <input
          type="radio"
          name="status"
          id="status"
          value={status}
          onChange={(e) => setstatus(true)}
        />
        <p className="text-xs">Not Completed</p>
        <input
          type="radio"
          name="status"
          id="status"
          value={status}
          defaultChecked
          onChange={(e) => setstatus(false)}
        />
      </div>
      <button className=" bg-green-700 p-2 text-white" onClick={addTodo}>
        Add Todo
      </button>
    </div>
  );
}

export default AddTodo;
