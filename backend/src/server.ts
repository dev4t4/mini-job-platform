import "dotenv/config";
import express, { Response, Request } from "express";
import cors from "cors";
import authRoutes from "@/routes/auth";
import jobsRoutes from "@/routes/jobs";
import applicantsRoutes from "@/routes/applicants";
const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(jobsRoutes);
app.use(applicantsRoutes);

app.listen(3001, () => {
  console.log("server running on port", PORT);
});
