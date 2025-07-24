import supertest from "supertest";
import {
    createTestContact,
    createTestUser,
    getTestContact,
    removeAllTestAddresses,
    removeAllTestContacts,
    removeTestUser,
} from "./test-util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/contacts/:contactId/addresses", () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestAddresses();
        await removeAllTestContacts();
        await removeTestUser();
    });

    it("should can create new addresses", async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .post("/api/contacts/" + testContact.id + "/addresses")
            .set("Authorization", "test")
            .send({
                street: "jalan test",
                city: "kota test",
                province: "provinsi test",
                country: "indonesia",
                postal_code: "28882",
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("28882");
    });

    it("should reject if address request is invalid", async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .post("/api/contacts/" + testContact.id + "/addresses")
            .set("Authorization", "test")
            .send({
                street: "jalan test",
                city: "kota test",
                province: "provinsi test",
                country: "",
                postal_code: "",
            });

        expect(result.status).toBe(400);
    });

    it("should reject if contact is not found", async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .post("/api/contacts/" + (testContact.id + 1) + "/addresses")
            .set("Authorization", "test")
            .send({
                street: "jalan test",
                city: "kota test",
                province: "provinsi test",
                country: "",
                postal_code: "",
            });

        expect(result.status).toBe(404);
    });
});
