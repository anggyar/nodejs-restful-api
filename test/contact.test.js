import supertest from "supertest";
import {
    createManyTestContact,
    createTestContact,
    createTestUser,
    getTestContact,
    removeAllTestContacts,
    removeTestUser,
} from "./test-util.js";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";

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

describe("GET /api/contacts/:contactId", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it("should can get contact", async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id)
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    });

    it("should return 404 if contact id is not found", async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get("/api/contacts/" + (testContact.id + 1))
            .set("Authorization", "test");

        expect(result.status).toBe(404);
    });
});

describe("PUT /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it("should can update existing contact ", async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id)
            .set("Authorization", "test")
            .send({
                first_name: "Anggy",
                last_name: "M Yahya",
                email: "anggy@mail.com",
                phone: "082381126115",
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe("Anggy");
        expect(result.body.data.last_name).toBe("M Yahya");
        expect(result.body.data.email).toBe("anggy@mail.com");
        expect(result.body.data.phone).toBe("082381126115");
    });

    it("should reject if request is invalid", async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id)
            .set("Authorization", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "anggy",
                phone: "",
            });

        expect(result.status).toBe(400);
    });

    it("should reject if contact is not found", async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id + 1)
            .set("Authorization", "test")
            .send({
                first_name: "Anggy",
                last_name: "M Yahya",
                email: "anggy@mail.com",
                phone: "082381126115",
            });

        expect(result.status).toBe(404);
    });
});

describe("DELETE /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it("should delete contact", async () => {
        let testContact = await getTestContact();
        const result = await supertest(web)
            .delete("/api/contacts/" + testContact.id)
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact = await getTestContact();
        expect(testContact).toBeNull();
    });

    it("should reject if contact delete contact", async () => {
        let testContact = await getTestContact();
        const result = await supertest(web)
            .delete("/api/contacts/" + testContact.id)
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact = await getTestContact();
        expect(testContact).toBeNull();
    });
});

describe("GET /api/contacts", () => {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it("should can search without parameter", async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it("should can search to page 2", async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({
                page: 2,
            })
            .set("Authorization", "test");

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it("should can search using name", async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({
                name: "test 1",
            })
            .set("Authorization", "test");

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it("should can search using email", async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({
                email: "test1",
            })
            .set("Authorization", "test");

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it("should can search using email", async () => {
        const result = await supertest(web)
            .get("/api/contacts")
            .query({
                phone: "0809888899991",
            })
            .set("Authorization", "test");

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });
});
