import React from "react";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      <Helmet>
          <title>Moom24-About</title>
      </Helmet>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-primary to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Our Store
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100">
            We are a modern e-commerce platform committed to quality, trust, and
            customer satisfaction.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div className="flex gap-4">
          <MissionIcon />
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To provide high-quality products at affordable prices while
              delivering an exceptional online shopping experience.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <VisionIcon />
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted and customer-centric e-commerce brand
              in the region.
            </p>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Our journey started with a simple idea — to make online shopping
              reliable, transparent, and enjoyable. What began as a small
              initiative has now grown into a trusted online marketplace serving
              thousands of customers.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="team"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <Feature icon={<CheckIcon />} title="Quality Products" />
          <Feature icon={<TruckIcon />} title="Fast Delivery" />
          <Feature icon={<ShieldIcon />} title="Secure Payments" />
          <Feature icon={<SupportIcon />} title="24/7 Support" />
        </div>
      </section>

      {/* TRUST STATS */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-3 text-center gap-8">
          <Stat number="50K+" label="Happy Customers" />
          <Stat number="10K+" label="Orders Delivered" />
          <Stat number="99%" label="Customer Satisfaction" />
        </div>
      </section>

      {/* CUSTOMER PROMISE */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Promise</h2>
        <p className="text-gray-600 text-lg">
          We promise honesty, quality, and complete transparency in every order
          you place with us.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop With Us?</h2>
          <p className="text-gray-600 mb-6">
            Discover thousands of products made just for you.
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-700 transition">
            Explore Products
          </button>
        </div>
      </section>
    </div>
  );
};

/* ---------------- ICONS & COMPONENTS ---------------- */

const Feature = ({ icon, title }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <div className="w-12 h-12 mx-auto mb-4 text-blue-600">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
  </div>
);

const Stat = ({ number, label }) => (
  <div>
    <h3 className="text-4xl font-bold">{number}</h3>
    <p className="text-indigo-200 mt-2">{label}</p>
  </div>
);

/* ---------------- SVG ICONS ---------------- */

const MissionIcon = () => (
  <svg
    className="w-10 h-10 text-blue-600"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l4 8-4 4-4-4 4-8z" />
    <path d="M12 14v8" />
  </svg>
);

const VisionIcon = () => (
  <svg
    className="w-10 h-10 text-indigo-600"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13" />
    <path d="M16 8h4l3 3v5h-7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

export default About;
