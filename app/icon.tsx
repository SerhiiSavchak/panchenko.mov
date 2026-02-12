import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#050505",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="8" width="24" height="18" rx="2" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="16" cy="17" r="5" stroke="#f0f0f0" strokeWidth="1.5" />
          <circle cx="16" cy="17" r="2" fill="#0ea5e9" />
          <circle cx="24" cy="11" r="1.5" fill="#0ea5e9" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
