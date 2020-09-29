import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
const Rate_Closed_Ticket = ({ setAuth, ticket }) => {
  //edit description function

  //const [info, setInfo] = useState(ticket.ticket_information);
  //const [priority, setPriority] = useState(ticket.ticket_priority);
  const [rating, setRating] = useState(ticket.ticket_rating);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      const body = { rating };
      const response = await fetch(
        `http://localhost:5000/dashboard/tickets_closed/${ticket.ticket_id}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );

      window.location = "/dashboard";
      toast.success("Rated successfully!");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target={`#iddd${ticket.ticket_id}`}
      >
        Rate Ticket
      </button>

      <div id={`iddd${ticket.ticket_id}`} class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Ticket</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="btn-group btn-group-lg ml-3" role="group" aria-label="...">
                <button type="button" class="btn btn-secondary btn-outline-warning" value="1" onClick={(e) => setRating(e.target.value)}>
                  1
                </button>
                <button type="button" class="btn btn-secondary btn-outline-warning" value="2" onClick={(e) => setRating(e.target.value)}>
                  2
                </button>
                <button type="button" class="btn btn-secondary btn-outline-warning" value="3" onClick={(e) => setRating(e.target.value)}>
                  3
                </button>
                <button type="button" class="btn btn-secondary btn-outline-warning" value="4" onClick={(e) => setRating(e.target.value)}>
                  4
                </button>
                <button type="button" class="btn btn-secondary btn-outline-warning" value="5" onClick={(e) => setRating(e.target.value)}>
                  5
                </button>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Rate
              </button>
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Rate_Closed_Ticket;
