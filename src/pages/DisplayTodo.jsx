import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Use the environment variable
const baseURL = import.meta.env.VITE_API_URL;

export const DisplayTodo = () => {
  const [todos, settodos] = useState([]);
  const userId = window.localStorage.getItem("userId");
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const changeStatus = async (e, id) => {
    const isCompleted = e.target.checked;
    settodos((prev) => {
      return prev.map((todo) =>
        todo._id === id ? { ...todo, status: isCompleted } : todo
      );
    });

    try {
      const response = await axios.put(
        `${baseURL}/todo/${id}`, // Use the baseURL
        {
          status: isCompleted,
        },
        {
          headers: { authorize: cookies.access_token },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (e, id) => {
    e.preventDefault();
    settodos((prev) => {
      return prev.filter((todo) => todo._id !== id);
    });
    try {
      const response = await axios.delete(`${baseURL}/todo/${id}`, {
        headers: { authorize: cookies.access_token },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodo = async () => {
    try {
      const response = await axios.get(`${baseURL}/todo/${userId}`);
      settodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userId) {
      return navigate("/login");
    } else {
      getTodo();
    }
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center font-bold text-xl items-center">
          Display Todo
        </h1>
        {todos.length !== 0 ? (
          <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Tasks</th>
                <th className="py-2">Description</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="bg-green-200">
              {todos.map((todo) => (
                <tr key={todo._id}>
                  <td className="p-3 border border-white text-center min-w-32">
                    <div className="flex justify-center gap-2 items-center">
                      <span>{todo.task}</span>
                    </div>
                  </td>
                  <td className="p-3 border border-white text-center min-w-32">
                    <div className="flex justify-center gap-2 items-center">
                      <span>{todo.description}</span>
                    </div>
                  </td>
                  <td className="p-3 border border-white text-center min-w-32">
                    <div className="flex justify-center gap-2 items-center">
                      <input
                        type="checkbox"
                        name="status"
                        checked={todo.status}
                        id="statusComplete"
                        onChange={(e) => changeStatus(e, todo._id)}
                      />
                      {todo.status ? <p>Completed</p> : <p>In-Completed</p>}
                      <MdDeleteForever
                        title="Delete Todo"
                        size={30}
                        onClick={(e) => deleteTodo(e, todo._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No Todo to Show</div>
        )}
      </div>
    </>
  );
};
