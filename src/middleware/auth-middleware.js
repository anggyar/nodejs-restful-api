/**MIDDLEWARE ini digunakan untuk mencari token authentikasi dari user
 *
 */

import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
    // dapatkan token dulu
    const token = req.get("Authorization");

    //kalau tidak ada token, return unauthorized -> end
    if (!token) {
        res.status(401)
            .json({
                errors: "Unauthorized",
            })
            .end();
    } else {
        //kalau ada token, check di database
        const user = await prismaClient.user.findFirst({
            where: {
                token: token,
            },
        });

        // kalau tidak ada user
        if (!user) {
            res.status(401)
                .json({
                    errors: "Unauthorized",
                })
                .end();
        } else {
            //kalau ada user
            req.user = user;
            next();
        }
    }
};
