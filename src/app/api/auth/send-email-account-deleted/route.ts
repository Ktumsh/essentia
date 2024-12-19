import fs from "fs";
import path from "path";

import * as brevo from "@getbrevo/brevo";
import { NextRequest, NextResponse } from "next/server";

import { formatDateInTimezone } from "@/utils/format";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string,
);

const smtpEmail = new brevo.SendSmtpEmail();

export async function POST(req: NextRequest) {
  try {
    const { email, token } = await req.json();

    if (!email || !token) {
      return NextResponse.json(
        { error: "Email and token are required" },
        { status: 400 },
      );
    }

    const currentTime = formatDateInTimezone(
      new Date(),
      "d 'de' MMMM 'de' yyyy 'a las' HH:mm",
    );

    const templatePath = path.join(
      process.cwd(),
      "src/modules/auth/lib/send-email-account-deleted.html",
    );
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    htmlContent = htmlContent
      .replace("{{date}}", currentTime)
      .replace(
        "{{logoUrl}}",
        `https://raw.githubusercontent.com/Ktumsh/essentia/main/public/essentia_x512.png`,
      );

    smtpEmail.subject = "Verifica tu correo electrónico";
    smtpEmail.sender = { name: "Essentia", email: process.env.EMAIL_FROM };
    smtpEmail.to = [{ email }];
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
