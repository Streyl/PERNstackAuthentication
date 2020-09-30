const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");



router.post("/", authorization, async (req,res) => {
    try{

        const user = await pool.query("SELECT * FROM employees WHERE employee_id = $1", [req.user]);

        res.json(user.rows[0]);

    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//get all employees
router.get("/employees", authorization, async (req,res) => {
    try{

        const allEmployees = await pool.query("SELECT * FROM employees WHERE employee_valid = true");

        res.json(allEmployees.rows);

    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/users_list", authorization, async (req,res) => {
    try{
        const allUsers = await pool.query("SELECT * FROM users WHERE user_valid = true");

        res.json(allUsers.rows);

    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
//get all issues
router.get("/issues", authorization, async (req,res) => {
    try{

        const allIssues = await pool.query("SELECT * FROM issues");

        res.json(allIssues.rows);

    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//get all open admin tickets
router.get("/tickets", authorization, async (req,res) => {
    try {
      const allTickets = await pool.query("Select *, TO_CHAR(ticket_date_open, 'dd/mm/yyyy') ticket_date_open FROM tickets JOIN users ON tickets.ticket_owner_id = users.user_id JOIN issues ON issues.issue_id = ticket_issue_id JOIN employees ON employees.employee_id =ticket_assigned_employee_id WHERE ticket_status !='CLOSED' AND ticket_assigned_employee_id = $1 ORDER BY ticket_id", [req.user]);
        res.json(allTickets.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
//get all admin closed tickets
router.get("/tickets_closed", authorization, async (req,res) => {
    try {
     const allTickets = await pool.query("Select *, TO_CHAR(ticket_date_open, 'dd/mm/yyyy') ticket_date_open, TO_CHAR(ticket_date_closed, 'dd/mm/yyyy') ticket_date_closed FROM tickets JOIN users ON tickets.ticket_owner_id = users.user_id JOIN issues ON issues.issue_id = ticket_issue_id JOIN employees ON employees.employee_id =ticket_assigned_employee_id WHERE ticket_status ='CLOSED' AND ticket_assigned_employee_id  = $1 ORDER BY 1", [req.user]);
        res.json(allTickets.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//get one admin ticket
router.get("/tickets/:id", authorization, async(req,res) =>
{
    try {
        const { id } = req.params;
    const ticket = await pool.query("Select * FROM tickets JOIN users ON tickets.ticket_owner_id = users.user_id JOIN issues ON issues.issue_id = ticket_issue_id JOIN employees ON employees.employee_id = ticket_assigned_employee_id WHERE ticket_id = $1 ", [ id ]);
        res.json(ticket.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//close a ticket
router.put("/tickets/:id", authorization, async(req,res) =>{
    try {
        const { id } = req.params;
        const updateTicket = await pool.query("UPDATE tickets SET ticket_status = 'CLOSED', ticket_date_closed = CURRENT_DATE WHERE ticket_id = $1", [id]);
    res.json("Ticket was closed");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});


module.exports = router;