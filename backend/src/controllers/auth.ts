import { Response, Request } from "express";
import { loginAdmin, signupAdmin, verifyToken } from "@/services/authService";

export const authController = {
  login: async (req: Request, res: Response) => {
    console.log("login", req.body);

    try {
      const { email, password } = req.body;
      const token = await loginAdmin(email, password);
      res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Invalid credentials" });
    }
  },
  signup: async (req: Request, res: Response) => {
    try {
      const token = await signupAdmin(req.body);
      res.json({ token });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Signup failed" });
    }
  },
  verify: async (req: Request, res: Response) => {
    console.log("verify");

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Missing token" });

    const token = authHeader.split(" ")[1];

    try {
      const decoded = verifyToken(token);
      if (decoded) return res.json({ user: decoded });
    } catch (err: any) {
      return res.status(400).json({ msg: "Something went wrong!" });
    }
    res.status(401).json({ msg: "invalid token!" });
  },
};
