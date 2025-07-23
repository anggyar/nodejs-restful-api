import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

    // Kalau udah ada, kasi pesan error
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

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username,
        },
        select: {
            username: true,
            password: true,
        },
    });

    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    // bcrypt.compare (promise), membandingkan antara data sisi client dengan data di database.
    const isPasswordValid = await bcrypt.compare(
        loginRequest.password,
        user.password
    );

    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    // TODO: learn how (uuid) work
    const token = uuid().toString();
    return await prismaClient.user.update({
        // update data token
        data: {
            token: token,
        },
        // dimana, username database merupakan username yang dicari
        where: {
            username: user.username,
        },
        select: {
            token: true,
        },
    });
};

const get = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username,
        },
        select: {
            username: true,
            name: true,
        },
    });

    if (!user) {
        throw new ResponseError(404, "User is not found");
    }

    return user;
};

const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            username: user.username,
        },
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "User is not found");
    }

    const data = {};
    if (user.name) {
        data.name = user.name;
    }

    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.user.update({
        where: {
            username: user.username,
        },
        data: data,
        select: {
            username: true,
            name: true,
        },
    });
};

const logout = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username,
        },
    });

    if (!user) {
        throw new ResponseError(404, "User is not found");
    }

    return prismaClient.user.update({
        where: {
            username: username,
        },
        data: {
            token: null,
        },
        select: {
            username: true,
        },
    });
};
export default { register, login, get, update, logout };
