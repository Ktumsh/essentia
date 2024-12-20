import fs from "fs";
import path from "path";

import * as brevo from "@getbrevo/brevo";
import { NextRequest, NextResponse } from "next/server";

import { getUserByEmail } from "@/db/querys/user-querys";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string,
);

const smtpEmail = new brevo.SendSmtpEmail();

export async function POST(req: NextRequest) {
  try {
    const { email, code, token } = await req.json();

    if (!email || !code || !token) {
      return NextResponse.json(
        { error: "Email and token are required" },
        { status: 400 },
      );
    }

    const [user] = await getUserByEmail(email);

    const username = user.username;

    const templatePath = path.join(
      process.cwd(),
      "src/modules/auth/lib/email-rec-pass.html",
    );
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    htmlContent = htmlContent
      .replace("{{username}}", username)
      .replace("{{recoveryCode}}", code)
      .replace(
        "{{logoUrl}}",
        `https://raw.githubusercontent.com/Ktumsh/essentia/main/public/essentia_x512.png`,
      );

    smtpEmail.subject = "Verifica tu correo electrónico";
    smtpEmail.sender = { name: "Essentia", email: process.env.EMAIL_FROM };
    smtpEmail.to = [{ email, name: username }];
    smtpEmail.htmlContent = htmlContent;

    await apiInstance.sendTransacEmail(smtpEmail);

    return NextResponse.json({ success: "Email sent" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
