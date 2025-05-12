// components/LoadingState.js
export default function LoadingState() {
    return (
      <div className="mt-12 flex flex-col items-center justify-center py-16">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-full h-full rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <div className="absolute top-2 left-2 w-16 h-16">
            <div className="w-full h-full rounded-full border-4 border-t-transparent border-r-purple-400/70 border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
          </div>
          <div className="absolute top-4 left-4 w-12 h-12">
            <div className="w-full h-full rounded-full border-4 border-t-transparent border-r-transparent border-b-purple-300/50 border-l-transparent animate-spin animation-delay-300"></div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <h3 className="text-xl font-medium text-white mb-2">Analyzing Resume</h3>
          <p className="text-gray-400 max-w-md">
            Our AI is extracting skills and experience from your resume to generate personalized interview questions
          </p>
          
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse animation-delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse animation-delay-300"></div>
          </div>
        </div>
      </div>
    );
  }