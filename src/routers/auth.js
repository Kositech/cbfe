var express = require('express');
var router = express.Router();

router.use(function(req,res,next){
    console.log("auth router ", req.body)
    // console.log("auth router")
    next()
})

// var { gqlClientRequest, gqlClientAuthRequest } = require.main.require('../src/graphQL/gqlClient.js')
// var authGQL = require.main.require('../src/graphQL/auth-query.js')

router.post('/', async function (req,res, next){
    var body = req.body
    console.log("body", body)
    if(typeof(body.email !== "undefined") && typeof(body.password !== "undefined")){
        if(body.email === "cb-user@crystalball.com" && body.password === "Zaq!@wsX"){
            console.log("process ", process.env)
            res.cookie("x-api-key", process.env.X_API_KEY, { maxAge: 60 * 60 * 1000, httpOnly: false }) // millisecs
            res.status(200).json({
                data: {
                    "msg": "login success."
                }
            })
        }else{
            res.status(403).json({
                errors:{
                    "msg": "login fail."
                }
            })
        }
    }
})

module.exports = router;