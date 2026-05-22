const express  = require("express");
const app = express();
const urlRouter = require("./routes/users")
const blogRouter = require("./routes/blog")
const path = require("path");
const  mongoose  = require("mongoose");
const cookieParser = require('cookie-parser');
const {restrictToNotLoginUser} = require("./middleware/authentication")



const PORT = 8000

app.set("view engine","ejs")
app.set("views", path.resolve("./views"))

//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))


//methods
app.use("/" , restrictToNotLoginUser("token"),urlRouter )
app.use("/" ,blogRouter )


mongoose.connect("mongodb://localhost:27017/blogify")
.then(()=>{
    console.log("mongoose connected")
})
.catch((err)=>{
    console.log(err)
})


app.listen(PORT,()=> console.log(`server is started on ${PORT}`))

