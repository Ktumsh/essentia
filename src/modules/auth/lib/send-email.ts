export async function sendEmail(email: string, token: string) {
  const baseUrl = "https://essentia-web.vercel.app";

  const res = await fetch(`${baseUrl}/api/auth/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, token }),
  });
  console.log("Response:", res);

  const responseText = await res.text();
  console.log("Response text:", responseText);

  try {
    const data = JSON.parse(responseText);
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
