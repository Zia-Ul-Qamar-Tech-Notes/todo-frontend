// Layout.js
import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

function Layout() {
  let userId = window.localStorage.getItem("userId");
  let navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <header>
        <nav>
          <ul className=" flex justify-center gap-4 bg-black text-white py-2 items-center">
            <li>
              <a href="/">Home</a>
            </li>
            {userId ? (
              <div className=" flex gap-2">
                <button
                  className=" bg-white px-1 rounded text-black"
                  onClick={logout}
                >
                  Logout
                </button>
                <li>
                  <Link to={"/create-todo"}>Create Todo</Link>
                </li>
              </div>
            ) : (
              <div className=" flex gap-2">
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </header>
      <main className=" flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
