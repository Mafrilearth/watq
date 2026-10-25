import { createHmac, timingSafeEqual } from "node:crypto";
import type * as React from "react";
import {
  type Attachment,
  type CreateBatchOptions,
  type CreateBatchResponse,
  type CreateEmailOptions,
  type CreateEmailResponse,
  type GetEmailResponse,
  Resend,
  type Tag,
} from "resend";

export type { Attachment, Tag, CreateEmailOptions, CreateBatchOptions };
export type CancelEmailResponse = Awaited<ReturnType<Resend["emails"]["cancel"]>>;

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
export const DEFAULT_FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL || "Watq <notifications@watq.mafrilearth.com>";

let resendInstance: Resend | null = null;

export function getResendClient(): Resend | null {
  if (!RESEND_API_KEY) return null;
  if (!resendInstance) {
    resendInstance = new Resend(RESEND_API_KEY);
  }
  return resendInstance;
}

export interface SendEmailPayload {
  to: string | string[];
  subject: string;
  react?: React.ReactElement;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Attachment[];
  tags?: Tag[];
  headers?: Record<string, string>;
  scheduledAt?: string;
}

export interface SendEmailRequestOptions {
  idempotencyKey?: string;
}

export async function sendEmail(
  payload: SendEmailPayload,
  options?: SendEmailRequestOptions,
): Promise<CreateEmailResponse> {
  const resend = getResendClient();
  const from = payload.from || DEFAULT_FROM_ADDRESS;

  if (!resend) {
    const mockId = `mock-email-${Date.now()}`;
    console.info(
      `[WATQ RESEND MOCK] Sent to: ${Array.isArray(payload.to) ? payload.to.join(", ") : payload.to} | Subject: "${payload.subject}" | Idempotency: ${options?.idempotencyKey ?? "none"}`,
    );
    return {
      data: { id: mockId },
      error: null,
    };
  }

  const sendPayload = {
    ...payload,
    from,
  } as CreateEmailOptions;

  return await resend.emails.send(
    sendPayload,
    options?.idempotencyKey ? { idempotencyKey: options.idempotencyKey } : undefined,
  );
}

export async function sendBatchEmails(
  emails: SendEmailPayload[],
  options?: { idempotencyKey?: string },
): Promise<CreateBatchResponse> {
  const resend = getResendClient();

  if (!resend) {
    const mockData = emails.map((_, idx) => ({
      id: `mock-batch-${Date.now()}-${idx}`,
    }));
    console.info(
      `[WATQ RESEND BATCH MOCK] Dispatched batch of ${emails.length} emails | Idempotency: ${options?.idempotencyKey ?? "none"}`,
    );
    return {
      data: { data: mockData },
      error: null,
    };
  }

  const batchPayload = emails.map((item) => ({
    ...item,
    from: item.from || DEFAULT_FROM_ADDRESS,
  })) as CreateBatchOptions;

  return await resend.batch.send(
    batchPayload,
    options?.idempotencyKey ? { idempotencyKey: options.idempotencyKey } : undefined,
  );
}

export async function getEmail(id: string): Promise<GetEmailResponse> {
  const resend = getResendClient();
  if (!resend) {
    return {
      data: {
        id,
        object: "email",
        to: ["mock@watq.app"],
        from: DEFAULT_FROM_ADDRESS,
        created_at: new Date().toISOString(),
        subject: "Mock Email Subject",
        html: "<p>Mock email content</p>",
        text: "Mock email content",
        bcc: null,
        cc: null,
        reply_to: null,
        last_event: "delivered",
        scheduled_at: null,
      },
      error: null,
    };
  }

  return await resend.emails.get(id);
}

export async function cancelEmail(id: string): Promise<CancelEmailResponse> {
  const resend = getResendClient();
  if (!resend) {
    return {
      data: {
        id,
        object: "email",
      },
      error: null,
    };
  }

  return await resend.emails.cancel(id);
}

export interface WebhookVerificationParams {
  payload: string;
  svixId: string;
  svixTimestamp: string;
  svixSignature: string;
  secret: string;
}

/**
 * Validates incoming Resend / Svix webhook cryptographic signature.
 * Prevents webhook spoofing attacks with strict constant-time HMAC comparison.
 */
export function verifyResendWebhookSignature({
  payload,
  svixId,
  svixTimestamp,
  svixSignature,
  secret,
}: WebhookVerificationParams): boolean {
  if (!payload || !svixId || !svixTimestamp || !svixSignature || !secret) {
    return false;
  }

  try {
    const cleanedSecret = secret.startsWith("whsec_") ? secret.substring("whsec_".length) : secret;
    const secretKey = Buffer.from(cleanedSecret, "base64");

    const toSign = `${svixId}.${svixTimestamp}.${payload}`;
    const computed = createHmac("sha256", secretKey).update(toSign).digest("base64");

    const passedSignatures = svixSignature.split(" ").map((sig) => {
      const parts = sig.split(",");
      return parts.length > 1 ? parts[1] : parts[0];
    });

    const computedBuffer = Buffer.from(computed);

    for (const sig of passedSignatures) {
      const candidateBuffer = Buffer.from(sig);
      if (
        computedBuffer.length === candidateBuffer.length &&
        timingSafeEqual(computedBuffer, candidateBuffer)
      ) {
        return true;
      }
    }
  } catch {
    return false;
  }

  return false;
}
