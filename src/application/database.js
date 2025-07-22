import { PrismaClient } from "../../generated/prisma/index.js";
// import { PrismaClient } from "@prisma/client";
// import { prismaClient } from "prisma";
// import { PrismaClient } from "@prisma/client/extension";
import { logger } from "./logging.js";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
        {
            emit: "event",
            level: "error",
        },
        {
            emit: "event",
            level: "info",
        },
        {
            emit: "event",
            level: "warn",
        },
    ],
});

prismaClient.$on("error", (event) => {
    logger.error(event);
});

prismaClient.$on("warn", (event) => {
    logger.warn(event);
});

prismaClient.$on("info", (event) => {
    logger.info(event);
});

prismaClient.$on("query", (event) => {
    logger.info(event);
});
