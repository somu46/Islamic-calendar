import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-teal-700 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">
          At Islamic Essentials, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
        </p>

        <div className="space-y-6">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">1. Information We Collect</h2>
            <p className="text-gray-600">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Personal information (e.g., name, email address) provided voluntarily.</li>
              <li>Usage data, such as IP address, browser type, and pages visited.</li>
              <li>Cookies and tracking technologies to enhance your experience.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">2. How We Use Your Information</h2>
            <p className="text-gray-600">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Provide and improve our services.</li>
              <li>Respond to your inquiries and requests.</li>
              <li>Send newsletters or updates (if you opt-in).</li>
              <li>Analyze website usage and trends.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">3. Data Security</h2>
            <p className="text-gray-600">
              We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">4. Third-Party Services</h2>
            <p className="text-gray-600">
              We may use third-party services (e.g., Google Analytics) to analyze website traffic. These services have their own privacy policies.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">5. Your Rights</h2>
            <p className="text-gray-600">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Access, update, or delete your personal information.</li>
              <li>Opt-out of receiving marketing communications.</li>
              <li>Request information about how your data is used.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">6. Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">7. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:contact@islamicalendar.com" className="text-teal-600 hover:underline">
                contact@islamicalendar.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;