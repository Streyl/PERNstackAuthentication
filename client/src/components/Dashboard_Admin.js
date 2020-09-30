import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

//components

import List_Admin_Tickets from "./List_Admin_Tickets";
import List_Admin_Tickets_Closed from "./List_Admin_Tickets_Closed";
import List_Users from "./List_Users";
import List_Employees from "./List_Employees";

const Dashboard_Admin = ({ setAuth }) => {
  //open close dashboards
  const [showScrollView, setShowScrollView] = useState(true);
  const [showScrollView2, setShowScrollView2] = useState(false);
  const [showScrollView3, setShowScrollView3] = useState(false);
  const [showScrollView4, setShowScrollView4] = useState(false);

  const onPress = () => {
    // toggle true or false

    setShowScrollView(true);
    setShowScrollView2(false);
    setShowScrollView3(false);
    setShowScrollView4(false);
  };

  const onPress2 = () => {
    // toggle true or false

    setShowScrollView(false);
    setShowScrollView2(true);
    setShowScrollView3(false);
    setShowScrollView4(false);
  };

  const onPress3 = () => {
    // toggle true or false

    setShowScrollView(false);
    setShowScrollView2(false);
    setShowScrollView3(true);
    setShowScrollView4(false);
  };

  const onPress4 = () => {
    // toggle true or false

    setShowScrollView(false);
    setShowScrollView2(false);
    setShowScrollView3(false);
    setShowScrollView4(true);
  };
  //---------------------------------------
  const choseEmployee = () => {};

  //------------------

  const [name, setName] = useState("");

  const [id, setId] = useState("");

  const [info, setInfo] = useState("");

  const [priority, setPriority] = useState("");

  const [id_employee, setID_employee] = useState("");

  const [employees, setEmployees] = useState([]);

  const [issues, setIssues] = useState([]);

  const [id_issue, setID_issue] = useState("");

  //setting employees for creating the ticket

  const getEmployees = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard_admin/employees/",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const jsonData = await response.json();

      setEmployees(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getIssues = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard_admin/issues/",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const jsonData = await response.json();

      setIssues(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //tciket creation
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { info, id_employee, id_issue, priority };
      const response = await fetch(
        "http://localhost:5000/dashboard_admin/tickets",
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );
      const parseResponse = await response.json();

      console.log(parseResponse);
      setInfo("");
      setID_employee("");
      setID_issue("");
      setPriority("");
      window.location = "/dashboard_admin";
      toast.success("Ticket Created!");
    } catch (err) {
      console.error(err.message);
    }
  };

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard_admin/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.employee_first_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getId() {
    try {
      const response = await fetch("http://localhost:5000/dashboard_admin/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setId(parseRes.user_id);
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
    getId();
    getEmployees();
    getIssues();
  }, []);

  return (
    <Fragment>
      <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 ml-0">
        <a
          class="navbar-brand bg-dark col-sm-3 col-md-2 mr-0"
          href="/dashboard_admin"
        >
          <img alt="Qries" src="https://ticketeasy-software.com/wp-content/uploads/2020/02/New-logo.png"
         width="200" height="70"/>
        </a>
        <h1 class="text-white text-right">Welcome Admin {name}</h1>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <button className="btn btn-primary" onClick={(e) => logout(e)}>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div class="container-fluid">
        <div class="row">
          <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <ul class="nav flex-column mt-3 ml-2">
                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={onPress}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-file"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    Open Tickets
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={onPress2}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-file"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    Closed Tickets
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={onPress3}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-users"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    Users
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={onPress4}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-users"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    Employees
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div class="btn-toolbar mb-2 mb-md-0"></div>

            <div> {showScrollView ? <List_Admin_Tickets /> : null} </div>
            <div>
              {" "}
              {showScrollView2 ? <List_Admin_Tickets_Closed /> : null}{" "}
            </div>
            <div> {showScrollView3 ? <List_Users /> : null}</div>
            <div> {showScrollView4 ? <List_Employees /> : null}</div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard_Admin;
