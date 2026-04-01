import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.$connect();
    await db.$disconnect();
    return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "db not configured" });
  }
}
