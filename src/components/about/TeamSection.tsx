import { ArrowDown, User } from "lucide-react";

import { cn } from "cn";
import SectionHeading from "./SectionHeading";
import { teamSection } from "./data";
import type { TeamMember } from "./types";

function ProfileAvatar({
  member,
  size = "md",
}: {
  member: TeamMember;
  size?: "lg" | "md";
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-600/30 to-indigo-500/30 ring-2 ring-slate-300 text-blue-500 dark:ring-slate-700/60 dark:text-blue-300",
        size === "lg" ? "h-24 w-24" : "h-20 w-20"
      )}
    >
      {member.image ? (
        // eslint-disable-next-line @next/next/no-img-element -- images come from team data / API later
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <User className={size === "lg" ? "h-10 w-10" : "h-9 w-9"} aria-hidden="true" />
      )}
    </div>
  );
}

function MentorCard({ mentor }: { mentor: TeamMember }) {
  return (
    <article className="relative mx-auto w-full max-w-sm rounded-3xl border border-blue-500/45 bg-gradient-to-b from-blue-600/20 to-white p-8 text-center shadow-xl shadow-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/70 hover:shadow-blue-600/20 dark:to-[#121c2d] dark:shadow-blue-950/30">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/30">
        Mentor
      </span>
      <div className="flex justify-center">
        <ProfileAvatar member={mentor} size="lg" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{mentor.name}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        {mentor.role}
      </p>
      <p className="mt-4 text-xs text-slate-500">To be updated</p>
    </article>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-slate-200 dark:border-slate-800 dark:bg-[#121c2d] dark:hover:shadow-blue-950/40">
      <div className="flex justify-center">
        <ProfileAvatar member={member} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{member.name}</h3>
      <span className="mt-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
        {member.role}
      </span>
      {member.socials.length > 0 ? (
        <div className="mt-4 flex items-center gap-2">
          {member.socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                title={social.label}
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-500 transition-colors hover:border-blue-500/50 hover:text-blue-600 dark:border-slate-700/70 dark:bg-[#162235] dark:text-slate-400 dark:hover:text-blue-400"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      ) : (
        <p className="mt-3 text-[10px] text-slate-500">To be updated</p>
      )}
    </article>
  );
}

export default function TeamSection() {
  const { heading, mentor, members } = teamSection;

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 dark:bg-[#0b1322]">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading data={heading} />

        <div className="mt-14 flex flex-col items-center">
          <MentorCard mentor={mentor} />

          <div className="flex flex-col items-center py-6" aria-hidden="true">
            <ArrowDown className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="mt-1 h-10 w-px bg-gradient-to-b from-blue-500/70 to-slate-300/60 dark:to-slate-700/40" />
          </div>

          <div
            className="hidden h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-blue-500/40 to-transparent lg:block"
            aria-hidden="true"
          />

          <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}