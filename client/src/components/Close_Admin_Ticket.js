import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

const Close_Admin_Ticket = ({ setAuth, ticket }) => {
  //edit description function


  const closeTicket = async (e) => {
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const response = await fetch(
        `http://localhost:5000/dashboard_admin/tickets/${ticket.ticket_id}`,
        {
          method: "PUT",
          headers: myHeaders,
        }
      );

      window.location = "/dashboard_admin";
      toast.success("Ticket Closed!");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-danger btn-lg"
        data-target={`#iddd${ticket.ticket_id}`}
        onClick={(e) => closeTicket(e.target.value)}
      >
        Close Ticket
      </button>

    </Fragment>
  );
};

export default Close_Admin_Ticket;
