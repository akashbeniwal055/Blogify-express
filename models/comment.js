const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

})

const COMMENT = mongoose.model("comment", commentSchema)


module.exports = COMMENT