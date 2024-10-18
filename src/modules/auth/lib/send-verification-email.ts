export async function sendVerificationEmail(email: string, token: string) {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const response = await fetch(
      `${baseUrl}/api/auth/send-verification-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error al enviar el correo: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error("El correo no fue enviado correctamente");
    }

    return {
      success: true,
      message: "Correo de verificación enviado exitosamente",
    };
  } catch (error) {
    console.error("Error en sendVerificationEmail:", error);
    return {
      success: false,
      message: "Error al enviar el correo de verificación",
    };
  }
}
