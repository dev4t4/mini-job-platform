import { db } from "@/db";
import { applicants } from "@/db/schema/applicants";

export async function applyToJob(data: {
  jobId: string;
  name: string;
  email: string;
  resume: string;
}) {
  return db.insert(applicants).values(data);
}