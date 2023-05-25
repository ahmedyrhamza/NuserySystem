const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const childrenRouter = require("./Routes/childrenRouter");
const classesRouter = require("./Routes/classesRouter");
const teachersRouter = require("./Routes/teachersRouter");
const loginRouter = require("./Routes/authenticationRouter");
const authMW = require("./Middlewares/authMW");

const server = express();

mongoose.connect("mongodb://127.0.0.1:27017/NurserySystem")
        .then(() => {
            // connect to server here (listening)
            server.listen(process.env.PORT || 8080, () => {
                console.log("server is listening...")
            });
        })
        .catch(error => {
            // connect to another server here
            console.log("Exception in DB: "+error);
        });

// logging middleware   using morgan
server.use(morgan(':method :url - :response-time ms'));
// server.use(morgan('combined'));
// server.use(morgan('tiny'));

// authorozation middleware
server.use((request, response, next) => {
    if(true) {
        // response.json({message: "Authorized"});
        next();
    }
    else {
        // next(new Error ("Not Authorized"));   // next overload hold exception
        // throw new Error ("Not Authorized");     // create new error with javascript
    }
});

// routers ==> end-points 
server.use(express.json());    // body parsing the http get to json
// server.use(express.urlencoded);
server.use(loginRouter);   // first route
server.use(authMW);
server.use(childrenRouter);   
server.use(classesRouter);
server.use(teachersRouter);

// Not found middleware
server.use((request, response) => {
    response.status(404).json({message: "Page Not Found!"});
});

// Error middleware to catch all exceptions 
server.use((error, request, response, next) => {
    response.status(500).json({message: "Exception: "+error})
});
/*
*/