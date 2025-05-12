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
  const featuresRef = useRef(null);
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
      featuresRef.current,
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden w-full">
      {/* Hero Section with 3D Animation */}
      <div
        ref={heroRef}
        className="w-full relative min-h-[80vh] flex items-center justify-center py-20 px-4 opacity-0 transition-opacity duration-1000"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/grid-photo.png')",
              ...getParallaxStyle(1.5, false),
            }}
          />
        </div>
        <br />
        {/* Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="text-gray-300 text-6xl">
              Transform Hiring with AI-Powered Intelligence
            </span>
            <br />
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Streamline your recruitment process with advanced AI technology that analyzes resumes, conducts intelligent interviews, and provides deep candidate insights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/create-interview"
              className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform hover:-translate-y-1"
            >
              Create AI Interview
            </Link>
            <Link
              href="/analyser-resume"
              className="px-8 py-4 bg-black/40 backdrop-blur-sm border border-blue-500 text-white rounded-md hover:bg-black/60 transition transform hover:-translate-y-1"
            >
              Analyze Resume
            </Link>
          </div>
        </div>

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
      </div>
      {/* Features Section with Enhanced 3D Animation */}
      <div
        ref={featuresRef}
        className="w-full relative py-24 px-4 opacity-0 transition-opacity duration-1000"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/grid-photo.png')",
              ...getParallaxStyle(1, true),
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="relative inline-block">
              AI-Powered Solutions for Modern Recruitment
              <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-blue-500 transform -skew-x-12"></span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature cards - slightly less opaque for better visibility */}
            <div className="feature-card bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center transform transition-all duration-500">
              <div className="mb-4 text-4xl text-blue-500">
                <BrainIcon />
              </div>
              <h3 className="text-xl font-bold mb-2">
                AI Interview Assistant
              </h3>
              <p className="text-gray-300">
                Conduct initial candidate screenings with our advanced AI interviewer that adapts questions based on responses and provides detailed insights.
              </p>
            </div>

            <div className="feature-card bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center transform transition-all duration-500 delay-100">
              <div className="mb-4 text-4xl text-blue-500">
                <BriefcaseIcon />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Intelligent Question Generation
              </h3>
              <p className="text-gray-300">
                Create tailored interview questions that target specific skills and experience mentioned in candidate resumes and job descriptions.
              </p>
            </div>

            <div className="feature-card bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center transform transition-all duration-500 delay-200">
              <div className="mb-4 text-4xl text-blue-500">
                <ChartIcon />
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
              <p className="text-gray-300">
                Gain valuable insights into candidate performance with detailed analytics that help predict job success and team compatibility.
              </p>
            </div>

            <div className="feature-card bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center transform transition-all duration-500 delay-300">
              <div className="mb-4 text-4xl text-blue-500">
                <ResumeIcon />
              </div>
              <h3 className="text-xl font-bold mb-2">ATS Resume Analyzer</h3>
              <p className="text-gray-300">
                Evaluate resumes against job requirements with our AI-powered ATS system that highlights key qualifications and potential skill gaps.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section with consistent grid background */}
      <div
        ref={howItWorksRef}
        className="w-full relative py-24 px-4 opacity-0 transition-opacity duration-1000"
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
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="relative inline-block">
              Streamlined Recruitment Process
              <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-blue-500 transform -skew-x-12"></span>
            </span>
          </h2>

          <div className="relative">
            {/* Timeline center line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-500/30"></div>

            {/* Step 1 - LEFT */}
            <div className="md:flex items-center justify-center mb-16">
              <div className="md:w-5/12 md:pr-8">
                <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
                  <h3 className="text-2xl font-bold mb-3 text-blue-400">
                    1. Create Your Interview
                  </h3>
                  <p className="text-gray-300">
                    Define your job requirements and enter the position details. Our AI will create a tailored interview experience designed to evaluate the most relevant skills.
                  </p>
                </div>
              </div>

              {/* Center point */}
              <div className="hidden md:flex items-center justify-center md:w-2/12">
                <div className="w-12 h-12 rounded-full bg-blue-900 border-4 border-blue-500 z-10 flex items-center justify-center">
                  <span className="text-xl font-bold">1</span>
                </div>
              </div>

              {/* Empty space for right side */}
              <div className="md:w-5/12"></div>
            </div>

            {/* Step 2 - RIGHT */}
            <div className="md:flex items-center justify-center mb-16">
              {/* Empty space for left side */}
              <div className="md:w-5/12"></div>

              {/* Center point */}
              <div className="hidden md:flex items-center justify-center md:w-2/12">
                <div className="w-12 h-12 rounded-full bg-blue-900 border-4 border-blue-500 z-10 flex items-center justify-center">
                  <span className="text-xl font-bold">2</span>
                </div>
              </div>

              <div className="md:w-5/12 md:pl-8">
                <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
                  <h3 className="text-2xl font-bold mb-3 text-blue-400">
                    2. Share Interview Link
                  </h3>
                  <p className="text-gray-300">
                    Send the unique interview link to candidates. They can complete the interview at their convenience, while our system adapts questions based on their responses.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 - LEFT */}
            <div className="md:flex items-center justify-center mb-16">
              <div className="md:w-5/12 md:pr-8">
                <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
                  <h3 className="text-2xl font-bold mb-3 text-blue-400">
                    3. Candidates Complete Interview
                  </h3>
                  <p className="text-gray-300">
                    Candidates engage with our intuitive interface to answer questions. Our AI analyzes responses in real-time, adjusting difficulty and topics to assess competency.
                  </p>
                </div>
              </div>

              {/* Center point */}
              <div className="hidden md:flex items-center justify-center md:w-2/12">
                <div className="w-12 h-12 rounded-full bg-blue-900 border-4 border-blue-500 z-10 flex items-center justify-center">
                  <span className="text-xl font-bold">3</span>
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
                <div className="w-12 h-12 rounded-full bg-blue-900 border-4 border-blue-500 z-10 flex items-center justify-center">
                  <span className="text-xl font-bold">4</span>
                </div>
              </div>

              <div className="md:w-5/12 md:pl-8">
                <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
                  <h3 className="text-2xl font-bold mb-3 text-blue-400">
                    4. Receive Comprehensive Insights
                  </h3>
                  <p className="text-gray-300">
                    Access detailed performance reports that highlight candidate strengths, potential areas for growth, and overall fit for the position based on AI-powered analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full py-20 px-4 bg-gradient-to-r from-blue-900/50 to-blue-600/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Revolutionize Your Hiring Process Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join forward-thinking organizations that are using HireLoom to find the perfect candidates faster, reduce bias, and make data-driven hiring decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/analyser-resume"
              className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform hover:-translate-y-1"
            >
              Analyze Resume Now
            </Link>
            <Link
              href="/sample-qsn"
              className="px-8 py-4 bg-black/60 backdrop-blur-sm border border-blue-500 text-white rounded-md hover:bg-black/80 transition transform hover:-translate-y-1"
            >
              Generate Interview Questions
            </Link>
          </div>
        </div>
      </div>
      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
        }

        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
