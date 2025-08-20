import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dummyUsers } from "@/app/stubData/dummy-users";

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json({ message: "Refresh token is required" }, { status: 400 });
    }

    const jwtSecret = process.env.JWT_SECRET_REFRESH;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET_REFRESH is not set.");
    }

    // In a real app, you would verify the refresh token against a database/store
    // to ensure it's not revoked. Here, we'll just verify its signature.
    const decoded = jwt.verify(refreshToken, jwtSecret) as { id: string };

    const user = dummyUsers.find((u) => u.id === decoded.id);
    if (!user) {
      return NextResponse.json({ message: "Invalid refresh token" }, { status: 401 });
    }

    const jwtAccessSecret = process.env.JWT_SECRET_ACCESS;
    if (!jwtAccessSecret) {
      throw new Error("JWT_SECRET_ACCESS is not set.");
    }

    // Issue a new access token
    const { password_hash, ...userPayload } = user;
    const newAccessToken = jwt.sign(userPayload, jwtAccessSecret, { expiresIn: "15m" });

    return NextResponse.json({ accessToken: newAccessToken });

  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json({ message: "Invalid refresh token" }, { status: 401 });
  }
}
