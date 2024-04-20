// functions for authorization through JWT
const jwt = require('jsonwebtoken');
const secret_key = "cronjobs";

// function to get token
const getTokens = (user_data) => {
    const token = jwt.sign(user_data,secret_key)
    return token
}

// function to verify the passed token
const verifyToken = (token) => {
    try{
        return jwt.verify(token,secret_key);
    }catch(err){
        return false
    }
}

module.exports = {
    getTokens,verifyToken
}