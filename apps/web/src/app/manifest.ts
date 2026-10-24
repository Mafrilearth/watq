import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Watq — Personality Decoded",
    short_name: "Watq",
    description:
      "Modern cognitive assessment engine decoding human personality traits with mathematical precision.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090C",
    theme_color: "#08090C",
    icons: [
      {
        src: "/brand/watq-favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/brand/watq-app-icon.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
    ],
  };
}
