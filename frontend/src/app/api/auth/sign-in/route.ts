import { NextResponse } from "next/server";
import { dummyUsers } from "@/app/stubData/dummy-users";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = dummyUsers.find((u) => u.email === email);

    if (!user || user.password_hash !== password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const jwtAccessSecret = process.env.JWT_SECRET_ACCESS;
    const jwtRefreshSecret = process.env.JWT_SECRET_REFRESH;

    if (!jwtAccessSecret || !jwtRefreshSecret) {
      throw new Error("JWT secret keys are not set.");
    }

    const { password_hash, ...userPayload } = user;

    const accessToken = jwt.sign(userPayload, jwtAccessSecret, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user.id }, jwtRefreshSecret, { expiresIn: "7d" });

    return NextResponse.json({ user: userPayload, accessToken, refreshToken });
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
