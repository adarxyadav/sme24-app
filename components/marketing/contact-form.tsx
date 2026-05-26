"use client";

import { useActionState } from "react";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/(marketing)/contact/actions";

const initial: ContactFormState = { status: "idle" };

const inputClass =
  "type-body-md border border-[#E8E8E8] rounded-sm px-4 py-3 bg-white text-[#000000] focus:outline-none focus:border-[#CB3CFF] transition-colors w-full";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initial);

  if (state.status === "success") {
    return (
      <div className="bg-[#E8DDFF] rounded-sm p-8">
        <p className="type-mono-eyebrow text-[#CB3CFF] mb-3">/ Message sent</p>
        <p className="type-body-lg text-[#000000]">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="type-mono-label text-[#2b2b2b]">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="type-mono-label text-[#2b2b2b]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company" className="type-mono-label text-[#2b2b2b]">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className={inputClass}
          placeholder="Company name (optional)"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="type-mono-label text-[#2b2b2b]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${inputClass} resize-none`}
          placeholder="How can we help?"
        />
      </div>

      {state.status === "error" && (
        <p className="type-mono-label text-[#DC2626]">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="type-mono-button bg-[#CB3CFF] text-white px-6 py-3 rounded-sm self-start disabled:opacity-60 transition-opacity"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
