import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  department: text("department").notNull(),
  location: text("location").notNull(),
});
