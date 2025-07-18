import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { registerUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";
import * as bcrypt from "bcrypt";

const register = async (request) => {
    /**
     * Ketika melakukan register, request yang masuk akan di validasi
     * Data yagn di validasi akan dibuat menggunakan fungsi prismaClient, kemudian di buat berdasarkan nilai username.
     * Apabila nilai username diketahui telah terdapat di database, maka akan memberikan response error 400 dan info bahwa username telah ada
     * Lalu, passowrd dari user akan di lakukan hashing dengan fungsi bcrypt
     * Hasil akan mengembalikan data yang benar dan menampilkan username dan name.
     */
    const user = validate(registerUserValidation, request);

    // Cek user telah aktif atau tidak
    const countUser = await prismaClient.user.count({
        where: {
            username: user.username,
        },
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exist");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true,
        },
    });
};

export default { register };
