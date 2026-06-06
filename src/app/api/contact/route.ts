import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { voornaam, achternaam, bedrijf, email, bericht, attachment } = await req.json();

  if (!voornaam || !email || !bericht) {
    return NextResponse.json({ error: "Verplichte velden ontbreken." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from:    `"ULTI GROUP Website" <${process.env.GMAIL_USER}>`,
      to:      ["stan@ultigroup.be", "lore@ultigroup.be"],
      replyTo: email,
      subject: `Nieuw contactbericht van ${voornaam} ${achternaam}${bedrijf ? ` (${bedrijf})` : ""}`,
      html: `
        <p><strong>Naam:</strong> ${voornaam} ${achternaam}</p>
        ${bedrijf ? `<p><strong>Bedrijf:</strong> ${bedrijf}</p>` : ""}
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr/>
        <p style="white-space:pre-wrap">${bericht}</p>
        ${attachment ? `<p><em>Bijlage: ${attachment.filename}</em></p>` : ""}
      `,
      attachments: attachment ? [{
        filename:    attachment.filename,
        content:     Buffer.from(attachment.base64, "base64"),
        contentType: attachment.contentType,
      }] : [],
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Versturen mislukt." }, { status: 500 });
  }
}
