// server/src/utils/generateExperienceId.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Generate a unique 6 or 7 digit numeric experienceId.
 * Defaults to 6 digits, but you can flip to 7 by toggling the probability.
 */
function makeId(): string {
  const useSeven = false; // set true if you want 7-digit IDs
  if (useSeven) {
    return String(Math.floor(1_000_000 + Math.random() * 9_000_000)); // 7 digits
  }
  return String(Math.floor(100_000 + Math.random() * 900_000)); // 6 digits
}

export async function generateUniqueExperienceId(): Promise<string> {
  // prevent a pathological infinite loop
  for (let i = 0; i < 100; i++) {
    const candidate = makeId();
    const exists = await prisma.user.findUnique({
      where: { experienceId: candidate },
      select: { id: true },
    });
    if (!exists) return candidate;
  }
  throw new Error("Could not generate a unique experienceId after many attempts.");
}
