const { Router } = require("express")
const USER = require("../models/user")
const { createHmac, randomBytes } = require("crypto");
const { createToken, authenticateToken } = require("../services/authentication");
const BLOG = require("../models/blogs");

const router = Router()

router.get("/", async (req, res) => {

  const user = await BLOG.find({})

  res.render("home",{user:req.user,allBlogs:user})
})

router.get("/signup", (req, res) => {
  res.render("signup")
})

router.get("/login", (req, res) => {
  res.render("login")
})


router.get("/logout", (req, res) => {
  res.clearCookie("token") 
req
return  res.redirect("/login")
})

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body

  const user = await USER.create({
    fullName,
    email,
    password,

  })

  return res.redirect("/");

})


router.post("/login", async (req, res) => {
  
    const { email, password } = req.body
  
    const user = await USER.findOne({ email })

    const hashedPassword = createHmac("sha256", user.salt).update(password).digest("hex")


    if (hashedPassword !== user.password) return res.render("login", { error: "incorect email or password" })

     const token = createToken(user)
     res.cookie("token",token)
     
    return res.redirect("/" );
  
})

module.exports = router 