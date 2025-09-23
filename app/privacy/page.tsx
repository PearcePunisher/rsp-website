import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy outlining how we collect, use, and protect personal information.'
};

const EFFECTIVE_DATE = 'September 23, 2025'; // update as needed
const CONTACT_EMAIL = 'riley@roguesalad.co';
const BUSINESS_NAME = 'Rogue Salad Productions';
const CONTACT_PHONE = '719-776-0390'; // optional

export default function PrivacyPage() {
  return (
    <article className="container-max py-16 max-w-3xl space-y-10">
      <header className="space-y-2">
        <h1 className="font-display tracking-wide">Privacy Policy</h1>
        <p className="text-sm text-slate-400">Effective Date: {EFFECTIVE_DATE}</p>
      </header>
      <section className="space-y-6 prose prose-invert max-w-none">
        <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.</p>

        <h2>Information We Collect</h2>
        <p>We only collect the information necessary to contact you, such as:</p>
        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your phone number (if provided)</li>
        </ul>
        <p>We do not collect any sensitive personal information or payment details through this website.</p>

        <h2>How We Use Your Information</h2>
        <p>The information you provide is used solely to:</p>
        <ul>
          <li>Respond to your inquiries</li>
          <li>Provide you with information about our services</li>
          <li>Communicate with you about potential projects</li>
        </ul>
        <p>We do not sell, trade, or share your information with third parties for marketing purposes.</p>

        <h2>Data Protection</h2>
        <p>We take reasonable steps to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

        <h2>Cookies</h2>
        <p>Our website may use cookies to improve your browsing experience. You can adjust your browser settings to refuse cookies if you prefer.</p>

        <h2>Your Rights</h2>
        <p>You may request to access, update, or delete your personal information at any time by contacting us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or how your information is handled, please contact us at:</p>
        <p>
          <strong>{BUSINESS_NAME}</strong><br />
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><br />
          {CONTACT_PHONE && <span>{CONTACT_PHONE}</span>}
        </p>
        <p className="text-xs text-slate-500 mt-8">Last updated: {EFFECTIVE_DATE}</p>
      </section>
      <div className="pt-4 border-t border-cyan-500/20">
        <Link href="/" className="text-xs text-cyan-300 hover:underline">← Home</Link>
      </div>
    </article>
  );
}
