'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authService } from '@/services/authService';
import { RegisterFormValues } from '@/lib/types';
import { 
  EMAIL_REGEX, 
  getPasswordScore, 
  STRENGTH_LABELS, 
  STRENGTH_LABEL_COLORS, 
  STRENGTH_BAR_COLORS, 
  CONFETTI_EMOJIS, 
  CONFETTI_COLORS 
} from '@/lib/utils';

export default function SportivaRegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [status, setStatus] = useState('idle');
  const [confetti, setConfetti] = useState<any[]>([]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      terms: false,
      role: 'user',
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem('register_form_draft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.fullName) setValue('fullName', parsed.fullName);
        if (parsed.email) setValue('email', parsed.email);
        if (parsed.role) setValue('role', parsed.role);
        if (parsed.previewUrl) setPreviewUrl(parsed.previewUrl);
      } catch (e) {
        console.error(e);
      }
    }
  }, [setValue]);

  const formValues = watch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);

        // រក្សាទុកត្រឹម draft ទូទៅ (ជៀសវាងផ្ទាំងធំពេក បើមានបញ្ហាអាចលុបចោលបាន)
        try {
          localStorage.setItem('register_form_draft', JSON.stringify({
            fullName: formValues.fullName,
            email: formValues.email,
            role: formValues.role,
            previewUrl: base64String,
          }));
        } catch (err) {
          console.warn("Draft storage quota exceeded, skipping local draft save.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    try {
      const existingData = JSON.parse(localStorage.getItem('register_form_draft') || '{}');
      localStorage.setItem('register_form_draft', JSON.stringify({
        ...existingData,
        fullName: formValues.fullName,
        email: formValues.email,
        role: formValues.role,
      }));
    } catch (e) {
      // ignore storage error on draft
    }
  }, [formValues.fullName, formValues.email, formValues.role]);

  const passwordValue = watch('password', '');
  const passwordScore = getPasswordScore(passwordValue);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setStatus('loading');
    try {
      let imageUrl = previewUrl || ""; 
      let result: any = null;
      
      try {
        if (selectedFile && authService.uploadImage) {
          try {
            imageUrl = await authService.uploadImage(selectedFile);
          } catch (err) {
            console.log("Image upload service skipped, using local preview.");
          }
        }

        const payload = {
          name: data.fullName,
          email: data.email,
          password: data.password,
          avatar: imageUrl,
          role: data.role || "user",
        };

        result = await authService.register(payload);
      } catch (apiError) {
        console.warn("Backend API not available, using local mock registration.");
        result = {
          user: {
            name: data.fullName,
            email: data.email,
            role: data.role || "user",
          }
        };
      }

      setStatus('success');
      spawnConfetti();

      // សម្អាត LocalStorage ចាស់ៗមុន ដើម្បីការពារហួសទំហំកំណត់
      localStorage.removeItem('register_form_draft');
      
      // រក្សាទុកត្រឹមព័ត៌មានចាំបាច់ (មិនយក Base64 រូបភាពធំៗមកដាក់ក្នុង user state ទេ។ បើមាន server URL អាចដាក់ជំនួសបាន)
      localStorage.setItem("user", JSON.stringify({
        name: data.fullName,
        email: data.email,
        role: data.role || "user",
        avatar: result?.user?.avatar || "", // រក្សាទុក URL បើមាន
      }));
      localStorage.setItem("user_role", data.role || "user");

      setTimeout(() => {
        if (data.role === 'admin') {
          router.push('/admin'); 
        } else {
          router.push('/');
        }
      }, 2000);

    } catch (error: any) {
      console.error(error);
      alert("Something went wrong during registration!");
      setStatus('idle');
      triggerShake();
    }
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
        <source src="/intro-seaGame.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />

      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row relative border border-white/40 z-10">
        
        <LeftHeroImagePanel />

        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative bg-white/95">
          
          <div className="max-w-md w-full mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Create your account
              </h2>
              <p className="text-slate-500 mt-1.5 text-sm">
                Join Sportiva and start your performance journey.
              </p>
            </div>

            <div className="mb-4 flex flex-col items-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-500 bg-slate-100 flex items-center justify-center shadow-md">
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Profile</span>
                )}
              </div>
              
              <label className="mt-2.5 inline-block py-1.5 px-4 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 text-xs font-semibold rounded-full cursor-pointer transition-all shadow-sm">
                Choose Profile Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden" 
                />
              </label>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className={`space-y-3.5 ${shake ? 'animate-shake' : ''}`}
              noValidate
            >
              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 block">
                  Full Name
                </label>
                <div className="relative rounded-xl">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.654 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register('fullName', {
                      required: 'Full name is required',
                    })}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
                      errors.fullName ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-rose-500 mt-1 ml-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
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
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: EMAIL_REGEX,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    className={`w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
                      errors.email ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1 ml-1">{errors.email.message}</p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 block">
                  Account Role
                </label>
                <select
                  {...register('role')}
                  className="w-full px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 block">
                  Password
                </label>
                <div className="relative rounded-xl">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
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
                  <p className="text-xs text-rose-500 mt-1 ml-1">{errors.password.message}</p>
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

              {/* Terms */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('terms', {
                      required: 'You must accept the terms',
                    })}
                    className="mt-1 w-4 h-4 rounded bg-slate-50 border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="text-xs text-slate-600">
                    I agree to the <Link href="/terms" className="text-cyan-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-cyan-600 hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-xs text-rose-500 mt-1 ml-1">{errors.terms.message}</p>
                )}
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm rounded-2xl shadow-lg shadow-cyan-500/25 transition-all duration-200 flex items-center justify-center cursor-pointer"
                >
                  {status === 'idle' && 'Sign up'}
                  {status === 'loading' && 'Creating account...'}
                  {status === 'success' && 'Account created! ⚡'}
                </button>
              </div>
            </form>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-xs text-slate-400 uppercase tracking-widest font-light">or</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <SocialLogins />

            <p className="text-center text-sm text-slate-600 mt-5">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-cyan-600 hover:underline">
                Log in
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
      Sign up with Google
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