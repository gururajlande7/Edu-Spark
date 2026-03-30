const express = require('express')
const router = express.Router();

router.get("/",(req,res)=>{
    res.render("about.ejs", { currTab: "about" });
})
module.exports= router;
