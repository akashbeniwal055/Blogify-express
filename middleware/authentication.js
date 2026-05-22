const { authenticateToken } = require("../services/authentication");



function restrictToNotLoginUser(cookieName){
    return function (req,res,next){
        const cookie =  req.cookies[cookieName]
        try{ if(!cookie ) return next()

            const userPayload = authenticateToken(cookie)
            req.user = userPayload
           }catch{(err)=>console.log(err)}
      
        return next()
    }


}

module.exports = {restrictToNotLoginUser}