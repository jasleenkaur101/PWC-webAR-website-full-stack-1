// server/src/controllers/experience.controller.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/experience/:experienceId
 * Returns { convaiId, rpmAvatarUrl } or 404.
 */
export async function getExperience(req: Request, res: Response) {
  try {
    const rawId = req.params.experienceId;
    // Your frontend uses query param like USER123456 but we'll accept either numeric or USERprefix
    const cleaned = rawId.replace(/^USER/i, "");

    const user = await prisma.user.findFirst({
      where: { experienceId: cleaned },
      select: {
        convaiId: true,
        rpmAvatarUrl: true,
        experienceId: true,
      },
    });

    if (!user) return res.status(404).json({ error: "Not found" });

    return res.json({
      experienceId: user.experienceId,
      convaiId: user.convaiId || null,
      rpmAvatarUrl: user.rpmAvatarUrl || null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load experience" });
  }
}
