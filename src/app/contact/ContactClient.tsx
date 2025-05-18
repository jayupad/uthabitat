'use client';

import React, { useState } from 'react';

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/secrets/formspree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSucceeded(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(data?.error || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('Failed to submit form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='body-bg min-h-screen'>
      <div className="pt-[2%] text-center max-w-2xl mx-auto px-4">
        <p className='text-white font-bold text-4xl'> Contact Us </p>
        <p className='text-white text-lg mt-4'> Please fill out the form below and we&#39;ll get back to you ASAP! </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {['name', 'email'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className='text-white text-sm text-left block mb-1'>
                  {field.charAt(0).toUpperCase() + field.slice(1)}: *
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  required
                  value={formData[field as 'name' | 'email']}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/70 border border-white/20 text-gray placeholder-gray/50 focus:outline-none focus:border-white/50"
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className='text-white text-sm text-left block mb-1'>
                Comments/Concerns/Suggestions: *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/70 border border-white/20 text-gray placeholder-gray/50 focus:outline-none focus:border-white/50"
                placeholder="Enter your message"
              />
            </div>
          </div>

          {succeeded ? (
            <p className="w-full bg-white/70 text-gray-600 font-bold py-3 px-6 rounded-lg text-center text-xl">
              Thanks for sending us a message!
            </p>
          ) : (
            <>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
