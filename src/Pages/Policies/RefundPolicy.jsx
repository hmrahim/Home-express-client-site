import React from "react";

const RefundPolicy = () => {
  return (
    <>
       <div class="bg-white shadow">
    <div class="max-w-4xl mx-auto px-6 py-6">
      <h1 class="text-3xl font-bold">Refund Policy</h1>
      <p class="text-gray-500 mt-1">Customer satisfaction is our priority</p>
    </div>
  </div>

  <div class="max-w-4xl mx-auto px-6 py-10">
    <div class="bg-white rounded-xl shadow p-8 space-y-6">

      <div>
        <h2 class="font-semibold text-lg mb-2">✅ Eligible for Refund</h2>
        <ul class="list-disc pl-6 text-gray-600 space-y-1">
          <li>Wrong or damaged product delivered</li>
          <li>Order not delivered within promised time</li>
        </ul>
      </div>

      <div>
        <h2 class="font-semibold text-lg mb-2">❌ Not Eligible for Refund</h2>
        <ul class="list-disc pl-6 text-gray-600 space-y-1">
          <li>Used or damaged products</li>
          <li>Incorrect customer information</li>
          <li>Discounted or promotional items</li>
        </ul>
      </div>

      <p class="text-gray-600">
        Refunds are processed within <strong>3–7 business days</strong>
        using the original payment method.
      </p>

    </div>
  </div>
    </>
  );
};

export default RefundPolicy;
