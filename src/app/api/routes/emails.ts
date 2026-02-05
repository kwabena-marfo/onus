import { Hono } from "hono";
import transporter from "@/config/nodemailer";
import EmailTemplate from "@/components/email";

export const emailsRoutes = new Hono();

emailsRoutes.post("/send-email", async (c) => {
  try {
    const { to, subject, text } = await c.req.json();
    const mailBody = EmailTemplate({ message: text });

    await transporter.sendMail({
      from: `"Onus" <"noreply@onusbible.com">`,
      to,
      subject,
      html: mailBody,
    });

    return c.json({ message: "Email sent" });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to send email" }, 500);
  }
});

export default emailsRoutes;
