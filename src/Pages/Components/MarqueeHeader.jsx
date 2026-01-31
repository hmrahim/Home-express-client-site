export default function MarqueeHeader() {
  return (
    <div className=" overflow-hidden bg-red-700 text-white  opacity-100 fixed z-10 top-0">

      {/* Gradient fade sides */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-red-700 to-transparent z-10"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-green-700 to-transparent z-10"></div>

      {/* Marquee Track */}
      <div className="whitespace-nowrap flex animate-marquee hover:[animation-play-state:paused]">

        <span className="mx-10">
          🚚 Free Shipping Over $50
        </span>
        <span className="mx-10">
          🔥 Big Sale Up To 40% Off
        </span>
        <span className="mx-10">
          🎁 New Arrivals Daily
        </span>
        <span className="mx-10">
          💳 Secure Payment
        </span>

        {/* Duplicate for seamless loop */}
        <span className="mx-10">
          🚚 Free Shipping Over $50
        </span>
        <span className="mx-10">
          🔥 Big Sale Up To 40% Off
        </span>
        <span className="mx-10">
          🎁 New Arrivals Daily
        </span>
        <span className="mx-10">
          💳 Secure Payment
        </span>

      </div>
    </div>
  );
}
