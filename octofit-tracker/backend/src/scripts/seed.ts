import { connectToDatabase, seedDatabase } from '../models';

async function main() {
  console.log('Seed the octofit_db database with test data');
  await connectToDatabase();
  await seedDatabase();
  console.log('Database seeded successfully.');
}

main().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
