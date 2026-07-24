'use client';

import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { MapPin, Mail, Loader2, Send, Terminal, MessageSquare, FileText, Check } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';
import AstronautDog from './AstronautDog';
import useTextScramble from '../hooks/useTextScramble';

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
  const [isResumeRequest, setIsResumeRequest] = useState(false);
  const [showResumeDownloadModal, setShowResumeDownloadModal] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    show: boolean;
    message: string;
    action?: () => void;
  } | null>(null);

  const { text: scrambleTitle, scramble: triggerScrambleTitle } = useTextScramble('Get In Touch');

  useEffect(() => {
    emailjs.init("VdMoWyii0_W4uT7mJ");

    // Check if user previously clicked Download Resume in this session
    if (sessionStorage.getItem('resumeRequested') === 'true') {
      setIsResumeRequest(true);
    }

    const handleResumeRequestEvent = () => {
      setIsResumeRequest(true);
      setFormData(prev => ({
        ...prev,
        message: prev.message || "Hi Bharath, I am interested in your profile and would like to request a copy of your resume."
      }));
    };

    window.addEventListener('request-resume-download', handleResumeRequestEvent);
    return () => {
      window.removeEventListener('request-resume-download', handleResumeRequestEvent);
    };
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

    if (formData.from_name.trim().length < 3 || /[^a-zA-Z \-']/.test(formData.from_name.trim())) {
      newErrors.from_name = 'Please enter your name (at least 3 letters)';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email.trim())) {
      newErrors.from_email = 'Please enter a valid email address';
      isValid = false;
    }

    const phoneRegex = /^[\d\s\-+]{10,15}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be 10 to 15 digits';
      isValid = false;
    }

    const messageTrim = formData.message.trim();
    const containsOffensive = offensiveWords.some(word => 
      messageTrim.toLowerCase().includes(word.toLowerCase())
    );

    if (messageTrim.length < 5) {
      newErrors.message = 'Please type a message (at least 5 letters)';
      isValid = false;
    } else if (containsOffensive) {
      newErrors.message = 'Please use respectful language';
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

      const downloadRequested = isResumeRequest || sessionStorage.getItem('resumeRequested') === 'true';
      if (downloadRequested) {
        sessionStorage.removeItem('resumeRequested');
        setIsResumeRequest(false);
        setShowResumeDownloadModal(true);
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
    <section id="contact" className="relative bg-slate-50 dark:bg-slate-950 py-16 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(99,102,241,0.02),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Asymmetrical Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-l-4 border-indigo-650 pl-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contact Console</span>
            </span>
            <h2
              onMouseEnter={triggerScrambleTitle}
              className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-mono select-none cursor-default"
            >
              {scrambleTitle}
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
                  {/* Resume Request Mode Banner */}
                  {isResumeRequest && (
                    <div className="bg-indigo-600/20 border border-indigo-500/50 rounded-xl p-3.5 text-indigo-200 text-xs font-sans flex items-center justify-between gap-3 shadow-md">
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4 text-indigo-400 shrink-0" />
                        <span><strong>Resume Mode:</strong> Enter your contact details below to unlock & download my resume.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsResumeRequest(false);
                          sessionStorage.removeItem('resumeRequested');
                        }}
                        className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800/60"
                        title="Close resume request notice"
                      >
                        ✕
                      </button>
                    </div>
                  )}
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
                        className="group relative overflow-visible flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 text-xs transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(79,70,229,0.4)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      >
                        <AstronautDog />
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

      {/* Post-Submission Resume Download Modal */}
      {showResumeDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md">
          <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden text-left">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5 shadow-xs">
              <Check className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-serif mb-2">
              Message Sent & Resume Unlocked!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-6">
              Your details have been submitted. Click below to download Bharath&apos;s resume PDF.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.target = '_blank';
                  link.download = 'Bharath_R_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  setShowResumeDownloadModal(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-5 text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <FileText className="h-4 w-4" />
                <span>Download Resume PDF</span>
              </button>
              <button
                onClick={() => setShowResumeDownloadModal(false)}
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
