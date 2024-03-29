const express=require("express")
const app=express()
const connection = require("./db/conn")
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config({ path: "./config.env" })
connection();

const port=process.env.PORT

app.use(
    cors({
      methods: "GET,POST,PATCH,PUT,DELETE",
      origin: "http://localhost:3000",
      credentials: true,
    })
);
app.use(express.json());
app.use('/api',require('./routes/route'))


app.get('/',(req,res)=>{
    res.send("Server 200")
})


app.listen(port,()=>{
    console.log("server is running")
})