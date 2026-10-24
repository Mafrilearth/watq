import { Logtail } from "@logtail/node";

const LOGTAIL_SOURCE_TOKEN =
  process.env.BETTERSTACK_SOURCE_TOKEN || process.env.LOGTAIL_SOURCE_TOKEN;

let logtailInstance: Logtail | null = null;

if (LOGTAIL_SOURCE_TOKEN) {
  logtailInstance = new Logtail(LOGTAIL_SOURCE_TOKEN);
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    if (logtailInstance) {
      logtailInstance.info(message, context);
    } else {
      console.info(`[INFO] ${message}`, context ? JSON.stringify(context) : "");
    }
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    if (logtailInstance) {
      logtailInstance.warn(message, context);
    } else {
      console.warn(`[WARN] ${message}`, context ? JSON.stringify(context) : "");
    }
  },
  error: (message: string, error?: unknown, context?: Record<string, unknown>) => {
    if (logtailInstance) {
      logtailInstance.error(message, {
        error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
        ...context,
      });
    } else {
      console.error(`[ERROR] ${message}`, error, context ? JSON.stringify(context) : "");
    }
  },
  flush: async () => {
    if (logtailInstance) {
      await logtailInstance.flush();
    }
  },
};
