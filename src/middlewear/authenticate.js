
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");


const verifyToken = (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token, "shravan", (err,decoded) => {
            if(err) return reject(err)
    
            return resolve(decoded)
        });
    })
    
}

const authenticate = async (req,res,next) => {
    
    
    if(!req.headers.authorization)
    return res.status(400).send({message : "Authorization token not found or incorrect"})

    if(!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({message : "Authorization token not found or incorrect"})

    const token = req.headers.authorization.trim().split(" ")[1]

    let decoded;
    try{
        decoded = await verifyToken(token)
    }
    catch(err){
        console.log(err)
        return res.status(400).send({message : "Authorization token not found or incorrect"})
    }

    console.log(decoded)
    req.email = decoded.user.email
    req.user = decoded.user;
    req.body.userId = decoded.user._id;
    return next();

}

module.exports = authenticate;