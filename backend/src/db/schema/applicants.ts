import {
  pgTable,
  uuid,
  text,
} from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const applicants = pgTable("applicants", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: uuid("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  resume: text("resume").notNull(),
});
