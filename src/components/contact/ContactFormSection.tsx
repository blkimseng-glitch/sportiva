import React from 'react';
import { Headphones, MessageCircle, Mail, ChevronDown } from 'lucide-react';

export const ContactFormSection: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-[1040px]">
      <div className="grid grid-cols-1 items-center lg:grid-cols-12">
        {/* Form Box */}
        <div className="rounded-[28px] bg-white p-7 shadow-[0_20px_60px_-15px_rgba(9,39,76,0.08)] sm:p-10 lg:col-span-11 lg:pr-[340px] dark:bg-slate-900 dark:shadow-none">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold text-[#09274C] dark:text-white">
              Send us a message
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Do you have a question? A complaint? Or need any help to choose the right
              product from Sportiva. Feel free to contact us
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-7 space-y-5">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-xs font-bold text-[#09274C] dark:text-slate-300">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-xs text-slate-800 placeholder:text-slate-400 transition focus:border-[#09274C] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-2 block text-xs font-bold text-[#09274C] dark:text-slate-300">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Enter your Last name"
                    className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-xs text-slate-800 placeholder:text-slate-400 transition focus:border-[#09274C] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold text-[#09274C] dark:text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-xs text-slate-800 placeholder:text-slate-400 transition focus:border-[#09274C] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-bold text-[#09274C] dark:text-slate-300">
                    Contact Details
                  </label>
                  <div className="flex items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5 transition focus-within:border-[#09274C] dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-blue-500">
                    <div className="relative flex items-center">
                      <select
                        aria-label="Country code"
                        defaultValue="+855"
                        className="appearance-none bg-transparent pr-4 pl-1 text-xs font-bold text-[#09274C] focus:outline-none cursor-pointer dark:text-slate-200"
                      >
                        <option value="+855" className="dark:bg-slate-800">+855</option>
                        <option value="+971" className="dark:bg-slate-800">+971</option>
                        <option value="+1" className="dark:bg-slate-800">+1</option>
                        <option value="+44" className="dark:bg-slate-800">+44</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-slate-500" />
                    </div>
                    <span className="mx-2.5 h-4 w-px bg-slate-200 dark:bg-slate-700" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter your contact number"
                      className="w-full bg-transparent py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-bold text-[#09274C] dark:text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Enter your message"
                  className="w-full resize-none rounded-[20px] border border-slate-200 bg-white p-4 text-xs text-slate-800 placeholder:text-slate-400 transition focus:border-[#09274C] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="rounded-full bg-[#09274C] px-8 py-3.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-[#E1131B] cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Send a Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info Card (Overlay right side) */}
        <div className="mt-6 lg:absolute lg:top-1/2 lg:right-0 lg:mt-0 lg:w-[330px] lg:-translate-y-1/2">
          <div className="relative overflow-hidden rounded-[26px] bg-[#09274C] p-7 text-white shadow-[0_20px_50px_rgba(9,39,76,0.28)] dark:bg-slate-800 dark:border dark:border-slate-700">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#E1131B]" />

            <h3 className="text-base font-bold leading-snug text-white">
              Hi! We are always here
              <br />
              to help you.
            </h3>

            <div className="mt-6 space-y-3.5">
              {/* Hotline */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-white/12 px-4 py-3.5 dark:bg-slate-700/50">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white dark:bg-slate-700">
                  <Headphones className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-white">Hotline:</span>
                  <span className="block text-xs text-slate-200 tabular-nums">+855 56 498 3456</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-white/12 px-4 py-3.5 dark:bg-slate-700/50">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white dark:bg-slate-700">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-white">SMS / Whatsapp</span>
                  <span className="block text-xs text-slate-200 tabular-nums">+855 55 343 6433</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-white/12 px-4 py-3.5 dark:bg-slate-700/50">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white dark:bg-slate-700">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-white">Email:</span>
                  <span className="block text-xs text-slate-200">support@sportiva.com</span>
                </div>
              </div>
            </div>

            <div className="my-6 h-px w-full bg-white/15 dark:bg-slate-700" />

            {/* Social Links */}
            <div>
              <span className="block text-xs font-bold text-white">Connect with us</span>
              <div className="mt-3.5 flex items-center justify-between pr-2 text-white">
                {/* Social Icons */}
                <span className="cursor-pointer transition hover:text-[#E1131B]">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" /></svg>
                </span>
                <span className="cursor-pointer transition hover:text-[#E1131B]">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </span>
                <span className="cursor-pointer transition hover:text-[#E1131B]">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.5c-3.1 0-5.4 2.1-5.4 5.3 0 1.1.2 2.1.4 2.8-.3.2-.8.3-1.3.1-.5-.1-1 .1-1.1.5-.1.4.1.9.7 1.2.8.4 1.4.8 1.5 1.1.1.3-.3 1.4-1.7 2.5-.8.6-1.6 1-2.1 1.1-.4.1-.6.4-.5.8.1.4.6.7 1.6.9 1.1.2 1.7.6 2 1.2.2.5.6.7 1.2.6.6-.1 1.4-.3 2.4-.3 1.1 0 1.9.5 3.3.5s2.2-.5 3.3-.5c1 0 1.8.2 2.4.3.6.1 1-.1 1.2-.6.3-.6.9-1 2-1.2 1-.2 1.5-.5 1.6-.9.1-.4-.1-.7-.5-.8-.5-.1-1.3-.5-2.1-1.1-1.4-1.1-1.8-2.2-1.7-2.5.1-.3.7-.7 1.5-1.1.6-.3.8-.8.7-1.2-.1-.4-.6-.6-1.1-.5-.5.2-1 .1-1.3-.1.2-.7.4-1.7.4-2.8 0-3.2-2.3-5.3-5.4-5.3z" /></svg>
                </span>
                <span className="cursor-pointer transition hover:text-[#E1131B]">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z" /></svg>
                </span>
                <span className="cursor-pointer transition hover:text-[#E1131B]">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};