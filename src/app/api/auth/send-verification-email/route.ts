import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
import { getUserByEmail } from "@/db/actions";

export async function POST(req: Request) {
  const { email, token } = await req.json();

  if (!email || !token) {
    return NextResponse.json(
      { error: "Email and token are required" },
      { status: 400 }
    );
  }

  const user = await getUserByEmail(email);
  const username = user?.username || "";

  const templatePath = path.join(
    process.cwd(),
    "src/modules/auth/lib/mail-template.html"
  );
  let htmlContent = fs.readFileSync(templatePath, "utf8");

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  htmlContent = htmlContent
    .replace("{{username}}", username)
    .replace(
      "{{verificationLink}}",
      `${baseUrl}/api/auth/verify-email?token=${token}`
    )
    .replace(
      "{{logoUrl}}",
      `${baseUrl}/_next/image?url=%2Flogo-essentia.webp&w=48&q=100`
    );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: "noreply@yourdomain.com",
    to: email,
    subject: "Verifica tu correo electrónico",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
