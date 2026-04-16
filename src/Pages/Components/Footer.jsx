import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSettingsData } from "../../api/AllApi";
import Portfolio from "./Portfolio/Portfolio";

const Footer = () => {
  const [t, setT] = useState(0);

  const { data: settings } = useQuery({
    queryKey: ["getSettingsData"],
    queryFn: getSettingsData,
  });

  // 🔥 AUTO BACKGROUND ANIMATION
  useEffect(() => {
    const interval = setInterval(() => {
      setT((prev) => prev + 0.02);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // 🌿 Floating blobs
  const blob = (speed, size) => ({
    width: size,
    height: size,
    left: `${50 + Math.sin(t * speed) * 40}%`,
    top: `${50 + Math.cos(t * speed) * 40}%`,
  });

  return (
    <div className="relative overflow-hidden mt-20">

      {/* 🌿 Animated Blobs */}
      <div className="absolute inset-0 z-0">
        <div style={blob(1, 400)} className="absolute bg-emerald-400/30 blur-[120px] rounded-full" />
        <div style={blob(0.7, 450)} className="absolute bg-green-500/30 blur-[140px] rounded-full" />
        <div style={blob(1.3, 350)} className="absolute bg-emerald-500/30 blur-[120px] rounded-full" />
      </div>

      {/* 🌟 Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/10 to-transparent animate-[shimmer_8s_linear_infinite]" />

      {/* 🌑 Footer */}
      <footer className="relative z-10 animated-gradient backdrop-blur-2xl border-t border-emerald-500/20 text-white py-16 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* 🌿 About */}
            <div>
              <h3 className="text-2xl font-bold text-emerald-200 mb-4">
                About Us
              </h3>
              <p className="text-gray-100 text-sm leading-relaxed">
                {settings?.aboutText ||
                  "We build modern, scalable and visually stunning web experiences."}
              </p>
            </div>

            {/* 🔗 Links */}
            <div>
              <h3 className="text-2xl font-bold text-emerald-200 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Home", to: "/" },
                  { name: "About", to: "/about" },
                  { name: "Services", to: "/services" },
                  { name: "Contact", to: "/contact" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.to}
                      className="flex items-center gap-2 text-gray-100 hover:text-white transition group"
                    >
                      <span className="w-0 h-[2px] bg-white group-hover:w-6 transition-all duration-300"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 📞 Contact */}
            <div>
              <h3 className="text-2xl font-bold text-emerald-200 mb-4">
                Contact
              </h3>

              <div className="space-y-3 text-sm text-gray-100">

                <div className="flex items-center gap-3 hover:text-white transition">
                  📧
                  <a href={`mailto:${settings?.email}`}>
                    {settings?.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 hover:text-white transition">
                  📞
                  <a href={`tel:${settings?.phone}`}>
                    {settings?.phone}
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  📍
                  <span>{settings?.address}</span>
                </div>
              </div>

              {/* 🌐 Social */}
              <div className="flex gap-4 mt-6">
                {["🌐", "💻", "📱"].map((icon, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl flex items-center justify-center 
                    hover:scale-110 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-500 cursor-pointer"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🔥 Bottom */}
          <div className="mt-16 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-gray-200 text-sm">
              &copy; {settings?.copyright || "All rights reserved"}
            </p>

            <Portfolio />
          </div>
        </div>
      </footer>

      {/* ✨ Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-gradient {
          background: linear-gradient(
            270deg,
            #022c22,
            #065f46,
            #047857,
            #059669,
            #10b981
          );
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Footer;