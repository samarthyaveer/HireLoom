"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

// Icon components that were referenced but not defined
const BrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.5H4.5A2.5 2.5 0 0 1 2 17.5v-10A2.5 2.5 0 0 1 4.5 5h2.54A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.5h2.54A2.5 2.5 0 0 0 22 17.5v-10A2.5 2.5 0 0 0 19.5 5h-2.54A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18"></path>
    <path d="m19 9-5 5-4-4-3 3"></path>
  </svg>
);

const ResumeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <path d="M14 2v6h6"></path>
    <path d="M16 13H8"></path>
    <path d="M16 17H8"></path>
    <path d="M10 9H8"></path>
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const StarHalfIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"></path>
    <path
      d="M12 17.8V2l3.1 6.3 6.9 1-5 4.8 1.2 6.9-6.2-3.2Z"
      fill="none"
    ></path>
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [particles, setParticles] = useState([]);
  const heroRef = useRef(null);
  const howItWorksRef = useRef(null);

  // Generate particles only once after initial render
  useEffect(() => {
    const newParticles = [...Array(15)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 7,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Track mouse movement for parallax effect with throttling
  useEffect(() => {
    let timeoutId = null;

    const handleMouseMove = (e) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          // Calculate mouse position relative to the center of the viewport
          const x = e.clientX / window.innerWidth - 0.5;
          const y = e.clientY / window.innerHeight - 0.5;

          setMousePosition({ x, y });
          timeoutId = null;
        }, 10);
      }
    };

    // Track scroll for additional depth effect
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Setup intersection observer for section animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const elements = [
      heroRef.current,
      howItWorksRef.current,
    ].filter(Boolean);

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Calculate 3D effect values based on mouse position and scroll
  const getParallaxStyle = (strength = 1, scroll = true) => {
    const xShift = mousePosition.x * 20 * strength;
    const yShift = mousePosition.y * 20 * strength;
    const scrollEffect = scroll ? scrollPosition / 3000 : 0;

    return {
      transform: `
        perspective(1500px)
        rotateX(${mousePosition.y * 5 * strength}deg)
        rotateY(${-mousePosition.x * 5 * strength}deg)
        translateZ(0)
      `,
      backgroundPosition: `
        calc(50% + ${xShift}px)
        calc(50% + ${yShift + scrollEffect}px)
      `,
      backgroundSize: "cover",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      transition: "transform 0.2s ease-out, background-position 0.2s ease-out",
    };
  };

  return (
    <div className="min-h-screen overflow-x-hidden w-full">
      {/* Combined Hero and Features Section with 3D Animation */}
      <div
        ref={heroRef}
        className="w-full relative min-h-screen flex items-center justify-center py-20 px-4 opacity-0 transition-opacity duration-1000"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/grid-photo.png')",
              ...getParallaxStyle(1.5, false),
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-1000/90 to-dark-950/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto text-center py-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            <span className="text-white">
              Precision Tools for <span className="text-primary-500">Modern Hiring</span>
            </span>
          </h1>
          <p className="text-xl text-secondary-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Elevate your recruitment with AI-powered solutions that help both candidates prepare for interviews and recruiters streamline their hiring process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-16">
            <Link
              href="/create-interview"
              className="btn-premium group"
            >
              <span className="relative z-10">Interview Creator</span>
            </Link>
            <Link
              href="/analyser-resume"
              className="btn-premium group"
            >
              <span className="relative z-10">Resume Analyzer</span>
            </Link>
            <Link
              href="/sample-qsn"
              className="btn-premium group"
            >
              <span className="relative z-10">Question Generator</span>
            </Link>
          </div>

          {/* Feature cards section */}
          <h2 className="text-4xl font-bold text-center mb-16 mt-24">
            <span className="relative inline-block">
              <span className="text-white">Three Powerful Solutions, <span className="text-primary-500">One Platform</span></span>
              <span className="absolute -bottom-3 left-1/4 w-1/2 h-1 bg-primary-500 rounded-full"></span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">

          {/* Animated particles for enhanced 3D feel */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-20"
                style={{
                  top: particle.top,
                  left: particle.left,
                  animation: `float ${particle.duration}s infinite ease-in-out ${particle.delay}s`,
                }}
              />
            ))}
          </div>
            {/* Feature cards with premium styling */}
            <div className="bg-dark-950 border border-dark-900 hover:border-primary-700 rounded-xl p-8 flex flex-col items-center text-center transform transition-all duration-500 h-full hover:shadow-lg hover:shadow-primary-900/10 hover:-translate-y-2">
              <div className="mb-6 text-4xl text-primary-500 bg-dark-900 p-4 rounded-full">
                <BrainIcon />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Interview Creator
              </h3>
              <p className="text-secondary-400 leading-relaxed">
                Generate tailored interviews for specific job roles. Our AI crafts relevant questions based on position requirements and interview type.
              </p>
            </div>

            <div className="bg-dark-950 border border-dark-900 hover:border-primary-700 rounded-xl p-8 flex flex-col items-center text-center transform transition-all duration-500 h-full hover:shadow-lg hover:shadow-primary-900/10 hover:-translate-y-2">
              <div className="mb-6 text-4xl text-primary-500 bg-dark-900 p-4 rounded-full">
                <ResumeIcon />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Resume Analyzer
              </h3>
              <p className="text-secondary-400 leading-relaxed">
                Evaluate candidate profiles against specific role requirements. Identify key qualifications, experience, and potential skill gaps with precision.
              </p>
            </div>

            <div className="bg-dark-950 border border-dark-900 hover:border-primary-700 rounded-xl p-8 flex flex-col items-center text-center transform transition-all duration-500 h-full hover:shadow-lg hover:shadow-primary-900/10 hover:-translate-y-2">
              <div className="mb-6 text-4xl text-primary-500 bg-dark-900 p-4 rounded-full">
                <BriefcaseIcon />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Question Generator
              </h3>
              <p className="text-secondary-400 leading-relaxed">
                Create resume-specific interview questions that target the exact skills and experience of your candidates, ensuring focused and productive interviews.
              </p>
            </div>

            <div className="bg-dark-950 border border-dark-900 hover:border-primary-700 rounded-xl p-8 flex flex-col items-center text-center transform transition-all duration-500 h-full hover:shadow-lg hover:shadow-primary-900/10 hover:-translate-y-2">
              <div className="mb-6 text-4xl text-primary-500 bg-dark-900 p-4 rounded-full">
                <ChartIcon />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Comprehensive Analytics
              </h3>
              <p className="text-secondary-400 leading-relaxed">
                Gain valuable insights into candidate performance with detailed analytics that help predict job success and team compatibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section with consistent grid background */}
      <div
        ref={howItWorksRef}
        className="w-full relative py-32 px-4 opacity-0 transition-opacity duration-1000"
      >
        {/* Added grid background to match other sections */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/grid-photo.png')",
              ...getParallaxStyle(0.8, true),
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-1000/95 to-dark-950/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-20">
            <span className="relative inline-block">
              <span className="text-white">Effortless. <span className="text-primary-500">Intuitive.</span> Powerful.</span>
              <span className="absolute -bottom-3 left-1/4 w-1/2 h-1 bg-primary-500 rounded-full"></span>
            </span>
          </h2>

          <div className="relative">
            {/* Timeline center line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-500/20 via-primary-500/40 to-primary-500/20"></div>

            {/* Step 1 - LEFT */}
            <div className="md:flex items-center justify-center mb-20">
              <div className="md:w-5/12 md:pr-10">
                <div className="bg-dark-950 border border-dark-900 hover:border-primary-700 rounded-xl p-8 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-900/10">
                  <h3 className="text-2xl font-bold mb-4 text-primary-500">
                    1. Define Your Needs
                  </h3>
                  <p className="text-secondary-400 leading-relaxed">
                    Select your tool and provide the necessary details. Whether you're creating an interview, analyzing a resume, or generating questions, the process begins with your specific requirements.
                  </p>
                </div>
              </div>

              {/* Center point */}
              <div className="hidden md:flex items-center justify-center md:w-2/12">
                <div className="w-14 h-14 rounded-full bg-dark-900 border-2 border-primary-500 shadow-lg shadow-primary-500/20 z-10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-500">1</span>
                </div>
              </div>

              {/* Empty space for right side */}
              <div className="md:w-5/12"></div>
            </div>

            {/* Step 2 - RIGHT */}
            <div className="md:flex items-center justify-center mb-20">
              {/* Empty space for left side */}
              <div className="md:w-5/12"></div>

              {/* Center point */}
              <div className="hidden md:flex items-center justify-center md:w-2/12">
                <div className="w-14 h-14 rounded-full bg-dark-900 border-2 border-primary-500 shadow-lg shadow-primary-500/20 z-10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-500">2</span>
                </div>
              </div>

              <div className="md:w-5/12 md:pl-10">
                <div className="bg-dark-950 border border-dark-900 hover:border-primary-700 rounded-xl p-8 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-900/10">
                  <h3 className="text-2xl font-bold mb-4 text-primary-500">
                    2. AI-Powered Processing
                  </h3>
                  <p className="text-secondary-400 leading-relaxed">
                    Our advanced AI analyzes your inputs and generates tailored results. The system adapts to the specific context, ensuring relevant and insightful outcomes.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 - LEFT */}
            <div className="md:flex items-center justify-center mb-20">
              <div className="md:w-5/12 md:pr-10">
                <div className="bg-dark-950 border border-dark-900 hover:border-primary-700 rounded-xl p-8 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-900/10">
                  <h3 className="text-2xl font-bold mb-4 text-primary-500">
                    3. Seamless Experience
                  </h3>
                  <p className="text-secondary-400 leading-relaxed">
                    For candidates, our intuitive interface makes interview preparation straightforward. For recruiters, our tools streamline the evaluation process with minimal friction.
                  </p>
                </div>
              </div>

              {/* Center point */}
              <div className="hidden md:flex items-center justify-center md:w-2/12">
                <div className="w-14 h-14 rounded-full bg-dark-900 border-2 border-primary-500 shadow-lg shadow-primary-500/20 z-10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-500">3</span>
                </div>
              </div>

              {/* Empty space for right side */}
              <div className="md:w-5/12"></div>
            </div>

            {/* Step 4 - RIGHT */}
            <div className="md:flex items-center justify-center">
              {/* Empty space for left side */}
              <div className="md:w-5/12"></div>

              {/* Center point */}
              <div className="hidden md:flex items-center justify-center md:w-2/12">
                <div className="w-14 h-14 rounded-full bg-dark-900 border-2 border-primary-500 shadow-lg shadow-primary-500/20 z-10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-500">4</span>
                </div>
              </div>

              <div className="md:w-5/12 md:pl-10">
                <div className="bg-dark-950 border border-dark-900 hover:border-primary-700 rounded-xl p-8 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-900/10">
                  <h3 className="text-2xl font-bold mb-4 text-primary-500">
                    4. Actionable Results
                  </h3>
                  <p className="text-secondary-400 leading-relaxed">
                    Receive clear, actionable insights that drive better decisions. Whether it's interview questions, resume analysis, or candidate evaluation, our tools deliver results you can immediately put to use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.4;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .card {
          transition: all var(--duration-300) var(--ease-apple);
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 30px -10px rgba(0, 112, 243, 0.15);
        }
      `}</style>
    </div>
  );
}
