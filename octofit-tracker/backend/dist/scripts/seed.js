"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
async function main() {
    console.log('Seed the octofit_db database with test data');
    await (0, models_1.connectToDatabase)();
    await (0, models_1.seedDatabase)();
    console.log('Database seeded successfully.');
}
main().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});
