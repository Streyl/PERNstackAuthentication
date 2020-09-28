import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";

import Edit_User_Ticket from "./Edit_User_Ticket";
import Open_User_Ticket from "./Open_User_Ticket";

const List_User_Tickets = ({ setAuth }) => {
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/tickets/", {
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
      <table id="userList" class="table table-bordered">
        <thead>
          <tr>
            <th> Name </th>
            <th> Issue </th>
            <th> Date Created </th>
            <th> Priority </th>
            <th>  </th>
            <th>  </th>
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
              <td>{ticket.user_first_name + " " + ticket.user_second_name}</td>
              <td>{ticket.issue_type }</td>
              <td>{ticket.ticket_date_open}</td>
              <td className={
                (ticket.ticket_priority =='Critical') ? "red": (ticket.ticket_priority =='High') ? "yellow": (ticket.ticket_priority =='Medium') ? "blue": "green"
              
            }
              
              >{ticket.ticket_priority}</td>
              <td>
                <Open_User_Ticket ticket={ticket}></Open_User_Ticket>
              </td>
              <td>
                <Edit_User_Ticket ticket={ticket}></Edit_User_Ticket>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Fragment>
  );
};

export default List_User_Tickets;
