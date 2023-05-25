const mongoose = require("mongoose");
require("../Models/teachesrModel");
const TeachersSchema = mongoose.model("teachers");
const bcrypt = require("bcrypt");

exports.getAllTeachers=function(request, response, next) {
    // console.log(request.query.id);  // fetch query string ?id=value
    // console.log(request.params.id);  // fetch parameter /value/  (more secure)
    TeachersSchema.find({})
            .then(data => {
                if (data == null) {
                    throw new Error("Teacher not Found!");
                }
                else {
                    response.status(200).json({ data });
                }
            })
            .catch(error => {
                next(error);
            });
}

exports.getTeacherById=function(request, response, next) {
    TeachersSchema.findOne({ _id: request.body.id })
    .then(teacher => {
        if (teacher === null) {
            throw new Error("Teacher not Found!");
        }
        response.status(200).json( teacher );
    })
    .catch(error => next(error));
}

exports.addTeacher = function(request, response, next) {
    let newTeacher = new TeachersSchema({
        _id: new mongoose.Types.ObjectId(),
        fullName: request.body.fullName,
        email: request.body.email,
        password: request.body.password,
        image: request.body.image
    });

    newTeacher.save()
            .then(data => {
                response.status(201).json({ data });
            })
            .catch(error => next(error));
    
}

exports.updateTeacher = function(request, response, next) {
    let hashPass = request.body.password ? bcrypt.hashSync(request.body.password, salt) : request.body.password;
    TeachersSchema.updateOne({
            _id:request.body.id 
        },{
            fullname: request.body.fullname,
            email: request.body.email,
            password: hashPass,
            image: request.body.image
        })
        .then(data => {
            if (data.matchedCount == 0) 
                next(new Error("Teacher not found"));
            else 
                response.status(200).json({ data });
        })
        .catch(error => next(error));
}

exports.deleteTeacher = function(request, response, next) {
    TeachersSchema.deleteOne ({_id : request.body.id})
                    .then( data => {
                        if (data.deletedCount == 0) 
                            next(new Error("Teacher not found"));
                        else
                            request.status(200).json({ data });
                    })
                    .catch( err => next(err))
}