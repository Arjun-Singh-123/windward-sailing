// import { jwtVerify, SignJWT } from "jose";
// import { cookies } from "next/headers";

// const secretKey = process.env.JWT_SECRET_KEY || "default_secret_key";

// export async function createSession(userId: string, role: string) {
//   try {
//     const token = await new SignJWT({ userId, role })
//       .setProtectedHeader({ alg: "HS256" })
//       .setExpirationTime("1h")
//       .sign(new TextEncoder().encode(secretKey));

//     cookies().set("session", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 3600, // 1 hour
//       path: "/",
//     });

//     return { success: true };
//   } catch (error) {
//     console.error("Error creating session:", error);
//     return { success: false, error: "Failed to create session" };
//   }
// }

// export async function getSession() {
//   const token = cookies().get("session")?.value;
//   if (!token) return null;

//   try {
//     const verified = await jwtVerify(
//       token,
//       new TextEncoder().encode(secretKey)
//     );
//     return verified.payload as { userId: string; role: string };
//   } catch (err) {
//     return null;
//   }
// }

// export async function clearSession() {
//   cookies().delete("session");
// }

// Function to store session data in localStorage
// export function storeSession(userId, role) {
//   localStorage.setItem("session", JSON.stringify({ userId, role }));
// }

// // Function to retrieve session data from localStorage
// export function getSession() {
//   const session = localStorage.getItem("session");
//   if (session) {
//     return JSON.parse(session); // Return session object with userId and role
//   }
//   return null; // No session found
// }

// // Function to clear the session (logout)
// export function clearSession() {
//   localStorage.removeItem("session"); // This will remove the session from localStorage
//   console.log("Session cleared from localStorage");
// }

// Function to store session data in localStorage (client-side)
export function storeSession(userId, role, username) {
  if (typeof window !== "undefined") {
    // Check if we're in the client-side (browser)
    localStorage.setItem("session", JSON.stringify({ userId, role, username }));
  } else {
    console.log("Cannot store session on the server side");
  }
}

// Function to retrieve session data from localStorage (client-side)
export function getSession() {
  if (typeof window !== "undefined") {
    // Check if we're in the client-side (browser)
    const session = localStorage.getItem("session");
    if (session) {
      return JSON.parse(session); // Return session object with userId and role
    }
    return null; // No session found
  } else {
    console.log("Cannot retrieve session on the server side");
    return null; // Return null when called server-side
  }
}

// Function to clear the session (logout) from localStorage (client-side)
export function clearSession() {
  if (typeof window !== "undefined") {
    // Check if we're in the client-side (browser)
    localStorage.removeItem("session"); // Remove the session from localStorage
    console.log("Session cleared from localStorage");
  } else {
    console.log("Cannot clear session on the server side");
  }
}
