export async function sendEmailRecoveryPass(
  email: string,
  code: string,
  token: string,
) {
  const baseUrl = process.env.DEVELOPMENT
    ? "http://localhost:3000"
    : "https://essentia-web.vercel.app";

  const res = await fetch(`${baseUrl}/api/auth/email-rec-pass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code, token }),
  });

  const responseText = await res.text();
  console.log("Response from server:", responseText);

  try {
    const data = JSON.parse(responseText);
    if (!res.ok) {
      throw new Error(
        data.error || "Error al enviar el correo de recuperación de contraseña",
      );
    }
    return data;
  } catch (error) {
    console.error("Error parsing response:", error);
    throw new Error("Failed to parse response as JSON.");
  }
}