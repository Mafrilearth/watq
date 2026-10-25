import { verifyResendWebhookSignature } from "@watq/email";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Resend Webhook Handler (Enterprise Observability)
 * Receives real-time delivery notifications, bounce alerts, and engagement metrics.
 * Cryptographically verified via Svix signature headers.
 */
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

  try {
    const rawPayload = await req.text();
    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    // If webhook secret is configured, enforce strict cryptographic signature verification
    if (webhookSecret) {
      if (!svixId || !svixTimestamp || !svixSignature) {
        return NextResponse.json(
          { error: "Missing required svix verification headers" },
          { status: 400 },
        );
      }

      const isValid = verifyResendWebhookSignature({
        payload: rawPayload,
        svixId,
        svixTimestamp,
        svixSignature,
        secret: webhookSecret,
      });

      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid webhook cryptographic signature" },
          { status: 401 },
        );
      }
    } else if (process.env.NODE_ENV === "production") {
      console.warn("[WATQ RESEND WEBHOOK] RESEND_WEBHOOK_SECRET is not configured in production.");
    }

    const event = JSON.parse(rawPayload);

    // Process event based on Resend event taxonomy
    switch (event.type) {
      case "email.sent":
        console.info(`[RESEND WEBHOOK] Email sent: ${event.data?.email_id}`);
        break;
      case "email.delivered":
        console.info(
          `[RESEND WEBHOOK] Email delivered: ${event.data?.email_id} to ${event.data?.to}`,
        );
        break;
      case "email.delivery_delayed":
        console.warn(`[RESEND WEBHOOK] Email delivery delayed: ${event.data?.email_id}`);
        break;
      case "email.complained":
        console.error(`[RESEND WEBHOOK] Spam complaint received for: ${event.data?.email_id}`);
        break;
      case "email.bounced":
        console.error(
          `[RESEND WEBHOOK] Email bounced: ${event.data?.email_id} (${event.data?.bounce?.message || "Unknown reason"})`,
        );
        break;
      case "email.opened":
        console.info(`[RESEND WEBHOOK] Email opened: ${event.data?.email_id}`);
        break;
      case "email.clicked":
        console.info(
          `[RESEND WEBHOOK] Email link clicked: ${event.data?.email_id} -> ${event.data?.click?.link}`,
        );
        break;
      default:
        console.info(`[RESEND WEBHOOK] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true, type: event.type }, { status: 200 });
  } catch (error) {
    console.error("[RESEND WEBHOOK ERROR]", error);
    return NextResponse.json({ error: "Malformed payload or internal error" }, { status: 400 });
  }
}
