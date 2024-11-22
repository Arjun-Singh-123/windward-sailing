export function storeSession(userId: any, role: any, username: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("session", JSON.stringify({ userId, role, username }));
  } else {
    console.log("Cannot store session on the server side");
  }
}

export function getSession() {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem("session");
    if (session) {
      return JSON.parse(session);
    }
    return null;
  } else {
    console.log("Cannot retrieve session on the server side");
    return null;
  }
}

export function clearSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("session");
    console.log("Session cleared from localStorage");
  } else {
    console.log("Cannot clear session on the server side");
  }
}
