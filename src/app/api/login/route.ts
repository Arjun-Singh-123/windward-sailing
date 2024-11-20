import { NextResponse } from "next/server";

const users = [
  {
    id: "1",
    username: "admin",
    email: "newport@sailingclub.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    username: "user",
    email: "newport@sailingclub.com",
    password: "user123",
    role: "user",
  },
];

async function createSession(userId: string, role: string, username: string) {
  return { success: true, userId, role, username };
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    console.log({ username, password });
    const user = users.find(
      (u) => u.email === username && u.password === password
    );

    console.log("Attempting login for user:", username);

    if (user) {
      const sessionResult = await createSession(user.id, user.role, user.email);
      console.log("Session creation result:", sessionResult);

      if (sessionResult.success) {
        return NextResponse.json({
          success: true,
          userId: user.id,
          role: user.role,
          username: user.username,
          email: user.email,
        });
      } else {
        console.error("Failed to create session:");
        return NextResponse.json(
          { success: false, error: "Failed to create session" },
          { status: 500 }
        );
      }
    } else {
      // console.log("Invalid credentials for user:", email);
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error in login process:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
