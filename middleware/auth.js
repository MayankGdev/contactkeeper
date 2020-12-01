const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req,res,next)=>{
    const token = req.header('x-auth-token');
    if(!token){
       return req.status(401).json({msg:'No token, authorization denied'});
     
    }
    try {
        const decode = await jwt.verify(token,config.get('jwtScret'));

        req.user = decode.user;
        next();

    } catch (err) {
        res.status(401).json({msg:'token not valid'}); 
      
    }
    
};


