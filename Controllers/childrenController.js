const mongoose = require("mongoose");
require("../Models/childrenModel");
const ChildrenSchema = mongoose.model("children");

exports.getAllChildren = function (request, response, next) {
    // .populate({path:"class",select:{name:1}})
    // response.status(200).json({message: "Children list"});
    ChildrenSchema.find({})
        .then(data => {
            response.status(200).json({ data })

        })
        .catch(error => next(error));
}

exports.getChildByID = (request, response, next) => {
    ChildrenSchema.findOne({ _id: request.body.id }, { password: 1 })
        .then(data => {
            if (data == null)
                throw new Error("Child not Found")
            else
                response.status(200).json({ data })
        })
        .catch(error => next(error));
}

exports.addChild = function (request, response, next) {
    let newChild = new ChildrenSchema({
        _id: request.body.id,
        fullname: request.body.fullname,
        age: request.body.age,
        level: request.body.level,
        address: {
            city: request.body.address.city,
            street: request.body.address.street,
            building: request.body.address.building
        }
    });

    newChild.save()
            .then(data => {
                response.status(201).json(data);
            })
            .catch(error => next(error));
}

exports.updateChild = function (request, response, next) {
    ChildrenSchema.updateOne({ _id: request.body.id },
                {
                    $set: {
                        fullname: request.body.fullname,
                        age: request.body.age,
                        level: request.body.level,
                        address: {
                            city: request.body.address.city,
                            street: request.body.address.street,
                            building: request.body.address.building
                        }
                    }
                })
                .then(data => {
                    if (data.matchedCount == 0) {
                        next(new Error("Child not Found!"));
                    }
                    else {
                        respsone.status(200).json({ data });
                    }
                })
                .catch(error => next(error))
};

exports.deleteChild = function (request, response, next) {
    ChildrenSchema.deleteOne({ _id:request.body.id })
    .then(data => {
        if (data.deletedCount == 0) {
            next(new Error("Child not Found!"));
        }
        else {
            response.status(200).json({ data });
        }
    })
    .catch(error => next(error));
};