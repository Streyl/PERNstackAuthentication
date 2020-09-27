import React, { Fragment, useState, useEffect } from "react";

const Open_User_Ticket = ({ ticket, setAuth }) => {
  const [info, setInfo] = useState([]);

  const getInfo = async () => {
      
      try {
        const response = await fetch(`http://localhost:5000/dashboard/tickets/${ticket.ticket_id}`, {
            method: "GET",
            headers: { token: localStorage.token },
            
          });
    
          const jsonData = await response.json();
          
          setInfo(jsonData);
          
      } catch (err) {
          console.error(err.message);
      }
  }

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
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Open Ticket</h4>
            </div>
            <div class="modal-body">
            <p><td>{info.ticket_id}</td></p>
            <p><td>{info.ticket_information}</td></p>
            <p><td>{info.ticket_id}</td></p>
            <p><td>{info.ticket_id}</td></p>
            
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
