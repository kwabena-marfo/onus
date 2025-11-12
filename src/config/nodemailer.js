import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "marfobrempong@gmail.com",
    pass: process.env.emailPass,
  },
});

transporter.verify(function (error) {
  if (error) {
    console.error("❌ SMTP connection failed:", error);
  } else {
    console.log("✅ Server is ready to take our messages");
  }
});

export default transporter;
