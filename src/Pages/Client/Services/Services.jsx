import React from "react";
import { Helmet } from "react-helmet-async";

const Services = () => {
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <Helmet>
          <title>Moom24-Services</title>
      </Helmet>
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            Our Professional Services
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 animate-slideUp">
            We provide expert installation, maintenance, and technical solutions
            with trusted professionals.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-14">What We Offer</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            title="Electrical Services"
            desc="Professional electrical installation, wiring, repair, and maintenance."
            icon={<ElectricIcon />}
          />

          <ServiceCard
            title="Plumbing Services"
            desc="Reliable plumbing solutions including pipe fixing and water system maintenance."
            icon={<PlumbingIcon />}
          />

          <ServiceCard
            title="Networking Solutions"
            desc="Complete network setup, cable management, and system optimization."
            icon={<NetworkIcon />}
          />

          <ServiceCard
            title="CCTV Installation"
            desc="Secure CCTV camera setup, monitoring system installation, and maintenance."
            icon={<CctvIcon />}
          />
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10 text-center">
          <WhyCard title="Expert Technicians" icon={<ExpertIcon />} />
          <WhyCard title="Trusted & Reliable" icon={<TrustIcon />} />
          <WhyCard title="Fast Service" icon={<SpeedIcon />} />
        </div>
      </section>

      {/* PROCESS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-14">How It Works</h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <Step number="1" text="Book Service" />
          <Step number="2" text="Expert Visit" />
          <Step number="3" text="Installation / Repair" />
          <Step number="4" text="Service Complete" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Professional Service?
          </h2>
          <p className="text-indigo-200 mb-6">
            Contact us today and get expert solutions at your doorstep.
          </p>
          <button className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:scale-105 transition">
            Book a Service
          </button>
        </div>
      </section>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const ServiceCard = ({ title, desc, icon }) => (
  <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
    <div className="w-14 h-14 text-primary mb-6 group-hover:scale-110 transition">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const WhyCard = ({ title, icon }) => (
  <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
    <div className="w-12 h-12 mx-auto text-primary mb-4">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
  </div>
);

const Step = ({ number, text }) => (
  <div className="relative">
    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <p className="font-medium">{text}</p>
  </div>
);

/* ---------------- ICONS ---------------- */

const ElectricIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);

const PlumbingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v20M6 6h12M6 18h12" />
  </svg>
);

const NetworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="5" r="3" />
    <circle cx="5" cy="19" r="3" />
    <circle cx="19" cy="19" r="3" />
    <path d="M12 8v5M12 13l-5 3M12 13l5 3" />
  </svg>
);

const CctvIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="8" />
    <circle cx="12" cy="11" r="2" />
  </svg>
);

const ExpertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 22a6.5 6.5 0 0113 0" />
  </svg>
);

const TrustIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
  </svg>
);

const SpeedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v9l6 6" />
  </svg>
);

export default Services;
