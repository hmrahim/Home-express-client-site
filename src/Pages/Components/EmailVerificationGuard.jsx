// EmailVerificationGuard.jsx

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { sendEmailVerification, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const EmailVerificationGuard = () => {
  const [user, loading] = useAuthState(auth);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.emailVerified) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleResendVerification = async () => {
    try {
      setSending(true);
      await sendEmailVerification(auth.currentUser, {
        url: "https://moom24.com/verified-email",
        handleCodeInApp: true,
      });
      setMessage("Verification email sent! Please check your inbox.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSending(false);
    }
  };

  const handleCheckAgain = async () => {
    await auth.currentUser.reload();
    if (auth.currentUser.emailVerified) {
      navigate("/dashboard");
    } else {
      setMessage("Email is still not verified.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-emerald-500 to-blue-500 p-6">
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-md w-full text-center border border-white/30 relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-xs text-white/80 hover:text-white transition"
        >
          Logout
        </button>

        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-full shadow-lg text-2xl">📧</div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Verify Your Email
        </h2>

        <p className="text-white/80 mb-2 text-sm">Logged in as:</p>

        <p className="text-white font-semibold mb-6 break-words">
          {user?.email}
        </p>

        <p className="text-white/80 mb-6 text-sm">
          Please verify your email to access your dashboard. Check your email spam folder if you don't see the verification email. If you haven't received it, click the button below to resend.
        </p>
    

        {message && (
          <div className="bg-white/30 text-white text-sm p-3 rounded-xl mb-4">
            {message}
          </div>
        )}

        <button
          onClick={handleResendVerification}
          disabled={sending}
          className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transition transform duration-200 disabled:opacity-50"
        >
          {sending ? "Sending..." : "Resend Verification Email"}
        </button>

        <button
          onClick={handleCheckAgain}
          className="w-full mt-4 border border-white text-white py-3 rounded-xl hover:bg-white hover:text-indigo-600 transition duration-200"
        >
          I Have Verified
        </button>

        <div className="mt-6 text-xs text-white/70">
          Want to use another email?
          <button
            onClick={handleLogout}
            className="ml-1 underline hover:text-white"
          >
            Logout & Signup Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationGuard;
