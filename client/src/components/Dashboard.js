import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
//components

import List_User_Tickets from "./List_User_Tickets";
import List_User_Tickets_Closed from "./List_User_Tickets_Closed";

const Dashboard = ({ setAuth }) => {

  const [showScrollView, setShowScrollView] = useState(true);
  const [showScrollView2, setShowScrollView2] = useState(false);

  const onPress = () => {
    // toggle true or false

    setShowScrollView(true);
    setShowScrollView2(false);
  }

  const onPress2 = () => {
    // toggle true or false

    setShowScrollView(false);
    setShowScrollView2(true);
  }

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const [inputs, setInputs] = useState({
    id_owner: 9,
    id_employee: 1,
    id_issue: 1,
    info: "TEST",
    priority: 2,
  });

  const { id_owner, id_employee, id_issue, info, priority } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { id_owner, id_employee, id_issue, info, priority };

      const response = await fetch("http://localhost:5000/dashboard/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/dashboard";
    } catch (err) {
      console.error(err.message);
    }
  };

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
  async function getId() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
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
  }, []);

  return (
    <Fragment>
      <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 ml-0">
        <a
          class="navbar-brand bg-dark col-sm-3 col-md-2 mr-0"
          href="/dashboard"
        >
          Diploma!
        </a>
        <h1 class="text-white text-right">Welcome User {name}</h1>
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
                  <a class="nav-link" href="#" >
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
                    Customers
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" >
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
                      class="feather feather-bar-chart-2"
                    >
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    Reports
                  </a>
                </li>
              </ul>

              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-4 mt-4 mb-1 ">
                <button
                  type="button"
                  class="btn btn-success btn-lg"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Create New Ticket
                </button>
              </h6>
            </div>
          </nav>

          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 class="h2">Dashboard</h1>
              <div class="btn-toolbar mb-2 mb-md-0"></div>
            </div>


            <div > {showScrollView ? (<List_User_Tickets />) : null} </div>
            <div > {showScrollView2 ? (<List_User_Tickets_Closed />) : null} </div>

            
            
            

          </main>
        </div>
      </div>









      <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Create New Ticket</h4>
            </div>

            <div class="modal-body">
              <form className="d-flex mt-4" onSubmit={onSubmitForm}>
                <labe for="inputtext" className="mt-2">
                  Information:
                </labe>
                <input
                  id="inputtext"
                  type="text"
                  className="form-control mt-0"
                  value={info}
                  onChange={(e) => setInputs(e.target.value)}
                />
                <input
                  id="inputtext"
                  type="nimber"
                  className="form-control mt-0"
                  value="9"
                  onChange={(e) => setInputs(e.target.value)}
                />

                <button className="btn btn-success">Submit</button>
              </form>
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

/*            <h1>Welcome User {name}</h1>
        <List_User_Tickets></List_User_Tickets>
        <List_User_Tickets_Closed></List_User_Tickets_Closed>
*/

export default Dashboard;
