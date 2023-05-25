const mongoose = require("mongoose");
require("../Models/classesModel");
require("../Models/teachesrModel");
require("../Models/childrenModel");
const TeacherSchema = mongoose.model("teachers");
const ChildSchema = mongoose.model("children");
const ClassSchema = mongoose.model("classes");

exports.getAllClasses = (request, response, next) => {
    ClassSchema.find({})
            .populate({ path: "supervisor", select: { _id: 0, fullname: 1 } })
            .populate({ path: "children", select: { _id: 0, fullname: 1 } })
            .then(data => {
                if (data == null) {
                    throw new Error("Class not Found!");
                }
                else {
                    response.status(200).json({ data });
                }
            })
            .catch(error => next(error))
}

exports.getClassByID = (request, response, next) => {
    ClassSchema.findOne({ _id: request.body.id })
            .populate({ path: "supervisor", select: { _id: 0, fullname: 1 } })
            .populate({ path: "children", select: { _id: 0, fullname: 1 } })
            .then(data => {
                if (data == null) {
                    throw new Error("Class not Found!")
                }
                response.status(200).json({ data });
            })
            .catch(error => next(error));
}

// ES8 promises --> async await
exports.addClass = async (request, response, next) => {
    try {
        // Validations
        if (request.body.supervisor && request.body.children) {
            let teacher = await TeacherSchema.findOne({ _id: request.body.supervisor })
            if (teacher == null) {
                throw new Error("Supervisor not Found!");
            }
            for (let classChild of request.body.children) {
                let child = await ChildSchema.findOne({ _id: classChild });
                if (child == null) {
                    throw new Error(`Child with Id : ${classChild} not Found!`);
                }
            }

            let newClass = new ClassSchema({
                name: request.body.name,
                supervisor: request.body.supervisor,
                children: request.body.children
            });
            let data = await newClass.save();
            response.status(201).json(data);
        }
    }
    catch (error) {
        next(error)
    }
}

// ES6 promises --> then then then catch
exports.updateClass = (request, response, next) => {
    if (request.body.supervisor && request.body.children) {
        TeacherSchema.findOne({ _id: request.body.supervisor }, { _id: 1 })
            .then((data) => {
                if (data == null) {
                    throw new Error("Supervisor not Found!");
                } 
                else {
                    return ChildSchema.find({ _id: { $in: request.body.children } });
                }
            })
            .then((data) => {
                data = data.map((obj) => Number(obj._id));
                request.body.children = request.body.children.map((_id) => Number(_id));
                request.body.children = [...new Set(request.body.children)];
                if (data.length != request.body.children.length) {
                    throw new Error("Wrong Data!");
                } else {
                    return ClassSchema.updateOne(
                        { _id: request.body.id },
                        {
                            $set: {
                                name: request.body.name,
                                supervisor: request.body.supervisor,
                            },
                            $addToSet: {
                                children: request.body.children 
                            }
                        }
                    );
                }
            })
            .then((data) => {
                if (data.matchedCount == 0) {
                    throw new Error("Class not Found");
                } else {
                    response.status(200).json({ data });
                }
            })
            .catch(error => next(error));
    }
};

exports.deleteClass = (request, response, next) => {
    ClassSchema.deleteOne({ _id: request.body.id })
        .then(data => {
            if (data.deletedCount == 0) {
                throw new Error("Class not Found!");
            } else {
                response.status(200).json({ data });
            }
        })
        .catch(error => next(error));
}

module.exports.getClassSupervisor = (request, response, next) => {
    ClassSchema.findOne({ _id: request.body.id }, { supervisor: 1 })
        .populate({ path: "supervisor" })
        .then(data => {
            if (data == null)
                throw new Error("Supervisor doesn't exixts");
            else
            response.status(200).json({ data });
        })
        .catch(error => next(error));
}

module.exports.getClassChildren = (request, response, next) => {
    ClassSchema.find({ _id: request.body._id }, { children: 1 })
        .populate({ path: "children" })
        .then(data => {
            if (data == null)
                throw new Error("Supervisor doesn't exixts");
            else
            response.status(200).json({ data });
        })
        .catch(error => next(error));
}