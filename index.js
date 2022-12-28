const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// todo middleware's
app.use(cors());
app.use(express.json());



// todo port
app.get('/', (req, res) => {
    res.send("Task server is running");
});
app.listen(port, ()=>{
    console.log("Task server is running on port: ", port);
});