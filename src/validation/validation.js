import { ResponseError } from "../error/response-error.js";

const validate = (schema, request) => {
    // validate akan di pakai oleh Joi
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false, //reject unknwon field
    });

    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
};

export { validate };
