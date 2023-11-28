const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactusRoute = require("./routes/contactRoutes") 
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path")


const app = express()

//MiddleWares

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(cors());
//Route MiddleWare

app.use("/api/users" , userRoute); 
app.use("/api/products" , productRoute);
app.use("/api/contactus" , contactusRoute )

app.use("/uploads" , express.static(path.join(__dirname, "uploads"))); 


//Routes 
app.get("/" , (req , res) =>{
     res.send("Home Page")
});

//Error MiddleWare
app.use(errorHandler); 



const PORT = process.env.PORT || 5000;

//connect to DB and Start Server

mongoose.connect(process.env.MONGO_URI).then(()=> {app.listen(PORT , ()=>{
    console.log(`Server Running on port ${PORT}`);

})})
.catch((err)=> console.log(err)) 