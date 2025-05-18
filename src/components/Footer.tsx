'use client'

import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/secrets/formspree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          message: 'Newsletter Subscription Request',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSucceeded(true);
        setEmail('');
      } else {
        setError(data?.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to submit form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-500 text-white px-4 pt-8 pb-4">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row md:items-start justify-between max-w-7xl w-full">

        {/* Newsletter Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 mb-6 md:mb-0">
          <p className="text-lg md:text-xl font-medium mb-2">Join our email newsletter!</p>
          
          {succeeded ? (
            <p className="text-green-200 mt-2">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-md">
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-black bg-white"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 text-white font-semibold border border-white"
              >
                {submitting ? 'Sending...' : 'Subscribe'}
              </button>
            </form>
          )}
          {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
        </div>

        {/* Social Section */}
        <div className="flex flex-col items-center md:items-end w-full md:w-1/2">
          <p className="mb-2">Our Platforms</p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/utexas.habitat/" target="_blank" rel="noopener noreferrer">
              <Image src="/instagram-brands.svg" alt="Instagram" width={20} height={20} />
            </a>
            <a href="https://join.slack.com/t/uthabitatforhumanity/shared_invite/zt-2fwdw8z46-GYDSpLYWRGxiBRJPjCSgGg" target="_blank" rel="noopener noreferrer">
              <Image src="/slack-brands.svg" alt="Slack" width={20} height={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-6">
        © 2024 Austin Habitat for Humanity
      </div>
    </footer>
  );
}
