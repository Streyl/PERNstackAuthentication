const express = require("express");
const app = express();
const cors = require("cors");

//middlewear



app.use(express.json()); //req.body
app.use(cors());
//ROUTES//

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));

//dashboard route

app.use("/dashboard", require("./routes/dashboard")); 


//dashboard_admin route

app.use("/dashboard_admin", require("./routes/dashboard_admin")); 


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});