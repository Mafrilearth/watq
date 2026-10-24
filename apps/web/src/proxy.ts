import { aj } from "@watq/security";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  // Run Arcjet shield and bot detection in production or when ARCJET_KEY is provided
  if (process.env.ARCJET_KEY) {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please wait a moment before trying again." },
          { status: 429 },
        );
      }
      if (decision.reason.isBot()) {
        return NextResponse.json(
          { error: "Automated access blocked by security policy." },
          { status: 403 },
        );
      }
      return NextResponse.json({ error: "Access denied by security shield." }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|brand/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
