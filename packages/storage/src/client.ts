import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || "";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "";
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "";
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "watq-storage";

let s3ClientInstance: S3Client | null = null;

/**
 * Returns the authenticated S3Client connected to Cloudflare R2 endpoint.
 * Zero egress fees across global Anycast points of presence.
 */
export function getStorageClient(): S3Client | null {
  if (!CLOUDFLARE_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    return null;
  }

  if (!s3ClientInstance) {
    s3ClientInstance = new S3Client({
      region: "auto",
      endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });
  }

  return s3ClientInstance;
}

export async function createUploadPresignedUrl({
  key,
  contentType,
  expiresIn = 3600,
}: {
  key: string;
  contentType: string;
  expiresIn?: number;
}): Promise<string> {
  const client = getStorageClient();
  if (!client) {
    return `https://mock-r2.watq.app/upload/${key}?mock=true`;
  }

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(client, command, { expiresIn });
}

export async function createDownloadPresignedUrl({
  key,
  expiresIn = 3600,
}: {
  key: string;
  expiresIn?: number;
}): Promise<string> {
  const client = getStorageClient();
  if (!client) {
    return `https://mock-r2.watq.app/download/${key}?mock=true`;
  }

  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn });
}

export async function checkObjectExists(key: string): Promise<boolean> {
  const client = getStorageClient();
  if (!client) {
    return false;
  }

  try {
    const command = new HeadObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });
    await client.send(command);
    return true;
  } catch {
    return false;
  }
}

export async function listObjects(prefix = "", maxKeys = 100): Promise<string[]> {
  const client = getStorageClient();
  if (!client) {
    return [];
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      Prefix: prefix,
      MaxKeys: maxKeys,
    });
    const response = await client.send(command);
    return response.Contents?.map((obj) => obj.Key || "").filter(Boolean) || [];
  } catch {
    return [];
  }
}

export async function deleteObject(key: string): Promise<boolean> {
  const client = getStorageClient();
  if (!client) {
    console.info(`[R2 STORAGE MOCK] Delete: ${key}`);
    return true;
  }

  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  await client.send(command);
  return true;
}
