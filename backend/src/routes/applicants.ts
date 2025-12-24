import { Router, Request, Response } from "express";
import { db } from "@/db";
import { applicants } from "@/db/schema/applicants";
import { adminAuth } from "@/middlewares/authMiddleware";

const router = Router();

// Get all applicants (admin only)
router.get("/applicants", adminAuth, async (req: Request, res: Response) => {
  const allApplicants = await db.select().from(applicants);
  res.json(allApplicants);
});

// Apply for a job (public)
router.post("/jobs/:jobId/apply", async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const { name, email, resume } = req.body;

  const [applicant] = await db
    .insert(applicants)
    .values({ jobId, name, email, resume })
    .returning();

  res.json(applicant);
});

export default router;
