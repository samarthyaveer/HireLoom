"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
//update ui

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  
  const toggleDropdown = () => {
    setOpen(!open);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    
    // Only add the event listener when the dropdown is open
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  
  // Add event listener for Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <div>
          <Link href="/" className="flex items-center">
            <div className="text-3xl font-bold" style={{ color: "#08C2FF" }}>
              <span className="text-white">Hire</span>Loom
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link href="/analyser-resume" className="hidden md:block text-white hover:text-sky-400 transition-colors">
            Resume Analysis
          </Link>
          <Link href="/create-interview" className="hidden md:block text-white hover:text-sky-400 transition-colors">
            Interview Creator
          </Link>
          <Link href="/sample-qsn" className="hidden md:block text-white hover:text-sky-400 transition-colors">
            Question Generator
          </Link>
          
          <div className="relative inline-block text-left md:hidden">
            <button 
              ref={buttonRef}
              onClick={toggleDropdown}
              className="flex items-center gap-2 px-4 py-2 text-white bg-gray-800/80 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 backdrop-blur-sm"
              aria-expanded={open ? "true" : "false"}
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              suppressHydrationWarning
            >
              <span>Menu</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} 
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            {open && (
              <div 
                ref={dropdownRef}
                id="dropdown-menu"
                className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-md rounded-md shadow-lg origin-top-right ring-1 ring-black ring-opacity-5 divide-y divide-gray-700/50 z-10"
              >
                <div className="py-1 text-sky-50">
                  <Link 
                    href="/analyser-resume" 
                    className="block px-4 py-2 hover:bg-gray-700/70 focus:outline-none focus:bg-gray-700/70 focus:text-sky-400"
                    onClick={() => setOpen(false)}
                  >
                    Resume Analysis
                  </Link>
                  <Link 
                    href="/create-interview" 
                    className="block px-4 py-2 hover:bg-gray-700/70 focus:outline-none focus:bg-gray-700/70 focus:text-sky-400"
                    onClick={() => setOpen(false)}
                  >
                    Interview Creator
                  </Link>
                  <Link 
                    href="/sample-qsn" 
                    className="block px-4 py-2 hover:bg-gray-700/70 focus:outline-none focus:bg-gray-700/70 focus:text-sky-400"
                    onClick={() => setOpen(false)}
                  >
                    Question Generator
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Icons
function ToolIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function ChevronDownIcon({ className = "" }) {
  return (
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
      className={`transition-transform duration-300 ${className}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function DocumentIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function QuestionIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}