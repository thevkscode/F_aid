const express = require("express");
const app = express();
const main = require('./main')
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use(express.json({}));
app.use(express.json({
    extented: true
}));

app.get("/", (req, res)=>{
    res.send("API Working")
});

app.get("/api", async (req, res) => {
    const date = req.query;
    var data = main(date);
    res.status(200).json({
        msg:'Success',
        data:data
    });
})

app.listen(8080, 
    console.log(`Server running on  Port :8080`));