import React from 'react';

const TermsConditions = () => {
 return (
    <>
      <div class="bg-white shadow">
    <div class="max-w-4xl mx-auto px-6 py-6">
      <h1 class="text-3xl font-bold">Terms & Conditions</h1>
      <p class="text-gray-500 mt-1">Please read carefully</p>
    </div>
  </div>

  <div class="max-w-4xl mx-auto px-6 py-10">
    <div class="bg-white rounded-xl shadow p-8 space-y-4">

      <ul class="list-disc pl-6 space-y-2 text-gray-600">
        <li>This website operates under Saudi Arabia law.</li>
        <li>Users must provide accurate and lawful information.</li>
        <li>All prices are listed in Saudi Riyal (SAR).</li>
        <li>Orders are confirmed only after successful payment.</li>
        <li>Illegal or unethical usage is strictly prohibited.</li>
      </ul>

      <p class="text-gray-600">
        We reserve the right to update these terms at any time.
      </p>

    </div>
  </div>
    </>
  );
};

export default TermsConditions;