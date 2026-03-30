const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const cookieParser = require('cookie-parser');

const generateqp = require("./functions/generatepaper.js");
const eqp = require("./functions/eqp.js");
const emcq = require("./functions/emcq.js");
const apm = require("./functions/apm.js");
const pps = require("./functions/pps.js");
const home = require("./routes/home.js");
const about = require("./routes/about.js");
const contact = require("./routes/contact.js");
const dotenv= require('dotenv');
dotenv.config();

app.engine("ejs", ejsMate); 
app.set("view engine","ejs")
app.set("views",path.join(__dirname,'./views/ejs'))
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use("/", home);
app.use("/about", about);
app.use("/contact", contact);

let cqp = [];

function storePaper(qp) {
    cqp = Array.isArray(qp) ? qp : [];
    return cqp;
}

app.get("/math", async(req,res)=>{
    const qp = storePaper(await eqp());
    res.render("index.ejs",{question: qp});
});

app.get("/chem",async (req,res)=>{
    const qp = storePaper(await emcq());
    res.render("index.ejs", {question :qp});
});

app.get("/apm",async (req,res)=>{
    const qp = storePaper(await apm());
    res.render("index.ejs", {question :qp});
});

app.get("/pps",async (req,res)=>{
    const qp = storePaper(await pps());
    res.render("index.ejs", {question :qp});
});

app.get("/paper",async (req,res)=>{
    const qp = storePaper(await generateqp());
    res.render("index.ejs", { question: qp });
});

app.post('/modern', (req, res) => {       
    const subjectRoutes = {
        Chemistry: "/chem",
        "Applied Mechanics": "/apm",
        "Mathematics-2": "/math",
        "P.P.S": "/pps",
    };

    const nextRoute = subjectRoutes[req.body.sub];

    if (!nextRoute) {
        return res.status(400).render("home.ejs", {
            currTab: "home",
            errorMessage: "Please choose a supported subject before generating a paper.",
        });
    }

    return res.redirect(nextRoute);
});

app.get("/download", async (req, res)=>{
    if (cqp.length === 0) {
        return res.status(400).render("home.ejs", {
            currTab: "home",
            errorMessage: "Generate a question paper before trying to download it.",
        });
    }

    return res.render("download.ejs", { question: cqp });
});

const PORT = process.env.PORT || 8080

async function startServer(){
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing. Add it to your .env file before starting the server.");
    }

    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'autopaper' });

    console.log("Connected to MongoDB");
    console.log("DB Name:", mongoose.connection.db.databaseName);
    console.log("Host:", mongoose.connection.host);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));

    app.listen(PORT, ()=>{
        console.log(`Running on port ${PORT}`);
    });
}

app.use((req, res) => {
    res.status(404).render("error.ejs", {
        currTab: "",
        statusCode: 404,
        title: "Page not found",
        message: "The page you requested does not exist.",
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).render("error.ejs", {
        currTab: "",
        statusCode: 500,
        title: "Something went wrong",
        message: err.message || "An unexpected error occurred while processing your request.",
    });
});

startServer().catch((err)=>{
    console.error("Startup failed:", err.message);
    process.exit(1);
});
