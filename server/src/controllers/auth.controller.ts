import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // use bcrypt if you prefer
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const TOKEN_EXPIRY = "2h";

export async function register(req: Request, res: Response) {
  try {
    const {
      email, password, name,
      securityQuestion1, securityAnswer1,
      securityQuestion2, securityAnswer2,
    } = req.body;

    if (!email || !password || !securityQuestion1 || !securityAnswer1 || !securityQuestion2 || !securityAnswer2) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const ans1Hash = await bcrypt.hash(securityAnswer1.trim().toLowerCase(), 10);
    const ans2Hash = await bcrypt.hash(securityAnswer2.trim().toLowerCase(), 10);

    // generate experience id (you already have util; re-use)
    const { generateUniqueExperienceId } = await import("../utils/generateExperienceId.js").catch(async () =>
      await import("../utils/generateExperienceId")
    );
     
    


    const experienceId = await generateUniqueExperienceId();

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
        experienceId,
        securityQuestion1,
        securityAnswer1Hash: ans1Hash,
        securityQuestion2,
        securityAnswer2Hash: ans2Hash,
      },
      select: {
        id: true, email: true, name: true, experienceId: true, convaiId: true, rpmAvatarUrl: true, createdAt: true
      }
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    return res.json({ token, user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Registration failed" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

    const { password: _p, securityAnswer1Hash: _a1, securityAnswer2Hash: _a2, ...safe } = user as any;
    return res.json({ token, user: safe });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Login failed" });
  }
}

/** Step 1: Given email, return the two questions (not answers) */
export async function getSecurityQuestions(req: Request, res: Response) {
  try {
    const email = String(req.query.email || "");
    const user = await prisma.user.findUnique({
      where: { email },
      select: { securityQuestion1: true, securityQuestion2: true }
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to fetch questions" });
  }
}

/** Step 2: Verify answers and set new password */
export async function resetWithSecurityAnswers(req: Request, res: Response) {
  try {
    const { email, answer1, answer2, newPassword } = req.body;
    if (!email || !answer1 || !answer2 || !newPassword) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const ok1 = await bcrypt.compare(answer1.trim().toLowerCase(), user.securityAnswer1Hash);
    const ok2 = await bcrypt.compare(answer2.trim().toLowerCase(), user.securityAnswer2Hash);
    if (!ok1 || !ok2) return res.status(401).json({ error: "Security answers do not match" });

    const newHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: newHash }
    });

    return res.json({ success: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Reset failed" });
  }
}
export async function checkEmailExists(req: Request, res: Response) {
  try {
    const email = String(req.query.email || "").trim().toLowerCase();
    if (!email) return res.status(400).json({ error: "Missing email" });

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return res.json({ exists: !!user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to check email" });
  }
  
}


export async function me(req: Request, res: Response) {
  try {
    const userId = (req as any).userId as number | undefined;
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        experienceId: true,
        convaiId: true,
        rpmAvatarUrl: true,
        createdAt: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to load user" });
  }
}