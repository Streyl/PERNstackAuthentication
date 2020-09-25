const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");



router.post("/", authorization, async (req,res) => {
    try{
        //req.user has the payload
        //res.json(req.user)

        const user = await pool.query("SELECT employee_first_name FROM employees WHERE employee_id = $1", [req.user]);

        res.json(user.rows[0]);

    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;