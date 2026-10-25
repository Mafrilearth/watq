import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type") || "INTJ";
  const title = searchParams.get("title") || "The Mastermind";
  const callsign = searchParams.get("callsign") || "Strategic-Falcon-42";
  const temperament = searchParams.get("class") || "Rational / NT";
  const eScore = Number.parseInt(searchParams.get("e") || "35", 10);
  const iScore = 100 - eScore;
  const sScore = Number.parseInt(searchParams.get("s") || "25", 10);
  const nScore = 100 - sScore;
  const tScore = Number.parseInt(searchParams.get("t") || "78", 10);
  const fScore = 100 - tScore;
  const jScore = Number.parseInt(searchParams.get("j") || "82", 10);
  const pScore = 100 - jScore;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#08090C",
        backgroundImage:
          "radial-gradient(circle at 80% 20%, rgba(212, 240, 36, 0.12) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(129, 140, 248, 0.08) 0%, transparent 50%)",
        padding: "60px 70px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#F8FAFC",
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Golden Ratio Prism Mark */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="200"
              cy="200"
              r="170"
              stroke="#D4F024"
              strokeWidth="12"
              strokeOpacity="0.4"
            />
            <circle cx="200" cy="200" r="64" stroke="#D4F024" strokeWidth="16" />
            <circle cx="200" cy="200" r="24" fill="#D4F024" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "26px",
                fontWeight: 900,
                letterSpacing: "0.05em",
                color: "#FFFFFF",
              }}
            >
              Watq
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#94A3B8",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Personality Decoded
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 18px",
            backgroundColor: "rgba(212, 240, 36, 0.1)",
            borderRadius: "9999px",
            border: "1px solid rgba(212, 240, 36, 0.3)",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontFamily: "monospace",
              color: "#D4F024",
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            CERTIFIED COGNITIVE DOSSIER
          </span>
        </div>
      </div>

      {/* Center Main Body */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: "50px",
        }}
      >
        {/* Left Archetype Showcase */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            maxWidth: "580px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                padding: "4px 12px",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "14px",
                color: "#E2E8F0",
                fontFamily: "monospace",
              }}
            >
              {temperament}
            </span>
            <span
              style={{
                padding: "4px 12px",
                backgroundColor: "rgba(212, 240, 36, 0.08)",
                borderRadius: "6px",
                border: "1px solid rgba(212, 240, 36, 0.25)",
                fontSize: "14px",
                color: "#D4F024",
                fontFamily: "monospace",
                fontWeight: 600,
              }}
            >
              Callsign: {callsign}
            </span>
          </div>

          <span
            style={{
              fontSize: "84px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              lineHeight: 1,
            }}
          >
            {type}
          </span>

          <span
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#D4F024",
              lineHeight: 1.1,
            }}
          >
            {title}
          </span>
        </div>

        {/* Right Polarity Scores Grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "420px",
            backgroundColor: "rgba(18, 21, 29, 0.8)",
            padding: "24px",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* E / I */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                fontFamily: "monospace",
                color: "#94A3B8",
              }}
            >
              <span>Extraversion {eScore}%</span>
              <span>{iScore}% Introversion</span>
            </div>
            <div
              style={{
                display: "flex",
                height: "8px",
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${eScore}%`,
                  backgroundColor: "#818CF8",
                  height: "100%",
                }}
              />
              <div
                style={{
                  width: `${iScore}%`,
                  backgroundColor: "rgba(129, 140, 248, 0.3)",
                  height: "100%",
                }}
              />
            </div>
          </div>

          {/* S / N */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                fontFamily: "monospace",
                color: "#94A3B8",
              }}
            >
              <span>Sensing {sScore}%</span>
              <span>{nScore}% Intuition</span>
            </div>
            <div
              style={{
                display: "flex",
                height: "8px",
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${sScore}%`,
                  backgroundColor: "rgba(45, 212, 191, 0.3)",
                  height: "100%",
                }}
              />
              <div
                style={{
                  width: `${nScore}%`,
                  backgroundColor: "#2DD4BF",
                  height: "100%",
                }}
              />
            </div>
          </div>

          {/* T / F */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                fontFamily: "monospace",
                color: "#94A3B8",
              }}
            >
              <span>Thinking {tScore}%</span>
              <span>{fScore}% Feeling</span>
            </div>
            <div
              style={{
                display: "flex",
                height: "8px",
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${tScore}%`,
                  backgroundColor: "#D4F024",
                  height: "100%",
                }}
              />
              <div
                style={{
                  width: `${fScore}%`,
                  backgroundColor: "rgba(212, 240, 36, 0.3)",
                  height: "100%",
                }}
              />
            </div>
          </div>

          {/* J / P */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                fontFamily: "monospace",
                color: "#94A3B8",
              }}
            >
              <span>Judging {jScore}%</span>
              <span>{pScore}% Perceiving</span>
            </div>
            <div
              style={{
                display: "flex",
                height: "8px",
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${jScore}%`,
                  backgroundColor: "#FBBF24",
                  height: "100%",
                }}
              />
              <div
                style={{
                  width: `${pScore}%`,
                  backgroundColor: "rgba(251, 191, 36, 0.3)",
                  height: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: "20px",
          fontSize: "13px",
          fontFamily: "monospace",
          color: "#64748B",
        }}
      >
        <span>Watq Psychometric Engine • Carl Gustav Jung 1921 Typology</span>
        <span style={{ color: "#D4F024" }}>https://watq.mafrilearth.com</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
