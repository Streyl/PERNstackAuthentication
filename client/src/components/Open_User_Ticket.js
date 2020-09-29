import React, { Fragment, useState, useEffect } from "react";

const Open_User_Ticket = ({ ticket, setAuth }) => {
  
  const [info, setInfo] = useState([]);

  const getInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/tickets/${ticket.ticket_id}`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const jsonData = await response.json();

      setInfo(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-info btn-lg"
        data-toggle="modal"
        data-target={`#id${info.ticket_id}`}
      >
        Open Ticket
      </button>

      <div id={`id${info.ticket_id}`} class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Ticket: {info.ticket_id}</h4>
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
              <div class="row">
                <div class="col-sm">
                  <dl>
                    <h5>User Information</h5>
                    <dt>User Name:</dt>
                    <dd>
                      - {info.user_first_name} {info.user_second_name}
                    </dd>
                    <dt>User Email:</dt>
                    <dd>- {info.user_email}</dd>
                    <dt>User Phone:</dt>
                    <dd>- {info.user_phone_number}</dd>
                    <dt>User Adress:</dt>
                    <dd>- {info.user_address}</dd>
                  </dl>
                </div>

                <div class="col-sm">
                  <dl>
                    <h5>Assigned Employee Information</h5>
                    <dt>Employee Name:</dt>
                    <dd>
                      - {info.employee_first_name} {info.employee_second_name}
                    </dd>
                    <dt>Employee Postinion:</dt>
                    <dd>- {info.employee_position}</dd>
                    <dt>Employee Email:</dt>
                    <dd>- {info.employee_email}</dd>
                    <dt>Employee Phone:</dt>
                    <dd>- {info.employee_phone_number}</dd>
                  </dl>
                </div>

                <div class="col-sm">
                  <dl>
                    <h5>Ticket Information</h5>
                    <dt>Ticket Information:</dt>
                    <dd>- {info.ticket_information}</dd>
                    <dt>Issue Type:</dt>
                    <dd>- {info.issue_type}</dd>
                    <dt>Issue Information:</dt>
                    <dd>- {info.issue_information}</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div class="modal-footer">
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

export default Open_User_Ticket;
