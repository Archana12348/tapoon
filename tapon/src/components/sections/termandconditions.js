"use client";

export default function TermsAndConditions() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-sky-400 via-white/70 to-sky-200 text-slate-800">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-8 text-center">
          Terms and Conditions
        </h1>

        <div className="space-y-6 text-sky-800 leading-relaxed">
          <p>
            Welcome to <strong>Your Company</strong>. By accessing or using our
            products and services, you agree to comply with and be bound by the
            following Terms and Conditions.
          </p>

          <h2 className="text-2xl font-semibold text-sky-900 mt-8">
            1. Acceptance of Terms
          </h2>
          <p>
            By using our services, you confirm that you have read and agree to
            these terms. If you do not agree, please refrain from using our
            website or products.
          </p>

          <h2 className="text-2xl font-semibold text-sky-900 mt-8">
            2. Use of Services
          </h2>
          <p>
            Our NFC products are provided for personal and professional use
            only. You agree not to misuse the service or engage in unlawful
            activities using our technology.
          </p>

          <h2 className="text-2xl font-semibold text-sky-900 mt-8">
            3. Intellectual Property
          </h2>
          <p>
            All content, logos, and materials on our website are the property of{" "}
            <strong>Your Company</strong> and may not be copied or used without
            prior written permission.
          </p>

          <h2 className="text-2xl font-semibold text-sky-900 mt-8">
            4. Limitation of Liability
          </h2>
          <p>
            We are not responsible for any damages resulting from the use or
            inability to use our services. Use our products at your own risk.
          </p>

          <h2 className="text-2xl font-semibold text-sky-900 mt-8">
            5. Changes to Terms
          </h2>
          <p>
            We may update these Terms and Conditions from time to time. The
            latest version will always be available on this page.
          </p>

          <p className="mt-10 text-sm text-sky-600">
            For questions regarding these Terms, contact us at{" "}
            <a
              href="mailto:support@yourcompany.com"
              className="text-sky-600 underline"
            >
              support@yourcompany.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
