import { Router } from "express";
import { db } from "@/db";
import { jobs } from "@/db/schema/jobs";
import { eq } from "drizzle-orm";
import { adminAuth } from "@/middlewares/authMiddleware";

const router = Router();

// Get all jobs
router.get("/jobs", adminAuth, async (req, res) => {
  const allJobs = await db.select().from(jobs);
  res.json(allJobs);
});

// Create job
router.post("/jobs", adminAuth, async (req, res) => {
  const { title, slug, description, type, location, department } = req.body;
  const [job] = await db
    .insert(jobs)
    .values({ title, slug, description, type, department, location })
    .returning();
  res.json(job);
});

// Update job
router.put("/jobs/:id", adminAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description, type, location } = req.body;

  const [updated] = await db
    .update(jobs)
    .set({ title, description, type, location })
    .where(eq(jobs.id, id))
    .returning();

  res.json(updated);
});

export default router;
