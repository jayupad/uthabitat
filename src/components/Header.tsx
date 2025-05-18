"use client";

import Link from "next/link";
import Dropdown from "./Dropdown";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import PasswordModal from './PasswordModal';

export default function Header() {
  const about_dropdowns = ["About Us", "Get Involved", "Executive Board", "FAQs"]
  const about_hrefs = ["about-us", "get-involved", "exec-board", "faqs"]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();

  const handleMemberClick = async () => {
    try {
      const res = await fetch('/api/secrets/check-auth', {
        method: 'GET',
        credentials: 'include',
      });
      const { authenticated } = await res.json();

      if (authenticated) {
        router.push('/members');
      } else {
        setIsPasswordModalOpen(true);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsPasswordModalOpen(true); // fallback to modal
    }
  };


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <Image
            src="/logo.avif"
            alt="Logo"
            width={128}
            height={256}
            className="h-32 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Dropdown name="About" dropdownList={about_dropdowns} dropdownRefs={about_hrefs} />
          <a href="https://www.flickr.com/photos/austinhabitat/" className="hover:text-blue-600"> Photos </a>
          <button
            onClick={handleMemberClick}
            className="hover:text-blue-600"
          >
            Members
          </button>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </nav>

        {/* Mobile Nav */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            // Close Icon SVG
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger Icon SVG
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Nav Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 p-6 text-sm font-medium transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            {/* Close Icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} color="black" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mt-12 flex flex-col gap-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-black hover:text-blue-600">Home</Link>
            {about_dropdowns.map((item, i) => (
              <Link
                key={item}
                href={`/${about_hrefs[i]}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-black hover:text-blue-600"
              >
                {item}
              </Link>
            ))}
            <a
              href="https://www.flickr.com/photos/austinhabitat/"
              className="text-black hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Photos
            </a>
            <button onClick={handleMemberClick} className="text-black hover:text-blue-600 text-left">Members</button>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-black hover:text-blue-600">Contact</Link>
          </div>
        </div>

      </div>
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </header>
  );
}