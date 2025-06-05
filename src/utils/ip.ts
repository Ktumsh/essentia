export async function getClientIp(): Promise<string> {
  try {
    const res = await fetch("/api/ip");
    const data = await res.json();
    return data.ip;
  } catch (error) {
    console.error("Error al obtener la IP del cliente:", error);
    return "";
  }
}
