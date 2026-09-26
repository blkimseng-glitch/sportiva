import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes float {
              0% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0); }
            }
          `,
        }}
      />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#1b2735] text-slate-800 dark:text-slate-100 px-4 text-center">
        <div className="text-center">
          <img
            src="https://yemca-services.net/404.png"
            alt="404 Illustration"
            className="mx-auto w-72 md:w-80 animate-[float_3s_infinite] drop-shadow-lg rounded-lg"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 dark:text-blue-500 mt-6">
            Looks Like You're Lost!
          </h1>
          <p className="text-base md:text-xl text-slate-600 dark:text-slate-300 mt-2">
            We can't seem to find the page you're looking for.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg shadow-blue-500/25 transform transition hover:scale-105 hover:bg-blue-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
}