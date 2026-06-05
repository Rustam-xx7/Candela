export async function POST(request) {
  try {
    const { email, password, rememberMe } = await request.json();

    // Basic server-side validations
    if (!email || !email.includes("@")) {
      return Response.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // Simulate database lookup delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulated successful login payload
    return Response.json(
      {
        success: true,
        message: "Authentication successful",
        user: {
          id: "usr_94a7d",
          name: "Serene Ritualist",
          email: email,
          createdAt: "2026-06-05T00:00:00Z",
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockTokenForAuraWick",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Auth API Error:", error);
    return Response.json(
      { message: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}
