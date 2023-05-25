const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("../Models/teachesrModel");
const TeachersSchema = mongoose.model("teachers");

exports.login = function(request, response, next) {
    // Static Admin
    if (request.body.email == "x@x.com" && request.body.password == "123") {
        const token = jwt.sign({
            id:1,
            role:"admin",
            userName: "Admin"
        }, "NurserySystem", {expiresIn: "1h"});
        response.status(200).json({ message: "Authenticated Admin", token: token })
    }
    else {
        TeachersSchema.findOne({
                        email: request.body.email
                    })
                    .then(user=>{
                        if(user==null)
                        {
                            throw new Error("User Name or password is incorrect!");
                        }
                        bcrypt.compare(request.body.password, user.password, (err, result) => {
                            if (err) throw new Error("User Name or password is incorrect!");
                            else if (result) {
                                const token = jwt.sign({
                                    id:user._id,
                                    role:"teacher",
                                    userName: user.name
                                }, "NurserySystem", {expiresIn: "1h"});
                                response.status(200).json({ message: "Authenticated", token: token });
                            }
                            else throw new Error("User Name or password is incorrect!");
                        });
                    })
                    .catch(error => {
                        throw new Error("User Name or password is incorrect!");
                    });
    }
};