import React, { Fragment, useState, useEffect } from "react";


const List_Employees = ({ setAuth }) => {
    const [employees, setEmployees] = useState([]);
  
    const getEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/dashboard_admin/employees/", {
          method: "GET",
          headers: { token: localStorage.token },
        });
  
        const jsonData = await response.json();
  
        setEmployees(jsonData);
      } catch (err) {
        console.log(err.message);
      }
    };
  
    useEffect(() => {
        getEmployees();
    }, []);
  
    return (
      <Fragment>
        <h1 class="h2"> Employees</h1>{" "}
        <div class="table-responsive">
          <table id="employeeList" class="table table-bordered">
            <thead>
              <tr>
                <th class="text-center mt-5 strong"> Name and Sirname </th>
                <th class="text-center mt-5 strong"> Email </th>
                <th class="text-center mt-5 strong"> Phone Number </th>
                <th class="text-center mt-5 strong"> Position </th>
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
              {employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td class="text-center mt-5 strong">
                    {employee.employee_first_name + " " + employee.employee_second_name}
                  </td>
                  <td class="text-center mt-5 strong"> {employee.employee_email}</td>
                  <td class="text-center mt-5 strong"> {employee.employee_phone_number}</td>
                  <td class="text-center mt-5 strong"> {employee.employee_position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  };
  
  export default List_Employees;
  