import supertest from "supertest";
import {
    createTestUser,
    removeAllTestContacts,
    removeTestUser,
} from "./test-util.js";
import { web } from "../src/application/web.js";

describe("POST /api/contacts", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it("should can create new contact", async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "test")
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@mail.com",
                phone: "088899998888",
            });

        expect(result.status).toBe(200);
    });

    it("should reject if request is not valid", async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "test")
            .send({
                first_name: "",
                last_name: "test",
                email: "test",
                phone: "0888999988029423897492749142749274988",
            });

        expect(result.status).toBe(400);
    });
});
