'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong 💪'];
const STRENGTH_LABEL_COLORS = ['', 'text-rose-500', 'text-orange-500', 'text-amber-600', 'text-emerald-600'];
const STRENGTH_BAR_COLORS = ['bg-rose-400', 'bg-orange-400', 'bg-amber-400', 'bg-emerald-500'];

const CONFETTI_EMOJIS = ['⚽', '🏀', '🎾', '🏆', '🌟', '🎯', '🔥'];
const CONFETTI_COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

function getPasswordScore(v: string) {
  let score = 0;
  if (v.length >= 6) score++;
  if (v.length >= 10) score++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  return score;
}

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function SportivaLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [status, setStatus] = useState('idle');
  const [confetti, setConfetti] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const passwordValue = watch('password', '');
  const passwordScore = getPasswordScore(passwordValue);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

const onSubmit = (data: FormValues) => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      spawnConfetti();

      const isAdmin = data.email === 'admin@sportiva.com';
      localStorage.setItem('user_role', isAdmin ? 'admin' : 'user');

      setTimeout(() => {
        
        if (isAdmin) {
          router.push('/admin'); 
        } else {
          router.push('/');
        }
      }, 2000);

    }, 1800);
  };

  const onError = () => {
    triggerShake();
  };

  const spawnConfetti = () => {
    const pieces = Array.from({ length: 50 }, (_, i) => {
      const isEmoji = Math.random() > 0.5;
      return {
        id: `${Date.now()}-${i}`,
        isEmoji,
        emoji: isEmoji ? CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)] : null,
        fontSize: Math.random() * 14 + 12,
        size: Math.random() * 8 + 4,
        rounded: Math.random() > 0.5,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        left: Math.random() * 100,
        top: Math.random() * 40 + 30,
        duration: Math.random() * 1.5 + 1,
        delay: Math.random() * 0.5,
      };
    });
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 3000);
  };

  return (
    <div className="min-h-screen select-none relative flex items-center justify-center px-4 py-8 overflow-hidden bg-slate-100">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-85 filter brightness-105 pointer-events-none"
      >
        <source src="/intro-new.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />

      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row relative border border-white/40 z-10">
        
        <LeftHeroImagePanel />

        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative bg-white/95">
          
          <div className="max-w-md w-full mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back to Sportiva
              </h2>
              <p className="text-slate-500 mt-1.5 text-sm">
                Log in and continue your performance journey.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className={`space-y-4 ${shake ? 'animate-shake' : ''}`}
              noValidate
            >
              {/* Email / Username Field */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 block">
                  Email address
                </label>
                <div className="relative rounded-xl">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your email or username"
                    {...register('email', {
                      required: 'Email or username is required',
                    })}
                    autoComplete="email"
                    className={`w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
                      errors.email ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password / Passcode Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-cyan-600 hover:text-cyan-500 transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative rounded-xl">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    autoComplete="current-password"
                    className={`w-full pl-12 pr-12 py-3 bg-slate-50 rounded-2xl border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
                      errors.password ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-xs font-medium"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-500 mt-1 ml-1">
                    {errors.password.message}
                  </p>
                )}

                <div className="flex gap-1.5 mt-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-1 rounded-full flex-1 bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          i < passwordScore ? STRENGTH_BAR_COLORS[passwordScore - 1] : ''
                        }`}
                        style={{ width: i < passwordScore ? '100%' : '0' }}
                      />
                    </div>
                  ))}
                </div>
                <p className={`text-xs mt-1 ml-0.5 ${passwordValue ? STRENGTH_LABEL_COLORS[passwordScore] || 'text-slate-500' : 'text-slate-500'}`}>
                  {passwordValue ? STRENGTH_LABELS[passwordScore] || '\u00A0' : '\u00A0'}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('rememberMe')}
                    className="w-4 h-4 rounded bg-slate-50 border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="text-sm text-slate-700 font-medium">Remember me</span>
                </label>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm rounded-2xl shadow-lg shadow-cyan-500/25 transition-all duration-200 flex items-center justify-center cursor-pointer"
                >
                  {status === 'idle' && 'Log in'}
                  {status === 'loading' && 'Authenticating...'}
                  {status === 'success' && 'Welcome to Sportiva! ⚡'}
                </button>
              </div>
            </form>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-xs text-slate-400 uppercase tracking-widest font-light">or</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <SocialLogins />

            <p className="text-center text-sm text-slate-600 mt-6">
              Don't have an account?{' '}
              <Link
                href="/auth/register"
                className="font-medium text-cyan-600 hover:underline"
              >
                Sign up
              </Link>
            </p>

            <ConfettiOverlay confetti={confetti} />
          </div>

        </div>

      </div>
    </div>
  );
}

function LeftHeroImagePanel() {
  return (
    <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-hidden bg-slate-900 text-white">
      <img
        src="/all_sports.jpg"
        alt="Sportiva Champion"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
      
      <div className="relative z-10 flex items-center">
        <img
          src="/logo-sportiva.png"
          alt="Sportiva Logo"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div className="relative z-10 mt-auto pt-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          Every champion <br /> starts with a move
        </h2>
        <p className="text-slate-300 text-sm mt-2 font-light">
          Track matches, analyze stats, and achieve greatness.
        </p>
      </div>
    </div>
  );
}

function SocialLogins() {
  return (
    <button
      type="button"
      className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 font-medium text-sm shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.14C3.17 21.36 7.23 24 12 24z"/>
        <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.18C.43 8.13 0 9.81 0 12s.43 3.87 1.18 5.38l4.09-3.14z"/>
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.64 1.18 6.62l4.09 3.14c.95-2.85 3.6-4.96 6.73-4.96z"/>
      </svg>
      Continue with Google
    </button>
  );
}

function ConfettiOverlay({ confetti }: { confetti: any[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confetti.map((c) =>
        c.isEmoji ? (
          <div key={c.id} style={{ position: 'absolute', left: `${c.left}%`, top: `${c.top}%`, fontSize: c.fontSize, animation: `confetti-fall ${c.duration}s ease-out ${c.delay}s forwards` }}>
            {c.emoji}
          </div>
        ) : (
          <div key={c.id} style={{ position: 'absolute', left: `${c.left}%`, top: `${c.top}%`, width: c.size, height: c.size, borderRadius: c.rounded ? '50%' : '2px', background: c.color, animation: `confetti-fall ${c.duration}s ease-out ${c.delay}s forwards` }} />
        )
      )}
    </div>
  );
}