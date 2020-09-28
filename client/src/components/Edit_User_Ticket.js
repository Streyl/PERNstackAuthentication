import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
const Edit_User_Ticket = ({ setAuth, ticket }) => {
  //edit description function

  const [info, setInfo] = useState(ticket.ticket_information);
  const [priority, setPriority] = useState([ticket.ticket_priority]);
  const [rating, setRating] = useState([ticket.ticket_rating]);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      const body = { info };
      const response = await fetch(
        `http://localhost:5000/dashboard/tickets/${ticket.ticket_id}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );

      window.location = "/dashboard";
      toast.success("Editted successfully!");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-info btn-lg"
        data-toggle="modal"
        data-target={`#idd${ticket.ticket_id}`}
      >
        Edit Ticket
      </button>

      <div id={`idd${ticket.ticket_id}`} class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">EDIT</h4>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
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

export default Edit_User_Ticket;
