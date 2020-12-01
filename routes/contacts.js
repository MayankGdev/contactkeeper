const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/Users');
const Contact = require('../models/Contact');


router.get('/api/contacts',auth,async(req,res,next)=>{
    try {
        const contacts = await Contact.find({user:req.user.id}).sort({date:-1});
        res.json(contacts);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).json({msg:'server error'});
    }

});

router.post('/api/contacts',[auth,[
    check('name','please enter name').not().isEmpty()
]],async(req,res,next)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }
    const {name,email,phone,type} = req.body;
    try {
     
    const newContact = new Contact({name,email,phone,type,user:req.user.id});
    const contact = await newContact.save();
    res.json(contact);   
    } catch (err) {
        console.log(err.message);
        req.status(500).json({msg:'server err'});
    }   
});

router.put('/api/contacts/:id',auth,async(req,res,next)=>{
    const {name,email,phone,type} = req.body;
    const contactFields = {}
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;
    
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg:'contact not found'});

        if(contact.user.toString()!==req.user.id){
            return res.status(401).json({msg:'not authorised'});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,{$set:contactFields},{new:true});
        res.json(contact);
    } catch (err) {
        console.log(err.message);
        req.status(500).json({msg:'server err'});
    }
});

router.delete('/api/contacts/:id',auth,async(req,res,next)=>{
 
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg:'contact not found'});

        if(contact.user.toString()!==req.user.id){
            return res.status(401).json({msg:'not authorised'});
        }

      await Contact.findByIdAndRemove(req.params.id);
        res.json({msg:'contact removed'});
    } catch (err) {
        console.log(err.message);
        req.status(500).json({msg:'server err'});
    }

});


module.exports = router;