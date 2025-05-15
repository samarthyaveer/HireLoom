// components/footer.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      // Open YouTube channel in a new tab
      window.open("https://youtube.com/@samarthyaveer?si=BZxjC8Q--UL2pvAZ", "_blank", "noopener,noreferrer");

      // Handle newsletter subscription
      console.log("Email submitted:", email);

      // Show success message
      toast.success("Thanks for subscribing to our newsletter!");

      // Show notification about YouTube channel
      toast.success(
        "We've opened our YouTube channel in a new tab for you to subscribe!",
        { duration: 5000 }
      );

      // Reset the field and submission state
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="bg-dark-1000 border-t border-dark-900/50 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content - Two-Row Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="text-2xl font-bold tracking-tight mb-4">
              <span className="text-white">Hire</span>
              <span className="text-primary-500 relative">
                Loom
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500 rounded-full"></span>
              </span>
            </div>
            <p className="text-secondary-400 text-sm mb-4 leading-relaxed">
              AI-powered tools for both job seekers and recruiters to streamline the hiring process.
            </p>
            <div className="flex space-x-3 mt-auto">
              <a
                href="https://github.com/samarthyaveer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-900 flex items-center justify-center text-secondary-400 hover:bg-primary-900/30 hover:text-white hover:border hover:border-primary-500/50 transition-all duration-200"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/samarthyaveer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-900 flex items-center justify-center text-secondary-400 hover:bg-primary-900/30 hover:text-white hover:border hover:border-primary-500/50 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/samarthyaveer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-900 flex items-center justify-center text-secondary-400 hover:bg-primary-900/30 hover:text-white hover:border hover:border-primary-500/50 transition-all duration-200"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-semibold mb-3 text-white">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/create-interview"
                  className="text-secondary-400 hover:text-white transition-all duration-200 flex items-center group text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Interview Creator
                </Link>
              </li>
              <li>
                <Link
                  href="/analyser-resume"
                  className="text-secondary-400 hover:text-white transition-all duration-200 flex items-center group text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link
                  href="/sample-qsn"
                  className="text-secondary-400 hover:text-white transition-all duration-200 flex items-center group text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Question Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-semibold mb-3 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/samarthyaveer/HireLoom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-400 hover:text-white transition-all duration-200 flex items-center group text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Documentation
                </a>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary-400 hover:text-white transition-all duration-200 flex items-center group text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary-400 hover:text-white transition-all duration-200 flex items-center group text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-5">
            <h3 className="text-base font-semibold mb-3 text-white">Stay Updated</h3>
            <p className="text-secondary-400 mb-3 text-sm">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-dark-900 border border-dark-800 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                suppressHydrationWarning
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-main-action px-4 py-2.5 rounded-lg text-sm whitespace-nowrap flex-shrink-0 relative"
                suppressHydrationWarning
              >
                <span className="relative z-10 flex items-center">
                  {isSubmitting && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                  )}
                  {isSubmitting ? 'Processing...' : 'Subscribe'}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Copyright - Refined */}
        <div className="mt-8 pt-5 border-t border-dark-900/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-500 text-sm mb-2 md:mb-0" suppressHydrationWarning>
            © {new Date().getFullYear()} <span className="text-white">Hire</span><span className="text-primary-500">Loom</span>. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-secondary-500 hover:text-white text-xs transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="#" className="text-secondary-500 hover:text-white text-xs transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-secondary-500 hover:text-white text-xs transition-colors duration-200">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}