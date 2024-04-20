const { verifyToken } = require("../helper");

const Auth = (req,resp,next) => {
    const apiKey = req.headers.authorization;
    if(verifyToken(apiKey)){
        next();
    }else{
        resp.send({
            msg:"Unauthorized",
            status:0
        })
    }
}


module.exports = Auth;