const {check} =  require('express-validator');

module.exports = [
    check('name', 'please add name').not().isEmpty(),
    check('email', 'please enter valid email').isEmail(),
    check('password', 'please enter password').isLength({ min: 6 })
]