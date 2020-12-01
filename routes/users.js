const express = require('express');
const router = express.Router();
const config = require('config');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth2 = require('../middleware/auth2');
const {  validationResult } = require('express-validator');

const User = require('../models/Users');
router.post('/api/users', auth2, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }
    const {name,email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({"msg":"user already exist"});
        }
        user = new User({name,email,password});
        user.password = await bycrpt.hash(password,10); 
        await user.save();
        
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.get('jwtScret'),{
            expiresIn:360000
        },(err,token)=>{
            if(err) throw err;
            res.json({token});
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;