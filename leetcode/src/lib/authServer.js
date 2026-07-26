import crypto from "crypto";

const users = [];

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(String(password)).digest("hex");
}

export async function createUser(email, password) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.");
  }

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("That email is already registered.");
  }

  const user = {
    id: users.length + 1,
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return { id: user.id, email: user.email };
}

export async function verifyUser(email, password) {
  const normalizedEmail = normalizeEmail(email);
  const hashed = hashPassword(password);
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user || user.passwordHash !== hashed) {
    throw new Error("Invalid email or password.");
  }

  return { id: user.id, email: user.email };
}
