import { useEffect, useState } from "react";
import { X } from "lucide-react";

const OfferPopup = ({data}) => {
  const [show, setShow] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setShow(false);
      setAnimateOut(false);
    }, 400);
  };

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md transition-opacity duration-500 ${animateOut ? "opacity-0" : "opacity-100"}`}>
      
      {/* Floating Background Glow */}
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>

      {/* Modal */}
      <div className={`relative w-[92%] max-w-md p-[2px] rounded-3xl bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 animate-gradient ${animateOut ? "scale-75 opacity-0" : "scale-100 opacity-100"} transition-all duration-500`}>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 text-center relative overflow-hidden">

          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
          >
            <X size={24} />
          </button>

          {/* Confetti Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="confetti"></div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-800 mb-3 animate-bounce">
            🎉 MEGA OFFER!
          </h2>

          <p className="text-lg text-gray-700">
  Buy products worth only 
  <span className="text-red-600 font-bold text-2xl">{data?.minAmount} SAR</span> 
  and get
</p>

<p className="mt-3 text-2xl font-bold text-green-600 animate-pulse">
  🚚 Completely FREE Delivery!
</p>

          <button
            onClick={handleClose}
            className="mt-6 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-orange-500 hover:scale-105 transform transition duration-300 shadow-lg"
          >
            🛒 Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;