const express = require("express");
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/status' , auth , (req , res)=> {
    res.status(200).send({"msg":"ok"})
});


module.exports = router;