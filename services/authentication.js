const jwt = require("jsonwebtoken")

const secretKey = "supermNkkhnjfn"

 function createToken (user){
    
     const payload = {
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        salt:user.salt,
        role:user.role,
     }

     const token =  jwt.sign(payload,secretKey)
 return token

}

function authenticateToken(token){
 if(!token) return null

 const user = jwt.verify(token,secretKey)

 return user

}



module.exports = {   createToken ,
                    authenticateToken
                 }