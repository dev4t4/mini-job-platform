import { db } from "@/db";
import { jobs } from "@/db/schema/jobs";
import { eq } from "drizzle-orm";

export async function createJob(data: {
  title: string;
  slug: string;
  description: string;
  type: string;
  department: string;
  location: string;
}) {
  return db.insert(jobs).values(data);
}

export async function getJobBySlug(slug: string) {
  const [job] = await db.select().from(jobs).where(eq(jobs.slug, slug));

  return job;
}
