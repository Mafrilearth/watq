import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

let resendInstance: Resend | null = null;

export function getResendClient(): Resend | null {
  if (!RESEND_API_KEY) return null;
  if (!resendInstance) {
    resendInstance = new Resend(RESEND_API_KEY);
  }
  return resendInstance;
}

export async function sendEmail({
  to,
  subject,
  react,
  from = "Watq <notifications@watq.app>",
}: {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  from?: string;
}) {
  const resend = getResendClient();
  if (!resend) {
    console.info(
      `[EMAIL MOCK] To: ${Array.isArray(to) ? to.join(", ") : to} | Subject: ${subject}`,
    );
    return { id: "mock-email-id", success: true };
  }

  const response = await resend.emails.send({
    from,
    to,
    subject,
    react,
  });

  return response;
}
