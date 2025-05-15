"use client";

import "../styles/default.css";
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const form_spree_endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT as string
  const [state, handleSubmit] = useForm(form_spree_endpoint);
  return (
    <div className='body-bg min-h-screen'>
      <div className="pt-[2%] text-center max-w-2xl mx-auto px-4">
        <p className='text-white font-bold text-4xl'> Contact Us </p>
          <p className='text-white text-lg mt-4'> Please fill out the form below and we'll get back to you ASAP! </p>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className='text-white text-sm text-left block mb-1'>
                  Name: *
                </label>
                <input 
                  id="name"
                  name="name"
                  type="text" 
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/70 border border-white/20 text-gray placeholder-gray/50 focus:outline-none focus:border-white/50"
                  placeholder="Enter your name"
                />
                <ValidationError 
                  prefix="Name" 
                  field="name"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="email" className='text-white text-sm text-left block mb-1'>
                  Email: *
                </label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/70 border border-white/20 text-gray placeholder-gray/50 focus:outline-none focus:border-white/50"
                  placeholder="Enter your email"
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="message" className='text-white text-sm text-left block mb-1'>
                  Comments/Concerns/Suggestions: *
                </label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white/70 border border-white/20 text-gray placeholder-gray/50 focus:outline-none focus:border-white/50"
                  placeholder="Enter your message"
                />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            {state.succeeded ? 
            <p className="w-full bg-white/70 text-gray-600 font-bold py-3 px-6 rounded-lg text-center text-xl">Thanks for sending us a message!</p> 
            : 
            <button 
              type="submit"
              disabled={state.submitting}
              className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? 'Sending...' : 'Send Message'}
            </button>
            }
          </form>
      </div>
    </div>
  );
}