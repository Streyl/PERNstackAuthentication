import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
const Edit_User_Ticket = ({ setAuth, ticket }) => {
  //edit description function

  const [info, setInfo] = useState(ticket.ticket_information);
  const [priority, setPriority] = useState(ticket.ticket_priority);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      const body = { info, priority };
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
        class="btn btn-warning btn-lg"
        data-toggle="modal"
        data-target={`#idd${ticket.ticket_id}`}
      >
        Edit Ticket
      </button>

      <div id={`idd${ticket.ticket_id}`} class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
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
              <div class="row ml-5 mr-5">
              <labe for="inputtext" className="mt-1">
                    Information:
                  </labe>
                <input
                  type="text"
                  className="form-control"
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                />
              </div>
              
              <div class="row ml-5 mr-5">
                  <labe for="inputtext" className="mt-1">
                    Priority:
                  </labe>
                  <select
                    class="custom-select"
                    id="myList"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
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
