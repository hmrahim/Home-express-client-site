import React from 'react';

const Portfolio = ({ href = "https://hmrahims.web.app/", text = "Developed by hmr" }) => {
  return (
    <div className="flex justify-center p-4">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white 
         rounded-full overflow-hidden group shadow-xl shadow-black/40 hover:shadow-purple-500/30 
         transition-all duration-500 transform-gpu hover:-translate-y-0.5 hover:scale-105"
      >
        {/* 🌀 Animated Multi-Layer Background */}
        <span
          className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-indigo-900 
           animate-gradient-x group-hover:animate-gradient-y opacity-90"
        />

        {/* 🌈 Shimmering Secondary Gradient */}
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
           animate-shimmer w-[200%] group-hover:animate-shimmer-reverse"
        />

        {/* ⚡ Pulsing Electric Border */}
        <span
          className="absolute inset-0 rounded-full border border-transparent 
           bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 
           p-[1px] animate-border-spin group-hover:animate-border-pulse"
        />

        {/* ✨ Inner Glow Ring */}
        <span
          className="absolute inset-[2px] rounded-full bg-gradient-to-r from-gray-900 via-black to-gray-900 
           animate-pulse-slow opacity-80 group-hover:opacity-100"
        />

        {/* 🎨 Core Black Background */}
        <span className="absolute inset-[4px] rounded-full bg-black/95 backdrop-blur-xl" />

        {/* 🚀 Content */}
        <span
          className="relative z-20 flex items-center gap-1.5 
           transition-all duration-700 group-hover:scale-110 group-hover:tracking-[1px] 
           animate-float"
        >
          {/* 💫 Animated GitHub Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 transition-all duration-1000 group-hover:rotate-360 group-hover:scale-125 
             group-hover:text-purple-300 animate-bounce-slow flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.85 10.91.57.1.78-.25.78-.56 
              0-.28-.01-1.03-.02-2.02-3.19.69-3.86-1.54-3.86-1.54-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 
              1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 
              0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 
              3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.35.77 
              1.04.77 2.1 0 1.52-.01 2.75-.01 3.13 0 .31.21.67.79.56A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
            />
          </svg>
          
          <span className="uppercase tracking-wide font-black animate-pulse-text">
            {text}
          </span>
        </span>

        {/* ✨ Floating Particles */}
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400/50 rounded-full animate-ping-slow" />
        <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-ping-slow [animation-delay:1s]" />
        <span className="absolute top-1/2 -translate-y-1/2 -left-1 w-1 h-1 bg-indigo-400/50 rounded-full animate-ping-slow [animation-delay:2s]" />
      </a>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { transform: translateX(-50%) skewX(-15deg); }
          50% { transform: translateX(50%) skewX(-15deg); }
        }
        @keyframes gradient-y {
          0%, 100% { transform: translateY(-50%) skewY(-5deg); }
          50% { transform: translateY(50%) skewY(-5deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shimmer-reverse {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes border-spin {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(360deg) scale(1.02); }
        }
        @keyframes border-pulse {
          0%, 100% { box-shadow: 0 0 15px rgba(147, 51, 234, 0.8); }
          50% { box-shadow: 0 0 25px rgba(147, 51, 234, 1), 0 0 35px rgba(99, 102, 241, 0.8); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes ping-slow {
          75%, 100% { 
            transform: scale(2); 
            opacity: 0;
          }
        }
        @keyframes pulse-text {
          0%, 100% { text-shadow: 0 0 8px rgba(255,255,255,0.3); }
          50% { text-shadow: 0 0 15px rgba(147, 51, 234, 0.8), 0 0 20px rgba(99, 102, 241, 0.6); }
        }

        .animate-gradient-x { animation: gradient-x 8s ease-in-out infinite; }
        .animate-gradient-y { animation: gradient-y 6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        .animate-shimmer-reverse { animation: shimmer-reverse 2.5s linear infinite; }
        .animate-border-spin { animation: border-spin 4s linear infinite; }
        .animate-border-pulse { animation: border-pulse 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-pulse-text { animation: pulse-text 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Portfolio;