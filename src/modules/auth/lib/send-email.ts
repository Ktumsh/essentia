export async function sendEmail(email: string, token: string) {
  const res = await fetch("/api/send-verification-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, token }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Error al enviar el correo de verificación");
  }

  return data;
}
