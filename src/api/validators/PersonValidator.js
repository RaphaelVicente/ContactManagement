const errorHandler = require("../utils/errorHandler");

class PersonValidator {
    validateCreationData(req, res, next) {
        const person = req.body;

        if (!person.name)
            return errorHandler("Field 'Name' must be filled", req, res);

        const regexValidator = /^[A-Za-z\s]+$/;

        if (!regexValidator.test(person.name))
            return errorHandler("Invalid 'Name'", req, res);

        if (!person.birthDate)
            return errorHandler("Field 'Birth Date' must be filled", req, res);

        const patternBirthDate = /^(([0-9]{4})-(0[469]|11)-(0[1-9]|[12][0-9]|30))|^(([0-9]{4})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|^(([0-9]{4})-02-(0[1-9]|[12][0-9]))/;
        
        if (!patternBirthDate.test(person.birthDate))
            return errorHandler("Invalid 'Birth Date'", req, res);

        if (!person.type)
            return errorHandler("Field 'Type' must be filled", req, res);

        next();
    }
}

module.exports = new PersonValidator();