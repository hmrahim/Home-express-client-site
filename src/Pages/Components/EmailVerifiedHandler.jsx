import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import auth from "../../firebase.init";


const EmailVerifiedHandler = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      const oobCode = params.get("oobCode");

      if (!oobCode) {
        setStatus("Invalid or expired link.");
        return;
      }

      try {
        await applyActionCode(auth, oobCode);
        setStatus("Email verified successfully! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 2500);
      } catch (error) {
        setStatus("Verification failed or link expired.");
      }
    };

    verifyEmail();
  }, [params, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-emerald-600">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default EmailVerifiedHandler;