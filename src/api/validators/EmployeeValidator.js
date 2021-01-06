class EmployeeValidator {
    validateCreationData(req, res, next) {
        const employee = req.body.personEmployee ? req.body.personEmployee : req.body;
        let errors = [];

        if (!employee.username)
            errors.push("Field 'Username' must be filled");

        if (!employee.password)
            errors.push("Field 'Password' must be filled");

        if (!employee.occupation)
            errors.push("Field 'Occupation' must be filled");

        if (!req.body.personEmployee && !employee.personId)
            errors.push("Field 'Person Id' must be filled");

        if (errors.length > 0)
            return res.status(500).json({errors: errors});

        next();
    }
}

module.exports = new EmployeeValidator();