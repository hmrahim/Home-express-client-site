import React from "react";
import { NavLink } from "react-router-dom";

const AnimatedQuotationButton = ({
  to = "/dashboard/quotation",
  children = "Get a Quotation",
}) => {
  return (
    <NavLink
      to={to}
      className="relative px-4 py-2.5 text-xs font-bold bg-white text-indigo-600 
      rounded-full overflow-hidden group shadow-lg shadow-indigo-500/20 
      hover:shadow-orange-400/40 transition-all duration-500 transform-gpu 
      hover:-translate-y-0.5 hover:scale-105 active:scale-95"
    >
      {/* 🧡 Animated Multi-Layer Background */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600
        animate-gradient-x opacity-0 group-hover:opacity-100"
      />

      {/* 🌟 Shimmer */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
        animate-shimmer w-[200%] group-hover:animate-shimmer-reverse"
      />

      {/* 🔶 Moving Border */}
      <span
        className="absolute inset-0 rounded-full border border-transparent 
        bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 
        p-[1px] animate-border-spin group-hover:animate-border-pulse"
      />

      {/* ✨ Inner Glow */}
      <span
        className="absolute inset-[2px] rounded-full bg-gradient-to-r from-white/90 via-orange-50 to-white/90 
        animate-pulse-slow opacity-80 group-hover:opacity-100"
      />

      {/* Core */}
      <span className="absolute inset-[4px] rounded-full bg-white/95 backdrop-blur-sm" />

      {/* Content */}
      <span
        className="relative z-20 flex items-center gap-1.5 
        transition-all duration-700 group-hover:scale-110 group-hover:tracking-[1px] 
        animate-float text-orange-600"
      >
        <svg
          className="w-3.5 h-3.5 transition-all duration-1000 group-hover:rotate-12 
          group-hover:scale-125 text-orange-600 group-hover:text-orange-500 animate-bounce-slow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>

        <span className="uppercase tracking-wide font-black animate-pulse-text text-orange-600">
          {children}
        </span>
      </span>

      {/* Floating dots */}
      <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-600/60 rounded-full animate-ping-slow" />
      <span className="absolute -bottom-1 -left-1 w-1 h-1 bg-amber-600/60 rounded-full animate-ping-slow [animation-delay:800ms]" />
      <span className="absolute top-1/2 -translate-y-1/2 -right-1 w-1 h-1 bg-orange-400/60 rounded-full animate-ping-slow [animation-delay:1.6s]" />

      {/* 🎨 Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { transform: translateX(-50%) skewX(-10deg); }
          50% { transform: translateX(50%) skewX(-10deg); }
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
          0%, 100% {
            box-shadow: 0 0 12px rgba(249, 115, 22, 0.7);
          }
          50% {
            box-shadow: 0 0 22px rgba(251, 146, 60, 1),
                        0 0 35px rgba(249, 115, 22, 0.9);
          }
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
          50% { transform: translateY(-3px); }
        }

        @keyframes ping-slow {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes pulse-text {
          0%, 100% {
            text-shadow: 0 0 6px rgba(249, 115, 22, 0.5);
            color: #c2410c;
          }
          50% {
            text-shadow: 0 0 14px rgba(251, 146, 60, 1),
                         0 0 20px rgba(249, 115, 22, 0.8);
            color: #ffffff;
          }
        }

        .animate-gradient-x { animation: gradient-x 6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2.5s linear infinite; }
        .animate-shimmer-reverse { animation: shimmer-reverse 2s linear infinite; }
        .animate-border-spin { animation: border-spin 3s linear infinite; }
        .animate-border-pulse { animation: border-pulse 1.8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-pulse-text { animation: pulse-text 1.8s ease-in-out infinite; }
      `}</style>
    </NavLink>
  );
};

export default AnimatedQuotationButton;