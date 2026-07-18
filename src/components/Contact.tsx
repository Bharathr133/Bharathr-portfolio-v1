'use client';

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { MapPin, Mail, Loader2, Send, Terminal, MessageSquare } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';

const offensiveWords = [
  'loude', 'chut', 'fuck', 'chutt', 'ddhdhdghs', 'louda', 'lorem', 'ipsum',
  'example', 'test', 'dummy', 'placeholder', 'assshdhs', 'fucking', 'fuck you',
  'name', 'youname', 'Bharath R'
];

interface FormState {
  from_name: string;
  from_email: string;
  phone: string;
  message: string;
  website: string;
}

interface FormErrors {
  from_name?: string;
  from_email?: string;
  phone?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    from_name: '',
    from_email: '',
    phone: '',
    message: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    show: boolean;
    message: string;
    action?: () => void;
  } | null>(null);

  useEffect(() => {
    emailjs.init("VdMoWyii0_W4uT7mJ");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (formData.website) {
      return false;
    }

    if (formData.from_name.trim().length < 5 || /[^a-zA-Z \-']/.test(formData.from_name)) {
      newErrors.from_name = 'Name must be 5+ letters (A-Z)';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email.trim())) {
      newErrors.from_email = 'Invalid email address';
      isValid = false;
    }

    const phoneRegex = /^[\d\s\-+]{10,15}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Must be 10-15 digits';
      isValid = false;
    }

    const messageTrim = formData.message.trim();
    const gibberishRegex = /([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{4,})/;
    const containsOffensive = offensiveWords.some(word => 
      messageTrim.toLowerCase().includes(word.toLowerCase())
    );

    if (messageTrim.length < 20) {
      newErrors.message = 'Must be 20+ characters';
      isValid = false;
    } else if (gibberishRegex.test(messageTrim)) {
      newErrors.message = 'Please write a coherent message';
      isValid = false;
    } else if (containsOffensive) {
      newErrors.message = 'Inappropriate language detected';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const showCustomAlert = (message: string, action?: () => void) => {
    setAlertConfig({
      show: true,
      message,
      action,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await emailjs.send("service_kuyco8a", "template_gdh7qcu", {
        from_name: formData.from_name.trim(),
        from_email: formData.from_email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        reply_to: formData.from_email.trim(),
      });

      setFormData({
        from_name: '',
        from_email: '',
        phone: '',
        message: '',
        website: '',
      });

      const downloadRequested = localStorage.getItem('downloadRequested') === 'true';
      if (downloadRequested) {
        localStorage.setItem('allowDownload', 'true');
        showCustomAlert(
          'Thank you! You may now download my resume by clicking the Download CV button.',
          () => {
            const downloadBtn = document.getElementById('download-resume-btn');
            if (downloadBtn) {
              downloadBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        );
      } else {
        showCustomAlert('Thanks for contacting me! I will get back to you ASAP!');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      showCustomAlert('Message failed to send. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-slate-50 dark:bg-slate-950 py-24 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(99,102,241,0.02),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Asymmetrical Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-l-4 border-indigo-650 pl-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contact Console</span>
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-serif">
              Get In Touch
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md leading-relaxed font-medium">
            Fill out the code variables in the terminal form below and click dispatch to drop a direct message directly into my inbox!
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 max-w-5xl mx-auto items-stretch [transform-style:preserve-3d]">
          {/* Left: Info Card */}
          <div className="lg:col-span-5">
            <TiltCard className="w-full h-full">
              <div className="flex flex-col p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-[28px_8px_32px_12px] shadow-[0_15px_35px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.6)] justify-between h-full relative overflow-hidden transition-colors duration-300">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-[28px_8px_32px_12px] blur-sm pointer-events-none" />

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Let&apos;s Connect</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                    I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll get back to you as soon as possible!
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-100 dark:border-indigo-500/20">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-300 text-sm">Location</h4>
                      <a
                        href={personalInfo.locationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-650 dark:text-indigo-400 hover:text-indigo-550 dark:hover:text-indigo-300 text-sm font-medium mt-0.5 inline-block"
                      >
                        {personalInfo.location}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-100 dark:border-indigo-500/20">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-300 text-sm">Email</h4>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-550 dark:hover:text-indigo-300 text-sm font-medium mt-0.5 inline-block break-all"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-500 italic">
                  *Response time is usually within 24 hours.
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right: Code Editor style Contact Form */}
          <div className="lg:col-span-7">
            <TiltCard className="w-full h-full">
              <div className="flex flex-col bg-slate-900 border border-slate-950 dark:border-slate-800 rounded-[20px_10px_32px_12px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.65)] overflow-hidden font-mono text-xs text-slate-300 select-none h-full">
                
                {/* Editor Header Tab */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-950">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold tracking-wide">
                    contactController.js
                  </span>
                  <Terminal className="h-4 w-4 text-slate-600 shrink-0" />
                </div>

                {/* Code Form Body */}
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-6 space-y-4">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="space-y-3 leading-relaxed">
                    <div>
                      <span className="text-pink-500 font-bold">const</span> <span className="text-blue-400">contactRequest</span> = <span className="text-yellow-500">&#123;</span>
                    </div>

                    {/* Sender Name */}
                    <div className="pl-4 flex flex-wrap items-center gap-2">
                      <span className="text-indigo-400">senderName</span>: <span className="text-orange-300">&quot;</span>
                      <input
                        type="text"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        required
                        className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-emerald-400 placeholder-slate-500 focus:outline-none focus:border-indigo-500 caret-emerald-400 min-w-[150px] text-xs font-mono"
                        placeholder="Type your full name here"
                      />
                      <span className="text-orange-300">&quot;</span>,
                      <span className="text-slate-500 text-[10px] font-mono leading-none">{` // Write your name`}</span>
                      {errors.from_name && <span className="text-red-500 text-[10px] font-semibold">{` (Error: ${errors.from_name})`}</span>}
                    </div>

                    {/* Sender Email */}
                    <div className="pl-4 flex flex-wrap items-center gap-2">
                      <span className="text-indigo-400">senderEmail</span>: <span className="text-orange-300">&quot;</span>
                      <input
                        type="email"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleChange}
                        required
                        className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-emerald-400 placeholder-slate-500 focus:outline-none focus:border-indigo-500 caret-emerald-400 min-w-[180px] text-xs font-mono"
                        placeholder="Type your email address"
                      />
                      <span className="text-orange-300">&quot;</span>,
                      <span className="text-slate-500 text-[10px] font-mono leading-none">{` // For replying back`}</span>
                      {errors.from_email && <span className="text-red-500 text-[10px] font-semibold">{` (Error: ${errors.from_email})`}</span>}
                    </div>

                    {/* Sender Phone */}
                    <div className="pl-4 flex flex-wrap items-center gap-2">
                      <span className="text-indigo-400">senderPhone</span>: <span className="text-orange-300">&quot;</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-emerald-400 placeholder-slate-500 focus:outline-none focus:border-indigo-500 caret-emerald-400 min-w-[150px] text-xs font-mono"
                        placeholder="Optional phone number"
                      />
                      <span className="text-orange-300">&quot;</span>,
                      <span className="text-slate-500 text-[10px] font-mono leading-none">{` // Mobile contact`}</span>
                      {errors.phone && <span className="text-red-500 text-[10px] font-semibold">{` (Error: ${errors.phone})`}</span>}
                    </div>

                    {/* Sender Message */}
                    <div className="pl-4 flex flex-wrap items-start gap-2">
                      <span className="text-indigo-400">bodyMessage</span>: <span className="text-orange-300">`</span>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-emerald-400 placeholder-slate-500 focus:outline-none focus:border-indigo-500 caret-emerald-400 flex-1 min-w-[200px] resize-none text-xs font-mono"
                        placeholder="Write details of your message or hiring requests..."
                      />
                      <span className="text-orange-300">`</span>
                      <span className="text-slate-500 text-[10px] font-mono leading-none">{` // Type description`}</span>
                      {errors.message && <span className="text-red-500 text-[10px] font-semibold">{` (Error: ${errors.message})`}</span>}
                    </div>

                    <div>
                      <span className="text-yellow-500">&#125;</span>;
                    </div>
                  </div>

                  {/* Submit dispatch button */}
                  <div className="pt-4 mt-auto">
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 text-xs transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(79,70,229,0.4)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>dispatchMessage()...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>dispatchMessage()</span>
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </div>
                </form>

              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Custom Alert Modal */}
      {alertConfig?.show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={() => {
            if (alertConfig.action) alertConfig.action();
            setAlertConfig(null);
          }}
        >
          <div
            className="w-full max-w-sm p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-sm pointer-events-none" />
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-serif">Bharath R says</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              {alertConfig.message}
            </p>
            
            <button
              onClick={() => {
                if (alertConfig.action) alertConfig.action();
                setAlertConfig(null);
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-md shadow-indigo-600/20"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
