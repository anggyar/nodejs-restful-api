const validate = (schema, request) => {
    // validate akan di pakai oleh Joi
    const result = schema.validate(request);

    if (result.error) {
        throw result.error;
    } else {
        return result.value;
    }
};

export { validate };
