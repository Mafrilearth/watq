import { NextResponse, type NextRequest } from "next/server";
import { type ApiData, verifyAccess } from "@vercel/flags";

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get("Authorization"));
  if (!access) return NextResponse.json(null, { status: 401 });

  return NextResponse.json<ApiData>({
    definitions: {
      bilingualMode: {
        description: "Controls whether bilingual language support (EN/ID) is active",
        origin: "https://watq.mafrilearth.com",
        options: [
          { value: false, label: "English Only (Standard)" },
          { value: true, label: "Bilingual (EN / ID)" },
        ],
      },
      pdfExport: {
        description: "Enables official PDF Certificate export",
        origin: "https://watq.mafrilearth.com",
        options: [
          { value: true, label: "Enabled" },
          { value: false, label: "Disabled" },
        ],
      },
    },
  });
}
