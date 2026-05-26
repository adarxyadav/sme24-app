"use server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { status: "error", message: "Name, email, and message are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Invalid email address." };
  }

  // TODO: Unit 11 — send via Resend when configured
  // const { error } = await resend.emails.send({ from, to, subject, html });
  if (process.env.NODE_ENV !== "production") {
    console.log("Contact form submission:", { fields: ["name", "email", "company", "message"] });
  }

  return { status: "success", message: "Thanks — we'll be in touch shortly." };
}
