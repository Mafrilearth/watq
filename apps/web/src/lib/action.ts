import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("[SafeAction Server Error]:", e.message);
    return e.message;
  },
});
