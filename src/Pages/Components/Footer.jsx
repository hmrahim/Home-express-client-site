import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Dashboard/AuthClient/AuthContext";

const Footer = () => {
  const { settings } = useContext(AuthContext);

  return (
    <div>
      <footer className="bg-gradient-to-r from-green-500 to-emerald-600 text-white mt-20">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* <!-- About Section --> */}
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-white text-sm">{settings?.aboutText}</p>
            </div>

            {/* <!-- Quick Links --> */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-white text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <Link
                    to="/policies/privacy-policy"
                    className="hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* <!-- Contact Info --> */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="text-white text-sm space-y-2">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@yourwebsite.com"
                    className="hover:text-white transition"
                  >
                    {settings?.email}
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a href="tel:+1234567890" className="hover:text-white transition">
                    {settings?.phone}
                  </a>
                </li>
                <li>{settings?.address}</li>
              </ul>

              {/* <!-- Social Links --> */}
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-white hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h11.06v-9.29H9.69v-3.62h3.14V8.41c0-3.1 1.89-4.79 4.66-4.79 1.32 0 2.46.1 2.79.14v3.24l-1.92.001c-1.51 0-1.8.72-1.8 1.77v2.32h3.6l-.47 3.62h-3.13V24h6.13c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.44 9.79 8.2 11.38.6.11.82-.26.82-.58v-2.02c-3.34.73-4.03-1.61-4.03-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.84 1.31 3.53 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.52 11.52 0 0 1 3-.41c1.02.01 2.04.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.57C20.56 21.79 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.949.555-2.005.959-3.127 1.184-.897-.959-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .39.044.765.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.425.729-.666 1.577-.666 2.476 0 1.71.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.317 0-.626-.03-.927-.086.627 1.956 2.444 3.379 4.6 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.395 0-.785-.023-1.17-.068 2.179 1.397 4.768 2.212 7.557 2.212 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.016-.633.962-.695 1.8-1.562 2.46-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* <!-- Bottom Text --> */}
          <div className="mt-12 border-t border-white pt-6 text-center text-white text-sm">
            &copy; {settings?.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
