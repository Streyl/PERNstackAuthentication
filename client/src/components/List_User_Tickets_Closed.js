import React, { Fragment, useState, useEffect } from "react";

import Open_User_Ticket from "./Open_User_Ticket";
import Rate_Closed_Ticket from "./Rate_Closed_Ticket";

const List_User_Tickets_Closed = ({ setAuth }) => {
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/tickets_closed/",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const jsonData = await response.json();

      setTickets(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  console.log(tickets);

  return (
    <Fragment>
      <h1 class="h2"> Dashboard: Closed Tickets</h1>{" "}
      <div class="table-responsive">
        <table id="userList" class="table table-bordered">
          <thead>
            <tr>
              <th class="text-center mt-5 strong"> Name </th>
              <th class="text-center mt-5 strong"> Issue </th>
              <th class="text-center mt-5 strong"> Date Created </th>
              <th class="text-center mt-5 strong"> Date Closed </th>
              <th class="text-center mt-5 strong"> Rating </th>
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
                <td class="text-center mt-5 strong">
                  {ticket.ticket_date_open}
                </td>
                <td class="text-center mt-5 strong">
                  {ticket.ticket_date_closed}
                </td>
                <td
                  class="text-center mt-5 strong"
                  className={
                    ticket.ticket_rating == 1
                      ? "red_rate"
                      : ticket.ticket_rating == 2
                      ? "brown_rate"
                      : ticket.ticket_rating == 3
                      ? "yellow_rate"
                      : ticket.ticket_rating == 4
                      ? "lime_rate"
                      : ticket.ticket_rating == 5
                      ? "green_rate"
                      : "white"
                  }
                >
                  {ticket.ticket_rating}
                </td>
                <td class="text-center mt-5 strong">
                  <Open_User_Ticket ticket={ticket}></Open_User_Ticket>
                </td>
                <td class="text-center mt-5 strong">
                  <Rate_Closed_Ticket ticket={ticket}></Rate_Closed_Ticket>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default List_User_Tickets_Closed;
