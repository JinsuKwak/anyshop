import { NextResponse } from "next/server";
import { User } from "@/types/User";
import { dummyUsers } from "@/app/stubData/dummy-users";
import jwt from "jsonwebtoken";

// In a real app, you would hash the password and save the new user to a database.
export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = dummyUsers.find((user) => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const newUser: User = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      store_id: "store-123",
      role: 2, // Default MEMBER role
      email,
      password_hash: password, // In real app, hash this!
      first_name: firstName,
      last_name: lastName,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    dummyUsers.push(newUser);

    const jwtAccessSecret = process.env.JWT_SECRET_ACCESS;
    const jwtRefreshSecret = process.env.JWT_SECRET_REFRESH;

    if (!jwtAccessSecret || !jwtRefreshSecret) {
      throw new Error("JWT secret keys are not set.");
    }

    const { password_hash, ...userPayload } = newUser;

    const accessToken = jwt.sign(userPayload, jwtAccessSecret, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id: newUser.id }, jwtRefreshSecret, {
      expiresIn: "7d",
    });

    return NextResponse.json({ user: userPayload, accessToken, refreshToken });
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
