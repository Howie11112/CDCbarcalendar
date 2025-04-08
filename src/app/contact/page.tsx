'use client';

import { useTranslation } from '@/components/i18n/useTranslation';
import { useState } from 'react';

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
          <div className="space-y-4 text-gray-300">
            <p>
              Have questions about our events or want to list your bar's events on our
              platform? We'd love to hear from you!
            </p>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Email</h2>
              <a
                href="mailto:pingyigenz@outlook.com"
                className="text-gold-500 hover:text-gold-400"
              >
                pingyigenz@outlook.com
              </a>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Follow Us</h2>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-500 hover:text-gold-400"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div>
          {isSubmitted ? (
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-green-400 text-lg">
                Thank you for your message! We'll get back to you soon.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 text-gold-500 hover:text-gold-400"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border-transparent focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border-transparent focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border-transparent focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-500 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gold-600 transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 