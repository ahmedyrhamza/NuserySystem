const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    // search for the token
    try {
        const token = request.get("Authorization").split(" ")[1];

        const decodedToken = jwt.verify(token,"NurserySystem");
        // console.log(decodedToken);
        request.role=decodedToken.role;
        request.id=decodedToken.id;

        next();
    }
    catch(error) {
        next(new Error("Not Athenticated!"));
    }
}


module.exports.checkAdmin = (request, response, next) => {
    if (request.role == "admin")
        next();
    else 
        next(new Error("Not Authorized!"));
}

module.exports.checkTeacher = (request, response, next) => {
    if (request.role == "teacher")
        next();
    else 
        next(new Error("Not Authorized!"));
}

module.exports.checkAdminAndTeacher = (request, response, next) => {
    if (request.role == "teacher" || request.role == "admin")
        next();
    else 
        next(new Error("Not Authorized!"));
}