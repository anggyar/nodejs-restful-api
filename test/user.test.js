import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/users", function () {
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "Anggyar",
            },
        });
    });

    // SKENARION SUKSES

    it("should can register new user", async () => {
        const result = await supertest(web).post("/api/users").send({
            username: "Anggyar",
            password: "rahasia",
            name: "Anggyar Muhamad Yahya",
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("Anggyar");
        expect(result.body.data.name).toBe("Anggyar Muhamad Yahya");
        expect(result.body.data.password).toBeUndefined();
    });

    // SKENARIO INVALID

    it("should reject if request is invalid", async () => {
        const result = await supertest(web).post("/api/users").send({
            username: "",
            password: "",
            name: "",
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    // SKENARIO DUPLIKAT
    it("should REJECT if username already registered", async () => {
        let result = await supertest(web).post("/api/users").send({
            username: "Anggyar",
            password: "rahasia",
            name: "Anggyar Muhamad Yahya",
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("Anggyar");
        expect(result.body.data.name).toBe("Anggyar Muhamad Yahya");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web).post("/api/users").send({
            username: "Anggyar",
            password: "rahasia",
            name: "Anggyar Muhamad Yahya",
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});
