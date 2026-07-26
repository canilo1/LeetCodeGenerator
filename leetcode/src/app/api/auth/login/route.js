import { verifyUser } from "@/lib/authServer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const user = await verifyUser(email, password);

    return new Response(JSON.stringify({ message: "Logged in successfully.", user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Login failed." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
