import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
    schema: "./lib/db/schema",
    dialect: "postgresql",
    out: "./lib/db/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL || "",
    }
});