import { useEffect, useState } from "react";
import { useOffer } from "./useOffer";
import { X } from "lucide-react";

const OfferPopupCount = () => {
  const { offer, timeLeft } = useOffer();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const closed = localStorage.getItem(`offerClosed_${offer.id}`);
    if (!closed && timeLeft) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [offer.id, timeLeft]);

  if (!show || !timeLeft) return null;

  const handleClose = () => {
    localStorage.setItem(`offerClosed_${offer.id}`, "true");
    setShow(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fadeIn">

      <div className="relative w-[92%] max-w-md p-[2px] rounded-3xl bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 animate-gradient">

        <div className="bg-white rounded-3xl p-8 text-center relative">

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            <X />
          </button>

          <h2 className="text-2xl font-bold mb-3">
            {offer.title}
          </h2>

          <p className="text-gray-600 mb-4">
            {offer.description}
          </p>

          <div className="flex justify-center gap-3 text-red-500 font-bold text-lg">
            <div>{timeLeft.days}d</div>
            <div>{timeLeft.hours}h</div>
            <div>{timeLeft.minutes}m</div>
            <div>{timeLeft.seconds}s</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OfferPopupCount;