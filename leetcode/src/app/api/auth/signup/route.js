import { createUser } from "@/lib/authServer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const user = await createUser(email, password);

    return new Response(JSON.stringify({ message: "Account created successfully.", user }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Signup failed." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
