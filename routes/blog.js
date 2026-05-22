const { Router } = require("express")
const BLOG = require("../models/blogs");

const router = Router()

const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload/')
    },
    filename: function (req, file, cb) {
      const safeName = file.originalname.trim().replace(/\s+/g, "-")
      cb(null, `${Date.now()}-${safeName}`)
    }
  })

const upload = multer({storage:storage})



router.get("/addBlog", (req, res) => {
    res.render("addBlog",{user:req.user})
  })
  
  
router.post("/addBlog", upload.single("coverImageUrl") ,async (req, res) => {
    const { title,description} = req.body

    const user = await BLOG.create({
      title:title,
      description:description,
      createdBy:req.user._id,
      coverImageUrl:req.file ? `/upload/${req.file.filename}` : "images/default.png" ,
    
  
    })
 console.log(req.file)
    
    
    return res.redirect("/");
  
  })

   

  module.exports = router