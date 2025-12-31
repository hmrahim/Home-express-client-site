import React from "react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
       <Helmet>
                <title>Moom24-Contact</title>
            </Helmet>
      {/* HERO */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 animate-slideUp">
            Have questions or need professional service? Our team is ready to
            help you.
          </p>
        </div>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        {/* INFO */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-gray-600">
            Reach out to us for product inquiries, service booking, or technical
            support.
          </p>

          <InfoItem icon={<PhoneIcon />} title="Phone">
            +966 50 123 4567
          </InfoItem>

          <InfoItem icon={<EmailIcon />} title="Email">
            support@yourcompany.com
          </InfoItem>

          <InfoItem icon={<LocationIcon />} title="Address">
            Riyadh, Saudi Arabia
          </InfoItem>
        </div>

        {/* FORM */}
        <form className="bg-gray-50 p-8 rounded-2xl shadow-lg space-y-6">
          <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>

          <Input label="Full Name" placeholder="Your name" />
          <Input label="Email Address" placeholder="you@example.com" />
          <Input label="Phone Number" placeholder="+966..." />

          <div>
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:bg-green-700 hover:scale-[1.02] transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Visit Our Office</h2>
          <div className="w-full h-64 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600">
            Google Map Location
          </div>
        </div>
      </section>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const Input = ({ label, placeholder }) => (
  <div>
    <label className="block mb-2 font-medium">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
    />
  </div>
);

const InfoItem = ({ icon, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 text-green-600">{icon}</div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-gray-600">{children}</p>
    </div>
  </div>
);

/* ---------------- ICONS ---------------- */

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92V21a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 011 3h4.09a2 2 0 012 1.72c.12.81.3 1.6.54 2.36a2 2 0 01-.45 2L6 10a16 16 0 008 8l.92-1.18a2 2 0 012-.45c.76.24 1.55.42 2.36.54a2 2 0 011.72 2z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16v16H4z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 21s-6-5.5-6-10a6 6 0 0112 0c0 4.5-6 10-6 10z" />
    <circle cx="12" cy="11" r="2" />
  </svg>
);

export default Contact;
