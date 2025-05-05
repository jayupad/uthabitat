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
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const router = useRouter();

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
            <Dropdown name="About" dropdownList={about_dropdowns} dropdownRefs={about_hrefs}/>
            <a href="https://www.flickr.com/photos/austinhabitat/" className="hover:text-blue-600"> Photos </a>
            <button
              onClick={() => {
                if (localStorage.getItem("authenticated")) {
                    router.push('/members')
                } else {
                    setIsPasswordModalOpen(true)}
                }
              }
              className="hover:text-blue-600"
            >
              Members
            </button>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            </nav>
        </div>
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
        </header>
    );
}