import React from 'react';

const PrivacyPolicy = () => {
    return (
    <>
      <div className="bg-white shadow">
    <div className="max-w-4xl mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-gray-500 mt-1">Your privacy matters to us</p>
    </div>
  </div>

  <div className="max-w-4xl mx-auto px-6 py-10">
    <div className="bg-white rounded-xl shadow p-8 space-y-4">
      <p className="leading-relaxed text-gray-600">
        We are committed to protecting your personal information and privacy.
      </p>

      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li>We collect name, phone, email, and address information.</li>
        <li>Location data is used only for delivery purposes.</li>
        <li>Your data is never sold to third parties.</li>
        <li>All information is securely stored.</li>
      </ul>

      <p className="text-gray-600">
        For any privacy-related questions, contact us at  
        <strong>support@yourwebsite.com</strong>
      </p>
    </div>
  </div>
    </>
  );
};

export default PrivacyPolicy;