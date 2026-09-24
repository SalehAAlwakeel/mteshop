import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#07080c",
          color: "#eef2f7",
          padding: 72,
        }}
      >
        <img src={src} width={720} height={360} alt="MTE" />
        <div style={{ fontSize: 28, color: "#8b93a7", marginTop: 28 }}>
          3D printing · Carbon fiber · Laser · Riyadh
        </div>
      </div>
    ),
    size,
  );
}
