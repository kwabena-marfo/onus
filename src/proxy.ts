import { NextRequest, NextResponse } from "next/server";

// Allowed origins with wildcards
const allowedOrigins = [
  "onusbible://*/*",
  "exp://*/*",
  "exp://10.0.0.*:*/*",
  "exp://192.168.*.*:*/*",
  "exp://172.*.*.*:*/*",
  "exp://localhost:*/*",
];

// CORS options
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

function isOriginAllowed(origin: string) {
  return allowedOrigins.some((pattern) => {
    const regexPattern = "^" + pattern.replace(/\*/g, ".*") + "$";
    const regex = new RegExp(regexPattern);
    return regex.test(origin);
  });
}

export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const allowed = isOriginAllowed(origin);
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    // Respond to OPTIONS requests
    const headers: Record<string, string> = { ...corsOptions };
    if (allowed) headers["Access-Control-Allow-Origin"] = origin;
    return NextResponse.json({}, { headers });
  }

  // For simple requests
  const response = NextResponse.next();
  if (allowed) response.headers.set("Access-Control-Allow-Origin", origin);
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
