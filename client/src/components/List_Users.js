import React, { Fragment, useState, useEffect } from "react";


const List_Users = ({ setAuth }) => {
    const [users, setUsers] = useState([]);
  
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/dashboard_admin/users_list/", {
          method: "GET",
          headers: { token: localStorage.token },
        });
  
        const jsonData = await response.json();
  
        setUsers(jsonData);
      } catch (err) {
        console.log(err.message);
      }
    };
  
    useEffect(() => {
        getUsers();
    }, []);
  
    return (
      <Fragment>
        <h1 class="h2"> Users</h1>{" "}
        <div class="table-responsive">
          <table id="userList" class="table table-bordered">
            <thead>
              <tr>
                <th class="text-center mt-5 strong"> Name and Sirname </th>
                <th class="text-center mt-5 strong"> Email </th>
                <th class="text-center mt-5 strong"> Phone Number </th>
                <th class="text-center mt-5 strong"> Adress </th>
              </tr>
            </thead>
            <tbody>
              {/*<tr>
                          <td> ID </td>
                          <td> ID </td>
                          <td> ID </td>
                          <td> ID </td>
                          <td> Info </td>
                          <td> Date_open </td> 
                          <td> Date_closed </td>
                          <td> Status </td>
                          <td> Priority </td>
                          <td> Status </td> 
                      </tr>  */}
              {users.map((userlist) => (
                <tr  key={userlist.user_id}>
                  <td class="text-center mt-5 strong">
                    {userlist.user_first_name + " " + userlist.user_second_name}
                  </td>
                  <td class="text-center mt-5 strong"> {userlist.user_email}</td>
                  <td class="text-center mt-5 strong"> {userlist.user_phone_number}</td>
                  <td class="text-center mt-5 strong"> {userlist.user_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  };
  
  export default List_Users;
  