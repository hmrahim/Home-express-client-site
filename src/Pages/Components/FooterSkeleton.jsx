import React from 'react';

const FooterSkeleton = () => {
    return (
        <div>
            <footer class="bg-gradient-to-r from-green-500 to-emerald-600 text-white mt-20 p-8 animate-pulse">
  <div class="max-w-6xl mx-auto space-y-8">

    {/* <!-- Top Grid Section --> */}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* <!-- About Section --> */}
      <div class="space-y-4">
        <div class="h-6 w-32 bg-gray-300 rounded"></div>
        <div class="h-4 w-full bg-gray-300 rounded"></div>
        <div class="h-4 w-5/6 bg-gray-300 rounded"></div>
        <div class="h-4 w-3/4 bg-gray-300 rounded"></div>
      </div>

      {/* <!-- Quick Links --> */}
      <div class="space-y-4">
        <div class="h-6 w-28 bg-gray-300 rounded"></div>
        <div class="space-y-2">
          <div class="h-3 w-3/4 bg-gray-300 rounded"></div>
          <div class="h-3 w-2/3 bg-gray-300 rounded"></div>
          <div class="h-3 w-1/2 bg-gray-300 rounded"></div>
          <div class="h-3 w-5/6 bg-gray-300 rounded"></div>
          <div class="h-3 w-2/3 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* <!-- Contact Section --> */}
      <div class="space-y-4">
        <div class="h-6 w-32 bg-gray-300 rounded"></div>
        <div class="space-y-2">
          <div class="h-3 w-full bg-gray-300 rounded"></div>
          <div class="h-3 w-5/6 bg-gray-300 rounded"></div>
          <div class="h-3 w-2/3 bg-gray-300 rounded"></div>
        </div>

        {/* <!-- Social Icons --> */}
        <div class="flex space-x-4 mt-4">
          <div class="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div class="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div class="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>

    </div>

    {/* <!-- Bottom Text --> */}
    <div class="mt-12 border-t border-white pt-6">
      <div class="h-3 w-32 bg-gray-300 rounded mx-auto"></div>
    </div>

  </div>
</footer>

        </div>
    );
};

export default FooterSkeleton;