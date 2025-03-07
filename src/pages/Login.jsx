import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export const Login = () => {
  let navigate = useNavigate();
  const [_, setCookies] = useCookies("access_token");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  let authData = {
    name: username,
    password: password,
  };
  let handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        authData
      );
      console.log(authData);
      console.log(response.data.data._id);
      if (response.data.token) {
        setCookies("access_token", response.data.token);
        alert("Registration Successfull");

        window.localStorage.setItem("userId", response.data.data._id);
      } else {
        alert(response.data);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div className=" bg-green-200 w-96 h-56 flex flex-col justify-center items-center gap-2 m-3 rounded-lg">
          <h2>Login</h2>
          <div>
            <div className=" m-2">
              <label htmlFor="name">Username: </label>
              <input
                value={username}
                className=" rounded-lg p-1"
                type="text"
                name="name"
                id="name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className=" m-2">
              <label htmlFor="password">Password: </label>
              <input
                value={password}
                className=" rounded-lg p-1"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            className=" bg-white font-semibold rounded-lg px-2"
            onClick={handleSubmit}
          >
            {" "}
            Login{" "}
          </button>
          <p>
            Dont have an Account! <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};
