import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        // userService bisa dipangigl karena menggunakan export default di file user-service.js
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

//
export default { register };
