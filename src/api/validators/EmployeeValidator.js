const errorHandler = require("../utils/errorHandler");

class EmployeeValidator {
    validateCreationData(req, res, next) {
        const employee = req.body.personEmployee ? req.body.personEmployee : req.body;

        if (!employee.username)
            return errorHandler("Field 'Username' must be filled", req, res);

        if (!employee.password)
            return errorHandler("Field 'Password' must be filled", req, res);

        if (!employee.occupation)
            return errorHandler("Field 'Occupation' must be filled", req, res);

        next();
    }
}

module.exports = new EmployeeValidator();