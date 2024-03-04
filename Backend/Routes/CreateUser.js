const express = require('express')
const router = express.Router()
const User = require('../Models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const jwtSecret= process.env.JWT_SECRET;

router.post("/createuser",
    [body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', "Incorrect Password").isLength({ min: 8 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const salt=await bcrypt.genSalt(10);
        let secPassword=await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ sucess: true });
            
        } catch (error) {
            console.log(error)
            res.json({ sucess: false });
        }
    }
)


    
// for login

router.post("/loginuser",
    [body('email').isEmail(),
    body('password', "Incorrect Password").isLength({ min: 8 })
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try login with correct credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try login with correct credentials" });
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({sucess:true, authToken: authToken});

        } catch (error) {
            console.log(error)
            res.json({ sucess: false });
        }
    })

module.exports = router;

