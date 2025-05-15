'use client'

import Image from "next/image";
import { useForm, ValidationError } from '@formspree/react';

export default function Footer() {
  const form_spree_endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT as string;
  const [state, handleSubmit] = useForm(form_spree_endpoint);

  return (
    <footer className="bg-gray-500 text-white px-4 pt-8 pb-4">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row md:items-start justify-between max-w-7xl w-full">

        {/* Newsletter Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 mb-6 md:mb-0">
          <p className="text-lg md:text-xl font-medium mb-2">Join our email newsletter!</p>
          
          {state.succeeded ? (
            <p className="text-green-200 mt-2">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-md">
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Enter Email"
                className="w-full px-4 py-2 text-black bg-white"
              />
              <input type="hidden" name="message" value="Newsletter Subscription Request" />
              <button
                type="submit"
                disabled={state.submitting}
                className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 text-white font-semibold border border-white"
              >
                Subscribe
              </button>
            </form>
          )}
          <ValidationError prefix="Email" field="email" errors={state.errors} />
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
