import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Auth from "../../firebase.init";

const VerifyEmail = () => {
  const [user, loading] = useAuthState(Auth);
  const navigate = useNavigate();

  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [checking, setChecking] = useState(false);

  // 🔥 Auto check verification every 3s
  useEffect(() => {
    const interval = setInterval(async () => {
      if (Auth.currentUser) {
        await Auth.currentUser.reload();

        if (Auth.currentUser.emailVerified) {
          navigate("/dashboard");
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  // ⏳ Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // 📩 Send verification
  const handleSendVerification = async () => {
    if (!user) return;

    setSending(true);
    await sendEmailVerification(user);
    setSending(false);
    setCooldown(30);
  };

  // 🔄 Manual check
  const handleCheckNow = async () => {
    setChecking(true);

    await Auth.currentUser.reload();

    if (Auth.currentUser.emailVerified) {
      navigate("/dashboard");
    } else {
      alert("Still not verified ❌");
    }

    setChecking(false);
  };

  // 🚪 Logout
  const handleLogout = async () => {
    await signOut(Auth);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-900 text-white text-xl animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-700 to-green-800 px-4">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-green-300/20 rounded-3xl shadow-2xl p-8 text-center text-white transform transition duration-500 hover:scale-105">
        
        {/* Title */}
        <h2 className="text-3xl font-bold mb-3 text-green-200 animate-bounce">
          Verify Your Email 📧
        </h2>

        <p className="text-green-100/80 mb-6 text-sm">
          A verification link has been sent to your email.
          Please check your spam folder and  verify to continue.
        </p>

        {/* Email */}
        <div className="bg-white/10 p-3 rounded-lg mb-6 text-sm break-all border border-green-300/20">
          {user?.email}
        </div>

        {/* Resend */}
        <button
          onClick={handleSendVerification}
          disabled={sending || cooldown > 0}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {sending
            ? "Sending..."
            : cooldown > 0
            ? `Resend in ${cooldown}s`
            : "Resend Verification Email"}
        </button>

        {/* Check Now */}
        <button
          onClick={handleCheckNow}
          disabled={checking}
          className="mt-4 w-full py-2 rounded-xl border border-green-300/40 hover:bg-green-500/20 transition"
        >
          {checking ? "Checking..." : "I have verified"}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-5 w-full py-2 rounded-xl border border-red-400 text-red-300 hover:bg-red-500 hover:text-white transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default VerifyEmail;