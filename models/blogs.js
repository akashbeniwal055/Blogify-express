const mongoose = require("mongoose")
const  Schema  = mongoose.Schema


const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: false,
        default:"/image/default.png",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps: true })

const BLOG = mongoose.model("blog", blogSchema)


module.exports =  BLOG 