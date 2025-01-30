import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-teal-700 mb-6">Terms and Conditions</h1>
        <p className="text-gray-600 mb-8">
          Welcome to Islamic Essentials. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <div className="space-y-6">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By using this website, you agree to these Terms and Conditions. If you do not agree, please refrain from using our services.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">2. Use of the Website</h2>
            <p className="text-gray-600">
              You may use our website for lawful purposes only. You are prohibited from:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Engaging in any activity that disrupts the website's functionality.</li>
              <li>Attempting to gain unauthorized access to our systems.</li>
              <li>Using the website for any illegal or unethical purposes.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">3. Intellectual Property</h2>
            <p className="text-gray-600">
              All content on this website, including text, graphics, logos, and images, is the property of Islamic Essentials and is protected by intellectual property laws.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">4. Limitation of Liability</h2>
            <p className="text-gray-600">
              Islamic Essentials is not liable for any damages arising from the use of this website. We strive to provide accurate information, but we do not guarantee its completeness or accuracy.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">5. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. Your continued use of the website constitutes acceptance of the updated terms.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">6. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms and Conditions, please contact us at{' '}
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

export default TermsAndConditions;