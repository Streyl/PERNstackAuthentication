import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

import moment from 'moment';

const List_User_Tickets_Closed = ({ setAuth }) => {

    const [tickets, setTickets] = useState([]);

    const getTickets = async() => {
        try {

            const response = await fetch("http://localhost:5000/dashboard/tickets_closed/",{
                method: "GET",
                headers: { token: localStorage.token },
              });
            
            
            
            
            const jsonData = await response.json() 

            
            setTickets(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getTickets();
    }, []);

    console.log(tickets);



    return(
        <Fragment>
            <h1> List of User Tickets CLOSED </h1>
            {" "}
            <table id="userList" className="table table-dark mt-5 text-center">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> ID OWNER </th>
                        <th> ID ASSIGNED </th>
                        <th> ID ISSUE </th>
                        <th> INFORMATION </th>
                        <th> DATE OPEN </th>
                        <th> DATE CLOSED </th>
                        <th> STATUS </th>
                        <th> PRIORITY </th>
                        <th> STATUS </th>
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
                    {tickets.map (ticket => (
                        <tr>
                            <td >{ticket.ticket_id}</td>
                            <td>{ticket.ticket_owner_id}</td>
                            <td>{ticket.ticket_assigned_employee_id}</td>
                            <td>{ticket.ticket_issue_id}</td>
                            <td>{ticket.ticket_information}</td>
                            <td>{ticket.ticket_date_open}</td>
                            <td>{ticket.ticket_date_closed}</td>
                            <td>{ticket.ticket_status}</td>
                            <td>{ticket.ticket_priority}</td>
                            <td>{ticket.ticket_rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </Fragment>
    );
};

export default List_User_Tickets_Closed;