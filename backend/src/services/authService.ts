import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET || "Wq56w8W98_!2JsE@3";

export async function loginAdmin(email: string, password: string) {
  const [admin] = await db.select().from(users).where(eq(users.email, email));

  if (!admin) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { name: admin.name, adminId: admin.id, email: admin.email },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
}

export async function signupAdmin({
  email,
  password,
  name,
}: {
  [key: string]: string;
}) {
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  if (existing) throw new Error("Admin already exists");

  const passwordHash = await bcrypt.hash(password, 10);

  const [admin] = await db
    .insert(users)
    .values({ name, email, password: passwordHash })
    .returning();

  const token = jwt.sign(
    { name: admin.name, adminId: admin.id, email: admin.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
