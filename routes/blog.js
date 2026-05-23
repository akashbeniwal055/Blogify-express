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
  

  router.get("/blog/:id", async (req,res)=>{
    const blog = await BLOG.findById(req.params.id)
    if (!blog){
      return res.status(404).send("404 page not found")
    }
    
    res.render("blog",{blog:blog,user:req.user})

  })
  

  router.get("/blog/delete/:id", async (req,res)=>{
    const blog = await BLOG.findOneAndDelete({_id:req.params.id})
    if (!blog){
      return res.status(404).send("404 blog not found")
    }
    
    return res.redirect("/")

  })
  

router.post("/addBlog", upload.single("coverImageUrl") ,async (req, res) => {
    const { title,description} = req.body

    const user = await BLOG.create({
      title:title,
      description:description,
      createdBy:req.user._id,
      coverImageUrl:req.file ? `/upload/${req.file.filename}` : "/image/default.png" ,
    
  
    })
 
    
    
    return res.redirect("/");
  
  })

   

  module.exports = router