import { useQuery } from "@tanstack/react-query";
import { getMarquee } from "../../api/AllApi";

export default function MarqueeHeader() {
  const { data, isPending } = useQuery({
    queryKey: ["marquees"],
    queryFn: getMarquee,
    refetchInterval: 1000,
  });
  return (
    <div className=" overflow-hidden bg-red-700 text-white  opacity-100 fixed z-10 top-0">
      {/* Gradient fade sides */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-red-700 to-transparent z-10"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-green-700 to-transparent z-10"></div>

      {/* Marquee Track */}
      <div style={{ animation: "marquee 80s linear infinite" }} className="whitespace-nowrap flex animate-marquee hover:[animation-play-state:paused]">
        {isPending ? (
          <span className="mx-10">Loading...</span>
        ) : (
          data &&
          data?.data.data.map((marquee) => (
            <span key={marquee._id} className="mx-10">
              {marquee.text}
            </span>
          ))
        )}
        {isPending ? (
          <span className="mx-10">Loading...</span>
        ) : (
          data &&
          data?.data.data.map((marquee) => (
            <span key={marquee._id} className="mx-10">
              {marquee.text}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
