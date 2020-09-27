import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
//components

import List_User_Tickets from "./List_User_Tickets";
import List_User_Tickets_Closed from "./List_User_Tickets_Closed";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.user_first_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <Fragment>
      <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0">Diploma!</a>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <button className="btn btn-primary" onClick={(e) => logout(e)}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <h1>Welcome User {name}</h1>
      <List_User_Tickets></List_User_Tickets>
      <List_User_Tickets_Closed></List_User_Tickets_Closed>
    </Fragment>
  );
};

/*
<List_User_Tickets></List_User_Tickets>
        <List_User_Tickets_Closed></List_User_Tickets_Closed>
*/

export default Dashboard;
