class PersonValidator {
    validateCreationData(req, res, next) {
        const person = req.body;
        let errors = [];

        if (!person.name)
            errors.push("Field 'Name' must be filled");

        const regexValidator = /^[A-Za-z\s]+$/;

        if (!regexValidator.test(person.name))
            errors.push("Invalid 'Name'");

        if (!person.birthDate)
            errors.push("Field 'Birth Date' must be filled");

        const patternBirthDate = /^(([0-9]{4})-(0[469]|11)-(0[1-9]|[12][0-9]|30))|^(([0-9]{4})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|^(([0-9]{4})-02-(0[1-9]|[12][0-9]))/;

        if (!patternBirthDate.test(person.birthDate))
            errors.push("Invalid 'Birth Date'");

        if (!person.type)
            errors.push("Field 'Type' must be filled");

        if (errors.length > 0)
            return res.status(500).json({ errors: errors });

        next();
    }
}

module.exports = new PersonValidator();