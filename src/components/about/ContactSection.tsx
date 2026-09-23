"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CircleCheck, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SectionHeading from "./SectionHeading";
import { contactSection } from "./data";

const inputClasses =
  "h-10 bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 rounded-lg focus-visible:ring-1 focus-visible:ring-blue-600 md:text-sm dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus-visible:ring-blue-500";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-slate-100 py-16 sm:py-24 dark:border-slate-800/80 dark:bg-[#0e1826]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading data={contactSection.heading} align="left" className="mx-0 max-w-none text-left" />
            <ul className="mt-8 space-y-4">
              {contactSection.info.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-[#121c2d]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 ring-1 ring-blue-500/25 dark:bg-blue-600/15 dark:text-blue-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">{item.label}</div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.value}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-[#121c2d]">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <CircleCheck className="h-12 w-12 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Thank you for your message!</p>
                <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                  Your message is ready. Integration with the sending API will be added later.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6 h-10 rounded-full border-slate-300 bg-white px-5 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-[#162235] dark:text-slate-200 dark:hover:bg-slate-800"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setMessage("");
                    setSubmitted(false);
                  }}
                >
                  Send New Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      Name
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-blue-600 resize-none dark:border-slate-700/60 dark:bg-[#162235] dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus-visible:ring-blue-500"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-10 rounded-full bg-blue-600 px-6 text-white shadow-md shadow-blue-600/25 hover:bg-blue-500"
                >
                  <Send className="size-4" aria-hidden="true" /> Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}