import React, { Fragment, useState, useEffect } from "react";

import Close_Admin_Ticket from "./Close_Admin_Ticket";
import Open_Admin_Ticket from "./Open_Admin_Ticket";

const List_Admin_Tickets = ({ setAuth }) => {
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard_admin/tickets/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const jsonData = await response.json();

      setTickets(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <Fragment>
      <h1 class="h2"> Dashboard: Open Tickets</h1>{" "}
      <div class="table-responsive">
        <table id="adminList" class="table table-bordered">
          <thead>
            <tr>
              <th class="text-center mt-5 strong"> Name </th>
              <th class="text-center mt-5 strong"> Issue </th>
              <th class="text-center mt-5 strong"> Date Created </th>
              <th class="text-center mt-5 strong"> Priority </th>
              <th class="text-center mt-5 strong"> </th>
              <th class="text-center mt-5 strong"> </th>
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
            {tickets.map((ticket) => (
              <tr key={ticket.ticket_id}>
                <td class="text-center mt-5 strong">
                  {ticket.user_first_name + " " + ticket.user_second_name}
                </td>
                <td class="text-center mt-5 strong">{ticket.issue_type}</td>
                <td class="text-center mt-5 strong">{ticket.ticket_date_open}</td>
                <td class="text-center mt-5 strong"
                  className={
                    ticket.ticket_priority == "Critical"
                      ? "red"
                      : ticket.ticket_priority == "High"
                      ? "yellow"
                      : ticket.ticket_priority == "Medium"
                      ? "blue"
                      : ticket.ticket_priority == "Low"
                      ? "green"
                      : "white"
                  }
                >
                  {ticket.ticket_priority}
                </td>
                <td class="text-center mt-5 strong">
                  <Open_Admin_Ticket ticket={ticket}></Open_Admin_Ticket>
                </td>
                <td class="text-center mt-5 strong">
                  <Close_Admin_Ticket ticket={ticket}></Close_Admin_Ticket>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default List_Admin_Tickets;
