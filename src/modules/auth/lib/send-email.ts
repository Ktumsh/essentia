export async function sendEmail(email: string, token: string) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/auth/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, token }),
  });

  const responseText = await res.text();

  try {
    const data = JSON.parse(responseText);
    console.log(data);
    if (!res.ok) {
      throw new Error(
        data.error || "Error al enviar el correo de verificación"
      );
    }
    return data;
  } catch (error) {
    console.error("Error parsing response:", error);
    throw new Error("Failed to parse response as JSON.");
  }
}
