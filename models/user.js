const mongoose = require("mongoose")
const {createHmac, randomBytes} = require("crypto");

const Schema = mongoose.Schema


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
       
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",

    },
    profileImageUrl: {
        type: String,
        default: "../public/images/default.png",
    }

},{timestamps:true})


userSchema.pre("save", function () {
    const user = this;
    if (!user.isModified("password")) return next()

    const salt = randomBytes(16).toString()


    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex")

   this.salt = salt
   this.password = hashedPassword

 

    
});





const USER = mongoose.model("User", userSchema)

module.exports = USER