"use client";

export default function PrivacyPolicy() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-sky-400 via-white/70 to-sky-200 text-slate-800">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-8 text-center">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-sky-800 leading-relaxed">
          <p>
            At <strong>Your Company</strong>, we value your privacy and are
            committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, and safeguard your data when
            you interact with our NFC products and services.
          </p>

          <h2 className="text-2xl font-semibold text-sky-900 mt-8">
            1. Information We Collect
          </h2>
          <p>
            We may collect personal details such as your name, email address,
            company information, and card interaction data when you use our
            services.
          </p>

          <h2 className="text-2xl font-semibold text-sky-900 mt-8">
            2. How We Use Your Information
          </h2>
          <p>
            Your information helps us improve our services, personalize your
            experience, and communicate important updates or offers. We never
            sell or share your data with third parties without your consent.
          </p>

          <h2 className="text-2xl font-semibold text-sky-900 mt-8">
            3. Data Security
          </h2>
          <p>
            We use industry-standard encryption and secure servers to protect
            your data from unauthorized access, disclosure, or misuse.
          </p>

          <h2 className="text-2xl font-semibold text-sky-900 mt-8">
            4. Cookies and Tracking
          </h2>
          <p>
            Our website may use cookies to enhance your browsing experience and
            analyze traffic. You can disable cookies anytime in your browser
            settings.
          </p>

          <h2 className="text-2xl font-semibold text-sky-900 mt-8">
            5. Your Rights
          </h2>
          <p>
            You may request access, correction, or deletion of your personal
            information at any time by contacting us at{" "}
            <a
              href="mailto:privacy@yourcompany.com"
              className="text-sky-600 underline"
            >
              privacy@yourcompany.com
            </a>
            .
          </p>

          <p className="mt-10 text-sm text-sky-600">
            For any questions about this Privacy Policy, please contact us.
          </p>
        </div>
      </div>
    </section>
  );
}
