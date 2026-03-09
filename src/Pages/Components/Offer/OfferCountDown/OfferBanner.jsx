import { useOffer } from "./useOffer";

const OfferBanner = () => {
  const { offer, timeLeft } = useOffer();

  if (!timeLeft) return null;

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-center py-2 text-sm font-semibold">
      {offer.description} | 
      Ends in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
};

export default OfferBanner;