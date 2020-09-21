const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");



router.get("/", authorization, async (req,res) => {
    try{
        //req.user has the payload
        //res.json(req.user)

        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);

        res.json(user.rows[0]);




    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/", async (req,res) =>{
    try{
        const list = await pool.query("SELECT * FROM users");
        res. json(list.rows);
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;