import { defineConsentConfig, offline } from "@c15t/nextjs";

export default defineConsentConfig({
  mode: offline(),
});
