import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Onus — Observe, Navigate, Understand, Store";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND_BLUE = "#103087";

export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/imgs/logos/onusLogoChosen.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 80,
          background: "#ffffff",
          borderBottom: `24px solid ${BRAND_BLUE}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={344} height={420} alt="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: BRAND_BLUE,
            maxWidth: 560,
          }}
        >
          <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.15 }}>
            Observe, Navigate, Understand, Store
          </div>
          <div
            style={{
              fontSize: 30,
              marginTop: 28,
              color: "#4b5563",
              lineHeight: 1.4,
            }}
          >
            Memorise verses, track your Bible progress and test yourself with
            quizzes.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
