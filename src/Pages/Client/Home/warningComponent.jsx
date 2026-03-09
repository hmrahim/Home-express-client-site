import { Link } from "react-router-dom";

export default function WarningComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M5.93 19h12.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L4.2 16c-.77 1.33.19 3 1.73 3z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-red-600 mb-3">
          Service Not Available
        </h2>

        {/* Message */}
        <p className="text-gray-600 leading-relaxed">
          You are currently outside{" "}
          <span className="font-semibold text-gray-800">Riyadh City</span>.
          <br />
          Unfortunately, we only accept orders within Riyadh.
          <br />
          Please try again if you are inside the service area.
        </p>

        {/* Button */}
        <Link to="/" className="btn mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition duration-300 font-semibold">
          Go Back
        </Link>
      </div>
    </div>
  );
}
