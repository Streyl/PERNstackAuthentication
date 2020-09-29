const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");



router.post("/", authorization, async (req,res) => {
    try{
        //req.user has the payload
        //res.json(req.user)

        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.user]);

        res.json(user.rows[0]);

    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//get all employees
router.get("/employees", authorization, async (req,res) => {
    try{
        //req.user has the payload
        //res.json(req.user)

        const allEmployees = await pool.query("SELECT * FROM employees");

        res.json(allEmployees.rows);

    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
//get all issues
router.get("/issues", authorization, async (req,res) => {
    try{
        //req.user has the payload
        //res.json(req.user)

        const allIssues = await pool.query("SELECT * FROM issues");

        res.json(allIssues.rows);

    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//get all open user tickets
router.get("/tickets", authorization, async (req,res) => {
    try {
        //const allTickets = await pool.query("SELECT ticket_id, ticket_owner_id, ticket_assigned_employee_id, ticket_issue_id, ticket_information, TO_CHAR(ticket_date_open, 'dd/mm/yyyy'), TO_CHAR(ticket_date_closed, 'dd/mm/yyyy'), ticket_status, ticket_priority, ticket_rating FROM tickets WHERE ticket_owner_id = $1", [req.user]);
        //const allTickets = await pool.query("SELECT * FROM tickets WHERE ticket_owner_id = $1 AND ticket_status !='closed'", [req.user]);
        const allTickets = await pool.query("Select *, TO_CHAR(ticket_date_open, 'dd/mm/yyyy') ticket_date_open FROM tickets JOIN users ON tickets.ticket_owner_id = users.user_id JOIN issues ON issues.issue_id = ticket_issue_id JOIN employees ON employees.employee_id =ticket_assigned_employee_id WHERE ticket_status !='CLOSED' AND ticket_owner_id = $1 ORDER BY ticket_id", [req.user]);
        res.json(allTickets.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
//get all user closed tickets
router.get("/tickets_closed", authorization, async (req,res) => {
    try {
        //const allTickets = await pool.query("SELECT ticket_id, ticket_owner_id, ticket_assigned_employee_id, ticket_issue_id, ticket_information, TO_CHAR(ticket_date_open, 'dd/mm/yyyy'), TO_CHAR(ticket_date_closed, 'dd/mm/yyyy'), ticket_status, ticket_priority, ticket_rating FROM tickets WHERE ticket_owner_id = $1", [req.user]);
        const allTickets = await pool.query("Select *, TO_CHAR(ticket_date_open, 'dd/mm/yyyy') ticket_date_open, TO_CHAR(ticket_date_closed, 'dd/mm/yyyy') ticket_date_closed FROM tickets JOIN users ON tickets.ticket_owner_id = users.user_id JOIN issues ON issues.issue_id = ticket_issue_id JOIN employees ON employees.employee_id =ticket_assigned_employee_id WHERE ticket_status ='CLOSED' AND ticket_owner_id = $1 ORDER BY 1", [req.user]);
        res.json(allTickets.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//get one user ticket
router.get("/tickets/:id", authorization, async(req,res) =>
{
    try {
        const { id } = req.params;
        //const ticket = await pool.query("Select * FROM tickets WHERE ticket_id = $1", [ id ]);
        const ticket = await pool.query("Select * FROM tickets JOIN users ON tickets.ticket_owner_id = users.user_id JOIN issues ON issues.issue_id = ticket_issue_id JOIN employees ON employees.employee_id = ticket_assigned_employee_id WHERE ticket_id = $1 ", [ id ]);
        res.json(ticket.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//update a ticket
router.put("/tickets/:id", authorization, async(req,res) =>{
    try {
        const { id } = req.params;
        const { info, priority } = req.body;
        const updateTicket = await pool.query("UPDATE tickets SET ticket_information = $1, ticket_priority = $2 WHERE ticket_id = $3", [info, priority, id]);
        //const updateTicket = await pool.query("UPDATE tickets SET ticket_information = $1, ticket_priority = $2, ticket_rating = $3 WHERE ticket_id = $4", [info, priority, rating, id]);
        res.json("Ticket was updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//rate_closed ticket
router.put("/tickets_closed/:id", authorization, async(req,res) =>{
    try {
        const { id } = req.params;
        const { rating } = req.body;
        const updateTicket = await pool.query("UPDATE tickets SET ticket_rating = $1 WHERE ticket_id = $2", [rating, id]);
        //const updateTicket = await pool.query("UPDATE tickets SET ticket_information = $1, ticket_priority = $2, ticket_rating = $3 WHERE ticket_id = $4", [info, priority, rating, id]);
        res.json("Ticket was Rated");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//create a ticket
router.post("/tickets", authorization, async (req, res) => {
    try {
      //const { id_owner, id_employee, id_issue, info, priority  } = req.body;
      const {info, id_employee, id_issue, priority} = req.body;
      const newTicket = await pool.query(
        "INSERT INTO tickets (ticket_owner_id, ticket_assigned_employee_id, ticket_issue_id, ticket_information, ticket_priority ) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [req.user,id_employee, id_issue, info, priority ]
      );
  
      res.json("Ticket was created");
    } catch (err) {
      console.error(err.message);
    }
  });








module.exports = router;