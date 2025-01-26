type EmailBasePayload = {
  email: string;
  token: string;
};

type EmailChangePayload = {
  currentEmail: string;
  newEmail: string;
  code: string;
  token: string;
};

type EmailWithCodePayload = {
  email: string;
  code: string;
  token: string;
};

type Payload = EmailWithCodePayload | EmailChangePayload | EmailBasePayload;

type ActionType =
  | "email_verification"
  | "password_recovery"
  | "email_change"
  | "account_deleted";

export async function sendEmailAction(
  actionType: ActionType,
  payload: Payload,
) {
  const BASE_URL = process.env.DEVELOPMENT
    ? "http://localhost:3000"
    : "https://essentia-web.vercel.app";

  let endpoint = "";

  switch (actionType) {
    case "email_verification":
      endpoint = "/api/auth/email-verify";
      break;
    case "password_recovery":
      endpoint = "/api/auth/email-rec-pass";
      break;
    case "email_change":
      endpoint = "/api/auth/email-change";
      break;
    case "account_deleted":
      endpoint = "/api/auth/email-acc-del";
      break;
    default:
      throw new Error("Invalid action type");
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await res.text();
  console.log("Response from server:", responseText);

  try {
    const data = JSON.parse(responseText);
    if (!res.ok) {
      throw new Error(
        data.error || `Error en la acción ${actionType.replace("_", " ")}`,
      );
    }
    return data;
  } catch (error) {
    console.error("Error parsing response:", error);
    throw new Error("Failed to parse response as JSON.");
  }
}
