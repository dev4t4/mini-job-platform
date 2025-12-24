import "dotenv/config";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { users } from "./schema/users";
import { jobs } from "./schema/jobs";
import { applicants } from "./schema/applicants";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);
// Simple slugify function
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear tables
  await db.delete(applicants);
  await db.delete(jobs);
  await db.delete(users);

  // Create admin user
  const passwordHash = await bcrypt.hash("admin123", 10);
  const user: typeof users.$inferInsert = {
    name: "Yassin Alaoui",
    email: "admin@example.com",
    password: passwordHash,
  };
  await db.insert(users).values(user);

  // Create jobs
  const createdJobs: any[] = [];
  for (let i = 0; i < 5; i++) {
    const title = faker.person.jobTitle();
    const [job] = await db
      .insert(jobs)
      .values({
        title,
        slug: slugify(title),
        description: faker.company.catchPhrase(),
        type: faker.helpers.arrayElement(["Remote", "Hybird", "On-site"]),
        department: faker.helpers.arrayElement([
          "Engineering",
          "Marketing",
          "Design",
        ]),
        location: faker.location.city(),
      })
      .returning();
    createdJobs.push(job);
  }

  // Create applicants for each job
  for (const job of createdJobs) {
    const applicantsCount = faker.number.int({ min: 1, max: 4 });
    for (let i = 0; i < applicantsCount; i++) {
      await db.insert(applicants).values({
        jobId: job.id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        resume: faker.internet.url(),
      });
    }
  }

  console.log("✅ Seeding finished!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
